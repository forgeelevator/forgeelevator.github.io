// Submits pending content changes as a .txt file to the repo via the GitHub Contents API.
// Requires a fine-grained PAT (VITE_GH_TOKEN) with Contents: Read & Write on this repo only.
// The token is baked into the compiled bundle — scope it narrowly so worst-case exposure
// is limited to writing files into this repo (not deployments, not workflows).

const TOKEN = import.meta.env.VITE_GH_TOKEN ?? ''
const OWNER = import.meta.env.VITE_GH_OWNER ?? ''
const REPO  = import.meta.env.VITE_GH_REPO  ?? ''

function toBase64(str) {
  const bytes = new Uint8Array(new TextEncoder().encode(str))
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

/**
 * @param {Map<string, {label: string, original: string, current: string}>} pendingChanges
 * @param {string} signer
 * @param {object|null} theme  — current active theme (null = default Forge theme)
 * @returns {Promise<{ path: string, url: string | null }>}
 */
export async function submitToGitHub(pendingChanges, signer, theme = null) {
  if (!TOKEN || !OWNER || !REPO) {
    throw new Error('GitHub submit is not configured. Set VITE_GH_TOKEN, VITE_GH_OWNER, and VITE_GH_REPO.')
  }

  const displayTime = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  const fileTs = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const slug = signer.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const path = `pending/${fileTs}-${slug}.txt`

  const lines = [
    'FORGE ELEVATOR — Site Content Update Request',
    `Submitted: ${displayTime}`,
    `Signed by: ${signer}`,
    '',
    `CHANGES (${pendingChanges.size} field${pendingChanges.size === 1 ? '' : 's'}):`,
    '',
  ]

  for (const [id, { label, original, current }] of pendingChanges) {
    lines.push(`[${id}]`)
    lines.push(`Section: ${label}`)
    lines.push(`Original: ${original}`)
    lines.push(`Requested: ${current}`)
    lines.push('')
  }

  // Include active theme if it differs from the default
  if (theme && theme.id !== 'forge') {
    lines.push('THEME:')
    lines.push(`  Name: ${theme.id === 'custom' ? 'Custom' : theme.name}`)
    lines.push(`  Dark Background: ${theme.navy}`)
    lines.push(`  Accent Color:    ${theme.fire}`)
    lines.push(`  Accent Hover:    ${theme.amber}`)
    lines.push(`  Page Background: ${theme.light}`)
    lines.push('')
  }

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({
        message: `Content update: ${pendingChanges.size} change${pendingChanges.size === 1 ? '' : 's'} by ${signer}`,
        content: toBase64(lines.join('\n')),
      }),
    }
  )

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message ?? `GitHub API responded with ${res.status}`)
  }

  const data = await res.json()
  return { path, url: data.content?.html_url ?? null }
}
