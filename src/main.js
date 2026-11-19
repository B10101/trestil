import './style.css'
import { mountGlassFolder } from './glass-folder.js'

// ---- Edit these details ----
const BUSINESS = {
  name: 'TRESTIL',
  tagline: 'Your Trusted Event Hire Partner',
  phone: '0716920954, 0180535014',
  whatsapp: '27000000000', // country code + number, no + or spaces
  area: 'North Rift',
}

const TENTS = [
  ['Wedding tents', 'Elegant covered space for the ceremony, dinner and dance floor.'],
  ['Party tents', 'Birthdays, anniversaries and backyard celebrations of any size.'],
  ['Corporate event tents', 'Launches, team days and exhibitions with a professional finish.'],
  ['Church event tents', 'Extra seating for services, conventions and fellowship days.'],
  ['Graduation tents', 'Shade and shelter for the ceremony and the family photos after.'],
  ['Outdoor event tents', 'Sturdy cover for sun, wind and rain at fields, farms and parks.'],
  ['VIP tents', 'Private, upscale space for special guests and hosts.'],
  ['Marquee tents', 'Large-span marquees for big crowds and full-service events.'],
  ['Funeral and memorial tents', 'Calm, dignified shelter for families and mourners.'],
]

const STEPS = [
  ['Delivery of hired equipment', 'Tents, chairs and tables arrive on the agreed day and time.'],
  ['Tent installation', 'Our crew puts the tent up safely and squares it off on site.'],
  ['Chair and table arrangement', 'Seating laid out to your plan: rows, rounds or banquet style.'],
  ['Venue setup and preparation', 'The space is made ready well before your first guest arrives.'],
  ['Dismantling and collection', 'After the function we take down the tent and collect all equipment.'],
]

const GALLERY = [
  ['/images/tent-rows.png', 'Rows of white tents with gold trim on a green lawn', 'Rows of tents for a large gathering'],
  ['/images/tent-curtains.png', 'White tent with sheer curtain sides on a lawn', 'Tent with sheer curtain sides'],
  ['/images/tent-pagoda.png', 'White pagoda-style tent with draped sides among trees', 'Pagoda-style tent with draped sides'],
  ['/images/1.png', 'Row of white pagoda tents with pink drapes, a red carpet and rows of white chairs on a green lawn', 'Pagoda tents with pink drapes and a red carpet'],
]

const NAV = [
  ['about', 'About'],
  ['quote', 'Contact'],
]

const FOOT_NAV = [
  ['about', 'About'],
  ['tents', 'Tents'],
  ['gallery', 'Our work'],
  ['service', 'How we work'],
  ['quote', 'Get a quote'],
]

// Shared class strings
const btn = 'neu-btn inline-block cursor-pointer rounded-xl px-7 py-3.5 font-body font-semibold text-midnight no-underline'
const section = 'px-4 py-14 sm:px-8 md:py-20'
const wrap = 'mx-auto max-w-[1100px]'
const h2 = "text-[clamp(1.9rem,4vw,2.8rem)] font-bold after:mt-4 after:block after:h-1 after:w-20 after:rounded-full after:bg-gold after:content-['']"
const sub = 'mb-10 mt-3 max-w-[56ch] text-muted'
const field = 'grid gap-1 text-[0.95rem] font-semibold'
const input = 'w-full rounded-md border border-white/80 bg-white/70 px-3 py-2.5 font-normal text-ink'

const ACCENTS = ['border-gold', 'border-gold-light', 'border-gold', 'border-gold-light']
const li = (items, fn) => items.map(fn).join('')
const navLink = ([id, label]) => `<a class="text-[#123B56] uppercase no-underline decoration-gold decoration-2 underline-offset-8 hover:underline" href="#${id}">${label}</a>`
const tel = BUSINESS.phone.replace(/\s/g, '')

