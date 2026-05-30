import { useState } from 'react'
import { ChevronDown, ChevronUp, Edit2, Send, Trash2, X, PenLine, Loader2, CheckCircle2, AlertCircle, LogOut, RefreshCw, Palette, Info } from 'lucide-react'
import { HexColorPicker } from 'react-colorful'
import { useEdit } from '../context/EditContext'
import { submitToGitHub } from '../utils/submitToGitHub'
import { THEMES, buildCustomTheme } from '../utils/theme'
import SiteInfoPanel from './SiteInfoPanel'

export default function EditBar() {
  const {
    isAdmin,
    isEditMode,
    toggleEditMode,
    pendingChanges,
    hasChanges,
    discardAll,
    serverPendingIds,
    refreshServerPending,
    completedIds,
    logout,
    theme,
    setTheme,
  } = useEdit()

  const [summaryOpen, setSummaryOpen] = useState(false)
  const [signing, setSigning] = useState(false)
  const [signerName, setSignerName] = useState('')
  const [signError, setSignError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  // Theme picker state
  const [themePanelOpen, setThemePanelOpen] = useState(false)
  const [themeTab, setThemeTab] = useState('custom')
  // Which of the 4 custom colors is currently active in the wheel
  const [activeColorKey, setActiveColorKey] = useState('fire')
  // Custom color values (what the wheel edits)
  const [customColors, setCustomColors] = useState({
    navy:  theme?.navy  ?? THEMES[0].navy,
    fire:  theme?.fire  ?? THEMES[0].fire,
    amber: theme?.amber ?? THEMES[0].amber,
    light: theme?.light ?? THEMES[0].light,
  })
  // Whether the "Choose Starting" preset picker is open in custom tab
  const [startingOpen, setStartingOpen] = useState(false)
  // Controlled hex input value (may be mid-edit / partial)
  const [hexInput, setHexInput] = useState(theme?.fire ?? THEMES[0].fire)

  // Site Info panel state
  const [siteInfoOpen, setSiteInfoOpen] = useState(false)

  async function handleRefresh() {
    setRefreshing(true)
    await refreshServerPending()
    setRefreshing(false)
  }

  function openSigning() {
    setSummaryOpen(false)
    setThemePanelOpen(false)
    setSigning(true)
  }

  function cancelSigning() {
    setSigning(false)
    setSignerName('')
    setSignError(false)
  }

  function handleModalOk() {
    setShowModal(false)
    setSigning(false)
    setSignerName('')
    // Edit mode stays active — user exits manually via the Exit button
  }

  async function confirmSubmit() {
    if (!signerName.trim()) {
      setSignError(true)
      return
    }
    setSubmitting(true)
    setSubmitError(null)
    try {
      // Remember how many server-pending fields existed before this submit
      const prevSize = serverPendingIds.size

      await submitToGitHub(pendingChanges, signerName.trim(), theme)
      discardAll()
      setSubmitting(false)
      setShowModal(true)   // open modal immediately — spinner shows while we wait
      setRefreshing(true)

      // GitHub's API can take up to ~60s to reflect newly-written files.
      // Poll every 4s (up to 15 attempts) until the count increases.
      for (let i = 0; i < 15; i++) {
        if (i > 0) await new Promise(r => setTimeout(r, 4000))
        const ids = await refreshServerPending()
        if (ids !== null && ids.size > prevSize) break
      }

      setRefreshing(false) // unlock OK button and show confirmed count
    } catch (err) {
      setSubmitting(false)
      setSubmitError(err.message ?? 'Unknown error — please try again.')
    }
  }

  if (!isAdmin) return null

  const barBg = isEditMode
    ? hasChanges
      ? 'bg-amber-500 text-white'
      : 'bg-sky-700 text-white'
    : 'bg-forge-navy/95 text-gray-400 backdrop-blur-sm border-b border-white/10'

  return (
    <>
    <div className={`fixed top-0 left-0 right-0 z-[100] text-xs shadow-md ${barBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center gap-3">

        {/* Mode label */}
        <span className="font-bold uppercase tracking-widest text-[10px] flex-shrink-0">
          {isEditMode ? 'Edit Mode' : 'Admin Preview'}
        </span>
        <span className="opacity-25 flex-shrink-0">|</span>

        {isEditMode ? (
          <>
            {/* Status text */}
            <span className="flex-1 font-medium opacity-80 truncate">
              {hasChanges
                ? `${pendingChanges.size} unsaved change${pendingChanges.size === 1 ? '' : 's'} — navigate freely, all changes persist`
                : 'Click any highlighted field to edit · Navigate freely between pages'}
            </span>

            {/* Review / summary toggle */}
            {hasChanges && (
              <button
                onClick={() => setSummaryOpen((s) => !s)}
                className="flex items-center gap-1 font-semibold hover:opacity-80 transition-opacity flex-shrink-0"
              >
                Review {summaryOpen ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
              </button>
            )}

            {/* Discard all */}
            {hasChanges && (
              <button
                onClick={() => { discardAll(); setSummaryOpen(false); setSigning(false); setSignerName('') }}
                className="flex items-center gap-1 font-semibold hover:opacity-80 transition-opacity flex-shrink-0"
                title="Discard all pending changes"
              >
                <Trash2 size={11} /> Discard
              </button>
            )}

            {/* Submit */}
            <button
              onClick={openSigning}
              disabled={!hasChanges && (theme?.id === THEMES[0].id || !theme?.id)}
              className="flex items-center gap-1.5 font-bold bg-white text-amber-600 px-3 py-1 rounded-full hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0 text-[11px]"
            >
              <Send size={11} /> Submit Changes
            </button>

            {/* Exit */}
            <button
              onClick={toggleEditMode}
              className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity flex-shrink-0 ml-1"
              title="Exit edit mode"
            >
              <X size={14} /> Exit
            </button>
          </>
        ) : (
          <>
            <span className="flex-1 opacity-40">Viewing as admin</span>
            <button
              onClick={toggleEditMode}
              className="flex items-center gap-1.5 font-semibold text-forge-fire hover:text-white transition-colors flex-shrink-0"
            >
              <Edit2 size={12} /> Enter Edit Mode
            </button>
            <span className="opacity-25 flex-shrink-0">|</span>
            <button
              onClick={logout}
              className="flex items-center gap-1 opacity-50 hover:opacity-100 transition-opacity flex-shrink-0"
              title="Log out"
            >
              <LogOut size={12} /> Log out
            </button>
          </>
        )}
      </div>

      {/* Legend / toolbar strip — visible whenever in edit mode */}
      {isEditMode && (
        <div className="border-t border-white/15 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center gap-5 text-[11px]">
            {/* Status legend */}
            <span className="flex items-center gap-1.5 opacity-50">
              <span className="inline-block w-2.5 h-2.5 rounded-sm ring-1 ring-sky-300" />
              Editable
            </span>
            <span className="flex items-center gap-1.5 opacity-80">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-amber-400/70 ring-2 ring-amber-400" />
              {pendingChanges.size > 0
                ? `${pendingChanges.size} local change${pendingChanges.size !== 1 ? 's' : ''}`
                : 'Local changes'}
            </span>
            <span className="flex items-center gap-1.5 opacity-80">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-violet-500/70 ring-2 ring-violet-500" />
              {serverPendingIds.size > 0
                ? `${serverPendingIds.size} awaiting review`
                : 'Awaiting review'}
            </span>
            <span className="flex items-center gap-1.5 opacity-80">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-emerald-500/70 ring-2 ring-emerald-500" />
              {completedIds.size > 0
                ? `${completedIds.size} completed`
                : 'Completed'}
            </span>

            {/* Right-side toolbar buttons */}
            <div className="ml-auto flex items-center gap-0.5">
              <button
                onClick={() => { setSiteInfoOpen(true); setThemePanelOpen(false) }}
                className="flex items-center gap-1.5 font-semibold px-3 py-1 rounded bg-white/15 opacity-70 hover:opacity-100 hover:bg-white/25 transition-all"
                title="Edit site-wide info (phone, email, hours)"
              >
                <Info size={13} />
                Edit Business Info
              </button>

              {/* Theme button + floating dropdown */}
              <div className="relative">
                <button
                  onClick={() => setThemePanelOpen((o) => !o)}
                  className={`flex items-center gap-1.5 font-semibold px-3 py-1 rounded transition-all ${
                    themePanelOpen
                      ? 'bg-white/30 opacity-100'
                      : 'bg-white/15 opacity-70 hover:opacity-100 hover:bg-white/25'
                  }`}
                  title="Change site theme"
                >
                  <Palette size={13} />
                  Theme
                </button>

                {/* Floating theme picker dropdown */}
                {themePanelOpen && (
                  <div className="absolute top-full right-0 mt-1.5 z-[150] bg-slate-900 border border-white/15 rounded-lg shadow-2xl overflow-hidden text-white">
                    {/* Tab bar */}
                    <div className="flex items-center border-b border-white/10 px-1 pt-1">
                      <button
                        onClick={() => setThemeTab('presets')}
                        className={`text-[10px] font-semibold px-3 py-1.5 border-b-2 transition-all -mb-px ${
                          themeTab === 'presets'
                            ? 'border-white/60 opacity-100'
                            : 'border-transparent opacity-40 hover:opacity-70'
                        }`}
                      >
                        Presets
                      </button>
                      <button
                        onClick={() => setThemeTab('custom')}
                        className={`text-[10px] font-semibold px-3 py-1.5 border-b-2 transition-all -mb-px ${
                          themeTab === 'custom'
                            ? 'border-white/60 opacity-100'
                            : 'border-transparent opacity-40 hover:opacity-70'
                        }`}
                      >
                        Custom
                      </button>
                      <button
                        onClick={() => setThemePanelOpen(false)}
                        className="ml-auto flex items-center opacity-35 hover:opacity-80 transition-opacity px-2 py-1"
                        title="Close"
                      >
                        <X size={10} />
                      </button>
                    </div>

                    {/* Presets tab */}
                    {themeTab === 'presets' && (
                      <div className="p-2 flex flex-col gap-0.5 w-44">
                        {THEMES.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setTheme(t)}
                            title={t.name}
                            className={`flex items-center gap-2 text-[11px] font-semibold px-2 py-1.5 rounded transition-all w-full text-left ${
                              theme?.id === t.id
                                ? 'ring-1 ring-white/70 bg-white/10 opacity-100'
                                : 'opacity-55 hover:opacity-100 hover:bg-white/5'
                            }`}
                          >
                            <span className="relative inline-flex w-5 h-5 rounded-sm overflow-hidden flex-shrink-0 ring-1 ring-white/20">
                              <span className="flex-1" style={{ backgroundColor: t.navy }} />
                              <span className="flex-1" style={{ backgroundColor: t.fire }} />
                            </span>
                            {t.name}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Custom tab — inline color wheel, stays open */}
                    {themeTab === 'custom' && (() => {
                      const COLOR_TARGETS = [
                        { key: 'navy',  label: 'Dark BG' },
                        { key: 'fire',  label: 'Accent'  },
                        { key: 'amber', label: 'Hover'   },
                        { key: 'light', label: 'Page BG' },
                      ]
                      function handleWheelChange(hex) {
                        const next = { ...customColors, [activeColorKey]: hex }
                        setCustomColors(next)
                        setHexInput(hex)
                        setTheme(buildCustomTheme(next.navy, next.fire, next.amber, next.light))
                      }
                      function handleHexInput(val) {
                        setHexInput(val)
                        if (/^#[0-9a-fA-F]{6}$/.test(val)) handleWheelChange(val)
                      }
                      function switchTarget(key) {
                        setActiveColorKey(key)
                        setHexInput(customColors[key])
                      }
                      return (
                        <div className="p-3 flex gap-4 items-start">
                          {/* Left: color wheel */}
                          <div className="flex-shrink-0">
                            <HexColorPicker
                              color={customColors[activeColorKey]}
                              onChange={handleWheelChange}
                              style={{ width: '168px', height: '168px' }}
                            />
                            <div className="mt-2 flex items-center gap-1.5">
                              <span
                                className="w-4 h-4 rounded-sm ring-1 ring-white/25 flex-shrink-0"
                                style={{ backgroundColor: customColors[activeColorKey] }}
                              />
                              <input
                                type="text"
                                value={hexInput}
                                onChange={(e) => handleHexInput(e.target.value)}
                                spellCheck={false}
                                className="w-20 text-[11px] font-mono bg-black/30 border border-white/20 rounded px-2 py-0.5 text-white/90 outline-none focus:border-white/50 transition-colors"
                              />
                            </div>
                          </div>

                          {/* Right: color target chips */}
                          <div className="flex flex-col gap-1.5 pt-1">
                            <p className="text-[10px] opacity-40 mb-0.5">Editing:</p>
                            {COLOR_TARGETS.map(({ key, label }) => (
                              <button
                                key={key}
                                onClick={() => switchTarget(key)}
                                className={`flex items-center gap-2 text-[10px] font-semibold px-2 py-1 rounded transition-all text-left ${
                                  activeColorKey === key
                                    ? 'bg-white/15 ring-1 ring-white/50 opacity-100'
                                    : 'opacity-50 hover:opacity-80 hover:bg-white/5'
                                }`}
                              >
                                <span
                                  className="w-4 h-4 rounded-sm ring-1 ring-white/25 flex-shrink-0"
                                  style={{ backgroundColor: customColors[key] }}
                                />
                                {label}
                              </button>
                            ))}
                            {/* Choose Starting preset dropdown */}
                            <div className="relative mt-2">
                              <button
                                onClick={() => setStartingOpen(v => !v)}
                                className="flex items-center gap-1.5 w-full text-[10px] font-semibold px-2 py-1.5 rounded bg-white/15 hover:bg-white/25 opacity-70 hover:opacity-100 transition-all text-left"
                              >
                                <span className="flex-1">Start from…</span>
                                <ChevronDown size={10} className={`transition-transform ${startingOpen ? 'rotate-180' : ''}`} />
                              </button>
                              {startingOpen && (
                                <div className="absolute bottom-full mb-1 left-0 right-0 bg-slate-900 border border-white/15 rounded-lg shadow-2xl overflow-hidden z-10">
                                  {THEMES.map((t) => (
                                    <button
                                      key={t.id}
                                      onClick={() => {
                                        const next = { navy: t.navy, fire: t.fire, amber: t.amber, light: t.light }
                                        setCustomColors(next)
                                        setHexInput(next[activeColorKey])
                                        setTheme(buildCustomTheme(next.navy, next.fire, next.amber, next.light))
                                        setStartingOpen(false)
                                      }}
                                      className="flex items-center gap-2 w-full text-[10px] font-semibold px-2 py-1.5 hover:bg-white/10 transition-colors text-left"
                                    >
                                      <span className="relative inline-flex w-4 h-4 rounded-sm overflow-hidden flex-shrink-0 ring-1 ring-white/20">
                                        <span className="flex-1" style={{ backgroundColor: t.navy }} />
                                        <span className="flex-1" style={{ backgroundColor: t.fire }} />
                                      </span>
                                      {t.name}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>

              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-1.5 font-semibold px-3 py-1 rounded bg-white/15 opacity-70 hover:opacity-100 disabled:opacity-30 hover:bg-white/25 transition-all"
                title="Re-check submitted changes"
              >
                <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
                {refreshing ? 'Checking…' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signing panel — shown after clicking Submit Changes */}
      {isEditMode && signing && (
        <div className="bg-black/30 border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center gap-3">

            {/* Loading state */}
            {submitting && (
              <span className="flex items-center gap-2 opacity-80 text-[11px]">
                <Loader2 size={13} className="animate-spin" /> Saving to repo…
              </span>
            )}

            {/* Error state */}
            {submitError && (
              <>
                <span className="flex items-center gap-1.5 text-red-300 text-[11px]">
                  <AlertCircle size={12} /> {submitError}
                </span>
                <button onClick={() => setSubmitError(null)} className="font-semibold text-[11px] hover:opacity-80">
                  Try Again
                </button>
                <button onClick={cancelSigning} className="flex items-center gap-1 opacity-60 hover:opacity-100 text-[11px]">
                  <X size={12} /> Cancel
                </button>
              </>
            )}

            {/* Normal / input state */}
            {!submitting && !submitError && (
              <>
                <span className="text-[11px] font-semibold flex-shrink-0 flex items-center gap-1.5">
                  <PenLine size={12} /> Sign your name on these changes:
                </span>
                <input
                  type="text"
                  value={signerName}
                  onChange={(e) => { setSignerName(e.target.value); setSignError(false) }}
                  onKeyDown={(e) => { if (e.key === 'Enter') confirmSubmit() }}
                  autoFocus
                  placeholder="Your full name"
                  className={`flex-1 min-w-[180px] bg-white/10 border ${
                    signError ? 'border-red-400 placeholder-red-300' : 'border-white/30 placeholder-white/40'
                  } rounded px-3 py-1 text-xs text-white outline-none focus:border-white/70 transition-colors`}
                />
                {signError && (
                  <span className="text-red-300 text-[11px] flex-shrink-0">Name is required</span>
                )}
                <button
                  onClick={confirmSubmit}
                  className="flex items-center gap-1.5 font-bold bg-white text-amber-600 px-3 py-1 rounded-full hover:bg-amber-50 transition-colors text-[11px] flex-shrink-0"
                >
                  <Send size={11} /> Confirm &amp; Send
                </button>
                <button
                  onClick={cancelSigning}
                  className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity text-[11px] flex-shrink-0"
                >
                  <X size={12} /> Cancel
                </button>
              </>
            )}

          </div>
        </div>
      )}

      {/* Success modal */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-sm shadow-2xl p-8 max-w-md mx-4 w-full">

            {/* Loading state — waiting for server pending refresh */}
            {refreshing ? (
              <div className="flex flex-col items-center gap-4 py-4">
                <Loader2 size={32} className="text-forge-fire animate-spin" />
                <div className="text-center">
                  <p className="font-display text-lg font-bold text-forge-navy">Changes Submitted</p>
                  <p className="text-gray-500 text-sm mt-1">Waiting for server confirmation&hellip;</p>
                  <p className="text-gray-400 text-xs mt-2">GitHub can take up to a minute to reflect new files.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 size={24} className="text-emerald-500 flex-shrink-0" />
                  <h2 className="font-display text-xl font-bold text-forge-navy">Changes Submitted</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">
                  Your changes have been submitted but will not take effect until permanently
                  implemented by the site administrator.
                </p>
                {serverPendingIds.size > 0 && (
                  <p className="text-violet-600 text-sm font-medium mb-6">
                    {serverPendingIds.size} field{serverPendingIds.size !== 1 ? 's' : ''} currently awaiting review.
                  </p>
                )}
                <button
                  onClick={handleModalOk}
                  className="btn-primary w-full justify-center py-2.5 text-sm"
                >
                  OK
                </button>
              </>
            )}

          </div>
        </div>
      )}

      {/* Expandable pending-changes summary */}
      {isEditMode && hasChanges && summaryOpen && (
        <div className="bg-black/25 border-t border-white/20 max-h-52 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-2.5">
            {Array.from(pendingChanges.entries()).map(([id, { label, original, current }]) => (
              <div key={id} className="text-[11px] leading-snug">
                <span className="font-mono text-white/40 mr-1">[{id}]</span>
                <span className="font-semibold">{label}</span>
                <div className="ml-3 mt-0.5 flex gap-2 items-baseline">
                  <span className="line-through opacity-50 max-w-xs truncate">{original}</span>
                  <span className="opacity-40 flex-shrink-0">→</span>
                  <span className="text-amber-200 max-w-xs truncate">{current}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Site Info modal — rendered outside the fixed bar so it's not clipped */}
    {siteInfoOpen && <SiteInfoPanel onClose={() => setSiteInfoOpen(false)} />}
  </>
  )
}
