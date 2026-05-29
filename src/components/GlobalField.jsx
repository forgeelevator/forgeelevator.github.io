import { useEdit } from '../context/EditContext'
import { GLOBALS } from '../utils/globals'

/**
 * Hook — returns the current (possibly pending-edited) value for a global field.
 * Updates whenever pendingChanges changes, so all consumers re-render live.
 */
export function useGlobal(id) {
  const { pendingChanges } = useEdit()
  const entry = GLOBALS.find((g) => g.id === id)
  return pendingChanges.get(id)?.current ?? entry?.original ?? ''
}

/**
 * Inline display component for a global field value.
 * Read-only on the page — editing happens via the Site Info panel.
 */
export default function GlobalField({ id, className }) {
  const value = useGlobal(id)
  return <span className={className}>{value}</span>
}
