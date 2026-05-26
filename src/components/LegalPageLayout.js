import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function LegalPageLayout({ title, lastUpdated, sections = [], children }) {
  return (
    <>
      <Header />
      <main className="py-16 lg:py-24">
        <div className="container-page max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[12px] text-[var(--color-ink-500)] mb-6">
            <Link href="/" className="hover:text-[var(--color-ink-900)] transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-[var(--color-ink-700)]">{title}</span>
          </div>

          <span className="eyebrow">Document légal</span>
          <h1 className="heading-display text-[44px] md:text-[60px] text-[var(--color-ink-900)] mt-4 leading-[1.02]">
            {title}
          </h1>
          {lastUpdated && (
            <div className="text-[13px] text-[var(--color-ink-500)] mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[var(--color-border)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-sage-500)]" />
              Mis à jour le {lastUpdated}
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
            <article className="prose-legal max-w-none text-[15px] text-[var(--color-ink-700)] leading-[1.75]
              [&_h2]:font-bold [&_h2]:text-[22px] [&_h2]:text-[var(--color-ink-900)] [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:tracking-tight
              [&_h2]:scroll-mt-24
              [&_h3]:font-semibold [&_h3]:text-[17px] [&_h3]:text-[var(--color-ink-900)] [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:mb-4
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1
              [&_li]:mb-0.5
              [&_a]:text-[var(--color-coral-600)] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[var(--color-coral-700)]
              [&_strong]:text-[var(--color-ink-900)] [&_strong]:font-semibold">
              {children}
            </article>

            {sections.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-500)] mb-4">
                    Sur cette page
                  </div>
                  <nav className="space-y-1 border-l border-[var(--color-border)]">
                    {sections.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className="block pl-4 py-1.5 text-[13px] text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] border-l-2 border-transparent hover:border-[var(--color-coral-500)] -ml-px transition-colors"
                      >
                        {s.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