document.querySelector('#app').innerHTML = `
  <header class="absolute inset-x-0 top-0 z-10 px-4 py-4 sm:py-6">
    <nav class="flex items-center justify-center gap-5 font-mono text-base font-bold tracking-wide sm:gap-12 sm:text-xl">
      ${li(NAV.slice(0, Math.ceil(NAV.length / 2)), navLink)}
      <a href="#top" aria-label="${BUSINESS.name} home" class="shrink-0"><img src="/images/logo.png" alt="${BUSINESS.name} logo" width="126" height="126" class="size-20 sm:size-28" /></a>
      ${li(NAV.slice(Math.ceil(NAV.length / 2)), navLink)}
    </nav>
  </header>

  <main id="top">
    <section class="relative mb-6 flex min-h-[100svh] items-center px-4 pb-20 pt-36 text-left sm:px-10">
      <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div data-parallax="0.35" class="hero-texture absolute inset-x-0 -top-[40%] h-[140%] will-change-transform"></div>
      </div>
      <div class="relative mx-auto grid w-full max-w-[1100px] items-center gap-12 md:grid-cols-[1.1fr_0.9fr] lg:grid-cols-[1.25fr_0.75fr]">
        <div class="text-center md:text-left">
          <div data-parallax="0.18" class="will-change-transform">
            <h1 class="whitespace-nowrap font-serif text-[clamp(3.25rem,18vw,6.5rem)] font-black leading-none tracking-tight md:text-[clamp(4rem,8.5vw,9rem)] lg:text-[clamp(5rem,11.5vw,9rem)]"><span class="brand-word font-serif font-black tracking-normal">${BUSINESS.name}</span> <span class="ml-1 font-mono text-[0.3em] font-bold tracking-normal text-[#123B56]">LTD</span></h1>
            <p class="mx-auto mt-6 max-w-[30ch] font-mono text-[clamp(1rem,2.6vw,1.75rem)] font-bold text-[#5a2a0a] md:mx-0">You plan the event. We take care of the setup.</p>
            <a class="${btn} mt-10" href="#quote">Request a quote</a>
          </div>
        </div>
        <div class="hero-pop hidden md:block">
          <div class="hero-pop-card">
            <div class="hero-pop-slab" aria-hidden="true"></div>
            <img class="hero-pop-img" src="/images/1.png" alt="White pagoda tents with pink drapes and rows of chairs set up on a green lawn" width="960" height="1280" />
            <div class="hero-pop-tag" aria-hidden="true"><span>Delivered</span><span>Set up</span><span>Collected</span></div>
          </div>
        </div>
      </div>
      <div class="valance absolute inset-x-0 -bottom-6 h-6" aria-hidden="true"></div>
    </section>

    <section id="about" class="${section}">
      <div class="${wrap} max-w-3xl">
        <h2 class="${h2}">About ${BUSINESS.name}</h2>
        <p class="mt-6 text-lg">${BUSINESS.name} is an event hire company. We supply tents, chairs and tables, and our crew installs them, prepares the venue and collects everything once your function ends. Weddings, church services, graduations, corporate events or memorials: we make sure your guests are covered and comfortable.</p>
      </div>
    </section>

    <section id="tents" class="${section}">
      <div class="${wrap}">
        <h2 class="${h2}">Tents for every kind of gathering</h2>
        <p class="${sub}">Tell us the occasion and the headcount. We will recommend the right size and style.</p>
        <ul class="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          ${li(TENTS, ([name, text], i) => `
            <li class="border-t-4 ${ACCENTS[i % 4]} py-5">
              <h3 class="mb-1 text-xl font-semibold">${name}</h3>
              <p class="text-muted">${text}</p>
            </li>`)}
        </ul>
      </div>
    </section>

    <section id="gallery" class="${section} bg-midnight text-canvas">
      <div class="${wrap} grid items-center gap-12 md:grid-cols-[1fr_minmax(0,440px)] md:gap-16">
        <div>
          <h2 class="${h2}">Our tents, set up and ready</h2>
          <p class="mt-3 max-w-[48ch] text-[#c5d6e6]">Recent setups with clean white canvas, drapes and tidy seating.</p>
          <ul class="mt-8 grid gap-3">
            ${li(GALLERY, ([, , cap]) => `<li class="flex items-center gap-3 text-[#e3ecf4]"><span class="size-2 shrink-0 rounded-full bg-gold" aria-hidden="true"></span>${cap}</li>`)}
          </ul>
          <p class="mt-8 font-mono text-sm text-gold-light">Tap the folder to open it, then tap a photo to see it full size.</p>
        </div>
        <div id="gallery-folder" class="w-full max-w-[440px] pt-8 md:pt-0 justify-self-center md:justify-self-end"></div>
      </div>
    </section>

    <section id="service" class="${section} bg-azure-tint">
      <div class="${wrap}">
        <h2 class="${h2}">From delivery to collection, we handle it</h2>
        <p class="${sub}">You enjoy the event. Our crew deals with the setup and the clean-up.</p>
        <ol class="max-w-[760px]">
          ${li(STEPS, ([name, text], i) => `
            <li class="relative pb-8 pl-16 last:pb-0">
              <span class="absolute left-0 top-0 grid size-10 place-items-center rounded-full bg-gold font-head font-bold text-midnight ring-4 ring-gold-light/60">${i + 1}</span>
              ${i < STEPS.length - 1 ? '<span class="absolute bottom-1 left-[1.15rem] top-11 w-0.5 bg-gold/50" aria-hidden="true"></span>' : ''}
              <h3 class="mb-1 mt-1.5 text-xl font-semibold">${name}</h3>
              <p class="text-muted">${text}</p>
            </li>`)}
        </ol>
      </div>
    </section>

    <section id="quote" class="${section} relative overflow-hidden">
      <div class="absolute -left-24 top-8 size-80 rounded-full bg-gold/50 blur-3xl" aria-hidden="true"></div>
      <div class="absolute -right-20 bottom-0 size-96 rounded-full bg-azure/40 blur-3xl" aria-hidden="true"></div>
      <div class="${wrap} relative grid items-start gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
        <div>
          <h2 class="${h2}">Get a quote</h2>
          <p class="${sub}">Send us the details and we will reply with availability and pricing.</p>
          <dl class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
            <dt class="font-semibold text-gold-dark">Phone</dt><dd class="text-muted"><a href="tel:${tel}">${BUSINESS.phone}</a></dd>
            <dt class="font-semibold text-gold-dark">WhatsApp</dt><dd class="text-muted"><a href="https://wa.me/${BUSINESS.whatsapp}">Message us</a></dd>
            
            <dt class="font-semibold text-gold-dark">Service area</dt><dd class="text-muted">${BUSINESS.area}</dd>
          </dl>
        </div>
        <form id="quote-form" class="grid gap-4 glass rounded-3xl border-t-4 border-t-gold p-5 shadow-xl shadow-gold/20 sm:p-8" novalidate>
          <label class="${field}">Your name<input class="${input}" name="name" required autocomplete="name" /></label>
          <label class="${field}">Phone number<input class="${input}" name="phone" type="tel" required autocomplete="tel" /></label>
          <label class="${field}">Type of tent
            <select class="${input}" name="type" required>
              <option value="">Choose one</option>
              ${li(TENTS, ([n]) => `<option>${n}</option>`)}
            </select>
          </label>
          <div class="grid gap-4 sm:grid-cols-2">
            <label class="${field}">Event date<input class="${input}" name="date" type="date" required /></label>
            <label class="${field}">Number of guests<input class="${input}" name="guests" type="number" min="1" required /></label>
          </div>
          <label class="${field}">Venue or location<input class="${input}" name="venue" required /></label>
          <label class="${field}">Extras (chairs, tables, setup help)<textarea class="${input}" name="notes" rows="3"></textarea></label>
          <p class="form-msg min-h-[1.4em] font-medium text-gold-dark" role="status" aria-live="polite"></p>
          <button class="${btn}" type="submit">Send on WhatsApp</button>
        </form>
      </div>
    </section>
  </main>

  <footer class="border-t-4 border-gold bg-midnight px-4 py-8 text-[#d3dde6] sm:px-8">
    <div class="${wrap} flex flex-wrap justify-between gap-x-8 gap-y-2">
      <strong class="flex items-center gap-3 font-head tracking-[0.06em] text-gold-light"><img src="/images/logo.png" alt="" width="126" height="126" class="size-12" />${BUSINESS.name}</strong>
      <nav class="flex flex-wrap gap-x-6 gap-y-1" aria-label="Footer">${li(FOOT_NAV, ([id, label]) => `<a class="hover:text-gold-light hover:underline" href="#${id}">${label}</a>`)}</nav>
      <span>&copy; ${new Date().getFullYear()} ${BUSINESS.name}. All rights reserved.</span>
    </div>
  </footer>
`

