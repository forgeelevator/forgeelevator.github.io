#!/usr/bin/env node
// Usage: node scripts/clear-pending.mjs
// Deletes every file in the pending/ folder of the configured GitHub repo.

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// ── load .env.local manually (no extra deps needed) ──────────────────────────
const envPath = resolve(dirname(fileURLToPath(import.meta.url)), '../.env.local')
const env = {}
try {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim()
  }
} catch {
  console.error('Could not read .env.local — make sure it exists alongside this script.')
  process.exit(1)
}

const TOKEN = env.VITE_GH_TOKEN
const OWNER = env.VITE_GH_OWNER
const REPO  = env.VITE_GH_REPO

if (!TOKEN || !OWNER || !REPO) {
  console.error('Missing VITE_GH_TOKEN, VITE_GH_OWNER, or VITE_GH_REPO in .env.local')
  process.exit(1)
}

const BASE = `https://api.github.com/repos/${OWNER}/${REPO}/contents/pending`
const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'clear-pending-script',
}

// ── list files ────────────────────────────────────────────────────────────────
console.log(`Listing pending/ in ${OWNER}/${REPO}…`)
const listRes = await fetch(BASE, { headers: HEADERS })

if (listRes.status === 404) {
  console.log('pending/ folder does not exist — nothing to delete.')
  process.exit(0)
}
if (!listRes.ok) {
  console.error(`Failed to list pending/: ${listRes.status} ${await listRes.text()}`)
  process.exit(1)
}

const files = await listRes.json()
if (!files.length) {
  console.log('pending/ is already empty.')
  process.exit(0)
}

console.log(`Found ${files.length} file(s). Deleting…`)

// ── delete each file ──────────────────────────────────────────────────────────
let ok = 0
let fail = 0
for (const file of files) {
  const res = await fetch(`${BASE}/${encodeURIComponent(file.name)}`, {
    method: 'DELETE',
    headers: { ...HEADERS, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `chore: remove test pending file ${file.name}`,
      sha: file.sha,
    }),
  })
  if (res.ok) {
    console.log(`  ✓ deleted ${file.name}`)
    ok++
  } else {
    console.error(`  ✗ failed ${file.name}: ${res.status} ${await res.text()}`)
    fail++
  }
}

console.log(`\nDone. ${ok} deleted, ${fail} failed.`)
