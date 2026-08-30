/**
 * Everything Films — outreach engine
 * Partners (wedding planners, funeral homes) + announcement monitor
 * (weddings, births, obituaries) with auto-drafted journey emails.
 */
(function () {
  "use strict";

  const CONTACT = "brad@treadcompanies.com";
  const BRAND = "Everything Films";
  const SITE = "https://turneratom.github.io/VitalAI-PWA/life-movies/";
  const STORAGE_KEY = "ef-outreach-sent-v1";

  const RULES = {
    wedding: 0,
    birth: 14,
    obituary: 7,
  };

  const state = {
    partners: [],
    announcements: [],
    meta: {},
    tab: "partners",
    partnerFilter: "all",
    announcementFilter: "all",
    readiness: "ready",
    search: "",
    sent: loadSent(),
  };

  function loadSent() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveSent() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.sent));
  }

  function daysSince(iso) {
    if (!iso) return 999;
    const then = new Date(iso + "T12:00:00");
    const now = new Date();
    return Math.floor((now - then) / 86400000);
  }

  function isReady(a) {
    const min = RULES[a.kind] ?? 0;
    return daysSince(a.publishedOn) >= min;
  }

  function markSent(id) {
    state.sent[id] = new Date().toISOString();
    saveSent();
  }

  function wasSent(id) {
    return Boolean(state.sent[id]);
  }

  /* —— Email templates —— */

  function partnerEmail(p) {
    if (p.type === "wedding_planner") {
      return {
        to: p.email,
        subject: `${p.name} × ${BRAND} — film partner for your couples`,
        body: `Hi ${p.contact.split(" ")[0]},

I'm Bradley with ${BRAND} (Tread Companies). We turn the photos and videos couples already have into finished wedding movies — 30 minutes for $10,000, or 60 minutes for $15,000.

Couples send everything (phones, albums, guest clips). We cut the film. No day-of crew required unless they want one later.

I'd love to make ${p.name} a preferred partner in ${p.city}:
• You refer couples who want a cinematic keep-forever film
• We handle intake, editing, and delivery
• You stay the hero planner — we stay invisible in the chaos of the weekend

Partner one-pager: ${SITE}

If useful, I can send a short sample reel and a referral link for your couples.

Best,
Bradley
${BRAND}
${CONTACT}
`,
      };
    }

    return {
      to: p.email,
      subject: `${p.name} — life films for families you serve`,
      body: `Hi ${p.contact.split(" ")[0]},

I'm Bradley with ${BRAND}. We create respectful life movies from family photos, home videos, and voice notes — a lasting film of someone's journey.

Packages: 30-minute film $10,000 · 60-minute film $15,000.

Families send everything securely after the service week. We restore, score, and deliver a private film they can share for generations.

For ${p.name} in ${p.city}, a simple partnership:
• You offer families an optional life-film referral (never pushy)
• We wait through the first week, then handle outreach gently
• You receive a quiet partner fee on completed films

Details: ${SITE}

Happy to walk through tone, timing, and sample work on a short call.

With care,
Bradley
${BRAND}
${CONTACT}
`,
    };
  }

  function announcementEmail(a) {
    if (a.kind === "wedding") {
      return {
        to: a.email,
        subject: `${a.subjectName} — a wedding movie from what you already have`,
        body: `Hi ${a.contactName.split(" ")[0]},

Congratulations on ${a.headline.replace(/^.*?—\s*/, "") || "your wedding"}.

I'm Bradley with ${BRAND}. We make wedding movies from the pictures and videos you (and your guests) already have — phones, albums, clips. Send everything; we cut a finished film.

• 30-minute film — $10,000
• 60-minute film — $15,000

No day-of film crew required. Private review link, licensed music, two revision rounds.

Start here: ${SITE}

If the timing is wrong, just ignore this — and congratulations again.

Bradley
${BRAND}
${CONTACT}
`,
      };
    }

    if (a.kind === "birth") {
      return {
        to: a.email,
        subject: `Document ${a.subjectName}'s first chapter — ${BRAND}`,
        body: `Hi ${a.contactName.split(" ")[0]},

Warm congratulations on the arrival of ${a.subjectName}.

${BRAND} turns the photos and videos of a child's early days — and the family story around them — into a life movie you can keep forever.

Send pictures, send videos, send everything. We craft:
• 30-minute film — $10,000
• 60-minute film — $15,000

Learn more: ${SITE}

Only if it feels right for your family.

Bradley
${BRAND}
${CONTACT}
`,
      };
    }

    // Obituary — soft, delayed, opt-out clear
    const first = a.contactName.replace(/^Family of\s+/i, "").split(" ")[0];
    return {
      to: a.email,
      subject: `A life film for ${a.subjectName} — when you're ready`,
      body: `Dear ${a.contactName},

I'm sorry for your loss. I waited to write.

I'm Bradley with ${BRAND}. We help families turn photos, home videos, and voice notes into a respectful life movie — a document of someone's journey that children and grandchildren can watch for years.

There is no rush. If and when it feels right:
• Send pictures, videos, everything you want included
• We restore, score, and craft a 30- or 60-minute film
• 30 minutes — $10,000 · 60 minutes — $15,000

${SITE}

If this is not welcome, please discard this note — no reply needed. Care to the ${first} family.

Bradley
${BRAND}
${CONTACT}
`,
    };
  }

  function mailto(email) {
    return `mailto:${encodeURIComponent(email.to)}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
  }

  /* —— Rendering —— */

  function el(id) {
    return document.getElementById(id);
  }

  function kindLabel(k) {
    return (
      {
        wedding_planner: "Wedding planner",
        funeral_home: "Funeral home",
        wedding: "Wedding",
        birth: "Birth",
        obituary: "Obituary",
      }[k] || k
    );
  }

  function renderStats() {
    const planners = state.partners.filter((p) => p.type === "wedding_planner").length;
    const funerals = state.partners.filter((p) => p.type === "funeral_home").length;
    const ready = state.announcements.filter((a) => isReady(a) && !wasSent(a.id)).length;
    const waiting = state.announcements.filter((a) => !isReady(a)).length;
    el("stats").innerHTML = `
      <div class="stat"><strong>${planners}</strong><span>Wedding planners</span></div>
      <div class="stat"><strong>${funerals}</strong><span>Funeral homes</span></div>
      <div class="stat"><strong>${ready}</strong><span>Announcements ready</span></div>
      <div class="stat"><strong>${waiting}</strong><span>In cooling window</span></div>
    `;
  }

  function filteredPartners() {
    const q = state.search.toLowerCase();
    return state.partners.filter((p) => {
      if (state.partnerFilter !== "all" && p.type !== state.partnerFilter) return false;
      if (!q) return true;
      return [p.name, p.contact, p.city, p.state, p.email].join(" ").toLowerCase().includes(q);
    });
  }

  function filteredAnnouncements() {
    const q = state.search.toLowerCase();
    return state.announcements.filter((a) => {
      if (state.announcementFilter !== "all" && a.kind !== state.announcementFilter) return false;
      const ready = isReady(a);
      if (state.readiness === "ready" && (!ready || wasSent(a.id))) return false;
      if (state.readiness === "waiting" && ready) return false;
      if (state.readiness === "sent" && !wasSent(a.id)) return false;
      if (!q) return true;
      return [a.headline, a.subjectName, a.city, a.state, a.source, a.email]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }

  function renderPartners() {
    const list = filteredPartners();
    el("list").innerHTML = list
      .map((p) => {
        const mail = partnerEmail(p);
        const sent = wasSent(p.id);
        return `
        <article class="card ${sent ? "sent" : ""}" data-id="${p.id}">
          <div class="card-top">
            <div>
              <p class="tag">${kindLabel(p.type)}</p>
              <h3>${escapeHtml(p.name)}</h3>
              <p class="meta">${escapeHtml(p.contact)} · ${escapeHtml(p.city)}, ${escapeHtml(p.state)}</p>
              <p class="meta">${escapeHtml(p.email)} · ${escapeHtml(p.phone)}</p>
              ${p.notes ? `<p class="notes">${escapeHtml(p.notes)}</p>` : ""}
            </div>
            <div class="actions">
              <a class="btn" href="${mailto(mail)}" data-send="${p.id}">Email partner</a>
              <button type="button" class="btn ghost" data-copy='${encodeURIComponent(JSON.stringify(mail))}'>Copy email</button>
              <button type="button" class="btn ghost" data-mark="${p.id}">${sent ? "Sent ✓" : "Mark sent"}</button>
            </div>
          </div>
          <details>
            <summary>Preview email</summary>
            <pre>${escapeHtml(mail.subject)}\n\n${escapeHtml(mail.body)}</pre>
          </details>
        </article>`;
      })
      .join("") || `<p class="empty">No partners match.</p>`;
  }

  function renderAnnouncements() {
    const list = filteredAnnouncements();
    el("list").innerHTML = list
      .map((a) => {
        const mail = announcementEmail(a);
        const ready = isReady(a);
        const sent = wasSent(a.id);
        const waitDays = Math.max(0, (RULES[a.kind] || 0) - daysSince(a.publishedOn));
        const status = sent
          ? "Sent"
          : ready
            ? "Ready to email"
            : `Cooling · ${waitDays}d left`;
        return `
        <article class="card ${sent ? "sent" : ""} ${!ready ? "waiting" : ""}" data-id="${a.id}">
          <div class="card-top">
            <div>
              <p class="tag ${a.kind}">${kindLabel(a.kind)} · ${status}</p>
              <h3>${escapeHtml(a.headline)}</h3>
              <p class="meta">${escapeHtml(a.subjectName)} · ${escapeHtml(a.city)}, ${escapeHtml(a.state)}</p>
              <p class="meta">Published ${escapeHtml(a.publishedOn)} · ${escapeHtml(a.source)}</p>
              <p class="notes">${escapeHtml(a.snippet || "")}</p>
              ${a.funeralHome ? `<p class="notes">Funeral home: ${escapeHtml(a.funeralHome)}</p>` : ""}
            </div>
            <div class="actions">
              <a class="btn ${ready && !sent ? "" : "disabled"}" href="${ready ? mailto(mail) : "#"}" data-send="${a.id}" ${ready ? "" : "aria-disabled=true"}>Email journey</a>
              <button type="button" class="btn ghost" data-copy='${encodeURIComponent(JSON.stringify(mail))}'>Copy email</button>
              <button type="button" class="btn ghost" data-mark="${a.id}">${sent ? "Sent ✓" : "Mark sent"}</button>
            </div>
          </div>
          <details>
            <summary>Preview email</summary>
            <pre>${escapeHtml(mail.subject)}\n\n${escapeHtml(mail.body)}</pre>
          </details>
        </article>`;
      })
      .join("") || `<p class="empty">No announcements match this filter.</p>`;
  }

  function queueItems() {
    const partnerItems = state.partners
      .filter((p) => !wasSent(p.id))
      .map((p) => ({ id: p.id, label: p.name, kind: p.type, email: partnerEmail(p) }));
    const annItems = state.announcements
      .filter((a) => isReady(a) && !wasSent(a.id))
      .map((a) => ({ id: a.id, label: a.headline, kind: a.kind, email: announcementEmail(a) }));
    return [...partnerItems, ...annItems];
  }

  function renderQueue() {
    const items = queueItems();
    el("list").innerHTML = `
      <div class="queue-bar">
        <p><strong>${items.length}</strong> emails ready to auto-send (partners + cooled announcements).</p>
        <div class="actions">
          <button type="button" class="btn" id="auto-send-next" ${items.length ? "" : "disabled"}>Auto-send next</button>
          <button type="button" class="btn ghost" id="copy-all-queue" ${items.length ? "" : "disabled"}>Copy all as text</button>
          <button type="button" class="btn ghost" id="export-queue">Export JSON queue</button>
        </div>
      </div>
      ${
        items
          .map(
            (item, i) => `
        <article class="card" data-id="${item.id}">
          <div class="card-top">
            <div>
              <p class="tag">#${i + 1} · ${kindLabel(item.kind)}</p>
              <h3>${escapeHtml(item.label)}</h3>
              <p class="meta">To: ${escapeHtml(item.email.to)}</p>
            </div>
            <div class="actions">
              <a class="btn" href="${mailto(item.email)}" data-send="${item.id}">Send</a>
              <button type="button" class="btn ghost" data-mark="${item.id}">Mark sent</button>
            </div>
          </div>
        </article>`
          )
          .join("") || `<p class="empty">Queue clear.</p>`
      }
    `;

    const nextBtn = el("auto-send-next");
    if (nextBtn) {
      nextBtn.onclick = () => {
        const next = queueItems()[0];
        if (!next) return;
        markSent(next.id);
        window.location.href = mailto(next.email);
        render();
      };
    }
    const copyAll = el("copy-all-queue");
    if (copyAll) {
      copyAll.onclick = async () => {
        const text = queueItems()
          .map(
            (i) =>
              `---\nTO: ${i.email.to}\nSUBJECT: ${i.email.subject}\n\n${i.email.body}`
          )
          .join("\n\n");
        await navigator.clipboard.writeText(text);
        copyAll.textContent = "Copied ✓";
        setTimeout(() => (copyAll.textContent = "Copy all as text"), 1500);
      };
    }
    const exportBtn = el("export-queue");
    if (exportBtn) {
      exportBtn.onclick = () => {
        const blob = new Blob([JSON.stringify(queueItems(), null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "everything-films-email-queue.json";
        a.click();
        URL.revokeObjectURL(url);
      };
    }
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderFilters() {
    const box = el("filters");
    if (state.tab === "partners") {
      box.innerHTML = `
        <button type="button" data-pf="all" class="${state.partnerFilter === "all" ? "on" : ""}">All</button>
        <button type="button" data-pf="wedding_planner" class="${state.partnerFilter === "wedding_planner" ? "on" : ""}">Wedding planners</button>
        <button type="button" data-pf="funeral_home" class="${state.partnerFilter === "funeral_home" ? "on" : ""}">Funeral homes</button>
      `;
    } else if (state.tab === "announcements") {
      box.innerHTML = `
        <button type="button" data-af="all" class="${state.announcementFilter === "all" ? "on" : ""}">All kinds</button>
        <button type="button" data-af="wedding" class="${state.announcementFilter === "wedding" ? "on" : ""}">Weddings</button>
        <button type="button" data-af="birth" class="${state.announcementFilter === "birth" ? "on" : ""}">Births</button>
        <button type="button" data-af="obituary" class="${state.announcementFilter === "obituary" ? "on" : ""}">Obituaries</button>
        <span class="sep"></span>
        <button type="button" data-ready="ready" class="${state.readiness === "ready" ? "on" : ""}">Ready</button>
        <button type="button" data-ready="waiting" class="${state.readiness === "waiting" ? "on" : ""}">Cooling</button>
        <button type="button" data-ready="sent" class="${state.readiness === "sent" ? "on" : ""}">Sent</button>
        <button type="button" data-ready="all" class="${state.readiness === "all" ? "on" : ""}">Show all</button>
      `;
    } else {
      box.innerHTML = `<p class="hint">Auto-send walks the queue: opens each drafted email, marks it sent, and advances.</p>`;
    }
  }

  function render() {
    renderStats();
    renderFilters();
    el("panel-title").textContent =
      state.tab === "partners"
        ? "Partner outreach"
        : state.tab === "announcements"
          ? "Announcement monitor"
          : "Auto-send queue";
    if (state.tab === "partners") renderPartners();
    else if (state.tab === "announcements") renderAnnouncements();
    else renderQueue();
  }

  function bind() {
    document.querySelectorAll("[data-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.tab = btn.getAttribute("data-tab");
        history.replaceState(null, "", "#" + state.tab);
        document.querySelectorAll("[data-tab]").forEach((b) => b.classList.toggle("on", b === btn));
        render();
      });
    });

    el("filters").addEventListener("click", (e) => {
      const t = e.target.closest("button");
      if (!t) return;
      if (t.dataset.pf) state.partnerFilter = t.dataset.pf;
      if (t.dataset.af) state.announcementFilter = t.dataset.af;
      if (t.dataset.ready) state.readiness = t.dataset.ready;
      render();
    });

    el("search").addEventListener("input", (e) => {
      state.search = e.target.value;
      render();
    });

    el("list").addEventListener("click", async (e) => {
      const send = e.target.closest("[data-send]");
      if (send && send.getAttribute("href") !== "#") {
        markSent(send.getAttribute("data-send"));
        setTimeout(render, 400);
        return;
      }
      const mark = e.target.closest("[data-mark]");
      if (mark) {
        markSent(mark.getAttribute("data-mark"));
        render();
        return;
      }
      const copy = e.target.closest("[data-copy]");
      if (copy) {
        const mail = JSON.parse(decodeURIComponent(copy.getAttribute("data-copy")));
        await navigator.clipboard.writeText(
          `To: ${mail.to}\nSubject: ${mail.subject}\n\n${mail.body}`
        );
        copy.textContent = "Copied ✓";
        setTimeout(() => (copy.textContent = "Copy email"), 1500);
      }
    });

    el("import-csv").addEventListener("change", async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const text = await file.text();
      const rows = parseCsv(text);
      const mapped = rows
        .map((r, i) => ({
          id: `import-${Date.now()}-${i}`,
          kind: normalizeKind(r.kind || r.type || r.category),
          headline: r.headline || r.title || `${r.kind || "Announcement"} — ${r.name || r.subject || "Unknown"}`,
          subjectName: r.subjectName || r.name || r.subject || "Unknown",
          contactName: r.contactName || r.contact || r.name || "Family",
          email: r.email || "",
          city: r.city || "",
          state: r.state || "",
          publishedOn: r.publishedOn || r.date || new Date().toISOString().slice(0, 10),
          eventOn: r.eventOn || r.publishedOn || r.date || "",
          source: r.source || file.name,
          sourceUrl: r.sourceUrl || "",
          snippet: r.snippet || r.notes || "",
          funeralHome: r.funeralHome || "",
        }))
        .filter((a) => a.email && a.kind);
      state.announcements = [...mapped, ...state.announcements];
      state.tab = "announcements";
      document.querySelectorAll("[data-tab]").forEach((b) =>
        b.classList.toggle("on", b.getAttribute("data-tab") === "announcements")
      );
      render();
      e.target.value = "";
    });

    el("email-all-partners").addEventListener("click", () => {
      state.tab = "queue";
      document.querySelectorAll("[data-tab]").forEach((b) =>
        b.classList.toggle("on", b.getAttribute("data-tab") === "queue")
      );
      render();
      const next = el("auto-send-next");
      if (next) next.click();
    });
  }

  function normalizeKind(k) {
    const v = String(k || "").toLowerCase();
    if (v.includes("wed")) return "wedding";
    if (v.includes("birth") || v.includes("baby")) return "birth";
    if (v.includes("obit") || v.includes("death") || v.includes("funeral")) return "obituary";
    return v || "wedding";
  }

  function parseCsv(text) {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) return [];
    const headers = splitCsvLine(lines[0]).map((h) => h.trim());
    return lines.slice(1).map((line) => {
      const cols = splitCsvLine(line);
      const row = {};
      headers.forEach((h, i) => {
        row[h] = (cols[i] || "").trim();
      });
      return row;
    });
  }

  function splitCsvLine(line) {
    const out = [];
    let cur = "";
    let q = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        q = !q;
        continue;
      }
      if (c === "," && !q) {
        out.push(cur);
        cur = "";
        continue;
      }
      cur += c;
    }
    out.push(cur);
    return out;
  }

  async function boot() {
    const [partnersRes, announcementsRes] = await Promise.all([
      fetch("../data/partners.json"),
      fetch("../data/announcements.json"),
    ]);
    const partnersJson = await partnersRes.json();
    const announcementsJson = await announcementsRes.json();
    state.partners = partnersJson.partners || [];
    state.announcements = announcementsJson.announcements || [];
    state.meta = { ...partnersJson.meta, ...announcementsJson.meta };

    const hash = (location.hash || "").replace("#", "");
    if (hash === "announcements" || hash === "queue" || hash === "partners") {
      state.tab = hash;
    }

    bind();
    document.querySelectorAll("[data-tab]").forEach((b) =>
      b.classList.toggle("on", b.getAttribute("data-tab") === state.tab)
    );
    render();
  }

  boot().catch((err) => {
    el("list").innerHTML = `<p class="empty">Failed to load data: ${escapeHtml(err.message)}</p>`;
  });
})();
