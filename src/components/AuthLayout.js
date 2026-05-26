import Link from 'next/link'

export default function AuthLayout({ children, side }) {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[var(--color-bone-50)]">
      {/* Left form pane */}
      <div className="flex flex-col bg-white px-6 sm:px-12 lg:px-20 py-10 lg:py-12 relative">
        <Link href="/" className="inline-flex items-center gap-2.5 self-start group">
          <div className="relative h-9 w-9">
            <div className="absolute inset-0 rounded-[10px] bg-[var(--color-ink-900)]" />
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-[15px]">A</div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[var(--color-coral-500)] ring-2 ring-white" />
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-[var(--color-ink-900)]">Académie Conseils</span>
        </Link>

        <div className="flex-1 flex items-center py-12">
          <div className="w-full max-w-md mx-auto">{children}</div>
        </div>

        <div className="text-[12px] text-[var(--color-ink-500)] flex flex-wrap gap-x-4 gap-y-1">
          <span>© {new Date().getFullYear()} Académie Conseils</span>
          <Link href="/mentions-legales" className="hover:text-[var(--color-ink-900)] transition-colors">Mentions légales</Link>
          <Link href="/confidentialite" className="hover:text-[var(--color-ink-900)] transition-colors">Confidentialité</Link>
          <Link href="/aide" className="hover:text-[var(--color-ink-900)] transition-colors">Aide</Link>
        </div>
      </div>

      {/* Right marketing pane */}
      <div className="hidden lg:flex relative bg-[var(--color-ink-950)] text-white overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-[var(--color-coral-500)] opacity-20 blur-[100px]" />
          <div className="absolute inset-0 bg-noise opacity-30" />
        </div>
        <div className="relative flex flex-col justify-center p-16 max-w-2xl">
          {side || <DefaultSide />}
        </div>
      </div>
    </main>
  )
}

function DefaultSide() {
  return (
    <>
      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] ring-1 ring-white/10">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-coral-300)] opacity-70 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-coral-400)]" />
        </span>
        12 480 sociétés créées
      </div>
      <h2 className="heading-display text-[44px] mt-6 leading-[1.02]">
        Vos formalités juridiques,<br />
        <em>au calme.</em>
      </h2>
      <p className="mt-5 text-white/65 text-[16px] leading-relaxed">
        Plus de 12 000 entrepreneurs gèrent leurs statuts, modifications et cessions
        depuis leur espace client Académie Conseils.
      </p>
      <ul className="mt-10 space-y-3">
        {[
          'Documents générés en 10 minutes',
          'Conforme au Code de commerce',
          'Juristes joignables 7j/7',
          'Tarif transparent, sans abonnement',
        ].map((s) => (
          <li key={s} className="flex items-center gap-3 text-[15px] text-white/85">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--color-coral-400)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
            </span>
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-12 flex items-center gap-4">
        <div className="flex -space-x-2.5">
          {['CD', 'TR', 'SM', 'KB'].map((i, idx) => (
            <div key={i} className="h-10 w-10 rounded-full bg-white/10 ring-[3px] ring-[var(--color-ink-950)] flex items-center justify-center text-[11px] font-bold">{i}</div>
          ))}
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-[var(--color-coral-300)]">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/></svg>
            ))}
          </div>
          <div className="text-white/55 text-[12px] mt-0.5">4,9 / 5 · 2 800+ avis</div>
        </div>
      </div>
    </>
  )
}
