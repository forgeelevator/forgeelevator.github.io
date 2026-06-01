import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send } from 'lucide-react'
import EditableField from '../components/EditableField'
import GlobalField, { useGlobal } from '../components/GlobalField'
import { phoneToHref, emailToHref } from '../utils/globals'

const SERVICE_TYPES = [
  'Preventive Maintenance',
  'Emergency Repair',
  'Modernization / Upgrade',
  'Safety Inspection',
  'New Construction',
  'Hydraulic System Service',
  'General Inquiry',
]

const URGENCY = [
  { value: 'emergency', label: '🚨 Emergency — Elevator is down / passenger trapped' },
  { value: 'urgent', label: '⚠️ Urgent — Equipment issue needs prompt attention' },
  { value: 'scheduled', label: '📅 Schedule a service visit' },
  { value: 'quote', label: '💬 Request a quote / proposal' },
]

const serviceAreas = [
  { id: 'area-knoxville',   text: 'Knoxville' },
  { id: 'area-oak-ridge',   text: 'Chattanooga' },
  { id: 'area-maryville',   text: 'Tri-Cities' },
  { id: 'area-sevierville', text: 'Sevierville / Gatlinburg' },
  { id: 'area-surrounding', text: 'Surrounding East TN Counties' },
]

export default function Contact() {
  const phone = useGlobal('global-phone')
  const email = useGlobal('global-email')
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    urgency: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    if (!form.urgency) e.urgency = 'Please select a priority'
    if (!form.message.trim()) e.message = 'Please describe what you need'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) {
      setErrors(e2)
      return
    }
    // TODO: wire to Formspree / Netlify Forms / email API
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-forge-light flex items-center justify-center pt-20 pb-20">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="bg-white rounded-sm shadow-lg p-10">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h2 className="font-display text-3xl font-bold text-forge-navy mb-3">Message Received!</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Thanks for reaching out to Forge Elevator. We'll review your request and get back
              to you as soon as possible — typically within one business day for non-emergency requests.
            </p>
            <p className="text-gray-500 text-sm mb-8">
              For immediate emergencies, please call us directly at{' '}
              <a href={phoneToHref(phone)} className="text-forge-fire font-semibold">
                <GlobalField id="global-phone" />
              </a>.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', company: '', email: '', phone: '', service: '', urgency: '', message: '' }) }}
              className="btn-primary w-full justify-center"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative pt-32 pb-20 bg-forge-navy overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(to bottom right, rgb(var(--forge-navy-rgb) / 0.96) 0%, rgb(var(--forge-steel-rgb) / 0.88) 100%),
            url('https://images.unsplash.com/photo-1423592707957-3b212afa6733?w=1400&q=80&fit=crop')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EditableField id="contact-hero-eyebrow" label="Contact › Hero › Eyebrow" as="p" className="section-label mb-3">
            Get In Touch
          </EditableField>
          <EditableField
            id="contact-hero-h1"
            label="Contact › Hero › Headline"
            as="h1"
            className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight mb-5"
          >
            READY FOR AN ELEVATOR PARTNER YOU CAN TRUST?
          </EditableField>
          <EditableField
            id="contact-hero-body"
            label="Contact › Hero › Body paragraph"
            as="p"
            multiline
            className="text-gray-300 text-lg max-w-2xl leading-relaxed"
          >
            Request a quote, schedule a service visit, or reach out for emergency support.
            Whether you need immediate assistance or simply have questions, our team is ready to help.
          </EditableField>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-12 bg-forge-light"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        />
      </section>

      {/* ── Main content ── */}
      <section className="py-16 bg-forge-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-10">

          {/* ── Contact info sidebar ── */}
          <div className="lg:col-span-1">
            {/* Emergency callout */}
            <div className="bg-forge-fire rounded-sm p-6 text-forge-navy mb-6">
              <EditableField
                id="contact-emergency-title"
                label="Contact › Sidebar › Emergency callout title"
                as="h3"
                className="font-display text-xl font-bold mb-2"
              >
                Emergency? Call First.
              </EditableField>
              <EditableField
                id="contact-emergency-body"
                label="Contact › Sidebar › Emergency callout body"
                as="p"
                multiline
                className="text-sm text-forge-navy/80 mb-4"
              >
                Passenger entrapments and equipment failures can't wait until Monday
                morning. That's why our team is available 24/7, providing rapid response and real
                support when it matters most.
              </EditableField>
              <a
                href={phoneToHref(phone)}
                className="flex items-center gap-2 text-forge-navy font-bold text-lg hover:underline"
              >
                <Phone size={20} /> <GlobalField id="global-phone" />
              </a>
              <EditableField id="contact-emergency-hours" label="Contact › Emergency Callout › Hours note" as="p" className="text-xs text-forge-navy/60 mt-1">Available 24 hours, 7 days</EditableField>
            </div>

            {/* Contact details */}
            <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-6 space-y-5">
              <EditableField id="contact-details-heading" label="Contact › Sidebar › 'Contact Details' heading" as="h3" className="font-semibold text-forge-navy">Contact Details</EditableField>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-forge-fire" />
                <div>
                  <EditableField
                    id="global-phone"
                    label="Phone Number"
                    as="span"
                    className="hover:text-forge-fire transition-colors"
                  >
                    (865) 123-4567
                  </EditableField>
                  <EditableField id="contact-info-phone-sub" label="Contact › Sidebar › Phone sublabel" as="span" className="block text-xs text-gray-400">Main &amp; Emergency Line</EditableField>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-forge-fire" />
                <div>
                  <EditableField
                    id="global-email"
                    label="Email Address"
                    as="span"
                    className="hover:text-forge-fire transition-colors"
                  >
                    service@forgeelevator.com
                  </EditableField>
                  <EditableField id="contact-info-email-sub" label="Contact › Sidebar › Email sublabel" as="span" className="block text-xs text-gray-400">For quotes &amp; general inquiries</EditableField>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-forge-fire" />
                <div>
                  <EditableField id="global-service-area" label="Service Area">
                    Knoxville, Tennessee
                  </EditableField>
                  <EditableField id="contact-info-city-sub" label="Contact › Sidebar › City sublabel" as="span" className="block text-xs text-gray-400">Serving East Tennessee</EditableField>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <Clock size={16} className="mt-0.5 flex-shrink-0 text-forge-fire" />
                <div>
                  <EditableField id="global-hours" label="Business Hours">
                    Mon–Fri: 7:00 AM – 5:00 PM
                  </EditableField>
                  <EditableField id="contact-info-hours-sub" label="Contact › Sidebar › Hours sublabel" as="span" className="block text-xs text-gray-400">Emergency service available 24/7</EditableField>
                </div>
              </div>
            </div>

            {/* Service area */}
            <div className="bg-forge-navy rounded-sm p-6 text-white mt-6">
              <EditableField id="contact-service-area-heading" label="Contact › Service Area › Heading" as="h3" className="font-semibold text-sm uppercase tracking-widest mb-3 text-forge-fire">Service Area</EditableField>
              <ul className="space-y-1.5 text-sm text-gray-300">
                {serviceAreas.map(({ id, text }) => (
                  <li key={id} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-forge-fire rounded-full flex-shrink-0" />
                    <EditableField id={`contact-${id}`} label={`Contact › Service Area › ${text}`}>
                      {text}
                    </EditableField>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Contact form ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-sm shadow-md border border-gray-100 p-8">
              <EditableField
                id="contact-form-title"
                label="Contact › Form › Title"
                as="h2"
                className="font-display text-2xl font-bold text-forge-navy mb-1"
              >
                Send Us a Message
              </EditableField>
              <EditableField
                id="contact-form-subtitle"
                label="Contact › Form › Subtitle"
                as="p"
                className="text-gray-500 text-sm mb-8"
              >
                Fill out the form below and we'll respond promptly. Emergency? Please call.
              </EditableField>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* Name + Company */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name <span className="text-forge-fire">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className={`w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forge-fire/40 transition ${
                        errors.name ? 'border-red-400' : 'border-gray-300'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Company / Building
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Acme Properties LLC"
                      className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forge-fire/40 transition"
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address <span className="text-forge-fire">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className={`w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forge-fire/40 transition ${
                        errors.email ? 'border-red-400' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone Number <span className="text-forge-fire">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(865) 555-0100"
                      className={`w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forge-fire/40 transition ${
                        errors.phone ? 'border-red-400' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Service type */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Service Type
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forge-fire/40 transition bg-white"
                  >
                    <option value="">— Select a service —</option>
                    {SERVICE_TYPES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority / Urgency <span className="text-forge-fire">*</span>
                  </label>
                  <div className="space-y-2">
                    {URGENCY.map(({ value, label }) => (
                      <label key={value} className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="urgency"
                          value={value}
                          checked={form.urgency === value}
                          onChange={handleChange}
                          className="mt-0.5 accent-forge-fire"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.urgency && <p className="text-red-500 text-xs mt-1">{errors.urgency}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Tell Us More <span className="text-forge-fire">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe the elevator issue, building address, number of units, or anything else we should know..."
                    className={`w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forge-fire/40 transition resize-vertical ${
                      errors.message ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button type="submit" className="btn-primary w-full justify-center text-base py-3">
                  <Send size={18} /> Send Message
                </button>

                <p className="text-xs text-gray-400 text-center">
                  For emergencies, call <a href="tel:+18651234567" className="text-forge-fire font-medium">(865) 123-4567</a> directly. We respond 24/7.
                </p>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
