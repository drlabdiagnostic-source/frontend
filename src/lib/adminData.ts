// Admin Data Store - localStorage based
export interface Partner {
  id: string;
  name: string;
  logo: string;
  tests: number;
  locations: string;
  discount: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface TestParameter {
  name: string;
  unit: string;
  normalRange: string;
}

export interface Test {
  id: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  parameters: TestParameter[];
  reportTime: string;
  fasting: string;
  sampleType: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface PartnerPricing {
  partnerId: string;
  partnerName: string;
  price: number;
  discount: number;
}

export interface TestWithPricing extends Test {
  partnerPricing: PartnerPricing[];
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  tests: string[];
  testCount: number;
  icon: string;
  popular: boolean;
  status: "active" | "inactive";
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "patient" | "collector" | "lab";
  status: "active" | "inactive";
  createdAt: string;
}

export interface Report {
  id: string;
  orderId: string;
  userId: string;
  userName: string;
  testName: string;
  partnerId: string;
  partnerName: string;
  status: "pending" | "sample_collected" | "processing" | "completed";
  reportUrl?: string;
  collectorId?: string;
  collectorName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  testName: string;
  partnerId: string;
  partnerName: string;
  amount: number;
  status: "pending" | "confirmed" | "sample_collected" | "processing" | "completed" | "cancelled";
  address: string;
  date: string;
  timeSlot: string;
  collectorId?: string;
  collectorName?: string;
  createdAt: string;
}

// Initial mock data
const initialPartners: Partner[] = [
  { id: "p1", name: "HealthPlus Labs", logo: "🏥", tests: 500, locations: "50+ Cities", discount: "Up to 40%", email: "contact@healthplus.com", phone: "+91 9876543210", status: "active", createdAt: "2024-01-01" },
  { id: "p2", name: "MedLife Diagnostics", logo: "🔬", tests: 400, locations: "30+ Cities", discount: "Up to 35%", email: "info@medlife.com", phone: "+91 9876543211", status: "active", createdAt: "2024-01-02" },
  { id: "p3", name: "Apollo Diagnostics", logo: "🏨", tests: 600, locations: "100+ Cities", discount: "Up to 30%", email: "support@apollo.com", phone: "+91 9876543212", status: "active", createdAt: "2024-01-03" },
  { id: "p4", name: "Dr. Lal PathLabs", logo: "🧪", tests: 700, locations: "200+ Cities", discount: "Up to 25%", email: "care@lalpathlab.com", phone: "+91 9876543213", status: "active", createdAt: "2024-01-04" },
  { id: "p5", name: "Thyrocare", logo: "💉", tests: 300, locations: "All India", discount: "Up to 45%", email: "help@thyrocare.com", phone: "+91 9876543214", status: "active", createdAt: "2024-01-05" },
];

const initialTests: TestWithPricing[] = [
  {
    id: "t1", name: "Complete Blood Count (CBC)", description: "Comprehensive blood analysis", category: "blood",
    basePrice: 599, parameters: [
      { name: "Hemoglobin", unit: "g/dL", normalRange: "12-16" },
      { name: "RBC Count", unit: "million/uL", normalRange: "4.5-5.5" },
      { name: "WBC Count", unit: "/uL", normalRange: "4000-11000" },
      { name: "Platelet Count", unit: "/uL", normalRange: "150000-400000" },
    ],
    reportTime: "6-8 hours", fasting: "No fasting required", sampleType: "Blood", status: "active", createdAt: "2024-01-01",
    partnerPricing: [
      { partnerId: "p1", partnerName: "HealthPlus Labs", price: 349, discount: 42 },
      { partnerId: "p2", partnerName: "MedLife Diagnostics", price: 379, discount: 37 },
      { partnerId: "p3", partnerName: "Apollo Diagnostics", price: 399, discount: 33 },
    ]
  },
  {
    id: "t2", name: "Lipid Profile", description: "Complete cholesterol assessment", category: "heart",
    basePrice: 799, parameters: [
      { name: "Total Cholesterol", unit: "mg/dL", normalRange: "<200" },
      { name: "HDL Cholesterol", unit: "mg/dL", normalRange: ">40" },
      { name: "LDL Cholesterol", unit: "mg/dL", normalRange: "<100" },
      { name: "Triglycerides", unit: "mg/dL", normalRange: "<150" },
    ],
    reportTime: "12-24 hours", fasting: "10-12 hours fasting", sampleType: "Blood", status: "active", createdAt: "2024-01-02",
    partnerPricing: [
      { partnerId: "p1", partnerName: "HealthPlus Labs", price: 449, discount: 44 },
      { partnerId: "p2", partnerName: "MedLife Diagnostics", price: 499, discount: 38 },
    ]
  },
  {
    id: "t3", name: "Thyroid Panel (T3, T4, TSH)", description: "Complete thyroid evaluation", category: "hormone",
    basePrice: 899, parameters: [
      { name: "T3", unit: "ng/dL", normalRange: "80-200" },
      { name: "T4", unit: "ug/dL", normalRange: "4.5-12.5" },
      { name: "TSH", unit: "uIU/mL", normalRange: "0.4-4.0" },
    ],
    reportTime: "24 hours", fasting: "No fasting required", sampleType: "Blood", status: "active", createdAt: "2024-01-03",
    partnerPricing: [
      { partnerId: "p1", partnerName: "HealthPlus Labs", price: 549, discount: 39 },
      { partnerId: "p3", partnerName: "Apollo Diagnostics", price: 599, discount: 33 },
    ]
  },
];

const initialPackages: Package[] = [
  { id: "pkg1", name: "Basic Health Checkup", description: "Essential tests for routine monitoring", price: 999, originalPrice: 1999, discount: 50, tests: ["t1", "t2"], testCount: 45, icon: "Heart", popular: false, status: "active", createdAt: "2024-01-01" },
  { id: "pkg2", name: "Comprehensive Health Checkup", description: "Complete health assessment", price: 2499, originalPrice: 4999, discount: 50, tests: ["t1", "t2", "t3"], testCount: 85, icon: "Shield", popular: true, status: "active", createdAt: "2024-01-02" },
  { id: "pkg3", name: "Executive Health Checkup", description: "Premium package", price: 4999, originalPrice: 9999, discount: 50, tests: ["t1", "t2", "t3"], testCount: 120, icon: "Zap", popular: false, status: "active", createdAt: "2024-01-03" },
];

const initialUsers: AdminUser[] = [
  { id: "u1", name: "John Doe", email: "john@example.com", phone: "+91 9876543210", role: "patient", status: "active", createdAt: "2024-01-01" },
  { id: "u2", name: "Rajesh Kumar", email: "rajesh@example.com", phone: "+91 9876543211", role: "collector", status: "active", createdAt: "2024-01-02" },
  { id: "u3", name: "HealthPlus Labs", email: "lab@healthplus.com", phone: "+91 9876543212", role: "lab", status: "active", createdAt: "2024-01-03" },
];

const initialOrders: Order[] = [
  { id: "ORD-001", userId: "u1", userName: "John Doe", userPhone: "+91 9876543210", testName: "Complete Blood Count", partnerId: "p1", partnerName: "HealthPlus Labs", amount: 399, status: "completed", address: "123 Main Street, Mumbai", date: "2024-01-15", timeSlot: "9:00 AM - 10:00 AM", collectorId: "u2", collectorName: "Rajesh Kumar", createdAt: "2024-01-14" },
  { id: "ORD-002", userId: "u1", userName: "John Doe", userPhone: "+91 9876543210", testName: "Lipid Profile", partnerId: "p2", partnerName: "MedLife Diagnostics", amount: 499, status: "sample_collected", address: "456 Park Avenue, Mumbai", date: "2024-01-18", timeSlot: "10:00 AM - 11:00 AM", collectorId: "u2", collectorName: "Rajesh Kumar", createdAt: "2024-01-17" },
  { id: "ORD-003", userId: "u1", userName: "Jane Smith", userPhone: "+91 9876543215", testName: "Thyroid Panel", partnerId: "p1", partnerName: "HealthPlus Labs", amount: 599, status: "pending", address: "789 Oak Road, Delhi", date: "2024-01-20", timeSlot: "8:00 AM - 9:00 AM", createdAt: "2024-01-19" },
];

const initialReports: Report[] = [
  { id: "RPT-001", orderId: "ORD-001", userId: "u1", userName: "John Doe", testName: "Complete Blood Count", partnerId: "p1", partnerName: "HealthPlus Labs", status: "completed", reportUrl: "/reports/rpt-001.pdf", collectorId: "u2", collectorName: "Rajesh Kumar", createdAt: "2024-01-15", updatedAt: "2024-01-16" },
  { id: "RPT-002", orderId: "ORD-002", userId: "u1", userName: "John Doe", testName: "Lipid Profile", partnerId: "p2", partnerName: "MedLife Diagnostics", status: "processing", createdAt: "2024-01-18", updatedAt: "2024-01-18" },
  { id: "RPT-003", orderId: "ORD-003", userId: "u1", userName: "Jane Smith", testName: "Thyroid Panel", partnerId: "p1", partnerName: "HealthPlus Labs", status: "pending", createdAt: "2024-01-19", updatedAt: "2024-01-19" },
];

// Helper functions
function getStorageData<T>(key: string, initial: T[]): T[] {
  const stored = localStorage.getItem(key);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(key, JSON.stringify(initial));
  return initial;
}

function setStorageData<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// Partners CRUD
export const getPartners = (): Partner[] => getStorageData("admin_partners", initialPartners);
export const savePartners = (partners: Partner[]) => setStorageData("admin_partners", partners);
export const addPartner = (partner: Omit<Partner, "id" | "createdAt">): Partner => {
  const partners = getPartners();
  const newPartner = { ...partner, id: `p${Date.now()}`, createdAt: new Date().toISOString().split("T")[0] };
  partners.push(newPartner);
  savePartners(partners);
  return newPartner;
};
export const updatePartner = (id: string, data: Partial<Partner>) => {
  const partners = getPartners();
  const index = partners.findIndex(p => p.id === id);
  if (index !== -1) {
    partners[index] = { ...partners[index], ...data };
    savePartners(partners);
  }
};
export const deletePartner = (id: string) => {
  const partners = getPartners().filter(p => p.id !== id);
  savePartners(partners);
};

// Tests CRUD
export const getTests = (): TestWithPricing[] => getStorageData("admin_tests", initialTests);
export const saveTests = (tests: TestWithPricing[]) => setStorageData("admin_tests", tests);
export const addTest = (test: Omit<TestWithPricing, "id" | "createdAt">): TestWithPricing => {
  const tests = getTests();
  const newTest = { ...test, id: `t${Date.now()}`, createdAt: new Date().toISOString().split("T")[0] };
  tests.push(newTest);
  saveTests(tests);
  return newTest;
};
export const updateTest = (id: string, data: Partial<TestWithPricing>) => {
  const tests = getTests();
  const index = tests.findIndex(t => t.id === id);
  if (index !== -1) {
    tests[index] = { ...tests[index], ...data };
    saveTests(tests);
  }
};
export const deleteTest = (id: string) => {
  const tests = getTests().filter(t => t.id !== id);
  saveTests(tests);
};

// Packages CRUD
export const getPackages = (): Package[] => getStorageData("admin_packages", initialPackages);
export const savePackages = (packages: Package[]) => setStorageData("admin_packages", packages);
export const addPackage = (pkg: Omit<Package, "id" | "createdAt">): Package => {
  const packages = getPackages();
  const newPackage = { ...pkg, id: `pkg${Date.now()}`, createdAt: new Date().toISOString().split("T")[0] };
  packages.push(newPackage);
  savePackages(packages);
  return newPackage;
};
export const updatePackage = (id: string, data: Partial<Package>) => {
  const packages = getPackages();
  const index = packages.findIndex(p => p.id === id);
  if (index !== -1) {
    packages[index] = { ...packages[index], ...data };
    savePackages(packages);
  }
};
export const deletePackage = (id: string) => {
  const packages = getPackages().filter(p => p.id !== id);
  savePackages(packages);
};

// Users CRUD
export const getUsers = (): AdminUser[] => getStorageData("admin_users", initialUsers);
export const saveUsers = (users: AdminUser[]) => setStorageData("admin_users", users);
export const addUser = (user: Omit<AdminUser, "id" | "createdAt">): AdminUser => {
  const users = getUsers();
  const newUser = { ...user, id: `u${Date.now()}`, createdAt: new Date().toISOString().split("T")[0] };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};
export const updateUser = (id: string, data: Partial<AdminUser>) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...data };
    saveUsers(users);
  }
};
export const deleteUser = (id: string) => {
  const users = getUsers().filter(u => u.id !== id);
  saveUsers(users);
};

