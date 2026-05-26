import Link from 'next/link'

export default function FormLayout({ children, currentStep, totalSteps, title, formalityName }) {
  const progress = totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0

  return (
    <div className="min-h-screen bg-[var(--color-bone-50)] flex flex-col">
      <header className="bg-white border-b border-[var(--color-border)] sticky top-0 z-30">
        <div className="container-page py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-[8px] bg-[var(--color-ink-900)]" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-[13px]">A</div>
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[var(--color-coral-500)] ring-2 ring-white" />
              </div>
              <span className="font-semibold text-[14px] tracking-tight text-[var(--color-ink-900)]">
                Académie Conseils
              </span>
            </Link>
            <div className="text-[12px] text-[var(--color-ink-500)]">
              {formalityName && <span className="hidden sm:inline">{formalityName} · </span>}
              <span>Étape <span className="font-semibold text-[var(--color-ink-900)]">{currentStep}</span> sur {totalSteps}</span>
            </div>
          </div>

          <div className="w-full bg-[var(--color-bone-200)] rounded-full h-1 overflow-hidden">
            <div
              className="bg-[var(--color-coral-500)] h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {title && (
            <h2 className="heading-section text-[22px] text-[var(--color-ink-900)] mt-5">{title}</h2>
          )}
        </div>
      </header>

      <main className="flex-1 container-page py-10 lg:py-14 max-w-3xl">
        {children}
      </main>

      <footer className="container-page py-6 text-[12px] text-[var(--color-ink-500)] flex flex-wrap gap-x-4 gap-y-1">
        <span>© {new Date().getFullYear()} Académie Conseils</span>
        <Link href="/aide" className="hover:text-[var(--color-ink-900)] transition-colors">Besoin d'aide ?</Link>
        <Link href="/cgv" className="hover:text-[var(--color-ink-900)] transition-colors">CGV</Link>
        <Link href="/confidentialite" className="hover:text-[var(--color-ink-900)] transition-colors">Confidentialité</Link>
      </footer>
    </div>
  )
}
