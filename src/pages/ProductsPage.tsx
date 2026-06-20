import { Link } from 'react-router-dom';
import { ArrowRight, Filter, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const allProducts = [
  {
    name: 'Barbed Wire',
    slug: 'barbed-wire',
    image: '/Barbed-Wire-Muskan.png',
    shortDesc: 'High-tensile security fencing wire for perimeter protection',
    category: 'fencing',
    features: ['12G x 12G & 14G x 14G variants', 'High carbon steel core', 'Hot-dipped galvanized', 'Corrosion resistant'],
    applications: ['Border fencing', 'Farm protection', 'Industrial security', 'Military installations'],
  },
  {
    name: 'GI Wire',
    slug: 'gi-wire',
    image: '/muskan-wires-gi-wire.jpg',
    shortDesc: 'Premium galvanized steel wire for multiple applications',
    category: 'industrial',
    features: ['Commercial & Heavy coated variants', '80-100 g/m² zinc coating', 'Superior tensile strength', 'Extended lifespan'],
    applications: ['Agricultural fencing', 'Construction binding', 'Power transmission', 'Telecommunication lines'],
  },
  {
    name: 'Solar Fencing Wire',
    slug: 'solar-fencing-wire',
    image: '/solar-fencing-wire.jpg',
    shortDesc: 'Specialized wire for solar farm installations',
    category: 'solar',
    features: ['High conductivity copper core', 'UV resistant coating', 'Weatherproof design', 'Low maintenance'],
    applications: ['Solar farm perimeters', 'Solar panel security', 'Inverter installations', 'Grounding systems'],
  },
  {
    name: 'Binding Wire',
    slug: 'binding-wire',
    image: '/binding-wire-muskan.jpg',
    shortDesc: 'Essential construction wire for reinforcement binding',
    category: 'construction',
    features: ['Multiple gauge options', 'Easy to bend and tie', 'Strong grip', 'Rust resistant'],
    applications: ['Rebar binding', 'Construction sites', 'Concrete reinforcement', 'General tying applications'],
  },
  {
    name: 'Concertina Wire',
    slug: 'concertina-wire',
    image: '/concertinawire.jpg',
    shortDesc: 'Military-grade security wire for high-security perimeters',
    category: 'security',
    features: ['Sharp blade design', 'Highly effective deterrent', 'Quick deployment', 'Weather resistant'],
    applications: ['Military bases', 'Prison perimeters', 'Border security', 'High-security facilities'],
  },
];

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'fencing', name: 'Fencing Wire' },
  { id: 'industrial', name: 'Industrial Wire' },
  { id: 'solar', name: 'Solar Wire' },
  { id: 'construction', name: 'Construction Wire' },
  { id: 'security', name: 'Security Wire' },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredProducts = allProducts.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 bg-forge overflow-hidden">
        <div className="absolute inset-0 hex-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-barlow-condensed text-4xl lg:text-6xl font-extrabold text-white mb-6">
              Our Product Range
            </h1>
            <p className="text-xl text-galvanized leading-relaxed">
              Premium quality wire products manufactured to exact specifications. From agricultural fencing to industrial security, we have solutions for every requirement.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              <Filter className="w-5 h-5 text-steel flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-rust text-white'
                      : 'bg-gray-100 text-steel hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-steel">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 text-sm focus:border-rust focus:outline-none"
              >
                <option value="name">Name</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link key={product.slug} to={`/products/${product.slug}`} className="card group">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-rust text-white text-xs px-3 py-1 font-medium">
                      {product.category.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-barlow-condensed text-2xl font-bold text-forge mb-2 group-hover:text-rust transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-steel text-sm mb-4">{product.shortDesc}</p>

                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-forge uppercase mb-2">Key Features</h4>
                    <ul className="space-y-1">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-xs text-steel flex items-center gap-2">
                          <span className="w-1 h-1 bg-rust rounded-full flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-rust font-medium">View Details</span>
                    <ArrowRight className="w-5 h-5 text-rust group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Solutions */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-4">Need Custom Specifications?</h2>
            <p className="section-subheading">
              Our engineering team can develop wire products tailored to your exact requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-sm shadow-lg text-center">
              <div className="w-16 h-16 bg-rust/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📐</span>
              </div>
              <h3 className="font-bold text-forge mb-2">Custom Gauges</h3>
              <p className="text-steel text-sm">Specific wire thickness and dimensions manufactured to order</p>
            </div>
            <div className="bg-white p-8 rounded-sm shadow-lg text-center">
              <div className="w-16 h-16 bg-rust/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="font-bold text-forge mb-2">Custom Coating</h3>
              <p className="text-steel text-sm">Specialized zinc coating weights for specific environments</p>
            </div>
            <div className="bg-white p-8 rounded-sm shadow-lg text-center">
              <div className="w-16 h-16 bg-rust/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="font-bold text-forge mb-2">Bulk Orders</h3>
              <p className="text-steel text-sm">Competitive pricing for large quantity requirements</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/rfq" className="btn-primary">
              Request Custom Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
