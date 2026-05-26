import Link from 'next/link'
import { getAllCategories } from '@/lib/services'

const visuals = {
  creation: {
    accent: 'var(--color-coral-500)',
    pastel: 'var(--color-coral-50)',
    pill: 'bg-[var(--color-coral-50)] text-[var(--color-coral-600)] ring-[var(--color-coral-100)]',
  },
  modification: {
    accent: 'var(--color-lavender-300)',
    pastel: 'var(--color-lavender-50)',
    pill: 'bg-[var(--color-lavender-50)] text-[var(--color-lavender-300)] ring-[var(--color-lavender-100)]',
  },
  cession: {
    accent: 'var(--color-sage-500)',
    pastel: 'var(--color-sage-50)',
    pill: 'bg-[var(--color-sage-50)] text-[var(--color-sage-500)] ring-[var(--color-sage-100)]',
  },
  dissolution: {
    accent: 'var(--color-butter-300)',
    pastel: 'var(--color-butter-50)',
    pill: 'bg-[var(--color-butter-50)] text-[var(--color-butter-300)] ring-[var(--color-butter-100)]',
  },
}

const cardIllustrations = {
  creation: CreationVisual,
  modification: ModificationVisual,
  cession: CessionVisual,
  dissolution: DissolutionVisual,
}

export default function ServicesSection() {
  const categories = getAllCategories()

  return (
    <section id="services" className="py-24 lg:py-32 relative">
      <div className="container-page">
        <div className="flex items-end justify-between flex-wrap gap-6 max-w-5xl">
          <div className="max-w-2xl">
            <span className="eyebrow">Nos services</span>
            <h2 className="heading-display text-[40px] md:text-[52px] text-[var(--color-ink-900)] mt-4">
              Toute la vie de votre <em>société</em>, sur une seule plateforme.
            </h2>
          </div>
          <p className="text-[16px] text-[var(--color-ink-600)] max-w-md">
            De la création à la fermeture, nous rédigeons les actes et déposons les
            dossiers. Vous gardez la main, nous prenons la paperasse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14">
          {categories.map((cat) => {
            const v = visuals[cat.id]
            const Illustration = cardIllustrations[cat.id]
            const minPrice = Math.min(...cat.items.map((i) => i.price))
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="group relative overflow-hidden rounded-[28px] bg-white ring-1 ring-[var(--color-border)] hover:ring-[var(--color-border-strong)] transition-all hover:-translate-y-1"
                style={{
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 p-7 lg:p-8">
                  <div>
                    <div className={`inline-flex items-center gap-1.5 rounded-full ring-1 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.10em] ${v.pill}`}>
                      {cat.short}
                    </div>
                    <h3 className="heading-section text-[26px] mt-3 text-[var(--color-ink-900)]">
                      {cat.label}
                    </h3>
                    <p className="text-[14px] text-[var(--color-ink-600)] mt-2 leading-relaxed">
                      {cat.tagline}
                    </p>

                    <ul className="mt-5 space-y-1.5">
                      {cat.items.slice(0, 3).map((item) => (
                        <li key={item.id} className="flex items-center gap-2 text-[13.5px] text-[var(--color-ink-700)]">
                          <Dot color={v.accent} />
                          <span>{item.name}</span>
                        </li>
                      ))}
                      {cat.items.length > 3 && (
                        <li className="flex items-center gap-2 text-[12.5px] text-[var(--color-ink-500)]">
                          <Dot color="var(--color-ink-300)" />
                          <span>+ {cat.items.length - 3} autre{cat.items.length - 3 > 1 ? 's' : ''}</span>
                        </li>
                      )}
                    </ul>

                    <div className="mt-7 flex items-center justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[11px] text-[var(--color-ink-500)]">à partir de</span>
                        <span className="text-[20px] font-bold tracking-tight text-[var(--color-ink-900)]">{minPrice}€</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-[var(--color-ink-900)] group-hover:gap-2 transition-all">
                        Découvrir
                        <ArrowIcon />
                      </span>
                    </div>
                  </div>

                  <div
                    className="hidden sm:flex shrink-0 items-center justify-center rounded-2xl w-[140px] aspect-square p-4"
                    style={{ background: v.pastel }}
                  >
                    <Illustration accent={v.accent} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Dot({ color }) {
  return (
    <span className="flex h-1.5 w-1.5 rounded-full shrink-0" style={{ background: color }} />
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </svg>
  )
}

/* ============================================
   SVG illustrations (simples, abstraites)
   ============================================ */

function CreationVisual({ accent }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="22" y="20" width="56" height="68" rx="6" fill="white" stroke={accent} strokeWidth="2" />
      <rect x="30" y="30" width="40" height="3" rx="1.5" fill={accent} opacity="0.3"/>
      <rect x="30" y="38" width="32" height="3" rx="1.5" fill={accent} opacity="0.3"/>
      <rect x="30" y="46" width="36" height="3" rx="1.5" fill={accent} opacity="0.3"/>
      <circle cx="50" cy="68" r="10" fill={accent}/>
      <path d="M46 68 l3 3 l5 -5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="78" cy="22" r="6" fill={accent}/>
      <path d="M75 22 h6 M78 19 v6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ModificationVisual({ accent }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="20" y="22" width="50" height="62" rx="5" fill="white" stroke={accent} strokeWidth="2" />
      <rect x="28" y="32" width="34" height="3" rx="1.5" fill={accent} opacity="0.3"/>
      <rect x="28" y="40" width="26" height="3" rx="1.5" fill={accent} opacity="0.3"/>
      <rect x="28" y="48" width="30" height="3" rx="1.5" fill={accent} opacity="0.3"/>
      {/* Pencil */}
      <g transform="translate(58 50) rotate(35)">
        <rect x="0" y="0" width="36" height="10" rx="2" fill={accent}/>
        <polygon points="36,0 44,5 36,10" fill={accent}/>
        <rect x="0" y="0" width="8" height="10" fill="white" stroke={accent} strokeWidth="1.5"/>
      </g>
    </svg>
  )
}

function CessionVisual({ accent }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="32" cy="50" r="14" fill={accent} opacity="0.25"/>
      <circle cx="32" cy="50" r="10" fill={accent}/>
      <path d="M28 50 l3 3 l5 -5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="68" cy="50" r="14" fill={accent} opacity="0.25"/>
      <circle cx="68" cy="50" r="10" fill={accent}/>
      <path d="M64 50 l3 3 l5 -5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M42 50 h16 M55 46 l4 4 l-4 4" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function DissolutionVisual({ accent }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M20 78 L20 35 L50 20 L80 35 L80 78 Z" fill="white" stroke={accent} strokeWidth="2"/>
      <rect x="32" y="50" width="14" height="28" fill={accent} opacity="0.2"/>
      <rect x="54" y="50" width="14" height="28" fill={accent} opacity="0.2"/>
      <rect x="44" y="42" width="12" height="6" fill={accent}/>
      <path d="M30 78 L70 78" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="80" cy="24" r="8" fill={accent}/>
      <path d="M76 24 h8 M80 20 v8" stroke="white" strokeWidth="1.5" strokeLinecap="round" transform="rotate(45 80 24)"/>
    </svg>
  )
}
