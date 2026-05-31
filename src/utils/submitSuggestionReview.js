// Submits an accepted style suggestion review as a pending file to GitHub.

const TOKEN = import.meta.env.VITE_GH_TOKEN ?? ''
const OWNER = import.meta.env.VITE_GH_OWNER ?? ''
const REPO  = import.meta.env.VITE_GH_REPO  ?? ''

/**
 * @param {Array<import('./suggestions').SUGGESTIONS[number]>} accepted
 */
export async function submitSuggestionReview(accepted) {
  if (!TOKEN || !OWNER || !REPO) return

  const now   = new Date()
  const pad   = (n) => String(n).padStart(2, '0')
  const ts    = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}T${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`
  const filename = `${ts}-style-review.txt`

  const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const lines = [
    'FORGE ELEVATOR — Style Suggestion Review',
    `Submitted: ${dateStr}`,
    '',
    `ACCEPTED STYLE CHANGES (${accepted.length}):`,
  ]

  for (const s of accepted) {
    lines.push('')
    lines.push(`[${s.id}]`)
    lines.push(`Section: ${s.label}`)
    lines.push(`Reason: ${s.reason}`)
    lines.push(`Current class:   ${s.currentClassName}`)
    lines.push(`Suggested class: ${s.suggestedClassName}`)
    lines.push(`Note: ${s.note}`)
  }

  const content = btoa(unescape(encodeURIComponent(lines.join('\n'))))

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/pending/${filename}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Style review: ${accepted.length} suggestion${accepted.length !== 1 ? 's' : ''} accepted`,
        content,
      }),
    }
  )

  if (!res.ok) throw new Error(`GitHub API ${res.status}`)
}
