import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Clock, 
  Home, 
  FileText, 
  CheckCircle2, 
  Shield, 
  Building2,
  Percent,
  MapPin
} from "lucide-react";

const allTests = [
  { id: 1, name: "Complete Blood Count (CBC)", description: "Comprehensive blood analysis including RBC, WBC, hemoglobin, and platelets", price: 399, originalPrice: 599, tests: 24, category: "blood", reportTime: "6-8 hours", fasting: "No fasting required", sampleType: "Blood" },
  { id: 2, name: "Lipid Profile", description: "Complete cholesterol and triglyceride levels assessment", price: 499, originalPrice: 799, tests: 8, category: "heart", reportTime: "12-24 hours", fasting: "10-12 hours fasting required", sampleType: "Blood" },
  { id: 3, name: "Thyroid Panel (T3, T4, TSH)", description: "Complete thyroid function evaluation", price: 599, originalPrice: 899, tests: 3, category: "hormone", reportTime: "24 hours", fasting: "No fasting required", sampleType: "Blood" },
  { id: 4, name: "Diabetes Panel", description: "Fasting glucose, HbA1c, and insulin levels", price: 699, originalPrice: 999, tests: 5, category: "blood", reportTime: "12-24 hours", fasting: "8-10 hours fasting required", sampleType: "Blood" },
  { id: 5, name: "Vitamin Profile", description: "Vitamin D, B12, and essential nutrients analysis", price: 1299, originalPrice: 1999, tests: 12, category: "nutrition", reportTime: "24-48 hours", fasting: "No fasting required", sampleType: "Blood" },
  { id: 6, name: "Bone Health Panel", description: "Calcium, phosphorus, and vitamin D levels", price: 899, originalPrice: 1299, tests: 6, category: "bone", reportTime: "24 hours", fasting: "No fasting required", sampleType: "Blood" },
  { id: 7, name: "Liver Function Test (LFT)", description: "Complete liver enzyme and bilirubin analysis", price: 549, originalPrice: 799, tests: 11, category: "blood", reportTime: "12-24 hours", fasting: "10-12 hours fasting required", sampleType: "Blood" },
  { id: 8, name: "Kidney Function Test (KFT)", description: "Creatinine, urea, and uric acid levels", price: 499, originalPrice: 749, tests: 8, category: "blood", reportTime: "12-24 hours", fasting: "No fasting required", sampleType: "Blood" },
  { id: 9, name: "Iron Studies", description: "Serum iron, ferritin, and TIBC analysis", price: 699, originalPrice: 999, tests: 4, category: "blood", reportTime: "24 hours", fasting: "10-12 hours fasting required", sampleType: "Blood" },
  { id: 10, name: "Cardiac Markers", description: "Troponin, CK-MB, and BNP levels", price: 1499, originalPrice: 2199, tests: 6, category: "heart", reportTime: "6-8 hours", fasting: "No fasting required", sampleType: "Blood" },
  { id: 11, name: "MRI Brain", description: "Detailed brain imaging for neurological evaluation", price: 5999, originalPrice: 8999, tests: 1, category: "imaging", reportTime: "24-48 hours", fasting: "No fasting required", sampleType: "Imaging" },
  { id: 12, name: "CT Scan Chest", description: "High-resolution chest imaging", price: 3999, originalPrice: 5999, tests: 1, category: "imaging", reportTime: "24 hours", fasting: "No fasting required", sampleType: "Imaging" },
  { id: 13, name: "X-Ray Chest", description: "Basic chest radiograph", price: 399, originalPrice: 599, tests: 1, category: "imaging", reportTime: "2-4 hours", fasting: "No fasting required", sampleType: "Imaging" },
  { id: 14, name: "Ultrasound Abdomen", description: "Complete abdominal organ imaging", price: 999, originalPrice: 1499, tests: 1, category: "imaging", reportTime: "Same day", fasting: "6-8 hours fasting for abdomen", sampleType: "Imaging" },
  { id: 15, name: "Hormone Panel (Female)", description: "FSH, LH, Estrogen, Progesterone", price: 1999, originalPrice: 2999, tests: 8, category: "hormone", reportTime: "24-48 hours", fasting: "No fasting required", sampleType: "Blood" },
  { id: 16, name: "Hormone Panel (Male)", description: "Testosterone, FSH, LH analysis", price: 1799, originalPrice: 2699, tests: 6, category: "hormone", reportTime: "24-48 hours", fasting: "No fasting required", sampleType: "Blood" },
];

