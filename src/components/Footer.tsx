import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-forge text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-rust rounded flex items-center justify-center">
                <span className="text-white font-barlow-condensed font-extrabold text-2xl">MW</span>
              </div>
              <div>
                <span className="font-barlow-condensed font-extrabold text-2xl tracking-wide block">MUSKAN WIRES</span>
                <span className="text-xs text-galvanized tracking-widest uppercase">Quality Engineered</span>
              </div>
            </div>
            <p className="text-steel-light leading-relaxed mb-6">
              Leading manufacturer of premium quality wire products serving agriculture, security, infrastructure, and solar industries across India since 2025.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=61591041660817" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-steel rounded flex items-center justify-center hover:bg-rust transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com/MuskanWire" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-steel rounded flex items-center justify-center hover:bg-rust transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/muskan-wires-6772b5418/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-steel rounded flex items-center justify-center hover:bg-rust transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@MuskanWires" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-steel rounded flex items-center justify-center hover:bg-rust transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-barlow-condensed font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-steel-light hover:text-rust transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-steel-light hover:text-rust transition-colors">Products</Link></li>
              <li><Link to="/industries" className="text-steel-light hover:text-rust transition-colors">Industries Served</Link></li>
              <li><Link to="/dealer-program" className="text-steel-light hover:text-rust transition-colors">Dealer Program</Link></li>
              <li><Link to="/rfq" className="text-steel-light hover:text-rust transition-colors">Request Quote</Link></li>
              <li><Link to="/resources" className="text-steel-light hover:text-rust transition-colors">Resources</Link></li>
              <li><Link to="/contact" className="text-steel-light hover:text-rust transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-barlow-condensed font-bold text-lg mb-6">Our Products</h4>
            <ul className="space-y-3">
              <li><Link to="/products/barbed-wire" className="text-steel-light hover:text-rust transition-colors">Barbed Wire</Link></li>
              <li><Link to="/products/gi-wire" className="text-steel-light hover:text-rust transition-colors">GI Wire</Link></li>
              <li><Link to="/products/solar-fencing-wire" className="text-steel-light hover:text-rust transition-colors">Solar Fencing Wire</Link></li>
              <li><Link to="/products/binding-wire" className="text-steel-light hover:text-rust transition-colors">Binding Wire</Link></li>
              <li><Link to="/products/concertina-wire" className="text-steel-light hover:text-rust transition-colors">Concertina Wire</Link></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-barlow-condensed font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rust flex-shrink-0 mt-0.5" />
                <span className="text-steel-light">
                  1st  Floor, Sinha Complex, (Karar Exports Pvt. Ltd.)<br />
                  Atari Road, Tatibandh,<br />
                  Raipur - Chhattisgarh<br />
                  492099
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-rust flex-shrink-0" />
                <a href="tel:+919589707622" className="text-steel-light hover:text-rust transition-colors">
                  +91 95897 07622
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-rust flex-shrink-0" />
                <a href="mailto:info@muskanwires.com" className="text-steel-light hover:text-rust transition-colors">
                  info@muskanwires.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-rust flex-shrink-0 mt-0.5" />
                <span className="text-steel-light">
                  Mon - Sat: 9:00 AM - 6:00 PM<br />
                  Sunday: Closed
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-steel/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-barlow-condensed font-bold text-lg">Subscribe for Market Updates</h4>
              <p className="text-steel-light text-sm">Get weekly wire market trends and price updates.</p>
            </div>
            <form className="flex gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-64 px-4 py-3 bg-steel/30 border border-steel rounded-sm text-white placeholder:text-galvanized focus:border-rust focus:outline-none"
              />
              <button type="submit" className="btn-primary">
                <Send className="w-5 h-5" />
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-steel/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-steel-light">
            <p>&copy; 2025 Muskan Wires. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/documents/Muskan_Wires_Privacy_Policy.docx" target="_blank" rel="noopener noreferrer" className="hover:text-rust transition-colors">Privacy Policy</a>
              <a href="/documents/Muskan_Wires_Terms_of_Service.docx" target="_blank" rel="noopener noreferrer" className="hover:text-rust transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
