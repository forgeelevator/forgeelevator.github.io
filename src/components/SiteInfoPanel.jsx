import { useState } from 'react'
import { X, Info } from 'lucide-react'
import { useEdit } from '../context/EditContext'
import { GLOBALS } from '../utils/globals'

export default function SiteInfoPanel({ onClose }) {
  const { pendingChanges, setChange } = useEdit()

  // Initialize local inputs from pendingChanges (or original fallback)
  const [values, setValues] = useState(() => {
    const init = {}
    for (const g of GLOBALS) {
      init[g.id] = pendingChanges.get(g.id)?.current ?? g.original
    }
    return init
  })

  function handleChange(id, value) {
    setValues((prev) => ({ ...prev, [id]: value }))
    const entry = GLOBALS.find((g) => g.id === id)
    setChange(id, entry.label, entry.original, value)
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-sm shadow-2xl w-full max-w-lg mx-4 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-forge-navy text-white">
          <div className="flex items-center gap-2">
            <Info size={15} className="text-forge-fire" />
            <h2 className="font-display text-base font-bold tracking-wide">Site Info</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Description */}
        <div className="px-6 pt-4 pb-2">
          <p className="text-xs text-gray-400 leading-relaxed">
            These values appear throughout the site — navbar, footer, and contact details.
            Changes are tracked alongside your other edits and submitted together.
          </p>
        </div>

        {/* Fields */}
        <div className="px-6 py-4 space-y-5">
          {GLOBALS.map((g) => {
            const isDirty = values[g.id] !== g.original
            return (
              <div key={g.id}>
                <label className="flex items-center gap-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  {g.label}
                  {isDirty && (
                    <span className="text-amber-500 normal-case font-medium tracking-normal">
                      · changed
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  value={values[g.id]}
                  onChange={(e) => handleChange(g.id, e.target.value)}
                  placeholder={g.placeholder}
                  className="w-full border border-gray-200 rounded-sm px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-forge-fire/40 focus:border-forge-fire/60 transition"
                />
                {isDirty && (
                  <p className="text-[10px] text-gray-400 mt-1 font-mono">
                    was: {g.original}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <p className="text-[11px] text-gray-400 leading-snug">
            These changes are included automatically when you submit.
          </p>
          <button onClick={onClose} className="btn-primary text-sm py-2 px-5 flex-shrink-0">
            Done
          </button>
        </div>

      </div>
    </div>
  )
}
