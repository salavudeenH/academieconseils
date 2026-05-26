import Link from 'next/link'

export default function FinalCtaSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[32px] bg-[var(--color-ink-900)] text-white p-10 lg:p-16">
          {/* Décor : un halo coral + grain */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-[var(--color-coral-500)] opacity-25 blur-[100px]" />
            <div className="absolute inset-0 bg-noise opacity-30" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-coral-300)] opacity-70 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-coral-400)]" />
                </span>
                Disponible maintenant
              </div>
              <h2 className="heading-display text-[44px] md:text-[64px] mt-5 leading-[0.95]">
                Votre société démarre<br />
                <em>quand vous le décidez.</em>
              </h2>
              <p className="mt-6 text-[17px] text-white/70 max-w-xl leading-relaxed">
                Pas de bureau à pousser, pas de RDV à caler. Vous commencez maintenant,
                vous signez quand vous voulez, on s'occupe du reste.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <Link href="/create-company" className="btn-accent">
                  Créer ma société
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 backdrop-blur ring-1 ring-white/20 px-6 py-3 text-[15px] font-semibold text-white hover:bg-white/15 transition-colors"
                >
                  Parler à un juriste
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden ring-1 ring-white/10">
                {[
                  { v: '12k+', l: 'sociétés créées' },
                  { v: '4,9★', l: 'note Trustpilot' },
                  { v: '24h',  l: 'dépôt au greffe' },
                  { v: '7j/7', l: 'support juriste' },
                ].map((s) => (
                  <div key={s.l} className="bg-[var(--color-ink-900)] p-6">
                    <div className="text-[32px] font-bold tracking-[-0.04em] leading-none">{s.v}</div>
                    <div className="text-[12px] text-white/55 mt-2">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
