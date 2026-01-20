import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {/* Brand */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={logo} 
                alt="Doctor Diagnostic Lab" 
                className="h-14 md:h-16 w-auto object-contain bg-white rounded-lg p-1"
              />
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Your trusted partner for diagnostic services. Quality testing with home sample collection and fast results.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Tests", "Packages", "About Us", "Contact", "Book Now"].map((link) => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase().replace(" ", "-")}`} className="text-background/70 hover:text-primary transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tests */}
          <div>
            <h4 className="font-semibold mb-4">Popular Tests</h4>
            <ul className="space-y-3">
              {["Complete Blood Count", "Lipid Profile", "Thyroid Panel", "Diabetes Panel", "Vitamin Profile"].map((test) => (
                <li key={test}>
                  <Link to="/tests" className="text-background/70 hover:text-primary transition-colors text-sm">
                    {test}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">Ghaziabad, Uttar Pradesh - 201009</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+919365990256" className="text-background/70 hover:text-primary transition-colors text-sm">+91 9365990256</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:drlabdiagnostic@gmail.com" className="text-background/70 hover:text-primary transition-colors text-sm">drlabdiagnostic@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © 2024 Dr. Diagnostic Lab. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-background/50 hover:text-background text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-background/50 hover:text-background text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
