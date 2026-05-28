import { useEffect, useRef, useState } from 'react'
import { useEdit } from '../context/EditContext'

/**
 * Wraps any piece of static copy and makes it inline-editable in admin edit mode.
 *
 * Props:
 *   id        — globally-unique string ID (appears in the submission email)
 *   label     — human-readable path, e.g. "Home › Hero › Headline"
 *   children  — original text (string)
 *   as        — HTML tag to render (default: 'span')
 *   multiline — allow Enter / newlines in edit mode (default: false)
 *   className — forwarded to the rendered element in both modes
 */
export default function EditableField({
  id,
  label,
  children,
  as: Tag = 'span',
  multiline = false,
  className = '',
  ...rest
}) {
  const { isEditMode, revision, pendingChanges, serverPendingIds, setChange, removeChange } = useEdit()

  // Normalise whitespace so template-literal line breaks don't create false dirty states
  const original = String(children ?? '').replace(/\s+/g, ' ').trim()

  // Initialise from context so changes survive page navigation (fields remount but context persists)
  const [current, setCurrent] = useState(() => pendingChanges.get(id)?.current ?? original)
  const elRef = useRef(null)
  const isDirty = current !== original
  const isServerPending = serverPendingIds.has(id)

  // Keep context map in sync
  useEffect(() => {
    if (isDirty) {
      setChange(id, label, original, current)
    } else {
      removeChange(id)
    }
  }, [id, label, original, current, isDirty, setChange, removeChange])

  // Reset local value whenever discardAll / submitChanges bumps the revision counter
  useEffect(() => {
    if (revision === 0) return // skip initial mount
    setCurrent(original)
    if (elRef.current && isEditMode) {
      elRef.current.textContent = original
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revision])

  // Populate contenteditable element whenever edit mode activates
  useEffect(() => {
    if (isEditMode && elRef.current) {
      elRef.current.textContent = current
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode])

  // ── View mode ──────────────────────────────────────────────────────────────
  if (!isEditMode) {
    return (
      <Tag className={className} {...rest}>
        {current}
      </Tag>
    )
  }

  // ── Edit mode ──────────────────────────────────────────────────────────────
  const editClass = [
    isDirty
      ? 'outline outline-2 outline-amber-400'
      : isServerPending
        ? 'outline outline-2 outline-violet-500'
        : 'outline outline-1 outline-sky-300 hover:outline-2 hover:outline-sky-400',
    'rounded-sm cursor-text transition-[outline-color,background-color] focus:outline-2 focus:outline-sky-500',
  ].join(' ')

  function handleInput(e) {
    setCurrent(e.currentTarget.textContent)
  }

  function handleKeyDown(e) {
    // Single-line fields: block Enter
    if (!multiline && e.key === 'Enter') {
      e.preventDefault()
      e.currentTarget.blur()
    }
    // Block formatting shortcuts (bold, italic, underline)
    if ((e.metaKey || e.ctrlKey) && ['b', 'i', 'u'].includes(e.key.toLowerCase())) {
      e.preventDefault()
    }
  }

  return (
    <Tag
      ref={elRef}
      className={`${className} ${editClass}`}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      title={`Edit: ${label}`}
      {...rest}
    />
  )
}
