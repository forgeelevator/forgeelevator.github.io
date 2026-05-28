import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Phone, Menu, X } from 'lucide-react'
import { useEdit } from '../context/EditContext'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { isAdmin, isEditMode } = useEdit()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on nav
  useEffect(() => setOpen(false), [location.pathname])

  const navBg = isHome && !scrolled
    ? 'bg-transparent'
    : 'bg-forge-navy shadow-lg'

  return (
    <header className={`fixed ${isAdmin ? (isEditMode ? 'top-[60px]' : 'top-9') : 'top-0'} left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-forge-fire rounded-sm flex items-center justify-center flex-shrink-0">
              {/* Simple anvil-inspired mark */}
              <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
                <path d="M4 18h16v2H4zM4 14h4v4H4zM9 10h6v8H9zM16 14h4v4h-4zM7 6h10l2 4H5z"/>
              </svg>
            </div>
            <div className="leading-none">
              <span className="font-display text-xl font-bold text-white tracking-wide">FORGE</span>
              <span className="block text-forge-fire text-xs font-semibold tracking-widest uppercase">Elevator</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors duration-150 ${
                    isActive ? 'text-forge-fire' : 'text-gray-300 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+18651234567"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-forge-fire transition-colors"
            >
              <Phone size={15} />
              <span className="font-medium">(865) 123-4567</span>
            </a>
            <Link to="/contact" className="btn-primary text-sm py-2 px-5">
              Request Service
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-forge-navy border-t border-white/10">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium py-3 px-3 rounded transition-colors ${
                    isActive ? 'bg-forge-steel text-forge-fire' : 'text-gray-300 hover:bg-forge-steel hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <a
              href="tel:+18651234567"
              className="mt-2 flex items-center gap-2 text-sm text-forge-fire font-semibold py-3 px-3"
            >
              <Phone size={16} />
              (865) 123-4567 — 24/7 Emergency
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