const partnerOffers = [
  { partner: "HealthPlus Labs", logo: "🏥", price: 349, discount: 42, location: "Multiple Locations", rating: 4.8 },
  { partner: "MedLife Diagnostics", logo: "🔬", price: 379, discount: 37, location: "City Center", rating: 4.6 },
  { partner: "Apollo Diagnostics", logo: "🏨", price: 399, discount: 33, location: "Downtown", rating: 4.9 },
  { partner: "Dr. Lal PathLabs", logo: "🧪", price: 419, discount: 30, location: "All Areas", rating: 4.7 },
  { partner: "Thyrocare", logo: "💉", price: 359, discount: 40, location: "Home Collection", rating: 4.5 },
];

const TestDetails = () => {
  const { id } = useParams();
  const test = allTests.find((t) => t.id === Number(id));

  if (!test) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Test not found</h1>
            <Link to="/tests">
              <Button>Back to Tests</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = Math.round(((test.originalPrice - test.price) / test.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <Link to="/tests" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Tests
          </Link>
        </div>

        {/* Test Header */}
        <section className="container mx-auto px-4 mb-12">
          <div className="bg-card rounded-3xl p-8 border border-border">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full capitalize">
                    {test.category}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-success/10 text-success rounded-full flex items-center gap-1">
                    <Percent className="w-3 h-3" />
                    {discount}% OFF
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{test.name}</h1>
                <p className="text-lg text-muted-foreground mb-6">{test.description}</p>
                
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Report Time</p>
                      <p className="font-semibold">{test.reportTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Parameters</p>
                      <p className="font-semibold">{test.tests} Tests</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                    <Home className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Sample Type</p>
                      <p className="font-semibold">{test.sampleType}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
                  <p className="text-sm font-medium text-warning-foreground">
                    <strong>Preparation:</strong> {test.fasting}
                  </p>
                </div>
              </div>

              <div className="lg:border-l lg:border-border lg:pl-8">
                <div className="sticky top-28">
                  <div className="text-center mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-4xl font-bold text-primary">₹{test.price}</span>
                      <span className="text-xl text-muted-foreground line-through">₹{test.originalPrice}</span>
                    </div>
                  </div>
                  
                  <Link to={`/booking/${test.id}`}>
                    <Button className="w-full h-12 text-lg mb-4" size="lg">
                      Book Now
                    </Button>
                  </Link>
                  
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-success" />
                      100% Safe
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      NABL Certified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Offers */}
        <section className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Partner <span className="text-gradient">Offers</span>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partnerOffers.map((offer, index) => (
              <div
                key={offer.partner}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/20 hover:shadow-card transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                      {offer.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {offer.partner}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {offer.location}
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-success/10 text-success rounded-full">
                    {offer.discount}% OFF
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-2xl font-bold text-foreground">₹{offer.price}</span>
                    <span className="text-sm text-muted-foreground ml-2">⭐ {offer.rating}</span>
                  </div>
                  <Link to={`/booking/${test.id}?partner=${encodeURIComponent(offer.partner)}`}>
                    <Button size="sm" variant="outline">
                      Select
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Included Tests */}
        <section className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">
            What's <span className="text-gradient">Included</span>
          </h2>
          
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: test.tests }, (_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-sm">Parameter {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TestDetails;