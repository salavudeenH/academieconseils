import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-10 pb-24 lg:pt-16 lg:pb-32">
      {/* Décor : un seul halo coral subtil + texture noise */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-[var(--color-coral-100)] opacity-50 blur-[100px]" />
        <div className="absolute inset-0 bg-noise opacity-40" />
      </div>

      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Texte */}
          <div className="lg:col-span-6 animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 ring-1 ring-[var(--color-border)] shadow-[var(--shadow-xs)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-sage-300)] opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-sage-500)]" />
              </span>
              <span className="text-[12px] font-medium text-[var(--color-ink-700)]">
                12 480 sociétés créées en 2026
              </span>
            </div>

            <h1 className="heading-display text-[56px] md:text-[72px] lg:text-[84px] text-[var(--color-ink-900)] mt-6">
              Lancez votre société.<br />
              <em>Sans paperasse.</em>
            </h1>

            <p className="mt-7 text-[17px] md:text-[18px] text-[var(--color-ink-600)] max-w-xl leading-relaxed">
              Création, modification, cession, dissolution.
              Tous vos actes juridiques rédigés et déposés en 10 minutes,
              accompagnés par des juristes.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link href="/create-company" className="btn-accent">
                Créer ma société
                <ArrowIcon />
              </Link>
              <Link href="/services/modification" className="btn-secondary">
                Modifier / céder
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] text-[var(--color-ink-600)]">
              <Bullet>Sans engagement</Bullet>
              <Bullet>Documents instantanés</Bullet>
              <Bullet>Juristes 7j/7</Bullet>
            </div>
          </div>

          {/* Mockup produit */}
          <div className="lg:col-span-6 relative">
            <ProductMockup />
          </div>
        </div>

        {/* Bandeau confiance — moins clinquant */}
        <div className="mt-24 lg:mt-32 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)] rounded-2xl overflow-hidden ring-1 ring-[var(--color-border)]">
          <StatCell value="4,9" suffix="/5" label="Trustpilot · 2 800 avis" />
          <StatCell value="10" suffix="min" label="pour créer votre société" />
          <StatCell value="24h" label="dépôt au greffe" />
          <StatCell value="100%" label="conforme INPI / RCS" />
        </div>
      </div>
    </section>
  )
}

function Bullet({ children }) {
  return (
    <div className="flex items-center gap-1.5">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-sage-500)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12l5 5L20 7"/>
      </svg>
      <span>{children}</span>
    </div>
  )
}

