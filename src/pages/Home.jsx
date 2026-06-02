import { Link } from 'react-router-dom'
import {
  Phone, ArrowRight, ShieldCheck, Clock, Wrench, Award,
  CheckCircle2, ChevronRight, Settings, Zap, Building2,
} from 'lucide-react'
import EditableField from '../components/EditableField'

const services = [
  {
    id: 'maintenance',
    icon: Wrench,
    title: 'Preventive Maintenance',
    desc: 'Is the foundation of Forge Elevator. We bring back old-school maintenance principles back to the industry — finding and fixing problems before they become failures.',
  },
  {
    id: 'emergency',
    icon: Zap,
    title: 'Emergency Service',
    desc: '24/7 rapid-response service. Our technicians are on call around the clock for entrapments and critical failures. We pick up!',
  },
  {
    id: 'modernization',
    icon: Settings,
    title: 'Modernization- Traction and Hydraulic',
    desc: 'Modernizations done right. We focus on the upgrades that matter most, delivering reliable, non-proprietary solutions that improve performance, increase reliability, and maximize long-term value.',
  },
  {
    id: 'inspections',
    icon: ShieldCheck,
    title: 'Safety Inspections',
    desc: 'Annual and code-compliance inspections by licensed inspectors to keep your equipment up to state standards.',
  },
  {
    id: 'new-construction',
    icon: Building2,
    title: 'Residential',
    desc: 'Expert Residential elevator service including install, maintain, repair and modernization tailored to your home and lifestyle.',
  },
  {
    id: 'hydraulic',
    icon: Award,
    title: 'Repairs',
    desc: "We don't believe in temporary fixes. Our repair solutions address the root cause to restore performance, reliability, and peace of mind.",
  },
]

const stats = [
  { id: 'emergency-response', value: '24/7',    label: 'Emergency Response' },
  { id: 'experience',         value: '50+',     label: 'Years of Experience' },
  { id: 'insured',            value: '100%',    label: 'Licensed & Insured' },
  { id: 'service-area',       value: 'East TN', label: 'Service Area' },
]

