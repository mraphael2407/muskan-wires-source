import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { submitLead } from '../lib/supabase';

export default function LeadCapturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Show popup after 30 seconds if not submitted before
    const hasSubmitted = sessionStorage.getItem('leadCaptured');
    if (!hasSubmitted) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        product_interest: formData.requirement ? [formData.requirement] : undefined,
        source: 'popup',
      });
    } catch (err) {
      console.error('Error saving lead:', err);
    }
    sessionStorage.setItem('leadCaptured', 'true');
    setSubmitted(true);
    setTimeout(() => setIsOpen(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forge/80 backdrop-blur-sm">
      <div className="bg-white rounded-sm shadow-2xl max-w-md w-full overflow-hidden relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-steel hover:text-rust transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-rust p-6 text-white">
          <h3 className="font-barlow-condensed text-2xl font-bold">Get a Free Quote Today!</h3>
          <p className="text-white/80 text-sm mt-1">We'll get back within 24 hours</p>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="font-bold text-lg text-forge">Thank You!</h4>
            <p className="text-steel mt-2">Our team will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-forge mb-1">Name *</label>
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
              <label className="block text-sm font-medium text-forge mb-1">Phone Number *</label>
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
              <label className="block text-sm font-medium text-forge mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-forge mb-1">What do you need? *</label>
              <select
                required
                value={formData.requirement}
                onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                className="input-field"
              >
                <option value="">Select a product</option>
                <option value="barbed-wire">Barbed Wire</option>
                <option value="gi-wire">GI Wire</option>
                <option value="solar-wire">Solar Fencing Wire</option>
                <option value="binding-wire">Binding Wire</option>
                <option value="concertina-wire">Concertina Wire</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              <Send className="w-5 h-5" />
              Submit Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
