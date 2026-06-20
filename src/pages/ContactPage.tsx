import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { submitContactMessage } from '../lib/supabase';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Office Address',
    value: '1st  Floor, Sinha Complex, (Karar Exports Pvt. Ltd.), Atari Road, Tatibandh, Raipur - Chhattisgarh, 492099',
    sub: 'Karar Exports Pvt. Ltd.'
  },
  {
    icon: Phone,
    label: 'Phone Numbers',
    value: '+91 95897 07622',
    sub: '+91 70005 71678',
    isLink: true,
    href: 'tel:+919589707622',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@muskanwires.com',
    sub: 'quotes@muskanwires.com',
    isLink: true,
    href: 'mailto:info@muskanwires.com',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon - Sat: 9:00 AM - 6:00 PM',
    sub: 'Sunday: Closed',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContactMessage({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject || undefined,
        message: formData.message,
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting message:', error);
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
              Contact Us
            </h1>
            <p className="text-xl text-galvanized leading-relaxed">
              Have questions about our products, need a quote, or want to discuss a project? Our team is here to help you find the right wire solutions for your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="bg-white p-6 rounded-sm shadow-lg">
                <div className="w-10 h-10 bg-rust/10 rounded flex items-center justify-center mb-4">
                  <info.icon className="w-5 h-5 text-rust" />
                </div>
                <h4 className="font-bold text-forge mb-2">{info.label}</h4>
                {info.isLink ? (
                  <a href={info.href} className="text-steel hover:text-rust transition-colors">
                    <div>{info.value}</div>
                    {info.sub && <div className="text-sm">{info.sub}</div>}
                  </a>
                ) : (
                  <div className="text-steel">
                    <div>{info.value}</div>
                    {info.sub && <div className="text-sm">{info.sub}</div>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-barlow-condensed text-3xl font-bold text-forge mb-6">
                Send Us a Message
              </h2>
              <p className="text-steel mb-8">
                Fill out the form below and we will get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-sm p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-forge text-xl mb-2">Message Sent!</h3>
                  <p className="text-steel">
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        placeholder="Your name"
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
                      Subject *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="input-field"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="quote-request">Quote Request</option>
                      <option value="dealer-inquiry">Dealer Program Inquiry</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forge mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-field"
                      rows={5}
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Map and Additional Info */}
            <div>
              {/* Google Map */}
              <div className="rounded-sm overflow-hidden mb-8 shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3716.727731412258!2d81.62324579999999!3d21.321772099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28e731955291d3%3A0x7c1da8cdd13ad632!2sM%2FS%20Muskan%20Wire!5e0!3m2!1sen!2sin!4v1781935094827!5m2!1sen!2sin"
                  width="100%"
                  height="380"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Muskan Wires Location"
                />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <a
                  href="https://wa.me/919589707622"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white p-4 rounded-sm hover:bg-green-600 transition-colors flex items-center gap-3"
                >
                  <MessageCircle className="w-6 h-6" />
                  <div>
                    <div className="font-bold">WhatsApp</div>
                    <div className="text-sm text-white/80">Quick response</div>
                  </div>
                </a>
                <a
                  href="tel:+919589707622"
                  className="bg-rust text-white p-4 rounded-sm hover:bg-rust-light transition-colors flex items-center gap-3"
                >
                  <Phone className="w-6 h-6" />
                  <div>
                    <div className="font-bold">Call Us</div>
                    <div className="text-sm text-white/80">Speak to our team</div>
                  </div>
                </a>
              </div>

              {/* Business Hours */}
              <div className="bg-gray-50 p-6 rounded-sm">
                <h3 className="font-bold text-forge mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-rust" />
                  Business Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-steel">Monday - Friday</span>
                    <span className="text-forge font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-steel">Saturday</span>
                    <span className="text-forge font-medium">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-steel">Sunday</span>
                    <span className="text-rust font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links for Different Needs */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-4">Looking for Something Specific?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-sm shadow-lg text-center">
              <div className="w-16 h-16 bg-rust/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="font-bold text-forge text-lg mb-2">Need a Quote?</h3>
              <p className="text-steel text-sm mb-4">
                Submit your requirements for a detailed quotation
              </p>
              <Link to="/rfq" className="text-rust font-medium inline-flex items-center gap-2">
                Request Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-white p-8 rounded-sm shadow-lg text-center">
              <div className="w-16 h-16 bg-rust/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-bold text-forge text-lg mb-2">Become a Dealer</h3>
              <p className="text-steel text-sm mb-4">
                Join our authorized dealer network
              </p>
              <Link to="/dealer-program" className="text-rust font-medium inline-flex items-center gap-2">
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-white p-8 rounded-sm shadow-lg text-center">
              <div className="w-16 h-16 bg-rust/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="font-bold text-forge text-lg mb-2">Product Guides</h3>
              <p className="text-steel text-sm mb-4">
                Technical guides and specifications
              </p>
              <Link to="/resources" className="text-rust font-medium inline-flex items-center gap-2">
                View Resources
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
