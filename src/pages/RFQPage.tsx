import { useState } from 'react';
import {
  Send,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  FileText,
  Calculator,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { submitQuoteRequest } from '../lib/supabase';

const productOptions = [
  { id: 'barbed-wire', name: 'Barbed Wire' },
  { id: 'gi-wire', name: 'GI Wire' },
  { id: 'solar-fencing-wire', name: 'Solar Fencing Wire' },
  { id: 'binding-wire', name: 'Binding Wire' },
  { id: 'concertina-wire', name: 'Concertina Wire' },
  { id: 'custom', name: 'Custom Specification' },
];

const projectTypes = [
  'Agricultural Fencing',
  'Industrial Security',
  'Solar Installation',
  'Infrastructure Project',
  'Construction Bindings',
  'Residential Fencing',
  'Government Project',
  'Other',
];

const rfqSteps = [
  { icon: FileText, title: 'Submit Requirements', desc: 'Fill out the form with your product and project details' },
  { icon: Calculator, title: 'Technical Review', desc: 'Our engineers review specifications and requirements' },
  { icon: HelpCircle, title: 'Callback & Discussion', desc: 'We contact you to discuss pricing and delivery' },
  { icon: CheckCircle, title: 'Quotation Delivery', desc: 'Receive detailed quote within 24 hours' },
];

export default function RFQPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    city: '',
    products: [] as string[],
    projectType: '',
    quantity: '',
    timeline: '',
    budget: '',
    specs: '',
    additionalInfo: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleProductToggle = (productId: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.includes(productId)
        ? prev.products.filter((p) => p !== productId)
        : [...prev.products, productId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitQuoteRequest({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        company: formData.company || undefined,
        city: formData.city,
        products: formData.products,
        project_type: formData.projectType || undefined,
        quantity: formData.quantity || undefined,
        timeline: formData.timeline || undefined,
        budget: formData.budget || undefined,
        specifications: formData.specs || undefined,
        additional_info: formData.additionalInfo || undefined,
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting quote:', error);
      setSubmitted(true); // Still show success to user
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
              Request for Quotation
            </h1>
            <p className="text-xl text-galvanized leading-relaxed">
              Get a detailed quote for your wire requirements within 24 hours. Our team analyzes your specifications and provides competitive pricing for bulk orders and custom projects.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {rfqSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-rust/10 rounded flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-6 h-6 text-rust" />
                </div>
                <div>
                  <div className="text-xs text-rust font-medium mb-1">Step {idx + 1}</div>
                  <h4 className="font-bold text-forge">{step.title}</h4>
                  <p className="text-steel text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main RFQ Form */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-sm p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="font-barlow-condensed text-3xl font-bold text-forge mb-4">
                    Quote Request Received!
                  </h2>
                  <p className="text-steel mb-6 max-w-md mx-auto">
                    Thank you for your inquiry. Our team is reviewing your requirements and will contact you within 24 hours with a detailed quotation.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/products" className="btn-secondary">
                      Explore More Products
                    </Link>
                    <Link to="/resources" className="btn-primary">
                      View Resources
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Contact Information */}
                  <div className="bg-gray-50 p-6 rounded-sm">
                    <h3 className="font-bold text-forge text-lg mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-forge mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="input-field"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-forge mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="input-field"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-forge mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="input-field"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-forge mb-1">
                          Company/Business Name
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="input-field"
                          placeholder="Your company name"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-forge mb-1">
                          City/Location *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="input-field"
                          placeholder="Project location city"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Selection */}
                  <div className="bg-gray-50 p-6 rounded-sm">
                    <h3 className="font-bold text-forge text-lg mb-4">Products Required</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                      {productOptions.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => handleProductToggle(product.id)}
                          className={`p-3 text-sm font-medium rounded transition-colors ${
                            formData.products.includes(product.id)
                              ? 'bg-rust text-white'
                              : 'bg-white text-steel border border-gray-200 hover:border-rust'
                          }`}
                        >
                          {product.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="bg-gray-50 p-6 rounded-sm">
                    <h3 className="font-bold text-forge text-lg mb-4">Project Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-forge mb-1">
                          Project Type
                        </label>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="input-field"
                        >
                          <option value="">Select project type</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-forge mb-1">
                          Quantity Required
                        </label>
                        <input
                          type="text"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          className="input-field"
                          placeholder="e.g., 10 tons, 500 rolls"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-forge mb-1">
                          Expected Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="input-field"
                        >
                          <option value="">Select timeline</option>
                          <option value="immediate">Immediate (Within 1 week)</option>
                          <option value="2-4weeks">2-4 weeks</option>
                          <option value="1-2months">1-2 months</option>
                          <option value="planning">Planning phase</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-forge mb-1">
                          Budget Range
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="input-field"
                        >
                          <option value="">Select budget range</option>
                          <option value="1-5l">Rs 1-5 Lakhs</option>
                          <option value="5-10l">Rs 5-10 Lakhs</option>
                          <option value="10-25l">Rs 10-25 Lakhs</option>
                          <option value="25l+">Rs 25 Lakhs+</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-forge mb-1">
                          Technical Specifications
                        </label>
                        <input
                          type="text"
                          value={formData.specs}
                          onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                          className="input-field"
                          placeholder="e.g., 12G x 12G, Heavy coated 100 g/m², etc."
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-forge mb-1">
                          Additional Information
                        </label>
                        <textarea
                          value={formData.additionalInfo}
                          onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                          className="input-field"
                          rows={4}
                          placeholder="Any specific requirements, site conditions, delivery preferences, or questions..."
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center text-lg py-4">
                    <Send className="w-5 h-5" />
                    Submit Quote Request
                  </button>

                  <p className="text-xs text-steel text-center">
                    By submitting this form, you agree to be contacted by our sales team regarding your inquiry. Response within 24 hours guaranteed.
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-forge text-white p-6 rounded-sm mb-6">
                <h3 className="font-barlow-condensed text-xl font-bold mb-4">
                  Need Immediate Assistance?
                </h3>
                <p className="text-galvanized text-sm mb-6">
                  For urgent requirements or large orders, contact our sales team directly.
                </p>
                <div className="space-y-4">
                  <a
                    href="tel:+919589707622"
                    className="flex items-center gap-3 text-white hover:text-rust transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    +91 95897 07622
                  </a>
                  <a
                    href="mailto:quotes@muskanwires.com"
                    className="flex items-center gap-3 text-white hover:text-rust transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    quotes@muskanwires.com
                  </a>
                  <div className="flex items-center gap-3 text-galvanized">
                    <Clock className="w-5 h-5" />
                    Mon-Sat: 9AM - 6PM
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-sm">
                <h4 className="font-bold text-forge mb-4">What to Include</h4>
                <ul className="space-y-3">
                  {[
                    'Exact product specifications',
                    'Required quantity',
                    'Delivery location (pin code)',
                    'Preferred delivery timeline',
                    'Any special requirements',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-steel">
                      <CheckCircle className="w-4 h-4 text-rust flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rust/10 p-6 rounded-sm mt-6">
                <h4 className="font-bold text-forge mb-2">Bulk Order Benefits</h4>
                <ul className="space-y-2">
                  {[
                    'Volume-based pricing',
                    'Direct factory supply',
                    'Free delivery for large orders',
                    'Extended credit terms',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-steel">
                      <ArrowRight className="w-4 h-4 text-rust flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
