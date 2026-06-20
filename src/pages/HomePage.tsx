import { Link } from 'react-router-dom';
import {
  Shield,
  Sun,
  Factory,
  Award,
  Truck,
  Users,
  ArrowRight,
  CheckCircle,
  Phone,
  ChevronRight,
  TrendingUp,
  Zap,
  Leaf,
  Building2,
} from 'lucide-react';

const products = [
  {
    name: 'Barbed Wire',
    href: '/products/barbed-wire',
    image: '/Barbed-Wire-Muskan.png',
    desc: 'High-tensile security fencing wire',
    specs: '12G x 12G, 14G x 14G',
  },
  {
    name: 'GI Wire',
    href: '/products/gi-wire',
    image: '/muskan-wires-gi-wire.jpg',
    desc: 'Galvanized steel wire',
    specs: '80-100 g/m² coating',
  },
  {
    name: 'Solar Fencing Wire',
    href: '/products/solar-fencing-wire',
    image: '/solar-fencing-wire.jpg',
    desc: 'Solar installation wiring',
    specs: 'High conductivity copper',
  },
  {
    name: 'Binding Wire',
    href: '/products/binding-wire',
    image: '/binding-wire-muskan.jpg',
    desc: 'Construction binding wire',
    specs: 'Multiple gauges available',
  },
  {
    name: 'Concertina Wire',
    href: '/products/concertina-wire',
    image: '/concertinawire%20copy.jpg',
    desc: 'Military-grade security wire',
    specs: 'Sharp blade design',
  },
];

const industries = [
  { name: 'Agriculture', icon: Leaf, desc: 'Farm fencing & agricultural solutions' },
  { name: 'Security', icon: Shield, desc: 'Perimeter security systems' },
  { name: 'Solar', icon: Sun, desc: 'Solar farm installations' },
  { name: 'Infrastructure', icon: Building2, desc: 'Government projects' },
];

const stats = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '50+', label: 'Dealers Nationwide' },
  { value: '1000+', label: 'Tons Monthly Production' },
  { value: '99%', label: 'Customer Satisfaction' },
];