function StatCell({ value, suffix, label }) {
  return (
    <div className="bg-white px-6 py-7 lg:px-8 lg:py-8">
      <div className="flex items-baseline gap-1">
        <span className="text-[34px] lg:text-[40px] font-bold tracking-[-0.04em] text-[var(--color-ink-900)]">{value}</span>
        {suffix && <span className="text-[18px] font-semibold text-[var(--color-ink-500)]">{suffix}</span>}
      </div>
      <div className="text-[13px] text-[var(--color-ink-500)] mt-1">{label}</div>
    </div>
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
   Mockup produit — tunnel de création SARL
   ============================================ */
function ProductMockup() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      {/* Carte principale : étape du tunnel */}
      <div className="relative rounded-[24px] bg-white ring-1 ring-[var(--color-border)] shadow-[var(--shadow-xl)] overflow-hidden">
        {/* Header de la fausse app */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-border)] bg-[var(--color-bone-50)]">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF6058]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2D]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="text-[11px] text-[var(--color-ink-500)] font-medium">
            academie-conseils.fr/create
          </div>
          <div className="w-12" />
        </div>

        <div className="p-6">
          {/* Stepper */}
          <div className="flex items-center gap-2 mb-6">
            <Step done label="Forme" />
            <Connector done />
            <Step done label="Société" />
            <Connector done />
            <Step active label="Associés" />
            <Connector />
            <Step label="Récap" />
          </div>

          {/* Form */}
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-coral-500)] mb-1">
            Étape 3 — Associés
          </div>
          <h3 className="heading-section text-[22px] text-[var(--color-ink-900)]">
            Répartition du capital
          </h3>

          <div className="mt-5 space-y-3">
            <ShareholderRow name="Marie Dubois" parts="600 parts" pct="60%" color="coral" />
            <ShareholderRow name="Jean Lefèvre" parts="300 parts" pct="30%" color="sage" />
            <ShareholderRow name="Sofia Martin" parts="100 parts" pct="10%" color="lavender" />
          </div>

          <div className="mt-5 p-4 rounded-xl bg-[var(--color-bone-50)] flex items-center justify-between">
            <div>
              <div className="text-[11px] text-[var(--color-ink-500)] uppercase tracking-wider">Capital total</div>
              <div className="text-[22px] font-bold tracking-tight text-[var(--color-ink-900)]">10 000 €</div>
            </div>
            <div className="text-[11px] font-medium text-[var(--color-sage-500)] bg-[var(--color-sage-100)] px-2.5 py-1 rounded-full">
              ✓ Équilibré
            </div>
          </div>

          <button className="mt-5 w-full rounded-full bg-[var(--color-ink-900)] text-white font-semibold text-[14px] py-3 flex items-center justify-center gap-2">
            Continuer
            <ArrowIcon />
          </button>
        </div>
      </div>

      {/* Floating card 1 : badge "Statuts générés" */}
      <div className="absolute -top-5 -left-6 lg:-left-10 rounded-2xl bg-white ring-1 ring-[var(--color-border)] shadow-[var(--shadow-lg)] px-4 py-3 flex items-center gap-3 animate-float">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-sage-100)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-sage-500)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold text-[var(--color-ink-900)]">Statuts générés</div>
          <div className="text-[11px] text-[var(--color-ink-500)]">Prêts à signer</div>
        </div>
      </div>

      {/* Floating card 2 : INPI */}
      <div className="absolute -bottom-6 -right-4 lg:-right-8 rounded-2xl bg-[var(--color-ink-900)] text-white shadow-[var(--shadow-lg)] px-4 py-3 flex items-center gap-3 animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-coral-500)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M8 4v4M16 4v4"/>
          </svg>
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold">Dépôt INPI</div>
          <div className="text-[11px] text-white/60">Immatriculation 24h</div>
        </div>
      </div>
    </div>
  )
}

function Step({ done, active, label }) {
  return (
    <div className="flex flex-col items-center gap-1 flex-shrink-0">
      <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
        done ? 'bg-[var(--color-sage-500)] text-white' :
        active ? 'bg-[var(--color-coral-500)] text-white ring-4 ring-[var(--color-coral-100)]' :
        'bg-[var(--color-bone-200)] text-[var(--color-ink-400)]'
      }`}>
        {done ? '✓' : ''}
      </div>
      <span className={`text-[10px] font-medium ${active || done ? 'text-[var(--color-ink-900)]' : 'text-[var(--color-ink-400)]'}`}>
        {label}
      </span>
    </div>
  )
}

function Connector({ done }) {
  return (
    <div className={`flex-1 h-px ${done ? 'bg-[var(--color-sage-500)]' : 'bg-[var(--color-bone-300)]'} -mt-3`} />
  )
}

function ShareholderRow({ name, parts, pct, color }) {
  const colors = {
    coral: 'bg-[var(--color-coral-100)] text-[var(--color-coral-600)]',
    sage:  'bg-[var(--color-sage-100)] text-[var(--color-sage-500)]',
    lavender: 'bg-[var(--color-lavender-100)] text-[var(--color-lavender-300)]',
  }
  const bars = {
    coral: 'bg-[var(--color-coral-500)]',
    sage:  'bg-[var(--color-sage-500)]',
    lavender: 'bg-[var(--color-lavender-300)]',
  }
  const w = parseInt(pct, 10)
  return (
    <div className="flex items-center gap-3">
      <div className={`flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold ${colors[color]}`}>
        {name.split(' ').map((n) => n[0]).join('')}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[13.5px] font-semibold text-[var(--color-ink-900)] truncate">{name}</span>
          <span className="text-[12px] text-[var(--color-ink-500)] whitespace-nowrap">{parts}</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-[var(--color-bone-200)] overflow-hidden">
            <div className={`h-full rounded-full ${bars[color]}`} style={{ width: pct }} />
          </div>
          <span className="text-[11px] font-bold text-[var(--color-ink-700)] w-9 text-right">{pct}</span>
        </div>
      </div>
    </div>
  )
}
