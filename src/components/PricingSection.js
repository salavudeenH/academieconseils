import Link from 'next/link'

const PLANS = [
  {
    name: 'Essentiel',
    price: 129,
    tagline: 'Pour démarrer en autonomie',
    features: [
      { text: 'Statuts personnalisés', emphasis: true },
      { text: 'Annonce légale offerte' },
      { text: 'Génération PDF instantanée' },
      { text: 'Accès espace client à vie' },
      { text: 'Support par email' },
    ],
    cta: 'Choisir Essentiel',
    href: '/create-company?plan=essentiel',
    popular: false,
  },
  {
    name: 'Confort',
    price: 199,
    tagline: 'Le choix de 8 entrepreneurs sur 10',
    features: [
      { text: "Tout l'Essentiel, plus :", separator: true },
      { text: 'Dépôt au greffe pris en charge', emphasis: true },
      { text: 'Vérification par un juriste', emphasis: true },
      { text: 'Support prioritaire (chat + tel)' },
      { text: 'Kbis livré en 48h' },
      { text: '1 modification offerte la 1re année' },
    ],
    cta: 'Choisir Confort',
    href: '/create-company?plan=confort',
    popular: true,
  },
  {
    name: 'Premium',
    price: 349,
    tagline: 'Accompagnement complet',
    features: [
      { text: 'Tout le Confort, plus :', separator: true },
      { text: 'RDV téléphonique avec un juriste', emphasis: true },
      { text: 'Domiciliation 3 mois offerte', emphasis: true },
      { text: "Pacte d'associés sur mesure" },
      { text: 'Assistance fiscale 1 an' },
      { text: 'Modifications illimitées 1re année' },
    ],
    cta: 'Choisir Premium',
    href: '/create-company?plan=premium',
    popular: false,
  },
]

export default function PricingSection() {
  return (
    <section id="tarifs" className="py-24 lg:py-32">
      <div className="container-page">
        <div className="max-w-3xl mx-auto text-center">
          <span className="eyebrow">Tarifs</span>
          <h2 className="heading-display text-[40px] md:text-[52px] text-[var(--color-ink-900)] mt-4">
            Un prix juste,<br /><em>payable une seule fois.</em>
          </h2>
          <p className="mt-5 text-[16px] text-[var(--color-ink-600)]">
            Pas d'abonnement, pas de frais cachés. Les frais de greffe et d'annonce
            légale sont reversés au coût réel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14 max-w-6xl mx-auto items-start">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-[24px] p-7 lg:p-8 transition-all ${
                p.popular
                  ? 'bg-[var(--color-ink-900)] text-white ring-1 ring-[var(--color-ink-900)] shadow-[var(--shadow-xl)] md:scale-[1.02] md:-translate-y-2'
                  : 'bg-white ring-1 ring-[var(--color-border)] hover:ring-[var(--color-border-strong)] hover:-translate-y-1'
              }`}
              style={p.popular ? {} : { boxShadow: 'var(--shadow-sm)' }}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-coral-500)] text-white px-3 py-1 text-[11px] font-semibold tracking-wider uppercase shadow-[var(--shadow-md)]">
                    Le plus choisi
                  </span>
                </div>
              )}

              <h3 className={`text-[24px] font-bold tracking-tight ${p.popular ? 'text-white' : 'text-[var(--color-ink-900)]'}`}>
                {p.name}
              </h3>
              <p className={`text-[13px] mt-1 ${p.popular ? 'text-white/60' : 'text-[var(--color-ink-500)]'}`}>
                {p.tagline}
              </p>

              <div className="mt-7 flex items-baseline gap-1">
                <span className={`text-[52px] font-bold tracking-[-0.04em] leading-none ${p.popular ? 'text-white' : 'text-[var(--color-ink-900)]'}`}>
                  {p.price}
                </span>
                <span className={`text-[24px] font-semibold ${p.popular ? 'text-white/80' : 'text-[var(--color-ink-700)]'}`}>€</span>
                <span className={`text-[12px] ml-2 ${p.popular ? 'text-white/50' : 'text-[var(--color-ink-500)]'}`}>HT · une fois</span>
              </div>

              <ul className="mt-7 space-y-3">
                {p.features.map((f, i) => (
                  <li key={i} className={`flex items-start gap-2.5 text-[13.5px] ${
                    f.separator
                      ? (p.popular ? 'text-white/60 font-semibold pt-1' : 'text-[var(--color-ink-500)] font-semibold pt-1')
                      : (p.popular ? 'text-white/90' : 'text-[var(--color-ink-700)]')
                  }`}>
                    {!f.separator && (
                      <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-full mt-px shrink-0 ${
                        p.popular ? 'bg-[var(--color-coral-500)]' : 'bg-[var(--color-sage-100)]'
                      }`}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={p.popular ? 'white' : 'var(--color-sage-500)'} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
                      </span>
                    )}
                    <span className={f.emphasis ? 'font-semibold' : ''}>{f.text}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={p.href}
                className={`mt-8 block w-full text-center rounded-full font-semibold py-3 text-[14px] transition-all ${
                  p.popular
                    ? 'bg-[var(--color-coral-500)] text-white hover:bg-[var(--color-coral-600)]'
                    : 'bg-[var(--color-ink-900)] text-white hover:bg-[var(--color-ink-800)]'
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-[13px] text-[var(--color-ink-500)] mt-10 max-w-xl mx-auto">
          Les frais de greffe et de publication d'annonce légale sont reversés
          aux organismes officiels sans marge. Paiement sécurisé via Stripe.
        </p>
      </div>
    </section>
  )
}
