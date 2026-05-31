import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X, CheckCircle2, Loader2 } from 'lucide-react'
import { useEdit } from '../context/EditContext'
import { SUGGESTIONS } from '../utils/suggestions'
import { submitSuggestionReview } from '../utils/submitSuggestionReview'

export default function SuggestionReviewer({ onClose }) {
  const { setPreviewOverride, clearPreviewOverrides } = useEdit()

  const [index, setIndex]       = useState(0)
  const [showing, setShowing]   = useState('current') // 'current' | 'suggested'
  const [decisions, setDecisions] = useState({})      // id → 'keep' | 'accept'
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [error, setError]           = useState(null)

  const suggestion = SUGGESTIONS[index]
  const total      = SUGGESTIONS.length
  const decision   = decisions[suggestion.id]

  // Scroll to the relevant field whenever the step changes
  useEffect(() => {
    const el = document.querySelector(`[data-field-id="${suggestion.id}"]`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [suggestion.id])

  // Clean up all previews when unmounting
  useEffect(() => () => clearPreviewOverrides(), [clearPreviewOverrides])

  function setShownVersion(version) {
    setShowing(version)
    setPreviewOverride(
      suggestion.id,
      version === 'suggested' ? suggestion.suggestedClassName : null,
    )
  }

  function decide(choice) {
    setDecisions((d) => ({ ...d, [suggestion.id]: choice }))
  }

  function navigate(delta) {
    // Clear preview for the current step before moving
    setPreviewOverride(suggestion.id, null)
    setShowing('current')
    setIndex((i) => i + delta)
  }

  async function handleDone() {
    setPreviewOverride(suggestion.id, null)
    clearPreviewOverrides()

    const accepted = SUGGESTIONS.filter((s) => decisions[s.id] === 'accept')
    if (accepted.length === 0) {
      onClose()
      return
    }

    setSubmitting(true)
    setError(null)
    try {
      await submitSuggestionReview(accepted)
      setSubmitted(true)
    } catch (e) {
      setError('Could not submit — check connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  function handleClose() {
    clearPreviewOverrides()
    onClose()
  }

  if (submitted) {
    return (
      <div className="border-t border-white/15 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center gap-4">
          <CheckCircle2 size={13} className="text-emerald-400" />
          <span className="text-[11px] text-emerald-400 font-semibold">
            Submitted — style changes are queued for review
          </span>
          <button onClick={handleClose} className="ml-auto text-[11px] opacity-50 hover:opacity-100 transition-opacity">
            Close
          </button>
        </div>
      </div>
    )
  }

  const decidedCount  = Object.keys(decisions).length
  const acceptedCount = Object.values(decisions).filter((d) => d === 'accept').length

  return (
    <div className="border-t border-white/15 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px]">

        {/* Step label */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="opacity-35 font-mono">{index + 1}/{total}</span>
          <span className="font-semibold opacity-80 truncate">{suggestion.label}</span>
        </div>

        {/* Reason */}
        <p className="flex-1 min-w-[180px] text-white/50 leading-snug hidden md:block">
          {suggestion.reason}
        </p>

        {/* Current / Suggested toggle */}
        <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 rounded p-0.5">
          <button
            onClick={() => setShownVersion('current')}
            className={`px-2.5 py-1 rounded font-semibold transition-all ${
              showing === 'current'
                ? 'bg-white/20 text-white'
                : 'opacity-40 hover:opacity-70'
            }`}
          >
            Current
          </button>
          <button
            onClick={() => setShownVersion('suggested')}
            className={`px-2.5 py-1 rounded font-semibold transition-all ${
              showing === 'suggested'
                ? 'bg-white/20 text-white'
                : 'opacity-40 hover:opacity-70'
            }`}
          >
            Suggested
          </button>
        </div>

        {/* Decision buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => decide('keep')}
            className={`px-2.5 py-1 rounded font-semibold transition-all ${
              decision === 'keep'
                ? 'bg-white/25 ring-1 ring-white/50'
                : 'bg-white/10 opacity-55 hover:opacity-100'
            }`}
          >
            Keep
          </button>
          <button
            onClick={() => decide('accept')}
            className={`px-2.5 py-1 rounded font-semibold transition-all ${
              decision === 'accept'
                ? 'bg-forge-fire/70 ring-1 ring-forge-fire text-white opacity-100'
                : 'bg-white/10 opacity-55 hover:opacity-100'
            }`}
          >
            Accept
          </button>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-1 ml-auto">
          {index > 0 && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 px-2 py-1.5 rounded bg-white/10 hover:bg-white/20 font-semibold transition-all"
            >
              <ChevronLeft size={11} /> Back
            </button>
          )}
          {index < total - 1 ? (
            <button
              onClick={() => navigate(1)}
              className="flex items-center gap-1 px-2 py-1.5 rounded bg-white/15 hover:bg-white/25 font-semibold transition-all"
            >
              Next <ChevronRight size={11} />
            </button>
          ) : (
            <button
              onClick={handleDone}
              disabled={submitting}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-forge-fire/70 hover:bg-forge-fire font-semibold transition-all disabled:opacity-50"
            >
              {submitting
                ? <><Loader2 size={11} className="animate-spin" /> Submitting…</>
                : acceptedCount > 0
                  ? `Done — submit ${acceptedCount} change${acceptedCount !== 1 ? 's' : ''}`
                  : 'Done'
              }
            </button>
          )}
          <button
            onClick={handleClose}
            className="ml-0.5 flex items-center opacity-35 hover:opacity-80 px-1.5 py-1.5 transition-opacity"
            title="Close"
          >
            <X size={11} />
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="w-full text-red-300 text-[10px]">{error}</p>
        )}
      </div>
    </div>
  )
}
