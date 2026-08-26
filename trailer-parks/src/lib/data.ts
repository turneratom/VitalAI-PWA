export type ParkStatus = "active" | "under_contract" | "pending_review";

export type ParkListing = {
  id: string;
  name: string;
  location: string;
  state: string;
  city: string;
  status: ParkStatus;
  askingPrice: number;
  lotCount: number;
  occupiedLots: number;
  padRent: number;
  yearBuilt: number;
  acres: number;
  amenities: string[];
  description: string;
  ownerId: string;
  ownerName: string;
  image: string;
  financials: ParkFinancials;
  underwriting: UnderwritingMetrics;
};

export type ParkFinancials = {
  grossPotentialRent: number;
  vacancyLoss: number;
  effectiveGrossIncome: number;
  otherIncome: number;
  totalRevenue: number;
  operatingExpenses: {
    propertyTax: number;
    insurance: number;
    utilities: number;
    repairs: number;
    management: number;
    payroll: number;
    other: number;
  };
  totalOpEx: number;
  netOperatingIncome: number;
  capexReserve: number;
  cashFlowBeforeDebt: number;
  trailing12Months: MonthlyFinancial[];
};

export type MonthlyFinancial = {
  month: string;
  revenue: number;
  expenses: number;
  noi: number;
  occupancy: number;
};

export type UnderwritingMetrics = {
  capRate: number;
  pricePerLot: number;
  pricePerPad: number;
  expenseRatio: number;
  occupancyRate: number;
  debtServiceCoverage: number;
  loanToValue: number;
  projectedIRR: number;
  cashOnCash: number;
  breakEvenOccupancy: number;
};

export type LoanOffer = {
  id: string;
  bankName: string;
  parkId: string;
  parkName: string;
  loanAmount: number;
  interestRate: number;
  termYears: number;
  ltv: number;
  dscr: number;
  status: "pending" | "approved" | "declined" | "funded";
  submittedAt: string;
};

