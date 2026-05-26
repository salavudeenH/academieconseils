const PARTNERS = [
  'Bpifrance', 'CCI France', 'CMA', 'Stripe', 'Notaires.fr', 'INPI',
]

const PRESS = [
  { name: 'Les Échos',          quote: 'La plateforme legaltech qui rend les formalités enfin lisibles.' },
  { name: 'Maddyness',          quote: 'Une UX au niveau des meilleures fintechs françaises.' },
  { name: 'Le Figaro Économie', quote: 'Académie Conseils démocratise le droit des sociétés.' },
]

const LABELS = [
  { label: 'AES-256',     desc: 'Données chiffrées' },
  { label: 'RGPD',        desc: 'Conforme UE' },
  { label: '🇫🇷',          desc: 'Hébergé en France' },
  { label: 'PCI DSS',     desc: 'via Stripe' },
  { label: 'Juristes',    desc: 'Documents vérifiés' },
]

export default function TrustSection() {
  return (
    <section className="py-20 lg:py-24 border-y border-[var(--color-border)] bg-white">
      <div className="container-page">
        {/* Partenaires */}
        <div className="text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-500)]">
            Ils nous font confiance
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {PARTNERS.map((name) => (
            <span key={name} className="text-[var(--color-ink-700)] font-semibold tracking-tight text-[17px] hover:text-[var(--color-ink-900)] transition-colors">
              {name}
            </span>
          ))}
        </div>

        {/* Presse */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)] rounded-2xl overflow-hidden ring-1 ring-[var(--color-border)]">
          {PRESS.map((p) => (
            <div key={p.name} className="bg-[var(--color-bone-50)] p-7 lg:p-8">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-ink-500)] mb-3">
                {p.name}
              </div>
              <blockquote className="text-[15px] text-[var(--color-ink-800)] leading-relaxed">
                « {p.quote} »
              </blockquote>
            </div>
          ))}
        </div>

        {/* Labels */}
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {LABELS.map((b) => (
            <div key={b.desc} className="inline-flex items-center gap-2 rounded-full bg-[var(--color-bone-50)] px-4 py-2 ring-1 ring-[var(--color-border)]">
              <span className="text-[12px] font-bold tracking-tight text-[var(--color-ink-900)]">
                {b.label}
              </span>
              <span className="text-[12px] text-[var(--color-ink-500)]">{b.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
