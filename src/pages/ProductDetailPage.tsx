import { Link, useParams, Navigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  Package,
  Shield,
  Award,
  Truck,
  Factory,
} from 'lucide-react';

const productsData: Record<string, {
  name: string;
  tagline: string;
  heroImage: string;
  overview: string;
  specifications: { label: string; value: string }[];
  features: string[];
  applications: string[];
  benefits: string[];
  relatedProducts: string[];
}> = {
  'barbed-wire': {
    name: 'Barbed Wire',
    tagline: 'High-Security Perimeter Protection',
    heroImage: '/Barbed-Wire-Muskan.png',
    overview: 'Our premium quality barbed wire is manufactured from high-carbon steel with sharp, evenly-spaced barbs for effective perimeter security. Ideal for agricultural fencing, industrial security, and border protection applications.',
    specifications: [
      { label: 'Wire Gauge', value: '12G x 12G, 14G x 14G' },
      { label: 'Barb Spacing', value: '75mm - 150mm (customizable)' },
      { label: 'Material', value: 'High Carbon Steel' },
      { label: 'Coating', value: 'Hot-dipped Galvanized' },
      { label: 'Zinc Coating', value: '80-100 g/m²' },
      { label: 'Tensile Strength', value: '550-650 N/mm²' },
      { label: 'Standard Length', value: '100m rolls' },
      { label: 'Packaging', value: 'Coiled & Wrapped' },
    ],
    features: [
      'High-tensile steel core for maximum strength',
      'Uniformly spaced sharp barbs',
      'Hot-dipped galvanization for corrosion resistance',
      'Available in multiple gauge combinations',
      'Custom barb spacing available',
      'Quick and easy installation',
      'Long service life even in harsh conditions',
    ],
    applications: [
      'Agricultural fencing and livestock control',
      'Border security installations',
      'Industrial facility perimeters',
      'Military and defense installations',
      'Railway track protection',
      'Government building security',
      'Wildlife sanctuary boundaries',
    ],
    benefits: [
      'Cost-effective security solution',
      'Deters intrusion and unauthorized access',
      'Low maintenance requirements',
      'Weather and corrosion resistant',
      'Suitable for all terrains',
    ],
    relatedProducts: ['gi-wire', 'concertina-wire'],
  },
  'gi-wire': {
    name: 'GI Wire',
    tagline: 'Premium Galvanized Steel Wire',
    heroImage: '/muskan-wires-gi-wire.jpg',
    overview: 'Our galvanized iron (GI) wire is manufactured using the latest hot-dip galvanizing technology, ensuring superior zinc coating adhesion and extended service life. Available in both commercial and heavy-coated variants to suit diverse applications.',
    specifications: [
      { label: 'Wire Gauge', value: '8G to 20G' },
      { label: 'Coating Types', value: 'Commercial (60 g/m²) & Heavy (80-100 g/m²)' },
      { label: 'Material', value: 'Low Carbon Steel' },
      { label: 'Coating Process', value: 'Hot-dip Galvanizing' },
      { label: 'Tensile Strength', value: '350-550 N/mm²' },
      { label: 'Standard Length', value: '50kg/100kg coils' },
      { label: 'Packaging', value: 'Wrapped & Bundled' },
      { label: 'Finish', value: 'Bright / Spangle' },
    ],
    features: [
      'Uniform zinc coating for maximum protection',
      'Excellent corrosion resistance',
      'Superior tensile strength',
      'Smooth surface finish',
      'Easy to work with and bend',
      'Available in multiple gauges',
      'Both commercial and heavy coating options',
    ],
    applications: [
      'Agricultural fencing and trellising',
      'Construction binding applications',
      'Power transmission lines',
      'Telecommunication cables',
      'Chain link fencing',
      'Wire mesh manufacturing',
      'General purpose binding',
    ],
    benefits: [
      'Versatile applications across industries',
      'Long-lasting protection against rust',
      'Cost-effective solution',
      'Available in bulk quantities',
      'Consistent quality assured',
    ],
    relatedProducts: ['barbed-wire', 'binding-wire'],
  },
  'solar-fencing-wire': {
    name: 'Solar Fencing Wire',
    tagline: 'Specialized Wire for Solar Installations',
    heroImage: '/solar-fencing-wire.jpg',
    overview: 'Purpose-built for solar farm installations and solar infrastructure projects, our solar fencing wire combines high conductivity with durability. Designed to meet the unique requirements of solar installations across India.',
    specifications: [
      { label: 'Conductor Material', value: 'High-conductivity Copper/Aluminum' },
      { label: 'Insulation', value: 'UV-resistant PVC/XLPE' },
      { label: 'Wire Gauge', value: '6mm² to 16mm²' },
      { label: 'Temperature Range', value: '-40°C to +85°C' },
      { label: 'Voltage Rating', value: '600V/1000V' },
      { label: 'Fire Rating', value: 'Flame retardant' },
      { label: 'UV Protection', value: 'Yes' },
      { label: 'Weatherproof', value: 'Yes' },
    ],
    features: [
      'High electrical conductivity',
      'Weather and UV resistant insulation',
      'Optimized for outdoor installations',
      'Low maintenance requirements',
      'Flexible and easy to install',
      'Temperature resistant',
      'Flame retardant outer sheath',
    ],
    applications: [
      'Solar farm perimeter security',
      'Ground-mounted solar installations',
      'Rooftop solar systems',
      'Grounding and earthing systems',
      'Inverter connections',
      'Solar panel cabling',
      'Battery storage systems',
    ],
    benefits: [
      'Specifically designed for solar projects',
      'Long service life in outdoor conditions',
      'Meets solar industry standards',
      'Reduces maintenance costs',
      'Expert technical support available',
    ],
    relatedProducts: ['gi-wire', 'barbed-wire'],
  },
  'binding-wire': {
    name: 'Binding Wire',
    tagline: 'Essential Construction Binding Wire',
    heroImage: '/binding-wire-muskan.jpg',
    overview: 'Our binding wire is an essential material for construction sites, designed for easy tying and exceptional grip. Manufactured for reliability and convenience in reinforcement binding applications.',
    specifications: [
      { label: 'Wire Gauge', value: '16G to 22G' },
      { label: 'Material', value: 'Low Carbon Steel' },
      { label: 'Coating', value: 'Black Annealed / GI' },
      { label: 'Tensile Strength', value: '300-500 N/mm²' },
      { label: 'Coil Weight', value: '25kg / 50kg' },
      { label: 'Softness', value: 'Fully Annealed' },
      { label: 'Elongation', value: 'Min 15%' },
      { label: 'Packaging', value: 'Coiled & Wrapped' },
    ],
    features: [
      'Soft annealed for easy twisting',
      'Excellent grip and hold',
      'Rust resistant options available',
      'Consistent quality across batches',
      'Multiple gauge options',
      'Easy to cut and shape',
      'Strong and durable',
    ],
    applications: [
      'Reinforcement bar binding',
      'Concrete construction',
      'Structural steel binding',
      'General tying applications',
      'Packing and bundling',
      'Handicraft manufacturing',
      'Industrial packaging',
    ],
    benefits: [
      'Increases construction efficiency',
      'Reduces worker fatigue',
      'Reliable performance',
      'Available in bulk quantities',
      'Competitive pricing',
    ],
    relatedProducts: ['gi-wire', 'barbed-wire'],
  },
  'concertina-wire': {
    name: 'Concertina Wire',
    tagline: 'Military-Grade Security Wire',
    heroImage: '/concertinawire.jpg',
    overview: 'Our concertina wire provides maximum security for high-risk perimeters. The spiral coil design with sharp blades creates an effective deterrent against intrusion, trusted by military and security agencies across India.',
    specifications: [
      { label: 'Coil Diameter', value: '450mm - 1000mm' },
      { label: 'Blade Type', value: 'Single/Double Barbed' },
      { label: 'Material', value: 'High Carbon Steel Core' },
      { label: 'Blade Material', value: 'Galvanized Steel' },
      { label: 'Standard Length', value: '10m compressed / 50m extended' },
      { label: 'Blade Thickness', value: '0.5mm' },
      { label: 'Clip Spacing', value: 'Standard' },
      { label: 'Packaging', value: 'Compressed coils' },
    ],
    features: [
      'Sharp blade design for maximum deterrence',
      'High-tensile steel core',
      'Weather and corrosion resistant',
      'Quick deployment capability',
      'Compact storage when compressed',
      'Available in various coil diameters',
      'Military-grade quality',
    ],
    applications: [
      'Military base perimeters',
      'Prison and correctional facilities',
      'Border security installations',
      'High-security government facilities',
      'VIP zone protection',
      'Industrial restricted areas',
      'Critical infrastructure protection',
    ],
    benefits: [
      'Maximum security deterrence',
      'Fast installation',
      'Long-term durability',
      'Effective in all weather',
      'Trusted by security agencies',
    ],
    relatedProducts: ['barbed-wire', 'gi-wire'],
  },
};

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? productsData[slug] : null;

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const relatedProductsData = product.relatedProducts
    .map((p) => productsData[p])
    .filter(Boolean);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 bg-forge overflow-hidden">
        <div className="absolute inset-0 hex-pattern opacity-20" />
        <div className="absolute inset-0">
          <img
            src={product.heroImage}
            alt={product.name}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-galvanized text-sm mb-4">
            <Link to="/products" className="hover:text-rust transition-colors">Products</Link>
            <span>/</span>
            <span>{product.name}</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="font-barlow-condensed text-4xl lg:text-6xl font-extrabold text-white mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-rust font-medium mb-6">{product.tagline}</p>
            <p className="text-lg text-galvanized leading-relaxed">{product.overview}</p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/rfq" className="btn-primary">
                Request Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+919589707622" className="btn-secondary border-white text-white hover:bg-white hover:text-forge">
                <Phone className="w-5 h-5" />
                Call for Details
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Specs */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Package, label: 'Multiple Gauges', value: 'Available' },
              { icon: Shield, label: 'Coating', value: 'GI Options' },
              { icon: Award, label: 'Quality', value: 'Assured' },
              { icon: Truck, label: 'Delivery', value: 'Pan-India' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-rust/10 rounded flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-rust" />
                </div>
                <div>
                  <div className="text-xs text-steel">{item.label}</div>
                  <div className="font-bold text-forge">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Specifications Table */}
            <div>
              <h2 className="font-barlow-condensed text-3xl font-bold text-forge mb-6">Technical Specifications</h2>
              <div className="bg-gray-50 rounded-sm overflow-hidden">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    {product.specifications.map((spec, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 text-sm font-medium text-forge">{spec.label}</td>
                        <td className="px-6 py-4 text-sm text-steel">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Features & Benefits */}
            <div>
              <h2 className="font-barlow-condensed text-3xl font-bold text-forge mb-6">Key Features</h2>
              <ul className="space-y-3 mb-8">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-rust flex-shrink-0 mt-0.5" />
                    <span className="text-steel">{feature}</span>
                  </li>
                ))}
              </ul>

              <h2 className="font-barlow-condensed text-3xl font-bold text-forge mb-6">Benefits</h2>
              <ul className="space-y-3">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-steel">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8 text-center">Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.applications.map((app, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-sm border-l-4 border-rust"
              >
                <span className="text-steel">{app}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-16 lg:py-24 bg-forge">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-barlow-condensed text-4xl font-bold text-white mb-4">
              Quality Manufacturing Process
            </h2>
            <p className="text-galvanized max-w-2xl mx-auto">
              Every roll of {product.name} undergoes rigorous quality checks throughout our manufacturing process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Raw Material Selection', desc: 'Premium steel sourced from certified suppliers' },
              { step: '02', title: 'Wire Drawing', desc: 'Precision wire drawing to exact gauges' },
              { step: '03', title: 'Coating Process', desc: 'Hot-dip galvanizing for corrosion protection' },
              { step: '04', title: 'Quality Testing', desc: 'Tensile strength and coating weight validation' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-rust rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-barlow-condensed text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h4 className="font-bold text-white mb-2">{item.title}</h4>
                <p className="text-galvanized text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProductsData.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-heading mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProductsData.map((relProduct) => (
                <Link
                  key={relProduct.name}
                  to={`/products/${slug === 'barbed-wire' || slug === 'concertina-wire' ? (relProduct.name === 'Barbed Wire' ? 'barbed-wire' : relProduct.name === 'GI Wire' ? 'gi-wire' : relProduct.name === 'Concertina Wire' ? 'concertina-wire' : relProduct.name === 'Binding Wire' ? 'binding-wire' : 'solar-fencing-wire') : (relProduct.name === 'Barbed Wire' ? 'barbed-wire' : relProduct.name === 'GI Wire' ? 'gi-wire' : relProduct.name === 'Solar Fencing Wire' ? 'solar-fencing-wire' : relProduct.name === 'Binding Wire' ? 'binding-wire' : 'concertina-wire')}`}
                  className="card group flex"
                >
                  <div className="w-1/3">
                    <img
                      src={relProduct.heroImage}
                      alt={relProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <h3 className="font-barlow-condensed text-xl font-bold text-forge group-hover:text-rust transition-colors">
                      {relProduct.name}
                    </h3>
                    <p className="text-steel text-sm mt-2">{relProduct.tagline}</p>
                    <div className="flex items-center mt-4 text-rust text-sm font-medium">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-rust">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-barlow-condensed text-4xl font-extrabold text-white mb-4">
            Get a Quote for {product.name}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Contact our team for bulk orders, custom specifications, or technical guidance
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
