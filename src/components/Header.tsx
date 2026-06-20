import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  {
    name: 'Products',
    href: '/products',
    children: [
      { name: 'Barbed Wire', href: '/products/barbed-wire' },
      { name: 'GI Wire', href: '/products/gi-wire' },
      { name: 'Solar Fencing Wire', href: '/products/solar-fencing-wire' },
      { name: 'Binding Wire', href: '/products/binding-wire' },
      { name: 'Concertina Wire', href: '/products/concertina-wire' },
    ],
  },
  { name: 'Industries', href: '/industries' },
  { name: 'Dealer Program', href: '/dealer-program' },
  { name: 'RFQ Center', href: '/rfq' },
  { name: 'Resources', href: '/resources' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-forge shadow-lg' : 'bg-forge/95 backdrop-blur-sm'
      }`}
    >
      {/* Top bar */}
      <div className="hidden lg:block bg-forge border-b border-steel/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-sm text-galvanized">
            <div className="flex items-center gap-6">
              <a href="tel:+919589707622" className="flex items-center gap-2 hover:text-rust transition-colors">
                <Phone className="w-4 h-4" />
                +91 95897 07622
              </a>
              <a href="mailto:info@muskanwires.com" className="flex items-center gap-2 hover:text-rust transition-colors">
                <Mail className="w-4 h-4" />
                info@muskanwires.com
              </a>
            </div>
            <div className="text-steel-light">Urla Industrial Area, Raipur, Chhattisgarh</div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rust rounded flex items-center justify-center">
              <span className="text-white font-barlow-condensed font-extrabold text-xl">MW</span>
            </div>
            <div className="flex flex-col">
              <span className="font-barlow-condensed font-extrabold text-xl lg:text-2xl text-white tracking-wide">
                MUSKAN WIRES
              </span>
              <span className="text-xs text-galvanized tracking-widest uppercase">Quality Engineered</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${
                    location.pathname.startsWith(item.href)
                      ? 'text-rust'
                      : 'text-white hover:text-rust'
                  }`}
                >
                  {item.name}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </Link>
                {item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-sm overflow-hidden mt-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className="block px-4 py-3 text-sm text-forge hover:bg-rust hover:text-white transition-colors border-b border-gray-100 last:border-0"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/rfq" className="btn-primary ml-4">
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-forge border-t border-steel/20">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className={`block px-4 py-3 text-base font-medium rounded-sm ${
                    location.pathname === item.href
                      ? 'bg-rust text-white'
                      : 'text-white hover:bg-steel'
                  }`}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className="block px-4 py-2 text-sm text-galvanized hover:text-rust"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/rfq" className="btn-primary w-full text-center mt-4">
              Get Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
