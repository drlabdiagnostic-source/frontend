import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Check, 
  Clock, 
  Home, 
  FileText, 
  Shield, 
  Star,
  Heart,
  Zap,
  Users,
  Award,
  LucideIcon
} from "lucide-react";

interface BasePackage {
  id: number;
  name: string;
  description: string;
  price: number;
  tests: number;
}

interface MainPackage extends BasePackage {
  longDescription: string;
  originalPrice: number;
  discount: number;
  includes: string[];
  allTests: string[];
  icon: LucideIcon;
  popular: boolean;
  color: string;
  reportTime: string;
  sampleType: string;
  fasting: string;
  idealFor: string[];
}

interface SpecialPackage extends BasePackage {
  originalPrice: number;
  longDescription: string;
  allTests: string[];
  reportTime: string;
  sampleType: string;
  fasting: string;
  idealFor: string[];
}

type PackageType = MainPackage | SpecialPackage;

const packages: MainPackage[] = [
  {
    id: 1,
    name: "Basic Health Checkup",
    description: "Essential tests for routine health monitoring",
    longDescription: "Our Basic Health Checkup package is designed for individuals who want to maintain a regular health monitoring routine. This comprehensive package covers all essential blood tests and vital health markers to give you a clear picture of your overall health status.",
    price: 999,
    originalPrice: 1999,
    discount: 50,
    tests: 45,
    includes: ["Complete Blood Count", "Liver Function Test", "Kidney Function Test", "Fasting Blood Sugar", "Lipid Profile"],
    allTests: [
      "Complete Blood Count (CBC)",
      "Hemoglobin",
      "Liver Function Test (LFT)",
      "Kidney Function Test (KFT)",
      "Fasting Blood Sugar",
      "Lipid Profile",
      "Urine Routine",
      "ESR",
      "Blood Group",
      "Platelet Count"
    ],
    icon: Heart,
    popular: false,
    color: "from-emerald-500 to-teal-500",
    reportTime: "24-48 hours",
    sampleType: "Blood & Urine",
    fasting: "10-12 hours fasting required",
    idealFor: ["General health screening", "Annual checkup", "Young adults"]
  },
  {
    id: 2,
    name: "Comprehensive Health Checkup",
    description: "Complete health assessment for overall wellness",
    longDescription: "The Comprehensive Health Checkup is our most popular package, offering an in-depth analysis of your health. It includes all basic tests plus advanced panels for thyroid, vitamins, and diabetes markers. Perfect for adults who want a thorough health evaluation.",
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    tests: 85,
    includes: ["All Basic Tests", "Thyroid Panel", "Vitamin Profile", "HbA1c", "Iron Studies", "Urine Analysis"],
    allTests: [
      "Complete Blood Count (CBC)",
      "Liver Function Test (LFT)",
      "Kidney Function Test (KFT)",
      "Lipid Profile",
      "Thyroid Panel (T3, T4, TSH)",
      "Vitamin D",
      "Vitamin B12",
      "HbA1c",
      "Iron Studies",
      "Calcium",
      "Uric Acid",
      "Urine Routine & Microscopy",
      "Fasting Glucose",
      "Post Prandial Glucose"
    ],
    icon: Shield,
    popular: true,
    color: "from-primary to-accent",
    reportTime: "24-48 hours",
    sampleType: "Blood & Urine",
    fasting: "10-12 hours fasting required",
    idealFor: ["Comprehensive screening", "Adults 30+", "Pre-employment check"]
  },
  {
    id: 3,
    name: "Executive Health Checkup",
    description: "Premium package for comprehensive health evaluation",
    longDescription: "The Executive Health Checkup is our premium offering designed for executives and individuals who want the most comprehensive health assessment. It includes advanced cardiac markers, tumor markers, and imaging tests for complete peace of mind.",
    price: 4999,
    originalPrice: 9999,
    discount: 50,
    tests: 120,
    includes: ["All Comprehensive Tests", "Cardiac Markers", "Tumor Markers", "Hormone Panel", "X-Ray Chest", "ECG"],
    allTests: [
      "All Comprehensive Tests",
      "Cardiac Markers (Troponin, CK-MB)",
      "Tumor Markers (PSA, CEA, CA-125)",
      "Complete Hormone Panel",
      "X-Ray Chest PA View",
      "ECG",
      "Echocardiography",
      "Ultrasound Abdomen",
      "Stress Test (TMT)",
      "Bone Density Scan"
    ],
    icon: Zap,
    popular: false,
    color: "from-violet-500 to-purple-500",
    reportTime: "48-72 hours",
    sampleType: "Blood, Urine & Imaging",
    fasting: "10-12 hours fasting required",
    idealFor: ["Executives", "Senior citizens", "Comprehensive evaluation"]
  },
];

