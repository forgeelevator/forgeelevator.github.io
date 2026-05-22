import { Link } from 'react-router-dom'
import {
  Phone, ArrowRight, ShieldCheck, Clock, Wrench, Award,
  CheckCircle2, ChevronRight, Settings, Zap, Building2
} from 'lucide-react'

const services = [
  {
    icon: Wrench,
    title: 'Preventive Maintenance',
    desc: 'Scheduled inspections and lubrication keep your equipment running safely and reduce costly downtime.',
  },
  {
    icon: Zap,
    title: 'Emergency Repair',
    desc: '24/7 rapid-response service. Our technicians are on call around the clock for entrapments and critical failures.',
  },
  {
    icon: Settings,
    title: 'Modernization',
    desc: 'Update aging equipment with modern controls, drives, and interiors — extending service life and improving efficiency.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety Inspections',
    desc: 'Annual and code-compliance inspections by licensed inspectors to keep your equipment up to state standards.',
  },
  {
    icon: Building2,
    title: 'New Construction',
    desc: 'Coordination with general contractors and architects from layout planning through final commissioning.',
  },
  {
    icon: Award,
    title: 'Hydraulic Systems',
    desc: 'Full service on hydraulic elevators including fluid management, cylinder repair, and valve adjustment.',
  },
]

const stats = [
  { value: '24/7', label: 'Emergency Response' },
  { value: '10+', label: 'Years of Experience' },
  { value: '100%', label: 'Licensed & Insured' },
  { value: 'East TN', label: 'Service Area' },
]

const why = [
  'Locally owned and operated in East Tennessee',
  'Factory-trained, licensed elevator mechanics',
  'Fast response times — we\'re where you need us',
  'Transparent pricing with no hidden fees',
  'Comprehensive maintenance contracts',
  'All elevator types: traction, hydraulic, commercial, residential',
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
            <p className="section-label mb-3">East Tennessee's Elevator Specialists</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Keeping East Tennessee
              <span className="block text-forge-fire">Moving Safely.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              From routine maintenance to emergency repairs and full modernizations — Forge Elevator
              delivers dependable, code-compliant service backed by licensed mechanics and a commitment
              to getting it right the first time.
            </p>
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
            {stats.map(({ value, label }) => (
              <div key={label} className="py-10 px-6 text-center">
                <p className="font-display text-4xl font-bold text-forge-fire">{value}</p>
                <p className="text-sm text-gray-500 font-medium mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services grid ── */}
      <section className="py-24 bg-forge-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">What We Do</p>
            <h2 className="section-title mb-4">Complete Elevator Solutions</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Whether you manage a single building or a large commercial portfolio,
              we have the expertise to keep your vertical transportation reliable and compliant.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 group">
                <div className="w-12 h-12 bg-forge-fire/10 rounded-sm flex items-center justify-center mb-5 group-hover:bg-forge-fire group-hover:text-white transition-colors">
                  <Icon size={22} className="text-forge-fire group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-forge-navy text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
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
              <p className="font-display text-2xl font-bold leading-none">24/7</p>
              <p className="text-xs font-medium uppercase tracking-widest mt-1">On Call</p>
            </div>
          </div>

          {/* Right: content */}
          <div>
            <p className="section-label mb-3">Why Choose Forge</p>
            <h2 className="section-title mb-6">East Tennessee's Local Elevator Experts</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              When your elevator is down, every minute counts. Forge Elevator was built on the belief
              that building owners and managers deserve fast, honest, and expert service — without the
              runaround. We're your neighbors, and we stand behind our work.
            </p>
            <ul className="space-y-3 mb-8">
              {why.map((point) => (
                <li key={point} className="flex items-start gap-3 text-gray-700 text-sm">
                  <CheckCircle2 size={17} className="text-forge-fire mt-0.5 flex-shrink-0" />
                  {point}
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
        style={{
          background: 'linear-gradient(135deg, #0d1f35 0%, #1e3a5f 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">Emergency Elevator Service</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Elevator Down? We Respond Fast.
          </h2>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto">
            Passenger entrapments and equipment failures don't wait for business hours.
            Our licensed technicians are available 24 hours a day, 7 days a week.
          </p>
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
            <h3 className="font-semibold text-forge-navy text-lg">Fully Licensed, Bonded &amp; Insured</h3>
            <p className="text-gray-500 text-sm mt-1">
              Forge Elevator complies with all ASME A17.1 Safety Code requirements and Tennessee state
              elevator regulations. Our technicians hold current elevator mechanic licenses and receive
              ongoing training on the latest standards and equipment.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