export const parks: ParkListing[] = [
  {
    id: "park-001",
    name: "Sunset Ridge Mobile Home Community",
    location: "Phoenix, AZ",
    state: "AZ",
    city: "Phoenix",
    status: "active",
    askingPrice: 4200000,
    lotCount: 85,
    occupiedLots: 81,
    padRent: 485,
    yearBuilt: 1987,
    acres: 12.4,
    amenities: ["Pool", "Clubhouse", "Laundry", "Pet Friendly", "Paved Roads"],
    description:
      "Well-maintained all-age community in growing Phoenix suburb. Strong tenant retention with 95% occupancy. Recent infrastructure upgrades including new water lines and electrical panels.",
    ownerId: "owner-001",
    ownerName: "Desert Holdings LLC",
    image: "sunset",
    financials: {
      grossPotentialRent: 494400,
      vacancyLoss: 23280,
      effectiveGrossIncome: 471120,
      otherIncome: 18400,
      totalRevenue: 489520,
      operatingExpenses: {
        propertyTax: 42000,
        insurance: 28500,
        utilities: 35200,
        repairs: 18600,
        management: 24476,
        payroll: 32000,
        other: 12400,
      },
      totalOpEx: 193176,
      netOperatingIncome: 296344,
      capexReserve: 17000,
      cashFlowBeforeDebt: 279344,
      trailing12Months: [
        { month: "Sep 2025", revenue: 40200, expenses: 15800, noi: 24400, occupancy: 94 },
        { month: "Oct 2025", revenue: 40800, expenses: 16200, noi: 24600, occupancy: 95 },
        { month: "Nov 2025", revenue: 40500, expenses: 15900, noi: 24600, occupancy: 95 },
        { month: "Dec 2025", revenue: 41000, expenses: 16100, noi: 24900, occupancy: 95 },
        { month: "Jan 2026", revenue: 41200, expenses: 16300, noi: 24900, occupancy: 96 },
        { month: "Feb 2026", revenue: 40800, expenses: 16000, noi: 24800, occupancy: 95 },
        { month: "Mar 2026", revenue: 41100, expenses: 16200, noi: 24900, occupancy: 95 },
        { month: "Apr 2026", revenue: 41500, expenses: 16400, noi: 25100, occupancy: 96 },
        { month: "May 2026", revenue: 41800, expenses: 16500, noi: 25300, occupancy: 96 },
        { month: "Jun 2026", revenue: 42000, expenses: 16600, noi: 25400, occupancy: 96 },
        { month: "Jul 2026", revenue: 42200, expenses: 16700, noi: 25500, occupancy: 96 },
        { month: "Aug 2026", revenue: 42400, expenses: 16800, noi: 25600, occupancy: 96 },
      ],
    },
    underwriting: {
      capRate: 7.1,
      pricePerLot: 49412,
      pricePerPad: 51852,
      expenseRatio: 39.5,
      occupancyRate: 95.3,
      debtServiceCoverage: 1.42,
      loanToValue: 70,
      projectedIRR: 14.2,
      cashOnCash: 8.6,
      breakEvenOccupancy: 72,
    },
  },
  {
    id: "park-002",
    name: "Oak Creek 55+ Community",
    location: "Tampa, FL",
    state: "FL",
    city: "Tampa",
    status: "active",
    askingPrice: 6800000,
    lotCount: 120,
    occupiedLots: 118,
    padRent: 625,
    yearBuilt: 1995,
    acres: 18.2,
    amenities: ["Golf Cart Paths", "Community Center", "Fitness Room", "Shuffleboard", "Boat Storage"],
    description:
      "Premier 55+ community with exceptional occupancy and strong rent growth. Florida market tailwinds with snowbird demand. All lots owned by park — no POH.",
    ownerId: "owner-002",
    ownerName: "Gulf Coast Parks Inc.",
    image: "oak",
    financials: {
      grossPotentialRent: 900000,
      vacancyLoss: 15000,
      effectiveGrossIncome: 885000,
      otherIncome: 42000,
      totalRevenue: 927000,
      operatingExpenses: {
        propertyTax: 68000,
        insurance: 42000,
        utilities: 48000,
        repairs: 28000,
        management: 46350,
        payroll: 45000,
        other: 18650,
      },
      totalOpEx: 296000,
      netOperatingIncome: 631000,
      capexReserve: 36000,
      cashFlowBeforeDebt: 595000,
      trailing12Months: [
        { month: "Sep 2025", revenue: 76000, expenses: 24200, noi: 51800, occupancy: 98 },
        { month: "Oct 2025", revenue: 76500, expenses: 24500, noi: 52000, occupancy: 98 },
        { month: "Nov 2025", revenue: 77000, expenses: 24600, noi: 52400, occupancy: 98 },
        { month: "Dec 2025", revenue: 77200, expenses: 24700, noi: 52500, occupancy: 98 },
        { month: "Jan 2026", revenue: 77500, expenses: 24800, noi: 52700, occupancy: 98 },
        { month: "Feb 2026", revenue: 76800, expenses: 24600, noi: 52200, occupancy: 98 },
        { month: "Mar 2026", revenue: 77200, expenses: 24700, noi: 52500, occupancy: 98 },
        { month: "Apr 2026", revenue: 77800, expenses: 24900, noi: 52900, occupancy: 99 },
        { month: "May 2026", revenue: 78000, expenses: 25000, noi: 53000, occupancy: 99 },
        { month: "Jun 2026", revenue: 78200, expenses: 25100, noi: 53100, occupancy: 99 },
        { month: "Jul 2026", revenue: 78500, expenses: 25200, noi: 53300, occupancy: 99 },
        { month: "Aug 2026", revenue: 78800, expenses: 25300, noi: 53500, occupancy: 99 },
      ],
    },
    underwriting: {
      capRate: 9.3,
      pricePerLot: 56667,
      pricePerPad: 57627,
      expenseRatio: 31.9,
      occupancyRate: 98.3,
      debtServiceCoverage: 1.68,
      loanToValue: 65,
      projectedIRR: 16.8,
      cashOnCash: 11.2,
      breakEvenOccupancy: 58,
    },
  },
  {
    id: "park-003",
    name: "Pine Valley MHP",
    location: "Knoxville, TN",
    state: "TN",
    city: "Knoxville",
    status: "under_contract",
    askingPrice: 2850000,
    lotCount: 62,
    occupiedLots: 58,
    padRent: 395,
    yearBuilt: 1978,
    acres: 8.6,
    amenities: ["On-Site Manager", "Playground", "Street Lighting", "City Water/Sewer"],
    description:
      "Value-add opportunity in fast-growing Knoxville MSA. Below-market rents with upside potential. City utilities reduce owner expense burden.",
    ownerId: "owner-003",
    ownerName: "Smoky Mountain Properties",
    image: "pine",
    financials: {
      grossPotentialRent: 293640,
      vacancyLoss: 23760,
      effectiveGrossIncome: 269880,
      otherIncome: 8200,
      totalRevenue: 278080,
      operatingExpenses: {
        propertyTax: 22000,
        insurance: 18000,
        utilities: 8500,
        repairs: 14000,
        management: 13994,
        payroll: 24000,
        other: 6800,
      },
      totalOpEx: 107294,
      netOperatingIncome: 170786,
      capexReserve: 12400,
      cashFlowBeforeDebt: 158386,
      trailing12Months: [
        { month: "Sep 2025", revenue: 22800, expenses: 8800, noi: 14000, occupancy: 91 },
        { month: "Oct 2025", revenue: 23000, expenses: 8900, noi: 14100, occupancy: 92 },
        { month: "Nov 2025", revenue: 23100, expenses: 9000, noi: 14100, occupancy: 92 },
        { month: "Dec 2025", revenue: 23200, expenses: 9100, noi: 14100, occupancy: 93 },
        { month: "Jan 2026", revenue: 23300, expenses: 9200, noi: 14100, occupancy: 93 },
        { month: "Feb 2026", revenue: 23200, expenses: 9100, noi: 14100, occupancy: 93 },
        { month: "Mar 2026", revenue: 23400, expenses: 9200, noi: 14200, occupancy: 93 },
        { month: "Apr 2026", revenue: 23500, expenses: 9300, noi: 14200, occupancy: 94 },
        { month: "May 2026", revenue: 23600, expenses: 9400, noi: 14200, occupancy: 94 },
        { month: "Jun 2026", revenue: 23700, expenses: 9500, noi: 14200, occupancy: 94 },
        { month: "Jul 2026", revenue: 23800, expenses: 9600, noi: 14200, occupancy: 94 },
        { month: "Aug 2026", revenue: 23900, expenses: 9700, noi: 14200, occupancy: 94 },
      ],
    },
    underwriting: {
      capRate: 6.0,
      pricePerLot: 45968,
      pricePerPad: 49138,
      expenseRatio: 38.6,
      occupancyRate: 93.5,
      debtServiceCoverage: 1.28,
      loanToValue: 75,
      projectedIRR: 18.5,
      cashOnCash: 9.8,
      breakEvenOccupancy: 68,
    },
  },
  {
    id: "park-004",
    name: "Riverbend Estates",
    location: "Austin, TX",
    state: "TX",
    city: "Austin",
    status: "active",
    askingPrice: 8900000,
    lotCount: 145,
    occupiedLots: 142,
    padRent: 720,
    yearBuilt: 2001,
    acres: 22.0,
    amenities: ["Gated Entry", "Pool & Spa", "Dog Park", "EV Charging", "Fiber Internet"],
    description:
      "Institutional-quality asset in Austin growth corridor. Triple-net lease structure on commercial pad. Strong demographic fundamentals and limited new supply.",
    ownerId: "owner-004",
    ownerName: "Lone Star Capital Group",
    image: "river",
    financials: {
      grossPotentialRent: 1252800,
      vacancyLoss: 25920,
      effectiveGrossIncome: 1226880,
      otherIncome: 68000,
      totalRevenue: 1294880,
      operatingExpenses: {
        propertyTax: 98000,
        insurance: 55000,
        utilities: 62000,
        repairs: 38000,
        management: 64744,
        payroll: 52000,
        other: 28000,
      },
      totalOpEx: 397744,
      netOperatingIncome: 897136,
      capexReserve: 58000,
      cashFlowBeforeDebt: 839136,
      trailing12Months: [
        { month: "Sep 2025", revenue: 106000, expenses: 32800, noi: 73200, occupancy: 97 },
        { month: "Oct 2025", revenue: 107000, expenses: 33000, noi: 74000, occupancy: 97 },
        { month: "Nov 2025", revenue: 107500, expenses: 33100, noi: 74400, occupancy: 98 },
        { month: "Dec 2025", revenue: 108000, expenses: 33200, noi: 74800, occupancy: 98 },
        { month: "Jan 2026", revenue: 108200, expenses: 33300, noi: 74900, occupancy: 98 },
        { month: "Feb 2026", revenue: 107800, expenses: 33200, noi: 74600, occupancy: 98 },
        { month: "Mar 2026", revenue: 108000, expenses: 33300, noi: 74700, occupancy: 98 },
        { month: "Apr 2026", revenue: 108500, expenses: 33400, noi: 75100, occupancy: 98 },
        { month: "May 2026", revenue: 109000, expenses: 33500, noi: 75500, occupancy: 98 },
        { month: "Jun 2026", revenue: 109200, expenses: 33600, noi: 75600, occupancy: 98 },
        { month: "Jul 2026", revenue: 109500, expenses: 33700, noi: 75800, occupancy: 98 },
        { month: "Aug 2026", revenue: 109800, expenses: 33800, noi: 76000, occupancy: 98 },
      ],
    },
    underwriting: {
      capRate: 10.1,
      pricePerLot: 61379,
      pricePerPad: 62676,
      expenseRatio: 30.7,
      occupancyRate: 97.9,
      debtServiceCoverage: 1.82,
      loanToValue: 60,
      projectedIRR: 15.4,
      cashOnCash: 12.8,
      breakEvenOccupancy: 52,
    },
  },
  {
    id: "park-005",
    name: "Meadowbrook Family Park",
    location: "Columbus, OH",
    state: "OH",
    city: "Columbus",
    status: "pending_review",
    askingPrice: 1950000,
    lotCount: 48,
    occupiedLots: 44,
    padRent: 350,
    yearBuilt: 1972,
    acres: 6.8,
    amenities: ["On-Site Laundry", "Storage Units", "Paved Streets", "Tenant-Owned Homes"],
    description:
      "Stable cash-flowing asset in affordable Midwest market. High percentage of tenant-owned homes reduces turnover costs. Opportunity for rent increases.",
    ownerId: "owner-005",
    ownerName: "Heartland MHP Partners",
    image: "meadow",
    financials: {
      grossPotentialRent: 201600,
      vacancyLoss: 16800,
      effectiveGrossIncome: 184800,
      otherIncome: 5600,
      totalRevenue: 190400,
      operatingExpenses: {
        propertyTax: 18500,
        insurance: 14200,
        utilities: 12000,
        repairs: 9800,
        management: 9520,
        payroll: 18000,
        other: 5200,
      },
      totalOpEx: 87220,
      netOperatingIncome: 103180,
      capexReserve: 9600,
      cashFlowBeforeDebt: 93580,
      trailing12Months: [
        { month: "Sep 2025", revenue: 15600, expenses: 7200, noi: 8400, occupancy: 90 },
        { month: "Oct 2025", revenue: 15700, expenses: 7300, noi: 8400, occupancy: 90 },
        { month: "Nov 2025", revenue: 15800, expenses: 7300, noi: 8500, occupancy: 91 },
        { month: "Dec 2025", revenue: 15800, expenses: 7400, noi: 8400, occupancy: 91 },
        { month: "Jan 2026", revenue: 15900, expenses: 7400, noi: 8500, occupancy: 91 },
        { month: "Feb 2026", revenue: 15800, expenses: 7300, noi: 8500, occupancy: 91 },
        { month: "Mar 2026", revenue: 15900, expenses: 7400, noi: 8500, occupancy: 92 },
        { month: "Apr 2026", revenue: 16000, expenses: 7500, noi: 8500, occupancy: 92 },
        { month: "May 2026", revenue: 16000, expenses: 7500, noi: 8500, occupancy: 92 },
        { month: "Jun 2026", revenue: 16100, expenses: 7600, noi: 8500, occupancy: 92 },
        { month: "Jul 2026", revenue: 16100, expenses: 7600, noi: 8500, occupancy: 92 },
        { month: "Aug 2026", revenue: 16200, expenses: 7700, noi: 8500, occupancy: 92 },
      ],
    },
    underwriting: {
      capRate: 5.3,
      pricePerLot: 40625,
      pricePerPad: 44318,
      expenseRatio: 45.8,
      occupancyRate: 91.7,
      debtServiceCoverage: 1.15,
      loanToValue: 80,
      projectedIRR: 12.1,
      cashOnCash: 6.4,
      breakEvenOccupancy: 78,
    },
  },
];

