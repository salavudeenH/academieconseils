const AVANTAGES = [
  {
    label: 'Express',
    description: "Documents générés en moins de 10 minutes. Pas d'attente, pas de rendez-vous, pas de bureau à pousser.",
    metric: '10 min',
    icon: 'bolt',
  },
  {
    label: 'Sans surprise',
    description: "Tarifs affichés dès la première page. Frais de greffe au coût réel, pas d'abonnement caché.",
    metric: 'Prix fixe',
    icon: 'shield',
  },
  {
    label: 'Conforme',
    description: 'Actes validés par nos juristes, à jour du Code de commerce et des dernières réformes.',
    metric: '100%',
    icon: 'check',
  },
  {
    label: 'Humain',
    description: 'Juristes joignables par chat, email ou téléphone. Réponse sous 5 minutes en moyenne.',
    metric: '7j/7',
    icon: 'chat',
  },
  {
    label: 'Sécurisé',
    description: 'Données chiffrées AES-256, hébergement en France, conformité RGPD. Stripe pour le paiement.',
    metric: 'AES-256',
    icon: 'lock',
  },
  {
    label: 'Tout compris',
    description: "Statuts, annonce légale, dépôt au greffe : on gère l'intégralité du dossier jusqu'à l'immatriculation.",
    metric: 'A → Z',
    icon: 'box',
  },
]

export default function AvantagesSection() {
  return (
    <section id="avantages" className="py-24 lg:py-32">
      <div className="container-page">
        <div className="flex items-end justify-between flex-wrap gap-6 max-w-5xl">
          <div className="max-w-2xl">
            <span className="eyebrow">Pourquoi nous</span>
            <h2 className="heading-display text-[40px] md:text-[52px] text-[var(--color-ink-900)] mt-4">
              La rigueur d'un cabinet.<br /><em>La fluidité d'une app.</em>
            </h2>
          </div>
          <p className="text-[16px] text-[var(--color-ink-600)] max-w-md">
            Six raisons concrètes pour confier vos formalités à Académie Conseils plutôt qu'à un cabinet,
            une legaltech low-cost ou… à vous-même.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)] rounded-3xl overflow-hidden ring-1 ring-[var(--color-border)] mt-14">
          {AVANTAGES.map((a) => (
            <div key={a.label} className="bg-white p-7 lg:p-8 hover:bg-[var(--color-bone-50)] transition-colors group">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-bone-100)] ring-1 ring-[var(--color-border)] group-hover:bg-white transition-colors">
                  <Icon name={a.icon} />
                </div>
                <div className="text-[12px] font-bold tracking-tight text-[var(--color-coral-600)] bg-[var(--color-coral-50)] px-2 py-1 rounded-md">
                  {a.metric}
                </div>
              </div>
              <h3 className="mt-6 text-[19px] font-bold tracking-tight text-[var(--color-ink-900)]">
                {a.label}
              </h3>
              <p className="mt-2 text-[14px] text-[var(--color-ink-600)] leading-relaxed">
                {a.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Icon({ name }) {
  const stroke = 'var(--color-ink-900)'
  const props = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'bolt':   return <svg {...props}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>
    case 'shield': return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    case 'check':  return <svg {...props}><path d="M20 6L9 17l-5-5"/></svg>
    case 'chat':   return <svg {...props}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    case 'lock':   return <svg {...props}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
    case 'box':    return <svg {...props}><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>
    default: return null
  }
}
