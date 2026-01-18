import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield, Users, Award, Target, CheckCircle2 } from "lucide-react";

const stats = [
  { value: "10+", label: "Years of Excellence" },
  { value: "50K+", label: "Happy Patients" },
  { value: "500+", label: "Tests Available" },
  { value: "99%", label: "Accuracy Rate" },
];

const values = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "NABL accredited labs with stringent quality control measures ensuring accurate and reliable results every time.",
  },
  {
    icon: Users,
    title: "Patient-Centric Care",
    description: "We prioritize patient comfort and convenience with home sample collection and digital report delivery.",
  },
  {
    icon: Award,
    title: "Expert Team",
    description: "Our team of qualified pathologists and technicians brings decades of combined experience.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We continuously invest in cutting-edge diagnostic technology for precise and faster results.",
  },
];

const milestones = [
  { year: "2014", title: "Founded", description: "Started with a vision to make quality diagnostics accessible" },
  { year: "2016", title: "NABL Accreditation", description: "Achieved NABL certification for quality assurance" },
  { year: "2018", title: "Home Collection", description: "Launched free home sample collection service" },
  { year: "2020", title: "Digital Reports", description: "Introduced instant digital report delivery via WhatsApp" },
  { year: "2022", title: "100+ Centers", description: "Expanded to 100+ collection centers across the region" },
  { year: "2024", title: "AI Integration", description: "Implemented AI-powered diagnostic assistance" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-5" />
          <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="text-gradient">Dr. Diagnostic Lab</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                We're on a mission to make quality healthcare accessible to everyone. With state-of-the-art technology and a commitment to excellence, we deliver accurate diagnostic services right at your doorstep.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-2xl bg-card border border-border">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-card rounded-3xl p-8 md:p-12 border border-border animate-fade-in">
                <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mb-6 shadow-glow">
                  <Target className="w-7 h-7 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To provide accurate, affordable, and accessible diagnostic services that empower individuals to take control of their health. We strive to make quality healthcare available to every household through innovative technology and compassionate care.
                </p>
              </div>
              
              <div className="bg-card rounded-3xl p-8 md:p-12 border border-border animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center mb-6 shadow-lg">
                  <Award className="w-7 h-7 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To become the most trusted name in diagnostic healthcare, recognized for our unwavering commitment to quality, innovation, and patient satisfaction. We envision a future where preventive healthcare is a priority for every family.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Core <span className="text-gradient">Values</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do, from patient care to technological innovation
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-card transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl gradient-hero flex items-center justify-center mb-6 shadow-glow">
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-foreground text-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="text-primary">Journey</span>
              </h2>
              <p className="text-background/70 max-w-2xl mx-auto">
                From a small diagnostic center to a trusted healthcare partner for thousands
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 -translate-x-1/2" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex items-center gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } animate-fade-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary -translate-x-1/2 z-10" />
                    
                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="bg-background/5 rounded-2xl p-6 border border-background/10">
                        <span className="text-primary font-bold text-lg">{milestone.year}</span>
                        <h3 className="text-xl font-semibold mt-1 mb-2">{milestone.title}</h3>
                        <p className="text-background/60 text-sm">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Certifications & Accreditations</h2>
              <p className="text-muted-foreground">Recognized for our commitment to quality and excellence</p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {["NABL Accredited", "ISO 9001:2015", "CAP Certified", "ICMR Approved"].map((cert, index) => (
                <div
                  key={cert}
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-card border border-border animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle2 className="w-6 h-6 text-success" />
                  <span className="font-semibold">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Labs */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our <span className="text-gradient">Partner Labs</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We've partnered with India's leading diagnostic centers to bring you the best prices and services
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "HealthPlus Labs", logo: "🏥", tests: "500+", locations: "50+ Cities", discount: "Up to 40% off" },
                { name: "MedLife Diagnostics", logo: "🔬", tests: "400+", locations: "30+ Cities", discount: "Up to 35% off" },
                { name: "Apollo Diagnostics", logo: "🏨", tests: "600+", locations: "100+ Cities", discount: "Up to 30% off" },
                { name: "Dr. Lal PathLabs", logo: "🧪", tests: "700+", locations: "200+ Cities", discount: "Up to 25% off" },
                { name: "Thyrocare", logo: "💉", tests: "300+", locations: "All India", discount: "Up to 45% off" },
                { name: "Metropolis Labs", logo: "🔭", tests: "450+", locations: "80+ Cities", discount: "Up to 30% off" },
                { name: "SRL Diagnostics", logo: "🩺", tests: "550+", locations: "70+ Cities", discount: "Up to 35% off" },
                { name: "Redcliffe Labs", logo: "❤️", tests: "350+", locations: "40+ Cities", discount: "Up to 50% off" },
              ].map((partner, index) => (
                <div
                  key={partner.name}
                  className="bg-card rounded-2xl p-6 border border-border hover:border-primary/20 hover:shadow-card transition-all duration-300 animate-fade-in text-center"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center text-3xl mb-4">
                    {partner.logo}
                  </div>
                  <h3 className="font-semibold mb-2">{partner.name}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground mb-3">
                    <p>{partner.tests} Tests</p>
                    <p>{partner.locations}</p>
                  </div>
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-success/10 text-success rounded-full">
                    {partner.discount}
                  </span>
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

export default About;
