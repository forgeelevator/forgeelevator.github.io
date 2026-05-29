import { Link } from 'react-router-dom'
import {
  Wrench, Zap, Settings, ShieldCheck, Building2, Droplets,
  Phone, ArrowRight, CheckCircle2
} from 'lucide-react'
import { useEdit } from '../context/EditContext'
import EditableField from '../components/EditableField'
import { useGlobal } from '../components/GlobalField'
import { phoneToHref } from '../utils/globals'

const services = [
  {
    id: 'maintenance',
    icon: Wrench,
    title: 'Preventive Maintenance',
    headline: 'Proactive Care That Prevents Downtime',
    desc: `Regular preventive maintenance is the single most effective way to maximize elevator uptime,
    extend equipment life, and reduce the risk of unexpected failures. Our comprehensive maintenance
    programs are tailored to your equipment type, usage volume, and budget.`,
    bullets: [
      'Monthly, quarterly, and annual service contracts available',
      'Lubrication of all moving parts and guide shoes',
      'Inspection of ropes, cables, chains, and suspension components',
      'Door operator alignment and interlock testing',
      'Controller diagnostics and software verification',
      'Pit and machine room inspections',
      'Detailed service reports after every visit',
    ],
    tag: 'Service Contracts Available',
  },
  {
    id: 'emergency',
    icon: Zap,
    title: 'Emergency Repair',
    headline: '24/7 Rapid Response — Day or Night',
    desc: `Elevator failures and passenger entrapments can happen at any hour. Forge Elevator maintains
    a team of on-call technicians available around the clock to respond quickly, safely resolve
    entrapments, diagnose the failure, and restore service as fast as possible.`,
    bullets: [
      '24-hour, 7-day-a-week emergency dispatch',
      'Fast response to passenger entrapments',
      'Troubleshooting of all major elevator systems',
      'Parts inventory for common failures',
      'After-service written diagnosis report',
      'Follow-up preventive recommendations',
    ],
    tag: '24/7 Available',
  },
  {
    id: 'modernization',
    icon: Settings,
    title: 'Modernization & Upgrades',
    headline: 'New Life for Aging Equipment',
    desc: `Elevator systems from the 1980s and 1990s are still common across East Tennessee's commercial
    building stock. Modernization replaces worn-out controls, motors, and drives with state-of-the-art
    components — improving reliability, energy efficiency, ride quality, and compliance.`,
    bullets: [
      'Control system replacement and reprogramming',
      'Drive unit modernization (MG set to variable-voltage variable-frequency)',
      'Door operator replacement and upgrade',
      'Cab interior renovation and ADA compliance updates',
      'Lighting retrofit (LED)',
      'Communication system upgrades',
      'Fixture replacement and leveling improvements',
    ],
    tag: 'Extend Equipment Life',
  },
  {
    id: 'inspections',
    icon: ShieldCheck,
    title: 'Safety Inspections & Code Compliance',
    headline: 'Stay Current, Stay Compliant',
    desc: `Tennessee state law requires annual safety inspections of all commercial elevators. Our
    licensed inspectors perform thorough inspections to identify code deficiencies and help you
    address them before they become violations or safety hazards.`,
    bullets: [
      'Annual safety inspections as required by Tennessee state code',
      'ASME A17.1 Safety Code compliance review',
      'Detailed written inspection reports',
      'Written correction plans for any deficiencies',
      'Assistance with fire service and Phase III testing',
      'ADA compliance review on request',
    ],
    tag: 'Code Compliant',
  },
  {
    id: 'new-construction',
    icon: Building2,
    title: 'New Construction',
    headline: 'Right-Sized Vertical Transportation from Day One',
    desc: `Getting vertical transportation right during construction saves you time, money, and headaches
    for decades to come. Forge Elevator partners with architects, general contractors, and developers
    to plan, specify, install, and commission new elevator systems for your project.`,
    bullets: [
      'Consultation during design and specification phases',
      'Equipment selection and vendor coordination',
      'Hoistway layout guidance',
      'Installation oversight and quality control',
      'Final acceptance testing and commissioning',
      'Owner training and handoff',
    ],
    tag: 'New Builds Welcome',
  },
  {
    id: 'hydraulic',
    icon: Droplets,
    title: 'Hydraulic Elevator Service',
    headline: 'Specialized Expertise in Hydraulic Systems',
    desc: `Hydraulic elevators require specialized knowledge of fluid dynamics, cylinder integrity, and
    valve performance that differs significantly from traction systems. Our technicians are trained
    to service all major hydraulic elevator configurations, from in-ground to telescoping units.`,
    bullets: [
      'Hydraulic fluid replacement and environmental compliance',
      'Cylinder integrity testing and leak detection',
      'Valve adjustment and replacement',
      'Power unit service and pump replacement',
      'Buried cylinder corrosion assessment',
      'Roped hydraulic system service',
      'Tank and piping inspection',
    ],
    tag: 'Traction & Hydraulic',
  },
]