const why = [
  { id: 'locally-owned', text: 'Locally owned and operated in East Tennessee' },
  { id: 'licensed',      text: 'IUEC-trained, licensed elevator mechanics' },
  { id: 'fast-response', text: 'Fast response times — we pick up!' },
  { id: 'pricing',       text: 'Transparent pricing with no hidden fees' },
  { id: 'contracts',     text: 'Simple contracts tailored to customer needs!' },
  { id: 'all-types',     text: 'All elevator types: traction, hydraulic, commercial, residential' },
]

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden bg-forge-navy"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom right,
              rgb(var(--forge-navy-rgb) / 0.92) 0%,
              rgb(var(--forge-steel-rgb) / 0.80) 60%,
              rgb(var(--forge-navy-rgb) / 0.95) 100%
            ),
            url('/assets/hero.png')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="max-w-3xl lg:max-w-4xl">
            <EditableField
              id="home-hero-eyebrow"
              label="Home › Hero › Eyebrow"
              as="p"
              className="section-label mb-3"
            >
              East Tennessee's Elevator Specialists
            </EditableField>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              <EditableField id="home-hero-h1-line1" label="Home › Hero › Headline — line 1" as="span">
                WE'RE NOT THE BIGGEST.
              </EditableField>
              <EditableField
                id="home-hero-h1-line2"
                label="Home › Hero › Headline — line 2 (accent)"
                as="span"
                className="block text-forge-fire"
              >
                JUST THE ONES WHO ANSWER!
              </EditableField>
            </h1>
            <EditableField
              id="home-hero-body"
              label="Home › Hero › Body paragraph"
              as="p"
              multiline
              className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl"
            >
              To bring old-school maintenance and customer service back to the elevator industry by
              delivering reliable, honest, and non-proprietary solutions that put our
              customers — not manufacturers — first.
            </EditableField>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-primary text-base px-8 py-4">
                Request Service <ArrowRight size={18} />
              </Link>
              <a href="tel:+18658030633" className="btn-outline text-base px-8 py-4">
                <Phone size={18} /> (865) 803-0633
              </a>
            </div>
          </div>
        </div>

        {/* Decorative angled edge */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        />
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map(({ id, value, label }) => (
              <div key={id} className="py-6 px-4 sm:py-10 sm:px-6 text-center">
                <EditableField
                  id={`home-stat-${id}-value`}
                  label={`Home › Stats › ${label} — value`}
                  as="p"
                  className="font-display text-4xl font-bold text-forge-fire"
                >
                  {value}
                </EditableField>
                <EditableField
                  id={`home-stat-${id}-label`}
                  label={`Home › Stats › ${label} — label`}
                  as="p"
                  className="text-sm text-gray-500 font-medium mt-1"
                >
                  {label}
                </EditableField>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services grid ── */}
      <section className="py-24 bg-forge-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <EditableField
              id="home-services-eyebrow"
              label="Home › Services Grid › Eyebrow"
              as="p"
              className="section-label mb-3"
            >
              What We Do
            </EditableField>
            <EditableField
              id="home-services-title"
              label="Home › Services Grid › Title"
              as="h2"
              className="section-title mb-4"
            >
              Elevator Solutions Made Simple.
            </EditableField>
            <EditableField
              id="home-services-body"
              label="Home › Services Grid › Body paragraph"
              as="p"
              multiline
              className="text-gray-500 max-w-xl mx-auto"
            >
              At Forge Elevator, we specialize in preventative maintenance, repairs, modernizations,
              inspections, and emergency service for all major elevator manufacturers. Our goal is
              simple: keep your elevators running safely, reliably, and efficiently while delivering
              the responsive service and personal attention that large corporations often overlook.
              Whether you need routine maintenance, a major modernization, or 24/7 support, Forge
              Elevator is committed to providing honest recommendations, quality workmanship, and
              long-term value.
            </EditableField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ id, icon: Icon, title, desc }) => (
              <div key={id} className="card p-6 group">
                <div className="w-12 h-12 bg-forge-fire/10 rounded-sm flex items-center justify-center mb-5 group-hover:bg-forge-fire group-hover:text-forge-navy transition-colors">
                  <Icon size={22} className="text-forge-fire group-hover:text-forge-navy transition-colors" />
                </div>
                <EditableField
                  id={`home-service-${id}-title`}
                  label={`Home › Services Grid › ${title} — title`}
                  as="h3"
                  className="font-semibold text-forge-navy text-lg mb-2"
                >
                  {title}
                </EditableField>
                <EditableField
                  id={`home-service-${id}-desc`}
                  label={`Home › Services Grid › ${title} — description`}
                  as="p"
                  multiline
                  className="text-gray-500 text-sm leading-relaxed"
                >
                  {desc}
                </EditableField>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="inline-flex items-center gap-2 text-forge-fire font-semibold hover:underline text-sm">
              View all services <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Forge — split ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: visual */}
          <div className="relative">
            <div
              className="aspect-[4/3] rounded-sm overflow-hidden"
              style={{
                backgroundImage: `url('/assets/experts.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Badge overlay */}
            <div className="absolute -bottom-5 -right-5 bg-forge-fire text-forge-navy rounded-sm p-5 shadow-xl hidden sm:block">
              <Clock size={28} className="mb-1" />
              <EditableField id="home-why-badge-value" label="Home › Why Forge › Badge value" as="p" className="font-display text-2xl font-bold leading-none">24/7</EditableField>
              <EditableField id="home-why-badge-label" label="Home › Why Forge › Badge label" as="p" className="text-xs font-medium uppercase tracking-widest mt-1">On Call</EditableField>
            </div>
          </div>

          {/* Right: content */}
          <div>
            <EditableField
              id="home-why-eyebrow"
              label="Home › Why Forge › Eyebrow"
              as="p"
              className="section-label mb-3"
            >
              Why Choose Forge
            </EditableField>
            <EditableField
              id="home-why-title"
              label="Home › Why Forge › Title"
              as="h2"
              className="section-title mb-6"
            >
              East Tennessee's Local Elevator Experts
            </EditableField>
            <EditableField
              id="home-why-body"
              label="Home › Why Forge › Body paragraph"
              as="p"
              multiline
              className="text-gray-500 mb-8 leading-relaxed"
            >
              When your elevator is down, every minute counts. Forge Elevator was built on the belief
              that building owners and managers deserve fast, honest, and expert service — without the
              runaround. We're your neighbors, and we stand behind our work.
            </EditableField>
            <ul className="space-y-3 mb-8">
              {why.map(({ id, text }) => (
                <li key={id} className="flex items-start gap-3 text-gray-700 text-sm">
                  <CheckCircle2 size={17} className="text-forge-fire mt-0.5 flex-shrink-0" />
                  <EditableField
                    id={`home-why-${id}`}
                    label={`Home › Why Forge › Bullet — "${text.slice(0, 32)}…"`}
                  >
                    {text}
                  </EditableField>
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn-primary">
              About Our Company <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Emergency CTA band ── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgb(var(--forge-navy-rgb)) 0%, rgb(var(--forge-steel-rgb)) 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <EditableField
            id="home-emergency-eyebrow"
            label="Home › Emergency CTA › Eyebrow"
            as="p"
            className="section-label mb-3"
          >
            Emergency Elevator Service
          </EditableField>
          <EditableField
            id="home-emergency-headline"
            label="Home › Emergency CTA › Headline"
            as="h2"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Elevator Down? We Respond Fast.
          </EditableField>
          <EditableField
            id="home-emergency-body"
            label="Home › Emergency CTA › Body paragraph"
            as="p"
            multiline
            className="text-gray-300 mb-8 max-w-lg mx-auto"
          >
            Passenger entrapments and equipment failures can't wait for business hours.
            When your elevator is down, excuses don't get it running again. Our team is available 24/7 to deliver the responsive service and support your building deserves.
          </EditableField>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+18658030633" className="btn-primary text-lg px-10 py-4">
              <Phone size={20} /> Call Now: (865) 803-0633
            </a>
            <Link to="/contact" className="btn-outline text-lg px-10 py-4">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ── Compliance notice strip ── */}
      <section className="bg-forge-light border-t border-forge-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <ShieldCheck size={40} className="text-forge-fire flex-shrink-0" />
          <div>
            <EditableField
              id="home-compliance-title"
              label="Home › Compliance Strip › Title"
              as="h3"
              className="font-semibold text-forge-navy text-lg"
            >
              Fully Licensed &amp; Insured
            </EditableField>
            <EditableField
              id="home-compliance-body"
              label="Home › Compliance Strip › Body paragraph"
              as="p"
              multiline
              className="text-gray-500 text-sm mt-1"
            >
              Forge Elevator complies with all ASME A17.1 Safety Code requirements and Tennessee state
              elevator regulations. Our technicians hold current elevator mechanic licenses and receive
              ongoing training on the latest standards and equipment.
            </EditableField>
          </div>
        </div>
      </section>
    </div>
  )
}
