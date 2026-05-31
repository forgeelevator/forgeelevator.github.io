import { Link } from 'react-router-dom'
import { CheckCircle2, Users, Shield, Heart, ArrowRight } from 'lucide-react'
import EditableField from '../components/EditableField'

const values = [
  {
    id: 'safety',
    icon: Shield,
    title: 'Safety First',
    desc: 'Every decision we make starts with safety — for passengers, building occupants, and our own technicians. We never cut corners.',
  },
  {
    id: 'integrity',
    icon: CheckCircle2,
    title: 'Integrity',
    desc: 'Honest assessments, transparent pricing, and recommendations you can trust. We treat your building like our own.',
  },
  {
    id: 'community',
    icon: Users,
    title: 'Community',
    desc: "We're East Tennessee locals. We invest in this region, hire locally, and take pride in keeping our neighbors moving.",
  },
  {
    id: 'craftsmanship',
    icon: Heart,
    title: 'Craftsmanship',
    desc: "Our mechanics take pride in their work. A service call isn't complete until the equipment performs exactly as it should.",
  },
]

const certifications = [
  { id: 'cert-asme',     text: 'ASME A17.1 Safety Code Compliant' },
  { id: 'cert-license',  text: 'State of Tennessee Licensed Elevator Contractors' },
  { id: 'cert-neiep',    text: 'NEIEP-Trained Mechanics' },
  { id: 'cert-bonded',   text: 'Fully Bonded & Insured' },
  { id: 'cert-osha',     text: 'OSHA Safety Certified' },
  { id: 'cert-training', text: 'Continuing Education & Manufacturer Training' },
]

const buildingTypes = [
  { id: 'bt-office',      text: 'Office Buildings' },
  { id: 'bt-hotels',      text: 'Hotels & Hospitality' },
  { id: 'bt-hospitals',   text: 'Hospitals & Healthcare' },
  { id: 'bt-residential', text: 'Multifamily Residential' },
  { id: 'bt-retail',      text: 'Retail & Mixed-Use' },
  { id: 'bt-industrial',  text: 'Industrial & Warehouse' },
  { id: 'bt-government',  text: 'Government & Municipal' },
  { id: 'bt-education',   text: 'Educational Institutions' },
]

