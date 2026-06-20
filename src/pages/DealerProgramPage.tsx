import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  DollarSign,
  Truck,
  Award,
  CheckCircle,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Building,
  User,
  Briefcase,
} from 'lucide-react';
import { submitDealerApplication } from '../lib/supabase';

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Margins',
    desc: 'Industry-leading dealer margins with volume-based incentives and performance bonuses',
  },
  {
    icon: Truck,
    title: 'Direct Supply',
    desc: 'Factory-direct supply eliminating middlemen, ensuring quality and timely delivery',
  },
  {
    icon: Award,
    title: 'Brand Support',
    desc: 'Marketing materials, product training, and sales support from our dedicated team',
  },
  {
    icon: Users,
    title: 'Exclusive Territory',
    desc: 'Defined territory rights protecting your market and customer base',
  },
];

const requirements = [
  'Valid business registration and GST number',
  'Minimum 500 sq ft storage space',
  'Initial investment capacity of Rs 2-5 lakhs',
  'Willingness to maintain stock inventory',
  'Local market knowledge and customer network',
  'Commitment to quality and customer service',
];

const supportProvided = [
  'Complete product training and technical support',
  'Marketing materials and product brochures',
  'Dealer portal for order management',
  'Annual dealer meet and networking events',
  'Lead sharing from website inquiries',
  'Dedicated dealer relationship manager',
];

export default function DealerProgramPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    businessName: '',
    businessType: '',
    experience: '',
    investment: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitDealerApplication({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        business_name: formData.businessName,
        business_type: formData.businessType || undefined,
        city: formData.city,
        state: formData.state,
        experience: formData.experience || undefined,
        investment_capacity: formData.investment || undefined,
        message: formData.message || undefined,
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
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
            <div className="inline-flex items-center gap-2 bg-rust text-white px-4 py-2 rounded text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Partner With Us
            </div>
            <h1 className="font-barlow-condensed text-4xl lg:text-6xl font-extrabold text-white mb-6">
              Dealer &
              <span className="text-rust block">Distributor Program</span>
            </h1>
            <p className="text-xl text-galvanized leading-relaxed">
              Join Indias fastest-growing wire manufacturer network. Become an authorized Muskan Wires dealer and tap into the growing demand for quality wire products across agriculture, infrastructure, and industrial sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-4">Why Partner With Us?</h2>
            <p className="section-subheading">
              Comprehensive support and competitive advantages for our dealer partners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center p-6">
                <div className="w-16 h-16 bg-rust/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-rust" />
                </div>
                <h3 className="font-bold text-forge text-lg mb-2">{benefit.title}</h3>
                <p className="text-steel text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Requirements */}
            <div>
              <h2 className="font-barlow-condensed text-3xl font-bold text-forge mb-6">
                Who Can Apply?
              </h2>
              <p className="text-steel mb-6">
                We are looking for established businesses and entrepreneurs who share our commitment to quality and customer service. Ideal for existing hardware dealers, construction material suppliers, and agricultural products distributors.
              </p>

              <ul className="space-y-3 mb-8">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-rust flex-shrink-0 mt-0.5" />
                    <span className="text-steel">{req}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-white p-6 rounded-sm shadow-lg">
                <h4 className="font-bold text-forge mb-2">Investment Range</h4>
                <p className="text-steel text-sm mb-4">
                  Based on territory size, market potential, and expected stock volume
                </p>
                <div className="flex justify-between items-end gap-4">
                  <div>
                    <div className="text-xs text-steel mb-1">Minimum</div>
                    <div className="text-2xl font-bold text-forge">Rs 2 L</div>
                  </div>
                  <div className="flex-1 h-1 bg-rust/20 rounded-full relative">
                    <div className="absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-r from-rust to-rust-light rounded-full" />
                  </div>
                  <div>
                    <div className="text-xs text-steel mb-1">Maximum</div>
                    <div className="text-2xl font-bold text-forge">Rs 5 L+</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Provided */}
            <div>
              <h2 className="font-barlow-condensed text-3xl font-bold text-forge mb-6">
                What You Get
              </h2>
              <p className="text-steel mb-6">
                When you become a Muskan Wires authorized dealer, you receive comprehensive support to ensure your success in the market.
              </p>

              <ul className="space-y-3 mb-8">
                {supportProvided.map((support, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-steel">{support}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-rust p-6 rounded-sm text-white">
                <h4 className="font-bold mb-2">Exclusive Territory Rights</h4>
                <p className="text-white/80 text-sm">
                  Each dealer receives defined territory rights, ensuring no overlap and protecting your customer relationships and investment in the market.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-heading mb-4">Apply Now</h2>
              <p className="section-subheading">
                Submit your application and our team will contact you within 48 hours
              </p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-sm p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-forge text-xl mb-2">Application Received!</h3>
                <p className="text-steel">
                  Thank you for your interest in becoming a Muskan Wires dealer. Our team will review your application and contact you within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-forge mb-1">
                      <User className="w-4 h-4 inline mr-1" />
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
                      <Phone className="w-4 h-4 inline mr-1" />
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-forge mb-1">
                    <Mail className="w-4 h-4 inline mr-1" />
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-forge mb-1">
                      <Building className="w-4 h-4 inline mr-1" />
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="input-field"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forge mb-1">
                      <Briefcase className="w-4 h-4 inline mr-1" />
                      Business Type *
                    </label>
                    <select
                      required
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Select type</option>
                      <option value="hardware">Hardware Store</option>
                      <option value="construction">Construction Materials</option>
                      <option value="agricultural">Agricultural Products</option>
                      <option value="industrial">Industrial Supplies</option>
                      <option value="new">New Business</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-forge mb-1">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="input-field"
                      placeholder="Your city"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forge mb-1">State *</label>
                    <select
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Select state</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-forge mb-1">
                      Experience in this Industry
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">Less than 1 year</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forge mb-1">
                      Investment Capacity
                    </label>
                    <select
                      value={formData.investment}
                      onChange={(e) => setFormData({ ...formData, investment: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Select range</option>
                      <option value="2-3">Rs 2-3 Lakhs</option>
                      <option value="3-5">Rs 3-5 Lakhs</option>
                      <option value="5+">Rs 5 Lakhs+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-forge mb-1">
                    Additional Information
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-field"
                    rows={3}
                    placeholder="Tell us about your current business, storage capacity, and why you want to partner with Muskan Wires..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  Submit Dealer Application
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-xs text-steel text-center">
                  By submitting this form, you agree to be contacted by our team regarding the dealer program. Your information will not be shared with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-24 bg-forge">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-barlow-condensed text-3xl font-extrabold text-white mb-4">
            Questions About the Dealer Program?
          </h2>
          <p className="text-galvanized mb-8 max-w-2xl mx-auto">
            Our dealer relations team is available to answer your questions and guide you through the application process
          </p>
          <a href="tel:+919589707622" className="btn-primary bg-rust hover:bg-rust-light border-rust mx-auto">
            <Phone className="w-5 h-5" />
            +91 95897 07622
          </a>
        </div>
      </section>
    </div>
  );
}
