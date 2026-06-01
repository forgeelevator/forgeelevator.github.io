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
    desc: `Preventive maintenance is the foundation of Forge Elevator. We bring old-school maintenance principles back to the industry — finding and fixing problems before they become failures.`,
    bullets: [
      'Multiple service contracts available',
      'Lubrication of all moving parts and guide shoes',
      'Inspection of ropes, cables, chains, and suspension components',
      'Routine door maintenance',
      'Controller diagnostics and code required software verification',
      'Pit and machine room inspections',
      'Detailed service reports after every visit',
    ],
    tag: 'Service Contracts Available',
  },
  {
    id: 'emergency',
    icon: Zap,
    title: 'Emergency Service',
    headline: '24/7 Rapid Response — Day or Night',
    desc: `Passenger entrapments and equipment failures can't wait until Monday morning. That's why our team is available 24/7, providing rapid response and real support when it matters most.`,
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
    title: 'Modernization — Traction and Hydraulic',
    headline: 'New Life for Aging Equipment',
    desc: `Modernizations done right. We utilize non-proprietary, non-obsolescent solutions designed for
    long-term reliability and serviceability. In an industry where newer equipment is often engineered
    toward obsolescence, we focus on upgrades that keep your elevators running longer, reduce future
    costs, and protect your investment. By avoiding proprietary systems, any qualified elevator service
    provider can maintain your equipment — keeping you in control, not the manufacturer.`,
    bullets: [
      'Control system & Drive replacement and reprogramming',
      'Motor, Machine, Pumping Unit, install and replacement',
      'Door operator replacement and upgrade',
      'Cab interior renovation, cladding and ADA compliance updates',
      'Lighting & fixture enhancement (LED)',
      'Cellular generated phone line upgrades',
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
      'Five-year full load and rupture valve testing',
      'Detailed written inspection reports',
      'ASME A17.1 Safety Code compliance review',
      'ADA compliance review on request',
    ],
    tag: 'Code Compliant',
  },
  {
    id: 'new-construction',
    icon: Building2,
    title: 'Residential',
    headline: 'Right-Sized Vertical Transportation from Day One',
    desc: `Residential — free estimates and consultation.`,
    bullets: [
      'Consultation during design and specification phases',
      'Equipment selection and vendor coordination',
      'Modernization & technology upgrades',
    ],
    tag: 'New Builds Welcome',
  },
  {
    id: 'hydraulic',
    icon: Droplets,
    title: 'Repairs',
    headline: 'Specialized Expertise in Hydraulic Systems',
    desc: `We repair elevators of all makes and models, including controllers, drives, motors, pumps, door operators, safety devices, and other critical components. Our technicians provide prompt, reliable solutions to restore safe and dependable operation.`,
    bullets: [
      'Controllers & Drives',
      'All hydraulic system and pumps',
      'Door operator and door equipment',
      'Safety devices',
      'Other critical components',
    ],
    cardBody: 'Need help now? Call our team for immediate assistance or to schedule a repair call.',
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
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
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
            At Forge Elevator, we keep people moving. We specialize in preventative maintenance,
            repairs, modernizations, inspections, and emergency service for all major elevator
            manufacturers. Our goal is simple: keep your elevators running safely, reliably, and
            efficiently while delivering the responsive service and personal attention that large
            corporations often overlook. Whether you need routine maintenance, a major modernization,
            or 24/7 support, Forge Elevator is committed to providing honest recommendations,
            quality workmanship, and long-term value.
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
      {services.map(({ id, icon: Icon, title, headline, desc, bullets, tag, cardBody }, i) => (
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
                    {cardBody || 'Need help now? Call our team for immediate assistance or to schedule a service call.'}
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
              className="font-display text-3xl font-bold text-forge-navy"
            >
              Don't See What You Need?
            </EditableField>
            <EditableField
              id="services-cta-body"
              label="Services › Bottom CTA › Body"
              as="p"
              className="text-forge-navy/80 mt-1"
            >
              Contact us — if it's elevator-related, we can help.
            </EditableField>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 border-2 border-forge-navy text-forge-navy font-semibold text-base px-8 py-4 rounded-sm hover:bg-forge-navy hover:text-white transition-colors duration-200 flex-shrink-0">
            Get in Touch <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
