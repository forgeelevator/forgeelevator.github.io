// Reads all files in the completed-edits/ folder from GitHub and returns a Set of field IDs
// that have been submitted and already applied to the site.

const TOKEN = import.meta.env.VITE_GH_TOKEN ?? ''
const OWNER = import.meta.env.VITE_GH_OWNER ?? ''
const REPO  = import.meta.env.VITE_GH_REPO  ?? ''

const GH_HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
}

/**
 * @returns {Promise<Set<string>>}
 */
export async function fetchCompletedIds() {
  if (!TOKEN || !OWNER || !REPO) return new Set()

  const listRes = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/completed-edits`,
    { headers: GH_HEADERS },
  )

  if (listRes.status === 404) return new Set() // folder doesn't exist yet
  if (!listRes.ok) throw new Error(`GitHub API ${listRes.status}`)

  const files = await listRes.json()
  const ids = new Set()

  await Promise.all(
    files
      .filter((f) => f.type === 'file' && f.name.endsWith('.txt'))
      .map(async (f) => {
        const fileRes = await fetch(f.download_url)
        if (!fileRes.ok) return
        const text = await fileRes.text()
        for (const line of text.split('\n')) {
          const m = line.trim().match(/^\[([^\]]+)\]$/)
          if (m) ids.add(m[1])
        }
      }),
  )

  return ids
}
