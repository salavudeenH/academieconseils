import Link from 'next/link'

const STEPS = [
  {
    n: '01',
    titre: 'Choisissez votre formalité',
    description: "Création, modification, cession ou dissolution. Un parcours pensé pour chaque besoin.",
    visual: 'choice',
  },
  {
    n: '02',
    titre: 'Remplissez le questionnaire',
    description: "Un formulaire intelligent, sans jargon. Sauvegarde automatique à chaque étape.",
    visual: 'form',
  },
  {
    n: '03',
    titre: 'Vos documents sont générés',
    description: "PDF prêts à signer, conformes au Code de commerce, vérifiés par nos juristes.",
    visual: 'docs',
  },
  {
    n: '04',
    titre: 'On dépose pour vous',
    description: "Annonce légale, dépôt au greffe, immatriculation : tout est pris en charge.",
    visual: 'deposit',
  },
]

export default function CommentCaMarcheSection() {
  return (
    <section id="comment-ca-marche" className="py-24 lg:py-32 bg-[var(--color-bone-50)] relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      <div className="container-page relative">
        <div className="flex items-end justify-between flex-wrap gap-6 max-w-5xl">
          <div className="max-w-2xl">
            <span className="eyebrow">Comment ça marche</span>
            <h2 className="heading-display text-[40px] md:text-[52px] text-[var(--color-ink-900)] mt-4">
              Quatre étapes,<br /><em>zéro friction.</em>
            </h2>
          </div>
          <p className="text-[16px] text-[var(--color-ink-600)] max-w-md">
            10 minutes pour démarrer, 24h pour être immatriculé. Pas de RDV, pas de bureau,
            pas d'attente.
          </p>
        </div>

        {/* Timeline desktop */}
        <div className="hidden lg:block relative mt-20">
          {/* Connector line */}
          <div className="absolute top-[88px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[var(--color-border-strong)] to-transparent" />

          <div className="grid grid-cols-4 gap-6 relative">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative">
                {/* Visual */}
                <div className="relative h-[180px] rounded-2xl bg-white ring-1 ring-[var(--color-border)] p-5 flex items-center justify-center shadow-[var(--shadow-sm)]">
                  <StepVisual variant={s.visual} />
                  {/* Number badge centered on connector line */}
                  <div className="absolute -bottom-[36px] left-1/2 -translate-x-1/2 flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[var(--color-ink-900)] text-white text-[13px] font-bold ring-4 ring-[var(--color-bone-50)]">
                    {s.n}
                  </div>
                </div>
                {/* Text */}
                <div className="mt-12 text-center max-w-[240px] mx-auto">
                  <h3 className="font-semibold text-[17px] text-[var(--color-ink-900)] tracking-tight">
                    {s.titre}
                  </h3>
                  <p className="mt-2 text-[13.5px] text-[var(--color-ink-600)] leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile stacked */}
        <div className="lg:hidden mt-12 space-y-5">
          {STEPS.map((s) => (
            <div key={s.n} className="flex gap-4 items-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-ink-900)] text-white text-[12px] font-bold shrink-0">
                {s.n}
              </div>
              <div>
                <h3 className="font-semibold text-[17px] text-[var(--color-ink-900)]">{s.titre}</h3>
                <p className="mt-1 text-[14px] text-[var(--color-ink-600)] leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          <Link href="/create-company" className="btn-accent">
            Démarrer maintenant
            <ArrowIcon />
          </Link>
          <Link href="/aide" className="btn-secondary">
            Voir une démo
          </Link>
        </div>
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </svg>
  )
}

function StepVisual({ variant }) {
  if (variant === 'choice') {
    return (
      <svg viewBox="0 0 200 140" className="w-full h-full">
        <rect x="20" y="30" width="48" height="80" rx="10" fill="var(--color-bone-100)" stroke="var(--color-border)" strokeWidth="1.5"/>
        <rect x="76" y="30" width="48" height="80" rx="10" fill="var(--color-coral-500)"/>
        <rect x="80" y="38" width="40" height="6" rx="3" fill="white" opacity="0.4"/>
        <rect x="80" y="50" width="28" height="6" rx="3" fill="white" opacity="0.4"/>
        <circle cx="100" cy="85" r="14" fill="white" opacity="0.2"/>
        <path d="M93 85 l5 5 l9 -9" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="132" y="30" width="48" height="80" rx="10" fill="var(--color-bone-100)" stroke="var(--color-border)" strokeWidth="1.5"/>
      </svg>
    )
  }
  if (variant === 'form') {
    return (
      <svg viewBox="0 0 200 140" className="w-full h-full">
        <rect x="30" y="20" width="140" height="100" rx="10" fill="white" stroke="var(--color-border)" strokeWidth="1.5"/>
        <rect x="42" y="34" width="60" height="6" rx="3" fill="var(--color-ink-900)"/>
        <rect x="42" y="50" width="116" height="14" rx="4" fill="var(--color-bone-100)" stroke="var(--color-border)" strokeWidth="1"/>
        <rect x="46" y="55" width="50" height="4" rx="2" fill="var(--color-ink-400)"/>
        <rect x="42" y="72" width="116" height="14" rx="4" fill="var(--color-bone-100)" stroke="var(--color-border)" strokeWidth="1"/>
        <rect x="46" y="77" width="72" height="4" rx="2" fill="var(--color-ink-400)"/>
        <rect x="42" y="96" width="60" height="14" rx="7" fill="var(--color-coral-500)"/>
        <rect x="56" y="101" width="32" height="4" rx="2" fill="white"/>
      </svg>
    )
  }
  if (variant === 'docs') {
    return (
      <svg viewBox="0 0 200 140" className="w-full h-full">
        <g transform="translate(50 20) rotate(-8)">
          <rect x="0" y="0" width="80" height="100" rx="6" fill="white" stroke="var(--color-border)" strokeWidth="1.5"/>
          <rect x="10" y="14" width="40" height="4" rx="2" fill="var(--color-ink-700)"/>
          <rect x="10" y="24" width="60" height="2" rx="1" fill="var(--color-ink-300)"/>
          <rect x="10" y="30" width="50" height="2" rx="1" fill="var(--color-ink-300)"/>
          <rect x="10" y="36" width="55" height="2" rx="1" fill="var(--color-ink-300)"/>
        </g>
        <g transform="translate(80 24) rotate(6)">
          <rect x="0" y="0" width="80" height="100" rx="6" fill="white" stroke="var(--color-coral-500)" strokeWidth="2"/>
          <rect x="10" y="14" width="40" height="4" rx="2" fill="var(--color-coral-500)"/>
          <rect x="10" y="24" width="60" height="2" rx="1" fill="var(--color-ink-300)"/>
          <rect x="10" y="30" width="50" height="2" rx="1" fill="var(--color-ink-300)"/>
          <rect x="10" y="36" width="55" height="2" rx="1" fill="var(--color-ink-300)"/>
          <circle cx="40" cy="75" r="14" fill="var(--color-sage-100)"/>
          <path d="M33 75 l5 5 l10 -10" stroke="var(--color-sage-500)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg>
    )
  }
  // deposit
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      <rect x="30" y="36" width="140" height="76" rx="10" fill="var(--color-ink-900)"/>
      <rect x="44" y="50" width="64" height="6" rx="3" fill="white" opacity="0.7"/>
      <rect x="44" y="62" width="44" height="4" rx="2" fill="white" opacity="0.4"/>
      <rect x="44" y="82" width="60" height="20" rx="10" fill="var(--color-coral-500)"/>
      <rect x="62" y="89" width="24" height="6" rx="3" fill="white"/>
      <circle cx="146" cy="74" r="22" fill="var(--color-coral-500)"/>
      <path d="M138 74 l6 6 l12 -12" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
