import { Link } from 'react-router-dom';
import {
  Award,
  Factory,
  Target,
  Users,
  Shield,
  Leaf,
  Building2,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Quality First',
    desc: 'Every wire we manufacture undergoes stringent quality checks to ensure it meets the highest industry standards.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    desc: 'We build lasting relationships by understanding and exceeding our customers unique requirements.',
  },
  {
    icon: Shield,
    title: 'Reliability',
    desc: 'Consistent quality and timely delivery that our partners and customers can always count on.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    desc: 'Environmentally conscious manufacturing processes and responsible sourcing of raw materials.',
  },
];

const milestones = [
  { year: '2025', title: 'Company Founded', desc: 'Established in Urla Industrial Area, Raipur' },
  { year: '2025', title: 'Production Launch', desc: 'Started manufacturing barbed wire and GI wire' },
  { year: '2025', title: 'Dealer Network', desc: 'Expanded to 50+ dealers across India' },
  { year: '2025', title: 'Product Range', desc: 'Launched complete wire product portfolio' },
];


export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 bg-forge overflow-hidden">
        <div className="absolute inset-0 hex-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-barlow-condensed text-4xl lg:text-6xl font-extrabold text-white mb-6">
              Engineering Quality,
              <span className="text-rust block">Building Trust</span>
            </h1>
            <p className="text-xl text-galvanized leading-relaxed">
              From our manufacturing hub in Urla Industrial Area, Raipur, we are committed to delivering premium wire products that power Indias agriculture, security, infrastructure, and solar sectors.
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/2161468/pexels-photo-2161468.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Manufacturing Facility"
                className="rounded-sm shadow-xl"
              />
            </div>
            <div>
              <h2 className="section-heading mb-6">Who We Are</h2>
              <p className="text-steel leading-relaxed mb-6">
                Muskan Wires is a leading wire manufacturing company established in 2025, situated in the heart of Urla Industrial Area, Raipur, Chhattisgarh. We specialize in producing high-quality barbed wire, GI wire, solar fencing wire, binding wire, and concertina wire for diverse industrial applications.
              </p>
              <p className="text-steel leading-relaxed mb-6">
                Our state-of-the-art manufacturing facility is equipped with modern machinery and operated by experienced professionals who understand the intricacies of wire production. We source the finest raw materials and employ rigorous quality control measures at every stage of production.
              </p>
              <p className="text-steel leading-relaxed">
                Whether you are a farmer looking for agricultural fencing, a contractor working on infrastructure projects, a solar developer needing specialized wiring, or a security professional requiring perimeter solutions, Muskan Wires has the products and expertise to meet your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 lg:py-28 bg-gray-50 hex-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-sm shadow-lg">
              <div className="w-14 h-14 bg-rust/10 rounded flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-rust" />
              </div>
              <h3 className="font-barlow-condensed text-3xl font-bold text-forge mb-4">Our Vision</h3>
              <p className="text-steel leading-relaxed">
                To become Indias most trusted and preferred wire manufacturer, known for exceptional quality, innovative solutions, and unwavering commitment to customer satisfaction. We envision expanding our reach across the nation while maintaining the personalized service that defines us.
              </p>
            </div>
            <div className="bg-white p-10 rounded-sm shadow-lg">
              <div className="w-14 h-14 bg-rust/10 rounded flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-rust" />
              </div>
              <h3 className="font-barlow-condensed text-3xl font-bold text-forge mb-4">Our Mission</h3>
              <p className="text-steel leading-relaxed">
                To manufacture and deliver premium wire products that meet the highest quality standards while offering competitive pricing. We are committed to sustainable manufacturing practices, building strong dealer partnerships, and providing exceptional technical support to our customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">Our Core Values</h2>
            <p className="section-subheading">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-rust/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-rust" />
                </div>
                <h3 className="font-barlow-condensed text-xl font-bold text-forge mb-3">{value.title}</h3>
                <p className="text-steel text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Standards */}
      <section className="py-20 lg:py-28 bg-forge">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-barlow-condensed text-4xl lg:text-5xl font-extrabold text-white mb-6">
                Manufacturing Excellence
              </h2>
              <p className="text-galvanized text-lg leading-relaxed mb-8">
                Our workspace in Urla Industrial Area houses modern wire drawing, galvanizing, and finishing equipment. Every product undergoes multiple quality checks before reaching our customers.
              </p>

              <ul className="space-y-4">
                {[
                  'State-of-the-art wire drawing machines',
                  'In-house galvanizing facility',
                  'Automated quality testing equipment',
                  'Temperature-controlled storage',
                  'Dedicated R&D laboratory',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-white">
                    <CheckCircle className="w-5 h-5 text-rust flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src="/muskan-wires-gi-wire.jpg"
                alt="Wire Production"
                className="rounded shadow-lg w-full h-48 object-cover"
              />
              <img
                src="https://images.pexels.com/photos/2161468/pexels-photo-2161468.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Quality Control"
                className="rounded shadow-lg w-full h-48 object-cover mt-8"
              />
              <img
                src="/binding-wire-muskan.jpg"
                alt="Raw Materials"
                className="rounded shadow-lg w-full h-48 object-cover"
              />
              <img
                src="/Barbed-Wire-Muskan.png"
                alt="Finished Products"
                className="rounded shadow-lg w-full h-48 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">Our Journey</h2>
            <p className="section-subheading">Building a legacy in wire manufacturing</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-rust/20 hidden lg:block" />

            <div className="space-y-12">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex flex-col lg:flex-row items-center gap-8">
                  <div className={`lg:w-1/2 ${idx % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:order-3 lg:pl-12'}`}>
                    <div className="bg-gray-50 p-6 rounded-sm inline-block">
                      <div className="text-rust font-barlow-condensed text-2xl font-bold mb-1">{milestone.year}</div>
                      <h4 className="font-bold text-forge text-lg mb-1">{milestone.title}</h4>
                      <p className="text-steel text-sm">{milestone.desc}</p>
                    </div>
                  </div>

                  <div className="hidden lg:flex w-10 h-10 bg-rust rounded-full items-center justify-center text-white font-bold flex-shrink-0">
                    {idx + 1}
                  </div>

                  <div className={`lg:w-1/2 ${idx % 2 === 0 ? 'lg:order-3' : ''}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-rust rounded-sm p-10 lg:p-16 text-center">
            <h2 className="font-barlow-condensed text-4xl font-extrabold text-white mb-4">
              Partner With Muskan Wires
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Whether you need quality wire products or want to join our dealer network, we are ready to work with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/rfq" className="bg-white text-rust px-8 py-4 font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2">
                Request Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/dealer-program" className="border-2 border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-rust transition-colors inline-flex items-center justify-center">
                Become a Dealer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
