import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* About Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-foreground">Casa Flora</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A century-old heritage home in Boquete, Panama. Four generations of family stewardship, five botanical bedrooms, endless memories.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/heritage" className="text-muted-foreground hover:text-foreground transition-colors">
                  Heritage Story
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-muted-foreground hover:text-foreground transition-colors">
                  House Rules
                </Link>
              </li>
              <li>
                <a href="#booking" className="text-muted-foreground hover:text-foreground transition-colors">
                  Book Now
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-foreground">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-casa-blue-medium" />
                <span>Boquete, Panama</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Phone size={16} className="flex-shrink-0 text-casa-blue-medium" />
                <a href="tel:+50765556789">+507 6555-6789</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail size={16} className="flex-shrink-0 text-casa-blue-medium" />
                <a href="mailto:info@casaflorapanama.com">info@casaflorapanama.com</a>
              </li>
            </ul>
          </div>

          {/* Social & Hours Column */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-foreground">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/casaflorapanama"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-casa-blue-medium transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/casaflorapanama"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-hydrangea-deep transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
            <div className="pt-4">
              <p className="text-xs text-muted-foreground">
                Check-in: 3:00 PM<br />
                Check-out: 11:00 AM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} Casa Flora. All rights reserved. Four generations of stewardship (1920-{currentYear}).
            </p>
            <div className="flex gap-6">
              <Link href="/rules" className="hover:text-foreground transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/rules" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