export default function About() {
  return (
    <div>
      {/* ── Page hero ── */}
      <section
        className="relative pt-32 pb-20 bg-forge-navy overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to bottom right, rgb(var(--forge-navy-rgb) / 0.96) 0%, rgb(var(--forge-steel-rgb) / 0.85) 100%),
            url('https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1400&q=80&fit=crop')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EditableField id="about-hero-eyebrow" label="About › Hero › Eyebrow" as="p" className="section-label mb-3">
            About Forge Elevator
          </EditableField>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            <EditableField id="about-hero-h1-line1" label="About › Hero › Headline — line 1" as="span">
              Built on Reputation.
            </EditableField>
            <br />
            <EditableField id="about-hero-h1-line2" label="About › Hero › Headline — line 2" as="span">
              Driven by Service.
            </EditableField>
          </h1>
          <EditableField
            id="about-hero-body"
            label="About › Hero › Body paragraph"
            as="p"
            multiline
            className="text-gray-300 text-lg max-w-2xl leading-relaxed"
          >
            Forge Elevator was founded with a single mission: give East Tennessee businesses and property
            owners an elevator service partner they can actually rely on — responsive, honest, and skilled.
          </EditableField>
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
            <EditableField id="about-story-eyebrow" label="About › Story › Eyebrow" as="p" className="section-label mb-3">
              Our Story
            </EditableField>
            <EditableField id="about-story-title" label="About › Story › Title" as="h2" className="section-title mb-6">
              Local Roots, Professional Standards
            </EditableField>
            <EditableField
              id="about-story-p1"
              label="About › Story › Paragraph 1"
              as="p"
              multiline
              className="text-gray-500 leading-relaxed mb-5"
            >
              Forge Elevator was born from a simple frustration: building owners in East Tennessee deserved
              better elevator service. Too often, large national companies treated local clients like low
              priorities — slow response times, impersonal service, and technicians who had never even
              visited the client's building before.
            </EditableField>
            <EditableField
              id="about-story-p2"
              label="About › Story › Paragraph 2"
              as="p"
              multiline
              className="text-gray-500 leading-relaxed mb-5"
            >
              We set out to change that. As a locally owned company, we know the Knoxville metro and
              surrounding East Tennessee communities. We build real relationships with building managers,
              property owners, and facilities teams. When you call us, you get a person — not a queue.
            </EditableField>
            <EditableField
              id="about-story-p3"
              label="About › Story › Paragraph 3"
              as="p"
              multiline
              className="text-gray-500 leading-relaxed"
            >
              Our mechanics are licensed, factory-trained, and deeply experienced with the full range of
              elevator systems — from vintage hydraulic units in historic downtown buildings to modern
              traction systems in new commercial towers.
            </EditableField>
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
              <EditableField id="about-story-badge-line1" label="About › Story › Badge — line 1" as="p" className="font-display text-3xl font-bold text-white leading-none">East</EditableField>
              <EditableField id="about-story-badge-line2" label="About › Story › Badge — line 2" as="p" className="font-display text-2xl font-bold text-white leading-none">Tennessee</EditableField>
              <EditableField id="about-story-badge-sub" label="About › Story › Badge — subtitle" as="p" className="text-xs font-semibold text-white/80 uppercase tracking-widest mt-1">Proudly Serving</EditableField>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 bg-forge-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <EditableField id="about-values-eyebrow" label="About › Values › Eyebrow" as="p" className="section-label mb-3">
              What We Stand For
            </EditableField>
            <EditableField id="about-values-title" label="About › Values › Title" as="h2" className="section-title">
              Our Core Values
            </EditableField>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ id, icon: Icon, title, desc }) => (
              <div key={id} className="card p-7 text-center">
                <div className="w-14 h-14 bg-forge-fire rounded-full flex items-center justify-center mx-auto mb-5">
                  <Icon size={24} className="text-white" />
                </div>
                <EditableField
                  id={`about-value-${id}-title`}
                  label={`About › Values › ${title} — title`}
                  as="h3"
                  className="font-semibold text-forge-navy text-lg mb-2"
                >
                  {title}
                </EditableField>
                <EditableField
                  id={`about-value-${id}-desc`}
                  label={`About › Values › ${title} — description`}
                  as="p"
                  multiline
                  className="text-gray-500 text-sm leading-relaxed"
                >
                  {desc}
                </EditableField>
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
            <EditableField id="about-creds-eyebrow" label="About › Credentials › Eyebrow" as="p" className="section-label mb-3">
              Credentials
            </EditableField>
            <EditableField id="about-creds-title" label="About › Credentials › Title" as="h2" className="section-title mb-6">
              Licensed, Certified &amp; Compliant
            </EditableField>
            <EditableField
              id="about-creds-body"
              label="About › Credentials › Body paragraph"
              as="p"
              multiline
              className="text-gray-500 mb-8 leading-relaxed"
            >
              We take compliance seriously. All Forge Elevator technicians hold current state licenses
              and receive ongoing education to stay ahead of code requirements and new equipment standards.
            </EditableField>
            <ul className="space-y-3">
              {certifications.map(({ id, text }) => (
                <li key={id} className="flex items-center gap-3 text-gray-700 text-sm">
                  <CheckCircle2 size={16} className="text-forge-fire flex-shrink-0" />
                  <EditableField id={`about-${id}`} label={`About › Credentials › ${text}`}>
                    {text}
                  </EditableField>
                </li>
              ))}
            </ul>
          </div>

          {/* Building types */}
          <div>
            <EditableField id="about-buildings-eyebrow" label="About › Buildings › Eyebrow" as="p" className="section-label mb-3">
              Who We Serve
            </EditableField>
            <EditableField id="about-buildings-title" label="About › Buildings › Title" as="h2" className="section-title mb-6">
              Buildings of All Types
            </EditableField>
            <EditableField
              id="about-buildings-body"
              label="About › Buildings › Body paragraph"
              as="p"
              multiline
              className="text-gray-500 mb-8 leading-relaxed"
            >
              From a single-elevator boutique hotel to a multi-unit hospital complex, Forge Elevator
              has the experience to handle vertical transportation across every building type.
            </EditableField>
            <div className="grid grid-cols-2 gap-3">
              {buildingTypes.map(({ id, text }) => (
                <div
                  key={id}
                  className="flex items-center gap-2 bg-forge-light rounded-sm px-4 py-3 text-sm text-forge-navy font-medium border border-gray-100"
                >
                  <span className="w-1.5 h-1.5 bg-forge-fire rounded-full flex-shrink-0" />
                  <EditableField id={`about-${id}`} label={`About › Buildings › ${text}`}>
                    {text}
                  </EditableField>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-forge-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <EditableField
            id="about-cta-headline"
            label="About › CTA › Headline"
            as="h2"
            className="font-display text-4xl font-bold text-white mb-4"
          >
            Ready to Work With Us?
          </EditableField>
          <EditableField
            id="about-cta-body"
            label="About › CTA › Body paragraph"
            as="p"
            multiline
            className="text-gray-300 mb-8 max-w-md mx-auto"
          >
            Get in touch for a free consultation or request emergency service right now.
          </EditableField>
          <Link to="/contact" className="btn-primary text-base px-10 py-4">
            Contact Forge Elevator <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
