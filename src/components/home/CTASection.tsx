import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-16">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl">
              Book your diagnostic tests today and get accurate results from the comfort of your home. Our team of experts is ready to serve you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/tests">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                  Book Your Test
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:+919365990256">
                <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                  <Phone className="w-5 h-5" />
                  Call Us: +91 9365990256
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
