import { Shield, Clock, Award, HeartHandshake, Truck, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "NABL Accredited",
    description: "All our partner labs are NABL certified ensuring highest quality standards",
  },
  {
    icon: Clock,
    title: "Quick Results",
    description: "Get your test reports within 24-48 hours delivered digitally",
  },
  {
    icon: Truck,
    title: "Free Home Collection",
    description: "Our trained phlebotomists collect samples from your doorstep for free",
  },
  {
    icon: Award,
    title: "Expert Team",
    description: "Experienced technicians and pathologists ensure accurate results",
  },
  {
    icon: HeartHandshake,
    title: "Affordable Pricing",
    description: "Competitive prices with regular discounts and package offers",
  },
  {
    icon: BadgeCheck,
    title: "100% Secure",
    description: "Your health data is encrypted and securely stored",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-foreground text-background overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-primary">Dr. Diagnostic Lab</span>
          </h2>
          <p className="text-background/70 max-w-2xl mx-auto">
            We're committed to providing the best diagnostic services with accuracy, affordability, and convenience
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-background/5 border border-background/10 hover:bg-background/10 hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-glow">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-background/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-background/10">
          {[
            { value: "50K+", label: "Happy Patients" },
            { value: "500+", label: "Tests Available" },
            { value: "100+", label: "Collection Centers" },
            { value: "99%", label: "Accuracy Rate" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-background/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
