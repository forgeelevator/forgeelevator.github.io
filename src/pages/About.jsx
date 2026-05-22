import { Link } from 'react-router-dom'
import { CheckCircle2, Users, Shield, Heart, ArrowRight } from 'lucide-react'

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    desc: 'Every decision we make starts with safety — for passengers, building occupants, and our own technicians. We never cut corners.',
  },
  {
    icon: CheckCircle2,
    title: 'Integrity',
    desc: 'Honest assessments, transparent pricing, and recommendations you can trust. We treat your building like our own.',
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'We\'re East Tennessee locals. We invest in this region, hire locally, and take pride in keeping our neighbors moving.',
  },
  {
    icon: Heart,
    title: 'Craftsmanship',
    desc: 'Our mechanics take pride in their work. A service call isn\'t complete until the equipment performs exactly as it should.',
  },
]

const certifications = [
  'ASME A17.1 Safety Code Compliant',
  'State of Tennessee Licensed Elevator Contractors',
  'NEIEP-Trained Mechanics',
  'Fully Bonded & Insured',
  'OSHA Safety Certified',
  'Continuing Education & Manufacturer Training',
]

const buildingTypes = [
  'Office Buildings',
  'Hotels & Hospitality',
  'Hospitals & Healthcare',
  'Multifamily Residential',
  'Retail & Mixed-Use',
  'Industrial & Warehouse',
  'Government & Municipal',
  'Educational Institutions',
]

export default function About() {
  return (
    <div>
      {/* ── Page hero ── */}
      <section
        className="relative pt-32 pb-20 bg-forge-navy overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to bottom right, rgba(13,31,53,0.96) 0%, rgba(30,58,95,0.85) 100%),
            url('https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1400&q=80&fit=crop')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-3">About Forge Elevator</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            Built on Reputation.<br />Driven by Service.
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Forge Elevator was founded with a single mission: give East Tennessee businesses and property
            owners an elevator service partner they can actually rely on — responsive, honest, and skilled.
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-12 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        />
      </section>

      {/* ── Story ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="section-label mb-3">Our Story</p>
            <h2 className="section-title mb-6">
              Local Roots, Professional Standards
            </h2>
            <p className="text-gray-500 leading-relaxed mb-5">
              Forge Elevator was born from a simple frustration: building owners in East Tennessee deserved
              better elevator service. Too often, large national companies treated local clients like low
              priorities — slow response times, impersonal service, and technicians who had never even
              visited the client's building before.
            </p>
            <p className="text-gray-500 leading-relaxed mb-5">
              We set out to change that. As a locally owned company, we know the Knoxville metro and
              surrounding East Tennessee communities. We build real relationships with building managers,
              property owners, and facilities teams. When you call us, you get a person — not a queue.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Our mechanics are licensed, factory-trained, and deeply experienced with the full range of
              elevator systems — from vintage hydraulic units in historic downtown buildings to modern
              traction systems in new commercial towers.
            </p>
          </div>

          <div className="relative">
            <div
              className="aspect-[4/3] rounded-sm overflow-hidden"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Accent block */}
            <div className="absolute -bottom-4 -left-4 bg-forge-fire p-5 rounded-sm shadow-xl hidden sm:block">
              <p className="font-display text-3xl font-bold text-white leading-none">East</p>
              <p className="font-display text-2xl font-bold text-white leading-none">Tennessee</p>
              <p className="text-xs font-semibold text-white/80 uppercase tracking-widest mt-1">Proudly Serving</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 bg-forge-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">What We Stand For</p>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-7 text-center">
                <div className="w-14 h-14 bg-forge-fire rounded-full flex items-center justify-center mx-auto mb-5">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-forge-navy text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credentials + Building Types ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-14">

          {/* Certifications */}
          <div>
            <p className="section-label mb-3">Credentials</p>
            <h2 className="section-title mb-6">Licensed, Certified &amp; Compliant</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              We take compliance seriously. All Forge Elevator technicians hold current state licenses
              and receive ongoing education to stay ahead of code requirements and new equipment standards.
            </p>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c} className="flex items-center gap-3 text-gray-700 text-sm">
                  <CheckCircle2 size={16} className="text-forge-fire flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Building types */}
          <div>
            <p className="section-label mb-3">Who We Serve</p>
            <h2 className="section-title mb-6">Buildings of All Types</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              From a single-elevator boutique hotel to a multi-unit hospital complex, Forge Elevator
              has the experience to handle vertical transportation across every building type.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {buildingTypes.map((b) => (
                <div
                  key={b}
                  className="flex items-center gap-2 bg-forge-light rounded-sm px-4 py-3 text-sm text-forge-navy font-medium border border-gray-100"
                >
                  <span className="w-1.5 h-1.5 bg-forge-fire rounded-full flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-forge-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Get in touch for a free consultation or request emergency service right now.
          </p>
          <Link to="/contact" className="btn-primary text-base px-10 py-4">
            Contact Forge Elevator <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
