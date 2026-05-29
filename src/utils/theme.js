export const THEMES = [
  // ── 1. Forge ─────────────────────────────────────────────────────────────
  // The established brand. Dark industrial navy + warm fire orange.
  // Conveys confidence, reliability, and hands-on expertise.
  {
    id: 'forge', name: 'Forge',
    navy:  '#0d1f35', steel: '#1e3a5f', mid: '#2c5282',
    fire:  '#e8900a', amber: '#c47a1e',
    light: '#f0f4f8', slate: '#64748b',
  },
  // ── 2. Blueprint ─────────────────────────────────────────────────────────
  // Engineering/technical feel — deep navy + electric cyan.
  // Signals precision, certifications, and technical depth.
  {
    id: 'blueprint', name: 'Blueprint',
    navy:  '#0c1a2e', steel: '#0e2848', mid: '#133a68',
    fire:  '#0ea5e9', amber: '#0284c7',
    light: '#f0f9ff', slate: '#475569',
  },
  // ── 3. Obsidian ───────────────────────────────────────────────────────────
  // Near-black + warm gold. Premium/luxury feel.
  // Good for high-end commercial and hotel properties.
  {
    id: 'obsidian', name: 'Obsidian',
    navy:  '#0f0f11', steel: '#1c1c20', mid: '#2a2a30',
    fire:  '#d4a017', amber: '#a07c12',
    light: '#f8f5ee', slate: '#9ca3af',
  },
  // ── 4. Carbon ─────────────────────────────────────────────────────────────
  // Dark charcoal + high-vis safety orange.
  // Industrial safety aesthetic — emphasizes emergency services.
  {
    id: 'carbon', name: 'Carbon',
    navy:  '#18181b', steel: '#27272a', mid: '#3f3f46',
    fire:  '#f97316', amber: '#ea580c',
    light: '#fafaf9', slate: '#a1a1aa',
  },
  // ── 5. Copper ─────────────────────────────────────────────────────────────
  // Warm dark brown + copper-bronze accent.
  // Craftsman heritage — suits long-established, family-owned contractors.
  {
    id: 'copper', name: 'Copper',
    navy:  '#1a1209', steel: '#2d1e0d', mid: '#3f2d14',
    fire:  '#b87333', amber: '#9a5c1a',
    light: '#fdf6ec', slate: '#92806e',
  },
  // ── 6. Forest ─────────────────────────────────────────────────────────────
  // Deep Tennessee green + warm amber.
  // Local/regional identity — connects to East Tennessee's landscape.
  {
    id: 'forest', name: 'Forest',
    navy:  '#052e16', steel: '#14532d', mid: '#166534',
    fire:  '#d97706', amber: '#b45309',
    light: '#f0fdf4', slate: '#4b7c5d',
  },
  // ── 7. Midnight ───────────────────────────────────────────────────────────
  // Cool dark slate + indigo. Sleek, modern corporate feel.
  // Suits tech-forward property managers and new construction clients.
  {
    id: 'midnight', name: 'Midnight',
    navy:  '#0f172a', steel: '#1e293b', mid: '#334155',
    fire:  '#6366f1', amber: '#4f46e5',
    light: '#f8fafc', slate: '#64748b',
  },
]

const COLOR_KEYS = ['navy', 'steel', 'mid', 'amber', 'fire', 'light', 'slate']
const STORAGE_KEY = 'forge_theme'

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r} ${g} ${b}`
}

function lightenHex(hex, amt) {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + amt)
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + amt)
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + amt)
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
}

export function applyTheme(colors) {
  const root = document.documentElement
  for (const key of COLOR_KEYS) {
    if (colors[key]) {
      root.style.setProperty(`--forge-${key}-rgb`, hexToRgb(colors[key]))
    }
  }
}

export function saveTheme(colors) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(colors))
}

export function loadSavedTheme() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/** Build a full theme object from the 4 user-picked colors, deriving steel/mid/slate. */
export function buildCustomTheme(navy, fire, amber, light) {
  return {
    id: 'custom',
    navy,
    steel: lightenHex(navy, 25),
    mid:   lightenHex(navy, 50),
    amber,
    fire,
    light,
    slate: '#64748b',
  }
}
