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
    desc: 'Scheduled inspections and lubrication keep your equipment running safely and reduce costly downtime.',
  },
  {
    id: 'emergency',
    icon: Zap,
    title: 'Emergency Repair',
    desc: '24/7 rapid-response service. Our technicians are on call around the clock for entrapments and critical failures.',
  },
  {
    id: 'modernization',
    icon: Settings,
    title: 'Modernization',
    desc: 'Update aging equipment with modern controls, drives, and interiors — extending service life and improving efficiency.',
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
    title: 'New Construction',
    desc: 'Coordination with general contractors and architects from layout planning through final commissioning.',
  },
  {
    id: 'hydraulic',
    icon: Award,
    title: 'Hydraulic Systems',
    desc: 'Full service on hydraulic elevators including fluid management, cylinder repair, and valve adjustment.',
  },
]

const stats = [
  { id: 'emergency-response', value: '24/7',    label: 'Emergency Response' },
  { id: 'experience',         value: '10+',     label: 'Years of Experience' },
  { id: 'insured',            value: '100%',    label: 'Licensed & Insured' },
  { id: 'service-area',       value: 'East TN', label: 'Service Area' },
]

const why = [
  { id: 'locally-owned', text: 'Locally owned and operated in East Tennessee' },
  { id: 'licensed',      text: 'Factory-trained, licensed elevator mechanics' },
  { id: 'fast-response', text: "Fast response times — we're where you need us" },
  { id: 'pricing',       text: 'Transparent pricing with no hidden fees' },
  { id: 'contracts',     text: 'Comprehensive maintenance contracts' },
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
              rgba(13, 31, 53, 0.92) 0%,
              rgba(30, 58, 95, 0.80) 60%,
              rgba(13, 31, 53, 0.95) 100%
            ),
            url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80&fit=crop')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="max-w-3xl">
            <EditableField
              id="home-hero-eyebrow"
              label="Home › Hero › Eyebrow"
              as="p"
              className="section-label mb-3"
            >
              East Tennessee's Elevator Specialists
            </EditableField>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              <EditableField id="home-hero-h1-line1" label="Home › Hero › Headline — line 1" as="span">
                Keeping East Tennessee
              </EditableField>
              <EditableField
                id="home-hero-h1-line2"
                label="Home › Hero › Headline — line 2 (accent)"
                as="span"
                className="block text-forge-fire"
              >
                Moving Safely.
              </EditableField>
            </h1>
            <EditableField
              id="home-hero-body"
              label="Home › Hero › Body paragraph"
              as="p"
              multiline
              className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl"
            >
              From routine maintenance to emergency repairs and full modernizations — Forge Elevator
              delivers dependable, code-compliant service backed by licensed mechanics and a commitment
              to getting it right the first time.
            </EditableField>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-primary text-base px-8 py-4">
                Request Service <ArrowRight size={18} />
              </Link>
              <a href="tel:+18651234567" className="btn-outline text-base px-8 py-4">
                <Phone size={18} /> (865) 123-4567
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
              <div key={id} className="py-10 px-6 text-center">
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
              Complete Elevator Solutions
            </EditableField>
            <EditableField
              id="home-services-body"
              label="Home › Services Grid › Body paragraph"
              as="p"
              multiline
              className="text-gray-500 max-w-xl mx-auto"
            >
              Whether you manage a single building or a large commercial portfolio,
              we have the expertise to keep your vertical transportation reliable and compliant.
            </EditableField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ id, icon: Icon, title, desc }) => (
              <div key={id} className="card p-6 group">
                <div className="w-12 h-12 bg-forge-fire/10 rounded-sm flex items-center justify-center mb-5 group-hover:bg-forge-fire group-hover:text-white transition-colors">
                  <Icon size={22} className="text-forge-fire group-hover:text-white transition-colors" />
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
                backgroundImage: `url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&fit=crop')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Badge overlay */}
            <div className="absolute -bottom-5 -right-5 bg-forge-fire text-white rounded-sm p-5 shadow-xl hidden sm:block">
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
        style={{ background: 'linear-gradient(135deg, #0d1f35 0%, #1e3a5f 100%)' }}
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
            className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
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
            Passenger entrapments and equipment failures don't wait for business hours.
            Our licensed technicians are available 24 hours a day, 7 days a week.
          </EditableField>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+18651234567" className="btn-primary text-lg px-10 py-4">
              <Phone size={20} /> Call Now: (865) 123-4567
            </a>
            <Link to="/contact" className="btn-outline text-lg px-10 py-4">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ── Compliance notice strip ── */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <ShieldCheck size={40} className="text-forge-fire flex-shrink-0" />
          <div>
            <EditableField
              id="home-compliance-title"
              label="Home › Compliance Strip › Title"
              as="h3"
              className="font-semibold text-forge-navy text-lg"
            >
              Fully Licensed, Bonded &amp; Insured
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
