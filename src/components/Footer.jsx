import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const services = [
  'Preventive Maintenance',
  'Emergency Repair',
  'Modernization & Upgrades',
  'Safety Inspections',
  'Hydraulic Systems',
  'New Construction',
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-forge-navy text-gray-300">
      {/* Emergency bar */}
      <div className="bg-forge-fire">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-white font-semibold text-sm">
            🔧 <strong>24/7 Emergency Service Available</strong> — We're always on call.
          </span>
          <a
            href="tel:+18651234567"
            className="text-white font-bold text-sm underline underline-offset-2 hover:no-underline"
          >
            (865) 123-4567
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-forge-fire rounded-sm flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
                <path d="M4 18h16v2H4zM4 14h4v4H4zM9 10h6v8H9zM16 14h4v4h-4zM7 6h10l2 4H5z"/>
              </svg>
            </div>
            <div className="leading-none">
              <span className="font-display text-lg font-bold text-white tracking-wide">FORGE</span>
              <span className="block text-forge-fire text-xs font-semibold tracking-widest uppercase">Elevator</span>
            </div>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Professional elevator maintenance, repair, and modernization serving East Tennessee.
            Safety and reliability are our foundation.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Services</h3>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s}>
                <Link
                  to="/services"
                  className="text-sm text-gray-400 hover:text-forge-fire transition-colors"
                >
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About Us' },
              { to: '/services', label: 'Services' },
              { to: '/contact', label: 'Contact' },
              { to: '/contact', label: 'Request a Quote' },
            ].map(({ to, label }) => (
              <li key={label}>
                <Link to={to} className="text-sm text-gray-400 hover:text-forge-fire transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Contact</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <Phone size={15} className="mt-0.5 flex-shrink-0 text-forge-fire" />
              <div>
                <a href="tel:+18651234567" className="hover:text-white transition-colors">(865) 123-4567</a>
                <span className="block text-xs text-gray-500">24/7 Emergency Line</span>
              </div>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <Mail size={15} className="mt-0.5 flex-shrink-0 text-forge-fire" />
              <a href="mailto:service@forgeelevator.com" className="hover:text-white transition-colors">
                service@forgeelevator.com
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <MapPin size={15} className="mt-0.5 flex-shrink-0 text-forge-fire" />
              <span>Serving East Tennessee<br />Knoxville & Surrounding Areas</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-400">
              <Clock size={15} className="mt-0.5 flex-shrink-0 text-forge-fire" />
              <div>
                <span className="block">Mon–Fri: 7:00 AM – 5:00 PM</span>
                <span className="text-xs text-gray-500">Emergency service available 24/7</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>&copy; {year} Forge Elevator. All rights reserved.</p>
          <p>Licensed &amp; Insured &bull; East Tennessee's Trusted Elevator Company</p>
        </div>
      </div>
    </footer>
  )
}
