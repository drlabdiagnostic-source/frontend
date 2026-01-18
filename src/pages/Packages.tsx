import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, Star, ArrowRight, Heart, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const packages = [
  {
    id: 1,
    name: "Basic Health Checkup",
    description: "Essential tests for routine health monitoring",
    price: 999,
    originalPrice: 1999,
    discount: 50,
    tests: 45,
    includes: ["Complete Blood Count", "Liver Function Test", "Kidney Function Test", "Fasting Blood Sugar", "Lipid Profile"],
    icon: Heart,
    popular: false,
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 2,
    name: "Comprehensive Health Checkup",
    description: "Complete health assessment for overall wellness",
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    tests: 85,
    includes: ["All Basic Tests", "Thyroid Panel", "Vitamin Profile", "HbA1c", "Iron Studies", "Urine Analysis"],
    icon: Shield,
    popular: true,
    color: "from-primary to-accent",
  },
  {
    id: 3,
    name: "Executive Health Checkup",
    description: "Premium package for comprehensive health evaluation",
    price: 4999,
    originalPrice: 9999,
    discount: 50,
    tests: 120,
    includes: ["All Comprehensive Tests", "Cardiac Markers", "Tumor Markers", "Hormone Panel", "X-Ray Chest", "ECG"],
    icon: Zap,
    popular: false,
    color: "from-violet-500 to-purple-500",
  },
];

const specialPackages = [
  { name: "Diabetes Care", tests: 25, price: 1299, description: "Complete diabetes monitoring" },
  { name: "Heart Health", tests: 35, price: 1999, description: "Cardiac risk assessment" },
  { name: "Thyroid Care", tests: 15, price: 799, description: "Complete thyroid evaluation" },
  { name: "Women's Wellness", tests: 55, price: 2999, description: "Comprehensive women's health" },
  { name: "Men's Wellness", tests: 50, price: 2799, description: "Complete men's health checkup" },
  { name: "Senior Citizen", tests: 75, price: 3499, description: "Age-specific health monitoring" },
];

const Packages = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Health <span className="text-gradient">Packages</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Comprehensive health checkup packages designed for complete wellness. Save more with bundled tests and free home collection.
              </p>
            </div>
          </div>
        </section>

        {/* Main Packages */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className={`relative bg-card rounded-3xl overflow-hidden border transition-all duration-300 animate-fade-in ${
                    pkg.popular ? "border-primary shadow-glow scale-105 z-10" : "border-border hover:border-primary/20 hover:shadow-card"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                      <Star className="w-4 h-4 inline mr-1" /> Most Popular
                    </div>
                  )}

                  <div className={`p-8 ${pkg.popular ? "pt-14" : ""}`}>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-6 shadow-lg`}>
                      <pkg.icon className="w-7 h-7 text-primary-foreground" />
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-muted-foreground mb-6">{pkg.description}</p>

                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold">₹{pkg.price}</span>
                      <span className="text-lg text-muted-foreground line-through">₹{pkg.originalPrice}</span>
                    </div>
                    <div className="inline-flex items-center gap-1 text-sm font-medium text-success bg-success/10 px-3 py-1 rounded-full mb-6">
                      Save {pkg.discount}%
                    </div>

                    <div className="text-sm text-muted-foreground mb-6">
                      <span className="font-semibold text-foreground">{pkg.tests}</span> tests included
                    </div>

                    <ul className="space-y-3 mb-8">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm">
                          <Check className="w-5 h-5 text-success shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <Link to={`/packages/${pkg.id}`} className="w-full">
                      <Button className="w-full" size="lg" variant={pkg.popular ? "hero" : "outline"}>
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Packages */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Specialized <span className="text-gradient">Packages</span>
              </h2>
              <p className="text-muted-foreground">Targeted health packages for specific needs</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialPackages.map((pkg, index) => (
                <div
                  key={pkg.name}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-primary/20 hover:shadow-card transition-all duration-300 group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-xl font-bold">₹{pkg.price}</span>
                      <span className="text-sm text-muted-foreground ml-2">{pkg.tests} tests</span>
                    </div>
                    <Link to={`/packages/${index + 4}`}>
                      <Button size="sm" variant="ghost">
                        View
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="gradient-hero rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Need a Custom Package?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Create your own health package by selecting individual tests. Our team can help you design a package that fits your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/tests">
                  <Button variant="hero-outline" size="lg">
                    Browse All Tests
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="hero-outline" size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Packages;