export const loanOffers: LoanOffer[] = [
  {
    id: "loan-001",
    bankName: "Community Bank of Arizona",
    parkId: "park-001",
    parkName: "Sunset Ridge Mobile Home Community",
    loanAmount: 2940000,
    interestRate: 6.75,
    termYears: 25,
    ltv: 70,
    dscr: 1.42,
    status: "approved",
    submittedAt: "2026-08-15",
  },
  {
    id: "loan-002",
    bankName: "First National MHP Lending",
    parkId: "park-002",
    parkName: "Oak Creek 55+ Community",
    loanAmount: 4420000,
    interestRate: 6.25,
    termYears: 30,
    ltv: 65,
    dscr: 1.68,
    status: "pending",
    submittedAt: "2026-08-20",
  },
  {
    id: "loan-003",
    bankName: "Southeast Community Lending",
    parkId: "park-003",
    parkName: "Pine Valley MHP",
    loanAmount: 2137500,
    interestRate: 7.1,
    termYears: 25,
    ltv: 75,
    dscr: 1.28,
    status: "approved",
    submittedAt: "2026-08-10",
  },
  {
    id: "loan-004",
    bankName: "Texas Capital MHP Fund",
    parkId: "park-004",
    parkName: "Riverbend Estates",
    loanAmount: 5340000,
    interestRate: 5.95,
    termYears: 30,
    ltv: 60,
    dscr: 1.82,
    status: "funded",
    submittedAt: "2026-07-28",
  },
];

export function getParkById(id: string): ParkListing | undefined {
  return parks.find((p) => p.id === id);
}

export function getParksByOwner(ownerId: string): ParkListing[] {
  return parks.filter((p) => p.ownerId === ownerId);
}

export function getLoansByPark(parkId: string): LoanOffer[] {
  return loanOffers.filter((l) => l.parkId === parkId);
}

export const platformStats = {
  totalListings: parks.length,
  totalValue: parks.reduce((sum, p) => sum + p.askingPrice, 0),
  avgCapRate: parks.reduce((sum, p) => sum + p.underwriting.capRate, 0) / parks.length,
  avgOccupancy: parks.reduce((sum, p) => sum + p.underwriting.occupancyRate, 0) / parks.length,
  activeLenders: 24,
  dealsClosed: 847,
  capitalDeployed: 1_240_000_000,
};
