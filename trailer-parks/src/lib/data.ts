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
    id: "hollins",
    name: "Hollins Estates",
    location: "Blacksburg, VA",
    state: "VA",
    city: "Blacksburg",
    status: "active",
    askingPrice: 0,
    lotCount: 120,
    occupiedLots: 114,
    padRent: 425,
    yearBuilt: 1975,
    acres: 18.5,
    amenities: ["On-Site Management", "Laundry", "Paved Roads", "Family Community"],
    description:
      "Portfolio community in Blacksburg, Virginia. Listed as a live test run on Mobile Home Parks — quality homes, active management, and a proven operator behind the asset.",
    ownerId: "owner-demo",
    ownerName: "Demo Operator",
    image: "pine",
    financials: {
      grossPotentialRent: 612000,
      vacancyLoss: 30600,
      effectiveGrossIncome: 581400,
      otherIncome: 22000,
      totalRevenue: 603400,
      operatingExpenses: {
        propertyTax: 48000,
        insurance: 32000,
        utilities: 28000,
        repairs: 24000,
        management: 30170,
        payroll: 42000,
        other: 15000,
      },
      totalOpEx: 219170,
      netOperatingIncome: 384230,
      capexReserve: 24000,
      cashFlowBeforeDebt: 360230,
      trailing12Months: [
        { month: "Sep 2025", revenue: 49200, expenses: 17800, noi: 31400, occupancy: 94 },
        { month: "Oct 2025", revenue: 49500, expenses: 18000, noi: 31500, occupancy: 94 },
        { month: "Nov 2025", revenue: 49800, expenses: 18100, noi: 31700, occupancy: 95 },
        { month: "Dec 2025", revenue: 50100, expenses: 18200, noi: 31900, occupancy: 95 },
        { month: "Jan 2026", revenue: 50400, expenses: 18300, noi: 32100, occupancy: 95 },
        { month: "Feb 2026", revenue: 50200, expenses: 18200, noi: 32000, occupancy: 95 },
        { month: "Mar 2026", revenue: 50500, expenses: 18400, noi: 32100, occupancy: 95 },
        { month: "Apr 2026", revenue: 50800, expenses: 18500, noi: 32300, occupancy: 95 },
        { month: "May 2026", revenue: 51000, expenses: 18600, noi: 32400, occupancy: 95 },
        { month: "Jun 2026", revenue: 51200, expenses: 18700, noi: 32500, occupancy: 95 },
        { month: "Jul 2026", revenue: 51400, expenses: 18800, noi: 32600, occupancy: 95 },
        { month: "Aug 2026", revenue: 51600, expenses: 18900, noi: 32700, occupancy: 95 },
      ],
    },
    underwriting: {
      capRate: 0,
      pricePerLot: 0,
      pricePerPad: 0,
      expenseRatio: 36.3,
      occupancyRate: 95.0,
      debtServiceCoverage: 1.55,
      loanToValue: 65,
      projectedIRR: 14.0,
      cashOnCash: 9.5,
      breakEvenOccupancy: 62,
    },
  },
  {
    id: "yellow-mountain",
    name: "Yellow Mountain",
    location: "Roanoke, VA",
    state: "VA",
    city: "Roanoke",
    status: "active",
    askingPrice: 0,
    lotCount: 95,
    occupiedLots: 90,
    padRent: 395,
    yearBuilt: 1982,
    acres: 14.2,
    amenities: ["Mountain Views", "On-Site Manager", "Storage", "Pet Friendly"],
    description:
      "Community in Roanoke, Virginia. Live test listing on Mobile Home Parks to validate the full owner → financials → underwriting workflow.",
    ownerId: "owner-demo",
    ownerName: "Demo Operator",
    image: "oak",
    financials: {
      grossPotentialRent: 450300,
      vacancyLoss: 22515,
      effectiveGrossIncome: 427785,
      otherIncome: 14000,
      totalRevenue: 441785,
      operatingExpenses: {
        propertyTax: 36000,
        insurance: 26000,
        utilities: 22000,
        repairs: 20000,
        management: 22089,
        payroll: 36000,
        other: 12000,
      },
      totalOpEx: 174089,
      netOperatingIncome: 267696,
      capexReserve: 19000,
      cashFlowBeforeDebt: 248696,
      trailing12Months: [
        { month: "Sep 2025", revenue: 35800, expenses: 14200, noi: 21600, occupancy: 94 },
        { month: "Oct 2025", revenue: 36000, expenses: 14300, noi: 21700, occupancy: 94 },
        { month: "Nov 2025", revenue: 36200, expenses: 14400, noi: 21800, occupancy: 94 },
        { month: "Dec 2025", revenue: 36400, expenses: 14500, noi: 21900, occupancy: 95 },
        { month: "Jan 2026", revenue: 36600, expenses: 14600, noi: 22000, occupancy: 95 },
        { month: "Feb 2026", revenue: 36500, expenses: 14500, noi: 22000, occupancy: 95 },
        { month: "Mar 2026", revenue: 36700, expenses: 14600, noi: 22100, occupancy: 95 },
        { month: "Apr 2026", revenue: 36900, expenses: 14700, noi: 22200, occupancy: 95 },
        { month: "May 2026", revenue: 37000, expenses: 14800, noi: 22200, occupancy: 95 },
        { month: "Jun 2026", revenue: 37200, expenses: 14900, noi: 22300, occupancy: 95 },
        { month: "Jul 2026", revenue: 37300, expenses: 14900, noi: 22400, occupancy: 95 },
        { month: "Aug 2026", revenue: 37500, expenses: 15000, noi: 22500, occupancy: 95 },
      ],
    },
    underwriting: {
      capRate: 0,
      pricePerLot: 0,
      pricePerPad: 0,
      expenseRatio: 39.4,
      occupancyRate: 94.7,
      debtServiceCoverage: 1.48,
      loanToValue: 70,
      projectedIRR: 13.5,
      cashOnCash: 8.8,
      breakEvenOccupancy: 66,
    },
  },
  {
    id: "meadowbrook",
    name: "Meadowbrook",
    location: "Blacksburg, VA",
    state: "VA",
    city: "Blacksburg",
    status: "active",
    askingPrice: 0,
    lotCount: 78,
    occupiedLots: 74,
    padRent: 410,
    yearBuilt: 1978,
    acres: 11.0,
    amenities: ["Quiet Community", "Laundry", "Playground", "City Utilities"],
    description:
      "Community in Blacksburg, Virginia. Part of the live test run — owners list for free, buyers see financials, analysts underwrite, lenders review capital.",
    ownerId: "owner-demo",
    ownerName: "Demo Operator",
    image: "meadow",
    financials: {
      grossPotentialRent: 383760,
      vacancyLoss: 19188,
      effectiveGrossIncome: 364572,
      otherIncome: 11000,
      totalRevenue: 375572,
      operatingExpenses: {
        propertyTax: 30000,
        insurance: 22000,
        utilities: 18000,
        repairs: 16000,
        management: 18779,
        payroll: 30000,
        other: 10000,
      },
      totalOpEx: 144779,
      netOperatingIncome: 230793,
      capexReserve: 15600,
      cashFlowBeforeDebt: 215193,
      trailing12Months: [
        { month: "Sep 2025", revenue: 30400, expenses: 11800, noi: 18600, occupancy: 94 },
        { month: "Oct 2025", revenue: 30600, expenses: 11900, noi: 18700, occupancy: 94 },
        { month: "Nov 2025", revenue: 30800, expenses: 12000, noi: 18800, occupancy: 95 },
        { month: "Dec 2025", revenue: 31000, expenses: 12000, noi: 19000, occupancy: 95 },
        { month: "Jan 2026", revenue: 31200, expenses: 12100, noi: 19100, occupancy: 95 },
        { month: "Feb 2026", revenue: 31100, expenses: 12100, noi: 19000, occupancy: 95 },
        { month: "Mar 2026", revenue: 31300, expenses: 12200, noi: 19100, occupancy: 95 },
        { month: "Apr 2026", revenue: 31400, expenses: 12200, noi: 19200, occupancy: 95 },
        { month: "May 2026", revenue: 31500, expenses: 12300, noi: 19200, occupancy: 95 },
        { month: "Jun 2026", revenue: 31600, expenses: 12300, noi: 19300, occupancy: 95 },
        { month: "Jul 2026", revenue: 31700, expenses: 12400, noi: 19300, occupancy: 95 },
        { month: "Aug 2026", revenue: 31800, expenses: 12400, noi: 19400, occupancy: 95 },
      ],
    },
    underwriting: {
      capRate: 0,
      pricePerLot: 0,
      pricePerPad: 0,
      expenseRatio: 38.5,
      occupancyRate: 94.9,
      debtServiceCoverage: 1.5,
      loanToValue: 70,
      projectedIRR: 13.8,
      cashOnCash: 9.0,
      breakEvenOccupancy: 64,
    },
  },
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
  totalValue: parks.reduce((sum, p) => sum + (p.askingPrice > 0 ? p.askingPrice : 0), 0),
  avgCapRate:
    parks.filter((p) => p.underwriting.capRate > 0).reduce((sum, p) => sum + p.underwriting.capRate, 0) /
      Math.max(1, parks.filter((p) => p.underwriting.capRate > 0).length),
  avgOccupancy: parks.reduce((sum, p) => sum + p.underwriting.occupancyRate, 0) / parks.length,
  activeLenders: 24,
  dealsClosed: 847,
  capitalDeployed: 1_240_000_000,
};
