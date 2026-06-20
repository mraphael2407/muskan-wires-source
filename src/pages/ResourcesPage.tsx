import { Link } from 'react-router-dom';
import {
  FileText,
  Calculator,
  TrendingUp,
  Download,
  Book,
  ArrowRight,
  ChevronRight,
  Phone,
} from 'lucide-react';
import { useState } from 'react';

const guides = [
  {
    title: 'Barbed Wire Selection Guide',
    desc: 'Understanding gauge, coating, and specifications for your security fencing needs',
    category: 'Fencing',
    readTime: '5 min read',
  },
  {
    title: 'GI Wire Quality Standards',
    desc: 'Learn about commercial vs heavy coating and how to choose the right finish',
    category: 'Industrial',
    readTime: '8 min read',
  },
  {
    title: 'Solar Farm Fencing Requirements',
    desc: 'Technical guidelines for solar installation perimeter security',
    category: 'Solar',
    readTime: '6 min read',
  },
  {
    title: 'Wire Gauge Conversion Chart',
    desc: 'SWG to BWG to metric wire gauge equivalents reference',
    category: 'Technical',
    readTime: '3 min read',
  },
  {
    title: 'Construction Binding Wire Guide',
    desc: 'Best practices for rebar binding and construction applications',
    category: 'Construction',
    readTime: '4 min read',
  },
  {
    title: 'Coating Weight Standards',
    desc: 'Understanding zinc coating weights and corrosion protection',
    category: 'Technical',
    readTime: '7 min read',
  },
];

const calculators = [
  {
    title: 'Wire Quantity Estimator',
    desc: 'Calculate wire quantity needed based on fence length and height',
    icon: Calculator,
    href: '/resources#quantity-estimator',
  },
  {
    title: 'Project Cost Calculator',
    desc: 'Estimate total project cost including materials and delivery',
    icon: Calculator,
    href: '/resources#cost-calculator',
  },
  {
    title: 'Dealer Margin Calculator',
    desc: 'Calculate profit margins for dealer pricing',
    icon: Calculator,
    href: '/resources#margin-calculator',
  },
];

const marketTrends = [
  { date: 'Jun 2025', trend: 'Stable', price: 'Rs 58/kg', change: '+2.5%' },
  { date: 'May 2025', trend: 'Rising', price: 'Rs 56.5/kg', change: '+5.2%' },
  { date: 'Apr 2025', trend: 'Stable', price: 'Rs 53.7/kg', change: '-1.1%' },
  { date: 'Mar 2025', trend: 'Rising', price: 'Rs 54.3/kg', change: '+3.8%' },
];

const faqs = [
  {
    q: 'What is the difference between 12G and 14G barbed wire?',
    a: 'The gauge number indicates wire thickness - lower gauge means thicker wire. 12G wire is thicker and stronger than 14G, making it more suitable for high-security applications and larger perimeter fencing.',
  },
  {
    q: 'What is the difference between commercial and heavy GI coating?',
    a: 'Commercial GI wire has 40-60 g/m² zinc coating while heavy coated wire has 80-100 g/m². Heavy coating provides better corrosion resistance and longer life, especially in coastal or humid environments.',
  },
  {
    q: 'How do I calculate wire quantity for fencing?',
    a: 'For barbed wire fencing, multiply the perimeter length by the number of strands needed. Standard is 5-7 strands for agricultural fencing. Add 5-10% extra for overlaps and wastage.',
  },
  {
    q: 'Do you provide delivery across India?',
    a: 'Yes, we deliver across India from our manufacturing facility in Raipur. Delivery is free for orders above minimum quantity. Transit time varies by distance - typically 2-7 days.',
  },
  {
    q: 'Can I get custom wire specifications?',
    a: 'Yes, we offer custom manufacturing for specific gauge requirements, coating weights, and lengths. Contact our technical team with your specifications for a custom quote.',
  },
  {
    q: 'What are the payment terms for bulk orders?',
    a: 'Standard terms are 50% advance with order and 50% before dispatch. We offer credit facilities for regular customers and dealers subject to verification.',
  },
];