export default function Services() {
  const { isAdmin } = useEdit()
  const phone = useGlobal('global-phone')

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative pt-32 pb-20 bg-forge-navy overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to bottom right, rgb(var(--forge-navy-rgb) / 0.95) 0%, rgb(var(--forge-steel-rgb) / 0.88) 100%),
            url('https://images.unsplash.com/photo-1590650213165-c1fef80648c4?w=1400&q=80&fit=crop')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EditableField id="services-hero-eyebrow" label="Services › Hero › Eyebrow" as="p" className="section-label mb-3">
            What We Offer
          </EditableField>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            <EditableField id="services-hero-h1-line1" label="Services › Hero › Headline — line 1" as="span">
              Full-Spectrum
            </EditableField>
            <br />
            <EditableField id="services-hero-h1-line2" label="Services › Hero › Headline — line 2" as="span">
              Elevator Services
            </EditableField>
          </h1>
          <EditableField
            id="services-hero-body"
            label="Services › Hero › Body paragraph"
            as="p"
            multiline
            className="text-gray-300 text-lg max-w-2xl leading-relaxed"
          >
            From routine maintenance contracts to full modernizations and 24/7 emergency response —
            Forge Elevator covers it all for East Tennessee property owners and managers.
          </EditableField>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-12 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        />
      </section>

      {/* ── Quick nav anchors — offset accounts for EditBar when admin ── */}
      <section className={`bg-white border-b border-gray-200 sticky ${isAdmin ? 'top-[100px] md:top-[116px]' : 'top-16 md:top-20'} z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-0 scrollbar-hide">
            {services.map(({ id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                className="whitespace-nowrap text-xs font-medium text-gray-500 hover:text-forge-fire border-b-2 border-transparent hover:border-forge-fire py-4 px-4 transition-colors flex-shrink-0"
              >
                <EditableField id={`services-${id}-nav-tab`} label={`Services › Nav Tab › ${title}`}>
                  {title}
                </EditableField>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service detail sections ── */}
      {services.map(({ id, icon: Icon, title, headline, desc, bullets, tag }, i) => (
        <section
          key={id}
          id={id}
          className={`py-20 ${i % 2 === 0 ? 'bg-white' : 'bg-forge-light'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid md:grid-cols-2 gap-14 items-start ${i % 2 !== 0 ? 'md:[&>*:first-child]:order-2' : ''}`}>

              {/* Text */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 bg-forge-fire/10 text-forge-fire text-xs font-semibold px-3 py-1 rounded-full">
                    <Icon size={12} />
                    <EditableField id={`services-${id}-tag`} label={`Services › ${title} › Tag badge`}>
                      {tag}
                    </EditableField>
                  </span>
                </div>
                <EditableField
                  id={`services-${id}-title`}
                  label={`Services › ${title} › Title`}
                  as="h2"
                  className="font-display text-3xl md:text-4xl font-bold text-forge-navy mb-3"
                >
                  {title}
                </EditableField>
                <EditableField
                  id={`services-${id}-headline`}
                  label={`Services › ${title} › Headline (accent)`}
                  as="p"
                  className="text-forge-fire font-semibold text-sm mb-4"
                >
                  {headline}
                </EditableField>
                <EditableField
                  id={`services-${id}-desc`}
                  label={`Services › ${title} › Description paragraph`}
                  as="p"
                  multiline
                  className="text-gray-500 leading-relaxed mb-6"
                >
                  {desc}
                </EditableField>
                <ul className="space-y-2.5">
                  {bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-3 text-gray-700 text-sm">
                      <CheckCircle2 size={16} className="text-forge-fire mt-0.5 flex-shrink-0" />
                      <EditableField
                        id={`services-${id}-bullet-${bi + 1}`}
                        label={`Services › ${title} › Bullet ${bi + 1}`}
                      >
                        {b}
                      </EditableField>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link to="/contact" className="btn-primary text-sm">
                    Request This Service <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Accent visual */}
              <div className="relative mt-6 md:mt-0">
                <div className="bg-forge-navy rounded-sm p-8 text-white">
                  <div className="w-14 h-14 bg-forge-fire rounded-sm flex items-center justify-center mb-6">
                    <Icon size={26} className="text-white" />
                  </div>
                  <EditableField
                    id={`services-${id}-card-title`}
                    label={`Services › ${title} › Card title`}
                    as="h3"
                    className="font-display text-2xl font-bold mb-3"
                  >
                    {title}
                  </EditableField>
                  <EditableField
                    id={`services-${id}-card-body`}
                    label={`Services › ${title} › Card call-to-action text`}
                    as="p"
                    multiline
                    className="text-gray-400 text-sm leading-relaxed mb-6"
                  >
                    Need help now? Call our team for immediate assistance or to schedule a service call.
                  </EditableField>
                  <a href={phoneToHref(phone)} className="flex items-center gap-2 text-forge-fire font-semibold text-sm hover:underline">
                    <Phone size={16} />
                    {phone}
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ── */}
      <section className="bg-forge-fire py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <EditableField
              id="services-cta-headline"
              label="Services › Bottom CTA › Headline"
              as="h2"
              className="font-display text-3xl font-bold text-white"
            >
              Don't See What You Need?
            </EditableField>
            <EditableField
              id="services-cta-body"
              label="Services › Bottom CTA › Body"
              as="p"
              className="text-white/80 mt-1"
            >
              Contact us — if it's elevator-related, we can help.
            </EditableField>
          </div>
          <Link to="/contact" className="btn-outline flex-shrink-0 text-base px-8 py-4">
            Get in Touch <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
