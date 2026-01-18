import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Shield, Clock, Home } from "lucide-react";
import { useState } from "react";

const features = [
  { icon: Home, text: "Home Sample Collection" },
  { icon: Clock, text: "Reports in 24 Hours" },
  { icon: Shield, text: "NABL Accredited Labs" },
];

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero opacity-5" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium animate-fade-in">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Trusted by 50,000+ Patients
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Your Health, Our{" "}
              <span className="text-gradient">Priority</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Book diagnostic tests from the comfort of your home. Get accurate results from NABL accredited labs with free home sample collection.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for tests, packages, or health checkups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-2xl border border-border bg-card shadow-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <Link to={`/tests?q=${searchQuery}`}>
                <Button className="absolute right-2 top-1/2 -translate-y-1/2" size="sm">
                  Search
                </Button>
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Link to="/tests">
                <Button variant="hero" size="xl">
                  Book a Test
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/packages">
                <Button variant="outline" size="xl">
                  View Packages
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 pt-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              {features.map((feature) => (
                <div key={feature.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <feature.icon className="w-5 h-5 text-primary" />
                  {feature.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full gradient-hero opacity-20 animate-pulse-slow" />
              <div className="absolute inset-8 rounded-full bg-card shadow-elevated" />
              
              {/* Stats Cards */}
              <div className="absolute -left-4 top-1/4 bg-card rounded-2xl p-4 shadow-elevated animate-float">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Tests Available</div>
              </div>
              
              <div className="absolute -right-4 top-1/2 bg-card rounded-2xl p-4 shadow-elevated animate-float" style={{ animationDelay: "1s" }}>
                <div className="text-2xl font-bold text-success">99%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              
              <div className="absolute left-1/4 -bottom-4 bg-card rounded-2xl p-4 shadow-elevated animate-float" style={{ animationDelay: "2s" }}>
                <div className="text-2xl font-bold text-accent">24hr</div>
                <div className="text-sm text-muted-foreground">Fast Results</div>
              </div>

              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full gradient-hero flex items-center justify-center shadow-glow">
                  <svg className="w-16 h-16 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
