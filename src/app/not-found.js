import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--color-bone-50)] flex items-center justify-center px-4 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-[var(--color-coral-100)] opacity-40 blur-[100px]" />
        <div className="absolute inset-0 bg-noise opacity-30" />
      </div>

      <div className="relative max-w-lg text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-12">
          <div className="relative h-9 w-9">
            <div className="absolute inset-0 rounded-[10px] bg-[var(--color-ink-900)]" />
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-[15px]">A</div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[var(--color-coral-500)] ring-2 ring-[var(--color-bone-50)]" />
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-[var(--color-ink-900)]">Académie Conseils</span>
        </Link>

        <div className="text-[120px] font-bold tracking-[-0.06em] text-[var(--color-ink-900)] leading-none">
          4<span className="text-[var(--color-coral-500)]">0</span>4
        </div>
        <span className="eyebrow mt-4">Page introuvable</span>
        <h1 className="heading-display text-[40px] md:text-[52px] text-[var(--color-ink-900)] mt-3 leading-[1.02]">
          Cette page<br /><em>n'existe pas.</em>
        </h1>
        <p className="mt-5 text-[15px] text-[var(--color-ink-600)] leading-relaxed">
          Le lien est peut-être cassé ou la page a déménagé. Vous pouvez retourner à
          l'accueil ou consulter notre centre d'aide.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Retour à l'accueil
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
          <Link href="/aide" className="btn-secondary">Centre d'aide</Link>
        </div>
      </div>
    </main>
  )
}
