import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Search, Filter, Droplets, Activity, Heart, Zap, Brain, Bone, ScanLine, Microscope, ArrowUpDown, ChevronDown } from "lucide-react";

const categories = [
  { id: "all", name: "All Tests", icon: Microscope },
  { id: "blood", name: "Blood Tests", icon: Droplets },
  { id: "heart", name: "Heart", icon: Heart },
  { id: "hormone", name: "Hormones", icon: Zap },
  { id: "imaging", name: "Imaging", icon: ScanLine },
  { id: "nutrition", name: "Nutrition", icon: Brain },
  { id: "bone", name: "Bone Health", icon: Bone },
];

const allTests = [
  { id: 1, name: "Complete Blood Count (CBC)", icon: Droplets, description: "Comprehensive blood analysis including RBC, WBC, hemoglobin, and platelets", price: 399, originalPrice: 599, tests: 24, category: "blood", popular: true },
  { id: 2, name: "Lipid Profile", icon: Activity, description: "Complete cholesterol and triglyceride levels assessment", price: 499, originalPrice: 799, tests: 8, category: "heart", popular: true },
  { id: 3, name: "Thyroid Panel (T3, T4, TSH)", icon: Zap, description: "Complete thyroid function evaluation", price: 599, originalPrice: 899, tests: 3, category: "hormone", popular: true },
  { id: 4, name: "Diabetes Panel", icon: Heart, description: "Fasting glucose, HbA1c, and insulin levels", price: 699, originalPrice: 999, tests: 5, category: "blood", popular: true },
  { id: 5, name: "Vitamin Profile", icon: Brain, description: "Vitamin D, B12, and essential nutrients analysis", price: 1299, originalPrice: 1999, tests: 12, category: "nutrition", popular: true },
  { id: 6, name: "Bone Health Panel", icon: Bone, description: "Calcium, phosphorus, and vitamin D levels", price: 899, originalPrice: 1299, tests: 6, category: "bone", popular: false },
  { id: 7, name: "Liver Function Test (LFT)", icon: Droplets, description: "Complete liver enzyme and bilirubin analysis", price: 549, originalPrice: 799, tests: 11, category: "blood", popular: true },
  { id: 8, name: "Kidney Function Test (KFT)", icon: Droplets, description: "Creatinine, urea, and uric acid levels", price: 499, originalPrice: 749, tests: 8, category: "blood", popular: false },
  { id: 9, name: "Iron Studies", icon: Droplets, description: "Serum iron, ferritin, and TIBC analysis", price: 699, originalPrice: 999, tests: 4, category: "blood", popular: false },
  { id: 10, name: "Cardiac Markers", icon: Heart, description: "Troponin, CK-MB, and BNP levels", price: 1499, originalPrice: 2199, tests: 6, category: "heart", popular: false },
  { id: 11, name: "MRI Brain", icon: ScanLine, description: "Detailed brain imaging for neurological evaluation", price: 5999, originalPrice: 8999, tests: 1, category: "imaging", popular: false },
  { id: 12, name: "CT Scan Chest", icon: ScanLine, description: "High-resolution chest imaging", price: 3999, originalPrice: 5999, tests: 1, category: "imaging", popular: false },
  { id: 13, name: "X-Ray Chest", icon: ScanLine, description: "Basic chest radiograph", price: 399, originalPrice: 599, tests: 1, category: "imaging", popular: true },
  { id: 14, name: "Ultrasound Abdomen", icon: ScanLine, description: "Complete abdominal organ imaging", price: 999, originalPrice: 1499, tests: 1, category: "imaging", popular: false },
  { id: 15, name: "Hormone Panel (Female)", icon: Zap, description: "FSH, LH, Estrogen, Progesterone", price: 1999, originalPrice: 2999, tests: 8, category: "hormone", popular: false },
  { id: 16, name: "Hormone Panel (Male)", icon: Zap, description: "Testosterone, FSH, LH analysis", price: 1799, originalPrice: 2699, tests: 6, category: "hormone", popular: false },
];

const sortOptions = [
  { id: "name-asc", label: "Name (A-Z)" },
  { id: "name-desc", label: "Name (Z-A)" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "popular", label: "Most Popular" },
];

const Tests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const filteredTests = allTests
    .filter((test) => {
      const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           test.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || test.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "popular":
          return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Diagnostic <span className="text-gradient">Tests</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-8">
              Browse our comprehensive range of diagnostic tests. All tests include free home sample collection.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tests Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredTests.length}</span> tests
              </p>
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="gap-2"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  {sortOptions.find(o => o.id === sortBy)?.label}
                  <ChevronDown className="w-4 h-4" />
                </Button>
                
                {showSortMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded-xl border border-border shadow-lg py-2 z-10 animate-fade-in">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          setSortBy(option.id);
                          setShowSortMenu(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                          sortBy === option.id ? "text-primary font-medium" : "text-foreground"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTests.map((test, index) => (
                <div
                  key={test.id}
                  className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 border border-border hover:border-primary/20 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
                      <test.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    {test.popular && (
                      <span className="text-xs font-medium text-warning bg-warning/10 px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {test.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {test.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span className="font-medium text-foreground">{test.tests}</span> parameters
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-xl font-bold text-foreground">₹{test.price}</span>
                      <span className="text-sm text-muted-foreground line-through ml-2">₹{test.originalPrice}</span>
                    </div>
                    <Link to={`/tests/${test.id}`}>
                      <Button size="sm">View</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredTests.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No tests found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Tests;
