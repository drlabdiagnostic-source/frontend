import { Search, CalendarCheck, Home, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & Select",
    description: "Browse our extensive catalog of tests and health packages. Choose what suits your needs.",
    step: "01",
  },
  {
    icon: CalendarCheck,
    title: "Book Appointment",
    description: "Select your preferred date, time slot, and address for sample collection.",
    step: "02",
  },
  {
    icon: Home,
    title: "Home Collection",
    description: "Our trained phlebotomist visits your home for safe and hygienic sample collection.",
    step: "03",
  },
  {
    icon: FileCheck,
    title: "Get Reports",
    description: "Receive accurate digital reports via email, WhatsApp, or download from your dashboard.",
    step: "04",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get your diagnostic tests done in 4 simple steps from the comfort of your home
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="bg-card rounded-2xl p-8 text-center relative z-10 border border-border hover:border-primary/20 hover:shadow-card transition-all duration-300 group">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    Step {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-hero flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