const specialPackages: SpecialPackage[] = [
  { 
    id: 4, 
    name: "Diabetes Care", 
    tests: 25, 
    price: 1299, 
    originalPrice: 2599,
    description: "Complete diabetes monitoring",
    longDescription: "Specialized package for diabetic patients and those at risk. Includes all essential tests to monitor blood sugar levels, kidney function, and diabetes-related complications.",
    allTests: ["Fasting Blood Sugar", "Post Prandial Glucose", "HbA1c", "Lipid Profile", "Kidney Function Test", "Urine Microalbumin"],
    reportTime: "24 hours",
    sampleType: "Blood & Urine",
    fasting: "10-12 hours fasting required",
    idealFor: ["Diabetic patients", "Pre-diabetic individuals", "Family history of diabetes"]
  },
  { 
    id: 5, 
    name: "Heart Health", 
    tests: 35, 
    price: 1999, 
    originalPrice: 3999,
    description: "Cardiac risk assessment",
    longDescription: "Comprehensive cardiac health package designed to assess your heart health and identify risk factors for cardiovascular diseases.",
    allTests: ["Lipid Profile", "Cardiac Markers", "ECG", "hs-CRP", "Homocysteine", "Lipoprotein(a)", "Apolipoprotein"],
    reportTime: "24-48 hours",
    sampleType: "Blood",
    fasting: "10-12 hours fasting required",
    idealFor: ["Heart disease risk assessment", "Adults 40+", "Family history of heart disease"]
  },
  { 
    id: 6, 
    name: "Thyroid Care", 
    tests: 15, 
    price: 799, 
    originalPrice: 1599,
    description: "Complete thyroid evaluation",
    longDescription: "Complete thyroid function assessment to detect thyroid disorders and monitor treatment effectiveness.",
    allTests: ["T3", "T4", "TSH", "Free T3", "Free T4", "Anti-TPO", "Thyroglobulin"],
    reportTime: "24 hours",
    sampleType: "Blood",
    fasting: "No fasting required",
    idealFor: ["Thyroid disorder screening", "Weight management", "Energy issues"]
  },
];

const allPackagesData: PackageType[] = [...packages, ...specialPackages];

const isMainPackage = (pkg: PackageType): pkg is MainPackage => {
  return 'icon' in pkg;
};

const PackageDetails = () => {
  const { id } = useParams();
  const pkg = allPackagesData.find((p) => p.id === Number(id));

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Package not found</h1>
            <Link to="/packages">
              <Button>Back to Packages</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const IconComponent = isMainPackage(pkg) ? pkg.icon : Shield;
  const colorClass = isMainPackage(pkg) ? pkg.color : 'from-primary to-accent';
  const isPopular = isMainPackage(pkg) && pkg.popular;
  const discount = pkg.originalPrice ? Math.round((1 - pkg.price / pkg.originalPrice) * 100) : 50;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link to="/packages" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Packages
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-lg shrink-0`}>
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    {isPopular && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full mb-2">
                        <Star className="w-3 h-3" /> Most Popular
                      </span>
                    )}
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{pkg.name}</h1>
                    <p className="text-muted-foreground">{pkg.description}</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">
                  {pkg.longDescription}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <FileText className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold">{pkg.tests}</p>
                    <p className="text-xs text-muted-foreground">Tests Included</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm font-semibold">{pkg.reportTime}</p>
                    <p className="text-xs text-muted-foreground">Report Time</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <Home className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm font-semibold">Free</p>
                    <p className="text-xs text-muted-foreground">Home Collection</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <Award className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm font-semibold">NABL</p>
                    <p className="text-xs text-muted-foreground">Certified Lab</p>
                  </div>
                </div>
              </div>

              {/* Tests Included */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                <h2 className="text-xl font-bold mb-4">Tests Included</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {pkg.allTests.map((test, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                      <Check className="w-5 h-5 text-success shrink-0" />
                      <span className="text-sm">{test}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal For */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Ideal For
                </h2>
                <div className="flex flex-wrap gap-2">
                  {pkg.idealFor.map((item, index) => (
                    <span key={index} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preparation */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
                <h2 className="text-xl font-bold mb-4">Preparation Required</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>{pkg.fasting}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>Sample Type: {pkg.sampleType}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>Drink plenty of water before the test</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>Avoid alcohol 24 hours before the test</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar - Booking Card */}
            <div>
              <div className="bg-card rounded-2xl p-6 border border-border sticky top-28">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold">₹{pkg.price}</span>
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{pkg.originalPrice}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-sm font-medium text-success bg-success/10 px-3 py-1 rounded-full">
                    Save {discount}%
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Tests</span>
                    <span className="font-medium">{pkg.tests} included</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Report Time</span>
                    <span className="font-medium">{pkg.reportTime}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Home Collection</span>
                    <span className="font-medium text-success">Free</span>
                  </div>
                </div>

                <Link to={`/booking/1?package=${pkg.id}&name=${encodeURIComponent(pkg.name)}&price=${pkg.price}`}>
                  <Button className="w-full" size="lg" variant={isPopular ? "hero" : "default"}>
                    Book Now
                  </Button>
                </Link>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  100% Safe & Secure Payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PackageDetails;
