import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { fetchPendingIds } from '../utils/fetchPendingIds'
import { fetchCompletedIds } from '../utils/fetchCompletedIds'
import { applyTheme, loadSavedTheme, saveTheme, THEMES } from '../utils/theme'

const EditContext = createContext(null)

const DRAFT_KEY = 'forge_edit_draft'

function loadDraft() {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY)
    return raw ? new Map(JSON.parse(raw)) : new Map()
  } catch {
    return new Map()
  }
}

function saveDraft(map) {
  if (map.size > 0) {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify([...map.entries()]))
  } else {
    sessionStorage.removeItem(DRAFT_KEY)
  }
}

export function EditProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('forge_preview_auth') === '1')
  const [isEditMode, setIsEditMode] = useState(false)
  // revision bumps on discard/submit so EditableFields know to reset their local state
  const [revision, setRevision] = useState(0)
  // Map<id, { label, original, current }> — restored from sessionStorage draft on mount
  const [pendingChanges, setPendingChanges] = useState(loadDraft)
  // Set<id> — fields that have been submitted to GitHub and are awaiting implementation
  const [serverPendingIds, setServerPendingIds] = useState(new Set())
  // Set<id> — fields whose submissions have been applied to the site
  const [completedIds, setCompletedIds] = useState(new Set())

  // Map<id, className> — temporary className overrides for suggestion previewing.
  // Applied by EditableField in both view and edit mode; cleared when review closes.
  const [previewOverrides, setPreviewOverridesState] = useState(new Map())

  const setPreviewOverride = useCallback((id, className) => {
    setPreviewOverridesState((prev) => {
      const next = new Map(prev)
      if (className == null) next.delete(id)
      else next.set(id, className)
      return next
    })
  }, [])

  const clearPreviewOverrides = useCallback(() => {
    setPreviewOverridesState(new Map())
  }, [])

  // Active theme — site theme lives in index.css; localStorage is only used so the
  // picker UI remembers the last submitted/previewed theme within a session.
  // On mount, clear any stale localStorage override (flash script is gone, so it
  // no longer affects CSS vars, but clean up anyway).
  const [theme, setThemeState] = useState(() => {
    localStorage.removeItem('forge_theme')
    return THEMES[0]
  })

  const setTheme = useCallback((colors) => {
    applyTheme(colors)
    setThemeState(colors)
  }, [])

  const hasChanges = pendingChanges.size > 0

  // Persist draft to sessionStorage so changes survive accidental page refreshes
  useEffect(() => {
    saveDraft(pendingChanges)
  }, [pendingChanges])

  // Warn on browser-level unload (tab close, refresh, external navigation)
  // Does NOT fire on in-app route changes — that is intentional.
  useEffect(() => {
    if (!hasChanges) return
    const handler = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [hasChanges])

  const refreshServerPending = useCallback(async () => {
    try {
      const ids = await fetchPendingIds()
      setServerPendingIds(ids)
      return ids
    } catch {
      // non-critical — silently ignore
      return null
    }
  }, [])

  const refreshCompleted = useCallback(async () => {
    try {
      const ids = await fetchCompletedIds()
      setCompletedIds(ids)
    } catch {
      // non-critical — silently ignore
    }
  }, [])

  // Fetch server-pending + completed IDs whenever admin logs in (or on refresh when already admin)
  useEffect(() => {
    if (isAdmin) {
      refreshServerPending()
      refreshCompleted()
    }
  }, [isAdmin, refreshServerPending, refreshCompleted])

  const setChange = useCallback((id, label, original, current) => {
    setPendingChanges((prev) => {
      const next = new Map(prev)
      if (current === original) {
        next.delete(id)
      } else {
        next.set(id, { label, original, current })
      }
      return next
    })
  }, [])

  const removeChange = useCallback((id) => {
    setPendingChanges((prev) => {
      if (!prev.has(id)) return prev
      const next = new Map(prev)
      next.delete(id)
      return next
    })
  }, [])

  const discardAll = useCallback(() => {
    setPendingChanges(new Map())
    setRevision((r) => r + 1)
  }, [])

  const logout = useCallback(() => {
    setPendingChanges(new Map())
    setRevision((r) => r + 1)
    setIsEditMode(false)
    setIsAdmin(false)
    setServerPendingIds(new Set())
    setCompletedIds(new Set())
    setPreviewOverridesState(new Map())
  }, [])

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev)
  }, [])

  return (
    <EditContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        isEditMode,
        toggleEditMode,
        revision,
        pendingChanges,
        hasChanges,
        setChange,
        removeChange,
        discardAll,
        serverPendingIds,
        refreshServerPending,
        completedIds,
        previewOverrides,
        setPreviewOverride,
        clearPreviewOverrides,
        logout,
        theme,
        setTheme,
      }}
    >
      {children}
    </EditContext.Provider>
  )
}

export function useEdit() {
  const ctx = useContext(EditContext)
  if (!ctx) throw new Error('useEdit must be used within EditProvider')
  return ctx
}
