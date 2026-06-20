import { Link } from 'react-router-dom';
import {
  Leaf,
  Shield,
  Sun,
  Building2,
  Factory,
  CheckCircle,
  ArrowRight,
  Phone,
} from 'lucide-react';

const industries = [
  {
    icon: Leaf,
    name: 'Agriculture',
    image: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Comprehensive wire solutions for agricultural fencing, livestock management, and farm protection. Our barbed wire and GI wire products are trusted by farmers across Chhattisgarh and central India.',
    applications: [
      'Farm perimeter fencing',
      'Livestock enclosures',
      'Crop protection barriers',
      'Agricultural trellising',
      'Orchard protection',
    ],
    products: ['Barbed Wire', 'GI Wire', 'Binding Wire'],
    stats: 'Serving 200+ farms across Chhattisgarh',
  },
  {
    icon: Shield,
    name: 'Security Fencing',
    image: '/Barbed-Wire-Muskan.png',
    description: 'High-security wire products for perimeter protection, military installations, border security, and critical infrastructure. Our concertina wire and barbed wire provide effective deterrence.',
    applications: [
      'Border security installations',
      'Military base perimeters',
      'Prison and correctional facilities',
      'Industrial facility security',
      'Government building protection',
    ],
    products: ['Barbed Wire', 'Concertina Wire', 'GI Wire'],
    stats: 'Trusted by security agencies nationwide',
  },
  {
    icon: Sun,
    name: 'Solar Projects',
    image: '/solar-fencing-wire.jpg',
    description: 'Specialized wire solutions for solar farm installations, including perimeter security fencing and solar infrastructure wiring. Our solar fencing wire is designed for outdoor durability.',
    applications: [
      'Solar farm perimeter fencing',
      'Ground-mounted solar installations',
      'Rooftop solar systems',
      'Solar panel cabling',
      'Grounding and earthing systems',
    ],
    products: ['Solar Fencing Wire', 'GI Wire', 'Binding Wire'],
    stats: 'Partner with 15+ solar developers',
  },
  {
    icon: Building2,
    name: 'Infrastructure',
    image: '/10-Gauge-Gi-Wire.jpg',
    description: 'Wire products for government infrastructure projects, highway fencing, railway protection, and public works. Meeting the rigorous standards demanded by infrastructure development.',
    applications: [
      'Highway median fencing',
      'Railway track protection',
      'Bridge and tunnel security',
      'Government building perimeters',
      'Public park boundaries',
    ],
    products: ['Barbed Wire', 'GI Wire', 'Binding Wire'],
    stats: 'Supplied 50+ government projects',
  },
  {
    icon: Factory,
    name: 'Industrial Applications',
    image: 'https://images.pexels.com/photos/2161468/pexels-photo-2161468.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Industrial-grade wire products for manufacturing facilities, warehouses, construction sites, and industrial complexes. Durable solutions built for demanding environments.',
    applications: [
      'Industrial facility fencing',
      'Warehouse security',
      'Construction site perimeters',
      'Manufacturing plant boundaries',
      'Loading dock protection',
    ],
    products: ['GI Wire', 'Binding Wire', 'Barbed Wire'],
    stats: 'Partner with 100+ industrial clients',
  },
];

export default function IndustriesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 bg-forge overflow-hidden">
        <div className="absolute inset-0 hex-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-barlow-condensed text-4xl lg:text-6xl font-extrabold text-white mb-6">
              Industries We Serve
            </h1>
            <p className="text-xl text-galvanized leading-relaxed">
              Tailored wire solutions for diverse industrial sectors. From agricultural fencing to solar installations, we understand the unique demands of each industry we serve.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Cards */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-24">
            {industries.map((industry, idx) => (
              <div
                key={industry.name}
                id={industry.name.toLowerCase().replace(/\s+/g, '-')}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-rust/10 rounded flex items-center justify-center">
                      <industry.icon className="w-6 h-6 text-rust" />
                    </div>
                    <h2 className="font-barlow-condensed text-3xl lg:text-4xl font-bold text-forge">
                      {industry.name}
                    </h2>
                  </div>

                  <p className="text-steel leading-relaxed mb-6">{industry.description}</p>

                  <div className="bg-rust/5 border-l-4 border-rust p-4 rounded-r mb-6">
                    <p className="text-forge font-medium">{industry.stats}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-forge mb-3">Key Applications</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {industry.applications.map((app, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-steel">
                          <CheckCircle className="w-4 h-4 text-rust flex-shrink-0 mt-0.5" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-forge mb-3">Recommended Products</h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.products.map((product) => (
                        <Link
                          key={product}
                          to={`/products/${product.toLowerCase().replace(/\s+/g, '-')}`}
                          className="bg-gray-100 text-forge px-3 py-1 text-sm hover:bg-rust hover:text-white transition-colors rounded"
                        >
                          {product}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link to="/rfq" className="btn-primary inline-flex">
                    Get Industry Quote
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                <div className={idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-64 lg:h-96 object-cover rounded-sm shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Expertise */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-4">Industry Expertise</h2>
            <p className="section-subheading">
              Our team understands the specific requirements of each industry sector
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-sm shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold text-forge text-lg mb-2">Technical Consultation</h3>
              <p className="text-steel text-sm">
                Our experts help you choose the right wire products for your specific industry application, considering environmental factors and budget requirements.
              </p>
            </div>
            <div className="bg-white p-8 rounded-sm shadow-lg">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="font-bold text-forge text-lg mb-2">Project Planning</h3>
              <p className="text-steel text-sm">
                We assist with quantity estimation, delivery scheduling, and logistics planning for large-scale projects across all industry sectors.
              </p>
            </div>
            <div className="bg-white p-8 rounded-sm shadow-lg">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="font-bold text-forge text-lg mb-2">Installation Support</h3>
              <p className="text-steel text-sm">
                Technical guidance for proper installation techniques, ensuring optimal performance and longevity of wire products in the field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-rust">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-barlow-condensed text-4xl font-extrabold text-white mb-4">
            Discuss Your Industry Requirements
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Our industry specialists are ready to provide tailored solutions for your specific sector
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/rfq" className="bg-white text-rust px-8 py-4 font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2">
              Request Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+919589707622" className="border-2 border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-rust transition-colors inline-flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