const whyChooseUs = [
  { icon: Factory, title: 'Manufacturing Excellence', desc: 'State-of-the-art facility in Urla Industrial Area' },
  { icon: Award, title: 'Quality Assured', desc: 'Stringent quality control at every stage' },
  { icon: Truck, title: 'Pan-India Delivery', desc: 'Efficient logistics network across India' },
  { icon: Users, title: 'Expert Support', desc: 'Technical assistance from industry experts' },
];

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-forge overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 hex-pattern opacity-30" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-forge via-forge/95 to-transparent" />

        {/* Hero image */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <img
            src="/muskan-wires-gi-wire.jpg"
            alt="Wire Manufacturing"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-rust/20 text-rust px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Established 2025 - Raipur, Chhattisgarh
            </div>

            <h1 className="font-barlow-condensed text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              India's Premier
              <span className="text-rust block">Wire Manufacturer</span>
            </h1>

            <p className="text-xl text-galvanized leading-relaxed mb-8 max-w-2xl">
              Engineering quality wire solutions for agriculture, security fencing, solar projects, and infrastructure development. From our manufacturing hub in Urla Industrial Area, serving customers across India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/rfq" className="btn-primary text-lg px-8 py-4">
                Request Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/products" className="btn-secondary border-white text-white hover:bg-white hover:text-forge text-lg px-8 py-4">
                Explore Products
              </Link>
            </div>

            {/* Quick contact */}
            <div className="flex items-center gap-6 text-galvanized">
              <a href="tel:+919589707622" className="flex items-center gap-2 hover:text-rust transition-colors">
                <Phone className="w-5 h-5" />
                +91 95897 07622
              </a>
              <span className="text-steel">|</span>
              <span>Response within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-rust">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/20">
              {stats.map((stat, idx) => (
                <div key={idx} className="py-6 px-4 lg:px-8 text-center">
                  <div className="font-barlow-condensed text-3xl lg:text-4xl font-extrabold text-white">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">Our Product Range</h2>
            <p className="section-subheading">
              Premium quality wire products manufactured to exact specifications for diverse industrial applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link key={product.name} to={product.href} className="card group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-barlow-condensed text-xl font-bold text-forge mb-2 group-hover:text-rust transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-steel text-sm mb-3">{product.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-rust font-medium bg-rust/10 px-3 py-1 rounded">
                      {product.specs}
                    </span>
                    <ChevronRight className="w-5 h-5 text-rust group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="btn-secondary">
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-white hex-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-heading mb-6">Why Choose Muskan Wires?</h2>
              <p className="text-steel text-lg mb-8 leading-relaxed">
                Located in the heart of Urla Industrial Area, Raipur, we combine modern manufacturing technology with decades of industry expertise to deliver wire products that exceed expectations.
              </p>

              <div className="grid gap-6">
                {whyChooseUs.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-rust/10 rounded flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-rust" />
                    </div>
                    <div>
                      <h4 className="font-bold text-forge mb-1">{item.title}</h4>
                      <p className="text-steel text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <img
                src="https://images.pexels.com/photos/2161468/pexels-photo-2161468.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Manufacturing Facility"
                className="rounded-sm shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 lg:py-28 bg-forge">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading text-white mb-4">Industries We Serve</h2>
            <p className="section-subheading text-galvanized">
              Tailored wire solutions for diverse industrial sectors
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry) => (
              <Link
                key={industry.name}
                to="/industries"
                className="bg-steel/30 p-8 rounded-sm hover:bg-steel/50 transition-colors group text-center"
              >
                <industry.icon className="w-12 h-12 text-rust mx-auto mb-4" />
                <h3 className="font-barlow-condensed text-xl font-bold text-white mb-2">
                  {industry.name}
                </h3>
                <p className="text-galvanized text-sm">{industry.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-rust rounded-sm overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 lg:p-16">
                <h2 className="font-barlow-condensed text-4xl lg:text-5xl font-extrabold text-white mb-6">
                  Start Your Project Today
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  Whether you need bulk orders, custom specifications, or technical guidance, our team is ready to assist you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/rfq" className="bg-white text-rust px-8 py-4 font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2">
                    Request Quote
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link to="/dealer-program" className="border-2 border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-rust transition-colors inline-flex items-center justify-center">
                    Become a Dealer
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/10-Gauge-Gi-Wire.jpg"
                  alt="Muskan Wires GI Wire Products"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Inquiry Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="section-heading mb-6">Quick Inquiry</h2>
              <p className="text-steel mb-8">
                Fill out the form and our team will get back to you within 24 hours with a detailed quote for your requirements.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-rust flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-forge">Bulk Order Discounts</h4>
                    <p className="text-steel text-sm">Competitive pricing for large orders</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-rust flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-forge">Custom Specifications</h4>
                    <p className="text-steel text-sm">Tailored to your exact requirements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-rust flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-forge">Technical Support</h4>
                    <p className="text-steel text-sm">Expert guidance for your project</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-sm">
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-forge mb-1">Name *</label>
                    <input type="text" className="input-field" placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forge mb-1">Phone *</label>
                    <input type="tel" className="input-field" placeholder="+91 XXXXX XXXXX" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-forge mb-1">Email</label>
                  <input type="email" className="input-field" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forge mb-1">Product Required *</label>
                  <select className="input-field" required>
                    <option value="">Select product</option>
                    <option value="barbed-wire">Barbed Wire</option>
                    <option value="gi-wire">GI Wire</option>
                    <option value="solar-wire">Solar Fencing Wire</option>
                    <option value="binding-wire">Binding Wire</option>
                    <option value="concertina-wire">Concertina Wire</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-forge mb-1">Quantity (Tons)</label>
                  <input type="text" className="input-field" placeholder="e.g., 5 tons" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forge mb-1">Additional Details</label>
                  <textarea className="input-field" rows={3} placeholder="Project details, specifications, timeline..." />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
