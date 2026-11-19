import './glass-folder.css'

// Glass folder, ported from the React GlassFolder component to plain DOM.
// Back panel holds a picture, the files sit between it and a frosted front
// panel. Hover leans the glass forward; click opens and fans the files.

const W = 340
const H = 272
const HEADROOM = 54
const FRONT_H = H - 74
const MAX_VISIBLE = 4

const BACK_PATH =
  'M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z'
const FRONT_PATH =
  `M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 ${FRONT_H - 22}` +
  `A22 22 0 0 1 318 ${FRONT_H}L22 ${FRONT_H}A22 22 0 0 1 0 ${FRONT_H - 22}Z`

function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function hashString(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

let uidCount = 0

/**
 * @param {HTMLElement} mount  element the folder is placed in; it sizes to its width
 * @param {{label?: string, meta?: string, tone?: 'light'|'dark', image?: string,
 *          files: {name: string, meta?: string, image?: string, alt?: string}[],
 *          maxWidth?: number, onFileSelect?: (file, index) => void}} opts
 */
export function mountGlassFolder(mount, opts) {
  let { label = '', meta, tone = 'light', image, files, maxWidth = 440, onFileSelect } = opts
  const uid = 'gf' + ++uidCount
  files = files.map((f) => ({ ...f, name: f.name ?? f.alt ?? '' }))
  const start = Math.max(0, files.length - MAX_VISIBLE)
  const visible = files.slice(start)
  const count = files.length
  const metaLine = meta ?? `${count} ${count === 1 ? 'item' : 'items'}`

  const sheets = visible
    .map((file, v) => {
      const slot = visible.length <= 1 ? 0 : (v / (visible.length - 1)) * 2 - 1
      const j = rng(hashString(file.name) + v)
      const style = `--gf-slot:${slot};--gf-depth:${visible.length - 1 - v};--gf-jx:${((j() - 0.5) * 10).toFixed(2)}px;--gf-jr:${((j() - 0.5) * 3.2).toFixed(2)}deg;z-index:${v + 1}`
      return `
        <div role="listitem" class="gf-sheet-slot">
          <button type="button" class="gf-sheet${file.image ? ' gf-sheet--art' : ''}" style="${style}" data-index="${start + v}"
            aria-label="${esc(file.alt || file.name)}">
            ${file.image ? `<img class="gf-sheet-art" src="${esc(file.image)}" alt="" width="272" height="184" draggable="false" loading="lazy" />` : ''}
            <span class="gf-sheet-head">
              <span class="gf-sheet-name">${esc(file.name)}</span>
              ${file.meta ? `<span class="gf-sheet-meta">${esc(file.meta)}</span>` : ''}
            </span>
          </button>
        </div>`
    })
    .join('')

  const root = document.createElement('div')
  root.className = 'gf-root'
  root.dataset.tone = tone
  root.innerHTML = `
    <div class="gf-stage">
      <div class="gf-tilt">
        <div class="gf-shadow" aria-hidden="true"></div>
        <div class="gf-back" style="clip-path:path('${BACK_PATH}')" aria-hidden="true">
          ${image ? `<img class="gf-art" src="${esc(image)}" alt="" width="${W + 24}" height="${H + 24}" draggable="false" />` : ''}
          <div class="gf-back-sheen"></div>
        </div>
        <svg class="gf-rim gf-back-rim" viewBox="0 0 ${W} ${H}" aria-hidden="true"><path d="${BACK_PATH}" /></svg>
        <div class="gf-front" style="clip-path:path('${FRONT_PATH}')">
          <div class="gf-tint" aria-hidden="true"></div>
          <div class="gf-spec" aria-hidden="true"></div>
          <svg class="gf-rim gf-front-rim" viewBox="0 0 ${W} ${FRONT_H}" aria-hidden="true">
            <defs>
              <linearGradient id="${uid}-rim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#fff" stop-opacity="0.95" />
                <stop offset="0.35" stop-color="#fff" stop-opacity="0.35" />
                <stop offset="1" stop-color="#fff" stop-opacity="0.12" />
              </linearGradient>
            </defs>
            <path d="${FRONT_PATH}" stroke="url(#${uid}-rim)" />
          </svg>
          <button type="button" class="gf-hit" aria-expanded="false"></button>
          <div class="gf-label">
            <span class="gf-title">${esc(label)}</span>
            <span class="gf-meta">${esc(metaLine)}</span>
          </div>
        </div>
        <div class="gf-files" role="list" aria-label="${esc(label)} contents" inert>${sheets}</div>
      </div>
    </div>`
  mount.appendChild(root)

  const stage = root.querySelector('.gf-stage')
  const hit = root.querySelector('.gf-hit')
  const filesEl = root.querySelector('.gf-files')

  // ---- size to the mount's width -------------------------------------------
  const resize = () => {
    const width = Math.min(maxWidth, mount.clientWidth || W)
    const k = width / W
    root.style.width = width + 'px'
    root.style.height = (H + HEADROOM) * k + 'px'
    stage.style.transform = `translateY(${HEADROOM * k}px) scale(${k})`
  }
  resize()
  new ResizeObserver(resize).observe(mount)

  // ---- open / close -------------------------------------------------------
  let open = false
  const setOpen = (next) => {
    open = next
    root.toggleAttribute('data-open', open)
    filesEl.toggleAttribute('inert', !open)
    hit.setAttribute('aria-expanded', String(open))
    hit.setAttribute('aria-label', `${open ? 'Close' : 'Open'} ${label}, ${count} ${count === 1 ? 'item' : 'items'}`)
  }
  setOpen(false)
  hit.addEventListener('click', () => setOpen(!open))
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) {
      setOpen(false)
      hit.focus()
    }
  })
  document.addEventListener('pointerdown', (e) => {
    if (open && !root.contains(e.target)) setOpen(false)
  })

  filesEl.addEventListener('click', (e) => {
    const sheet = e.target.closest('.gf-sheet')
    if (!sheet) return
    const i = Number(sheet.dataset.index)
    onFileSelect?.(files[i], i)
  })

  // ---- entrance: assemble the first time it scrolls into view ---------------
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        root.setAttribute('data-entered', '')
      },
      { threshold: 0.25 },
    )
    io.observe(root)
  } else {
    root.setAttribute('data-entered', '')
  }

  // ---- pointer: light and parallax follow the cursor ------------------------
  let raf = 0
  let px = 0
  let py = 0
  const write = () => {
    raf = 0
    root.style.setProperty('--gf-px', px.toFixed(3))
    root.style.setProperty('--gf-py', py.toFixed(3))
  }
  root.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return
    const r = root.getBoundingClientRect()
    px = ((e.clientX - r.left) / r.width) * 2 - 1
    py = ((e.clientY - r.top) / r.height) * 2 - 1
    if (!raf) raf = requestAnimationFrame(write)
  })
  root.addEventListener('pointerleave', () => {
    px = 0
    py = 0
    if (!raf) raf = requestAnimationFrame(write)
  })

  return { root, setOpen }
}