// Gallery folder: every tent photo goes inside; choosing one opens it full size
const viewer = document.createElement('dialog')
viewer.className = 'gf-viewer'
viewer.innerHTML = '<img alt="" /><p></p><button type="button" aria-label="Close">&times;</button>'
document.body.appendChild(viewer)
viewer.querySelector('button').addEventListener('click', () => viewer.close())
viewer.addEventListener('click', (e) => { if (e.target === viewer) viewer.close() })

mountGlassFolder(document.querySelector('#gallery-folder'), {
  label: 'Our work',
  meta: `${GALLERY.length} tent setups`,
  tone: 'dark',
  image: '/images/hero.png',
  files: GALLERY.map(([src, alt, cap]) => ({ name: cap, image: src, alt })),
  onFileSelect: (file) => {
    const img = viewer.querySelector('img')
    img.src = file.image
    img.alt = file.alt
    viewer.querySelector('p').textContent = file.name
    viewer.style.setProperty('--gf-viewer-bg', `url("${file.image}")`)
    viewer.showModal()
  },
})

// Hero photo: tilts toward the cursor so it reads as a 3D object
const pop = document.querySelector('.hero-pop')
if (pop && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let raf = 0
  pop.addEventListener('pointermove', (e) => {
    const r = pop.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 2 - 1
    const y = ((e.clientY - r.top) / r.height) * 2 - 1
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => {
      pop.style.setProperty('--rx', (-y * 8).toFixed(2) + 'deg')
      pop.style.setProperty('--ry', (x * 12).toFixed(2) + 'deg')
    })
  })
  pop.addEventListener('pointerleave', () => {
    pop.style.removeProperty('--rx')
    pop.style.removeProperty('--ry')
  })
}

