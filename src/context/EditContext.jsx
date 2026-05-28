import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { fetchPendingIds } from '../utils/fetchPendingIds'

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

  // Fetch server-pending IDs whenever admin logs in (or on refresh when already admin)
  useEffect(() => {
    if (isAdmin) refreshServerPending()
  }, [isAdmin, refreshServerPending])

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
        logout,
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
