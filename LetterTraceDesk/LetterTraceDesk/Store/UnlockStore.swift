import Combine
import Foundation
import StoreKit

/// StoreKit 2 one-time (non-consumable) unlock. No subscriptions.
@MainActor
final class UnlockStore: ObservableObject {
    static let productID = "com.lettertracedesk.fullalphabet"

    @Published private(set) var isUnlocked = false
    @Published private(set) var product: Product?
    @Published private(set) var isLoading = false
    @Published var statusMessage: String?

    private var updatesTask: Task<Void, Never>?
    private let persist: (Bool) -> Void

    init(cacheUnlocked: Bool = false, persist: @escaping (Bool) -> Void = { _ in }) {
        self.persist = persist
        self.isUnlocked = cacheUnlocked
        updatesTask = listenForTransactions()
        Task { await refresh() }
    }

    var displayPrice: String? {
        product?.displayPrice
    }

    var isFamilyShareable: Bool {
        product?.isFamilyShareable ?? true
    }

    func refresh() async {
        isLoading = true
        defer { isLoading = false }
        await loadProduct()
        await loadEntitlements()
    }

    func purchase() async {
        statusMessage = nil
        if product == nil {
            await loadProduct()
        }
        guard let product else {
            statusMessage = "The App Store product isn’t available yet. Free letters A–F still work offline."
            return
        }
        do {
            let result = try await product.purchase()
            switch result {
            case .success(let verification):
                if let transaction = Self.verified(verification) {
                    await transaction.finish()
                    await loadEntitlements()
                    statusMessage = "Full alphabet unlocked. One-time purchase — not a subscription."
                } else {
                    statusMessage = "Purchase could not be verified."
                }
            case .userCancelled:
                break
            case .pending:
                statusMessage = "Purchase pending (Ask to Buy). The full alphabet unlocks when a parent approves."
            @unknown default:
                statusMessage = "Purchase finished with an unknown status."
            }
        } catch {
            statusMessage = "Purchase didn’t complete. Try again from Parent settings."
        }
    }

    func seedCacheIfNeeded(_ cached: Bool) {
        if cached && !isUnlocked {
            isUnlocked = true
        }
    }

    func restore() async {
        statusMessage = nil
        do {
            try await AppStore.sync()
            await loadEntitlements()
            if isUnlocked {
                statusMessage = "Purchases restored. Full alphabet is unlocked."
            } else {
                statusMessage = "No Full Alphabet Unlock found for this Apple ID."
            }
        } catch {
            statusMessage = "Restore didn’t complete. Try again on a network."
        }
    }

    private func loadProduct() async {
        do {
            let found = try await Product.products(for: [Self.productID])
            product = found.first(where: { $0.id == Self.productID })
        } catch {
            // Offline first launch: keep free A–F; product loads when StoreKit can reach the store.
        }
    }

    private func loadEntitlements() async {
        var unlocked = false
        for await result in Transaction.currentEntitlements {
            if let transaction = Self.verified(result),
               transaction.productID == Self.productID,
               transaction.revocationDate == nil {
                unlocked = true
                break
            }
        }
        isUnlocked = unlocked
        persist(unlocked)
    }

    private func listenForTransactions() -> Task<Void, Never> {
        Task.detached { [weak self] in
            for await result in Transaction.updates {
                if let transaction = Self.verified(result) {
                    await transaction.finish()
                    await self?.loadEntitlements()
                }
            }
        }
    }

    private static func verified<T>(_ result: VerificationResult<T>) -> T? {
        switch result {
        case .unverified:
            return nil
        case .verified(let value):
            return value
        }
    }
}
