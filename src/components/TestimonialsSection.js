const TESTIMONIALS = [
  {
    name: 'Camille Dufresne',
    role: 'Fondatrice · Studio Pollen',
    content: "J'ai créé ma SAS en moins de 30 minutes un dimanche soir. Le lundi matin, mon dossier était au greffe. Bluffant.",
    metric: { value: 'SAS', label: 'Studio créatif · Paris' },
    initials: 'CD',
    color: 'coral',
  },
  {
    name: 'Thomas Renaud',
    role: 'Gérant · Renaud Conseil',
    content: "Le transfert de mon siège social a été pris en charge de A à Z. J'avais juste à signer. Le support a répondu en 5 min.",
    metric: { value: 'EURL', label: 'Conseil B2B · Lyon' },
    initials: 'TR',
    color: 'sage',
  },
  {
    name: 'Sofia Martelli',
    role: 'Directrice · Cosmo TVS',
    content: "On a cédé 30% des parts à un nouvel associé. Acte rédigé, agrément géré, tout était nickel. À refaire sans hésiter.",
    metric: { value: 'Cession', label: '30% des parts · 2026' },
    initials: 'SM',
    color: 'lavender',
  },
  {
    name: 'Karim Belkacem',
    role: 'Président · SM Formation',
    content: "La cession de notre fonds de commerce a été un long parcours. Académie Conseils nous a tenu la main jusqu'à la signature.",
    metric: { value: 'Fonds', label: 'Formation pro · Marseille' },
    initials: 'KB',
    color: 'butter',
  },
]

const colorMap = {
  coral:    'bg-[var(--color-coral-100)] text-[var(--color-coral-600)]',
  sage:     'bg-[var(--color-sage-100)] text-[var(--color-sage-500)]',
  lavender: 'bg-[var(--color-lavender-100)] text-[var(--color-lavender-300)]',
  butter:   'bg-[var(--color-butter-100)] text-[var(--color-butter-300)]',
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-bone-50)] relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      <div className="container-page relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <span className="eyebrow">Témoignages</span>
            <h2 className="heading-display text-[40px] md:text-[52px] text-[var(--color-ink-900)] mt-4">
              4,9 sur 5,<br /><em>répété 2 800 fois.</em>
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex -space-x-2.5">
              {TESTIMONIALS.map((t) => (
                <div key={t.initials} className={`h-11 w-11 rounded-full ${colorMap[t.color]} ring-[3px] ring-[var(--color-bone-50)] flex items-center justify-center text-[12px] font-bold`}>
                  {t.initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[var(--color-coral-500)]">
                <Stars />
                <span className="font-bold text-[15px] text-[var(--color-ink-900)]">4,9 / 5</span>
              </div>
              <div className="text-[12px] text-[var(--color-ink-500)] mt-0.5">sur 2 800+ avis vérifiés Trustpilot</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t) => (
            <article key={t.name} className="card card-hover relative overflow-hidden">
              <Quote />
              <div className="flex items-center gap-3 relative">
                <div className={`h-12 w-12 rounded-full ${colorMap[t.color]} flex items-center justify-center text-[14px] font-bold`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-[var(--color-ink-900)] text-[15px]">{t.name}</div>
                  <div className="text-[12.5px] text-[var(--color-ink-500)]">{t.role}</div>
                </div>
              </div>
              <p className="mt-5 text-[15px] text-[var(--color-ink-800)] leading-relaxed">
                « {t.content} »
              </p>
              <div className="mt-5 pt-5 border-t border-[var(--color-border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold tracking-tight text-[var(--color-ink-900)] bg-[var(--color-bone-100)] px-2 py-1 rounded-md">
                    {t.metric.value}
                  </span>
                  <span className="text-[12px] text-[var(--color-ink-500)]">{t.metric.label}</span>
                </div>
                <div className="flex items-center gap-0.5 text-[var(--color-coral-500)]">
                  <Stars small />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stars({ small }) {
  const size = small ? 12 : 14
  return (
    <span className="inline-flex items-center gap-px">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ))}
    </span>
  )
}

function Quote() {
  return (
    <svg className="absolute top-5 right-5 text-[var(--color-bone-200)]" width="56" height="56" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.17 6A6 6 0 003 12v6h6v-6H6a3 3 0 013-3V6zm12 0a6 6 0 00-6 6v6h6v-6h-3a3 3 0 013-3V6z"/>
    </svg>
  )
}