// Quote form -> opens WhatsApp with the details filled in
const form = document.querySelector('#quote-form')
const msg = form.querySelector('.form-msg')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (!form.checkValidity()) {
    msg.textContent = 'Please fill in every required field.'
    form.reportValidity()
    return
  }
  const d = Object.fromEntries(new FormData(form))
  const text = [
    `Hello ${BUSINESS.name}, I would like a quote.`,
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    `Tent: ${d.type}`,
    `Date: ${d.date}`,
    `Guests: ${d.guests}`,
    `Venue: ${d.venue}`,
    d.notes ? `Extras: ${d.notes}` : '',
  ].filter(Boolean).join('\n')
  msg.textContent = 'Opening WhatsApp with your details.'
  window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
})

// Parallax: each [data-parallax] element drifts against the scroll.
// The number is its speed; its parent box is the reference point.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const items = [...document.querySelectorAll('[data-parallax]')]
  let queued = false
  const update = () => {
    queued = false
    const mid = window.innerHeight / 2
    for (const el of items) {
      const r = el.parentElement.getBoundingClientRect()
      if (r.bottom < -200 || r.top > window.innerHeight + 200) continue
      const shift = (mid - (r.top + r.height / 2)) * -Number(el.dataset.parallax)
      el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`
    }
  }
  const request = () => { if (!queued) { queued = true; requestAnimationFrame(update) } }
  addEventListener('scroll', request, { passive: true })
  addEventListener('resize', request)
  update()
}