export default function ResourcesPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [estimatorData, setEstimatorData] = useState({
    length: '',
    strands: '5',
    postSpacing: '2.5',
  });
  const [estimatedResult, setEstimatedResult] = useState<{
    total: number;
    rolls: number;
  } | null>(null);

  const handleEstimate = () => {
    const length = parseFloat(estimatorData.length) || 0;
    const strands = parseInt(estimatorData.strands) || 5;
    if (length > 0) {
      const total = length * strands * 1.05;
      const rolls = Math.ceil(total / 100);
      setEstimatedResult({ total, rolls });
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 bg-forge overflow-hidden">
        <div className="absolute inset-0 hex-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-barlow-condensed text-4xl lg:text-6xl font-extrabold text-white mb-6">
              Resources &
              <span className="text-rust block">Technical Guides</span>
            </h1>
            <p className="text-xl text-galvanized leading-relaxed">
              Expert guides, technical specifications, calculators, and FAQs to help you make informed decisions about wire products for your projects.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Tools */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {calculators.map((calc, idx) => (
              <div key={idx} className="bg-white p-6 rounded-sm shadow-lg">
                <div className="w-12 h-12 bg-rust/10 rounded flex items-center justify-center mb-4">
                  <calc.icon className="w-6 h-6 text-rust" />
                </div>
                <h3 className="font-bold text-forge mb-2">{calc.title}</h3>
                <p className="text-steel text-sm mb-4">{calc.desc}</p>
                <a href={calc.href} className="text-rust text-sm font-medium flex items-center gap-2 hover:underline">
                  Use Calculator
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wire Quantity Estimator */}
      <section id="quantity-estimator" className="py-16 lg:py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-rust rounded flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-barlow-condensed text-3xl font-bold text-forge">
                  Wire Quantity Estimator
                </h2>
              </div>
              <p className="text-steel mb-8">
                Calculate the approximate wire quantity needed for your fencing project. This calculator provides estimates for barbed wire and standard fencing applications.
              </p>

              <div className="bg-gray-50 p-6 rounded-sm">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-forge mb-1">
                      Perimeter Length (meters)
                    </label>
                    <input
                      type="number"
                      value={estimatorData.length}
                      onChange={(e) => setEstimatorData({ ...estimatorData, length: e.target.value })}
                      className="input-field"
                      placeholder="e.g., 500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forge mb-1">
                      Number of Strands
                    </label>
                    <select
                      value={estimatorData.strands}
                      onChange={(e) => setEstimatorData({ ...estimatorData, strands: e.target.value })}
                      className="input-field"
                    >
                      <option value="3">3 strands</option>
                      <option value="4">4 strands</option>
                      <option value="5">5 strands (Standard)</option>
                      <option value="6">6 strands</option>
                      <option value="7">7 strands (High Security)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forge mb-1">
                      Post Spacing (meters)
                    </label>
                    <select
                      value={estimatorData.postSpacing}
                      onChange={(e) => setEstimatorData({ ...estimatorData, postSpacing: e.target.value })}
                      className="input-field"
                    >
                      <option value="2">2 meters</option>
                      <option value="2.5">2.5 meters (Standard)</option>
                      <option value="3">3 meters</option>
                    </select>
                  </div>
                  <button onClick={handleEstimate} className="btn-primary w-full justify-center">
                    Calculate Quantity
                  </button>
                </div>

                {estimatedResult && (
                  <div className="mt-6 p-4 bg-rust/10 rounded-sm">
                    <h4 className="font-bold text-forge mb-2">Estimated Requirement</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-rust">{Math.round(estimatedResult.total)}m</div>
                        <div className="text-xs text-steel">Total Wire Length</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-rust">{estimatedResult.rolls}</div>
                        <div className="text-xs text-steel">Standard 100m Rolls</div>
                      </div>
                    </div>
                    <p className="text-xs text-steel mt-4">
                      * Includes 5% extra for overlaps and wastage. For accurate quotes, request a detailed quotation.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Market Trends */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-rust rounded flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-barlow-condensed text-3xl font-bold text-forge">
                  Market Trends
                </h2>
              </div>
              <p className="text-steel mb-8">
                Stay updated with the latest GI wire and barbed wire market prices in central India.
              </p>

              <div className="bg-gray-50 rounded-sm overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-forge text-white">
                      <th className="text-left p-4 text-sm">Month</th>
                      <th className="text-left p-4 text-sm">Trend</th>
                      <th className="text-right p-4 text-sm">Avg Price</th>
                      <th className="text-right p-4 text-sm">Change</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {marketTrends.map((trend, idx) => (
                      <tr key={idx} className={idx === 0 ? 'bg-rust/5' : ''}>
                        <td className="p-4 text-forge font-medium">{trend.date}</td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                              trend.trend === 'Rising'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {trend.trend}
                          </span>
                        </td>
                        <td className="p-4 text-right text-forge font-bold">{trend.price}</td>
                        <td className="p-4 text-right">
                          <span
                            className={
                              trend.change.startsWith('+')
                                ? 'text-green-600'
                                : 'text-red-600'
                            }
                          >
                            {trend.change}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-steel mt-4">
                * Prices are indicative for heavy coated GI wire in central India market. Actual prices may vary based on specifications and order quantity.
              </p>

              <Link to="/rfq" className="btn-primary mt-6 inline-flex">
                Get Current Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Guides */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-4">Technical Guides</h2>
            <p className="section-subheading">
              In-depth guides to help you understand wire products and specifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, idx) => (
              <div key={idx} className="bg-white p-6 rounded-sm shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-rust bg-rust/10 px-2 py-1 rounded">
                    {guide.category}
                  </span>
                  <span className="text-xs text-steel">{guide.readTime}</span>
                </div>
                <h3 className="font-bold text-forge text-lg mb-2">{guide.title}</h3>
                <p className="text-steel text-sm mb-4">{guide.desc}</p>
                <button className="text-rust text-sm font-medium flex items-center gap-2 hover:underline">
                  <Book className="w-4 h-4" />
                  Read Guide
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-4">Frequently Asked Questions</h2>
            <p className="section-subheading">Quick answers to common questions about our products</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-sm overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <span className="font-medium text-forge">{faq.q}</span>
                  <ChevronRight
                    className={`w-5 h-5 text-rust transition-transform ${
                      expandedFaq === idx ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-6 text-steel">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-rust">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-barlow-condensed text-4xl font-extrabold text-white mb-4">
            Need Technical Assistance?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Our technical team is available to help you with product selection, specifications, and project planning
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/rfq" className="bg-white text-rust px-8 py-4 font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2">
              Request Technical Support
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