// Orders CRUD
export const getOrders = (): Order[] => getStorageData("admin_orders", initialOrders);
export const saveOrders = (orders: Order[]) => setStorageData("admin_orders", orders);
export const updateOrder = (id: string, data: Partial<Order>) => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...data };
    saveOrders(orders);
  }
};

// Reports CRUD
export const getReports = (): Report[] => getStorageData("admin_reports", initialReports);
export const saveReports = (reports: Report[]) => setStorageData("admin_reports", reports);
export const updateReport = (id: string, data: Partial<Report>) => {
  const reports = getReports();
  const index = reports.findIndex(r => r.id === id);
  if (index !== -1) {
    reports[index] = { ...reports[index], ...data, updatedAt: new Date().toISOString().split("T")[0] };
    saveReports(reports);
  }
};

// Dashboard Stats
export const getDashboardStats = () => {
  const orders = getOrders();
  const users = getUsers();
  const reports = getReports();

  return {
    totalBookings: orders.length,
    revenue: orders.reduce((sum, o) => sum + o.amount, 0),
    activeUsers: users.filter(u => u.status === "active").length,
    pendingReports: reports.filter(r => r.status !== "completed").length,
    completedToday: orders.filter(o => o.status === "completed" && o.date === new Date().toISOString().split("T")[0]).length,
    recentOrders: orders.slice(-5).reverse(),
    ordersByStatus: {
      pending: orders.filter(o => o.status === "pending").length,
      confirmed: orders.filter(o => o.status === "confirmed").length,
      sample_collected: orders.filter(o => o.status === "sample_collected").length,
      processing: orders.filter(o => o.status === "processing").length,
      completed: orders.filter(o => o.status === "completed").length,
      cancelled: orders.filter(o => o.status === "cancelled").length,
    }
  };
};
