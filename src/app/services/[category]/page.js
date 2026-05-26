import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FinalCtaSection from '@/components/FinalCtaSection'
import FaqSection from '@/components/FaqSection'
import { getCategory, getAllCategories } from '@/lib/services'

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.id }))
}

export async function generateMetadata({ params }) {
  const { category } = await params
  const cat = getCategory(category)
  if (!cat) return {}
  return {
    title: `${cat.label} — Académie Conseils`,
    description: cat.description,
  }
}

const accentMap = {
  coral:    { pill: 'bg-[var(--color-coral-50)] text-[var(--color-coral-600)] ring-[var(--color-coral-100)]',          halo: 'bg-[var(--color-coral-100)]' },
  lavender: { pill: 'bg-[var(--color-lavender-50)] text-[var(--color-lavender-300)] ring-[var(--color-lavender-100)]', halo: 'bg-[var(--color-lavender-100)]' },
  sage:     { pill: 'bg-[var(--color-sage-50)] text-[var(--color-sage-500)] ring-[var(--color-sage-100)]',             halo: 'bg-[var(--color-sage-100)]' },
  amber:    { pill: 'bg-[var(--color-butter-50)] text-[var(--color-butter-300)] ring-[var(--color-butter-100)]',       halo: 'bg-[var(--color-butter-100)]' },
}

const REASONS = [
  'Documents conformes au Code de commerce',
  'Génération instantanée en PDF',
  'Juriste joignable 7j/7',
  'Tarif transparent, payable une fois',
]

export default async function ServiceCategoryPage({ params }) {
  const { category } = await params
  const cat = getCategory(category)
  if (!cat) notFound()

  const a = accentMap[cat.accent] || accentMap.coral

  return (
    <>
      <Header />
      <main>
        {/* Hero catégorie */}
        <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className={`absolute -top-32 -right-32 h-[32rem] w-[32rem] rounded-full ${a.halo} opacity-50 blur-[100px]`} />
            <div className="absolute inset-0 bg-noise opacity-30" />
          </div>

          <div className="container-page">
            <nav className="flex items-center gap-2 text-[12px] text-[var(--color-ink-500)] mb-8">
              <Link href="/" className="hover:text-[var(--color-ink-900)] transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/#services" className="hover:text-[var(--color-ink-900)] transition-colors">Services</Link>
              <span>/</span>
              <span className="text-[var(--color-ink-700)] font-medium">{cat.short}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7">
                <span className={`inline-flex items-center gap-1.5 rounded-full ring-1 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.10em] ${a.pill}`}>
                  {cat.short}
                </span>
                <h1 className="heading-display text-[56px] md:text-[80px] text-[var(--color-ink-900)] mt-5 leading-[0.98]">
                  {cat.label}.
                </h1>
                <p className="mt-6 text-[18px] text-[var(--color-ink-700)] font-medium">{cat.tagline}</p>
                <p className="mt-3 text-[16px] text-[var(--color-ink-600)] leading-relaxed max-w-2xl">{cat.description}</p>
              </div>
              <div className="lg:col-span-5">
                <div className="rounded-[24px] bg-white p-7 lg:p-8 ring-1 ring-[var(--color-border)] shadow-[var(--shadow-md)]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-coral-600)]">Pourquoi nous</div>
                  <ul className="mt-5 space-y-3">
                    {REASONS.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[13.5px] text-[var(--color-ink-700)]">
                        <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[var(--color-sage-100)] mt-0.5 shrink-0">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-sage-500)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-[var(--color-border)] flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {['CD', 'TR', 'SM', 'KB'].map((i) => (
                        <div key={i} className="h-7 w-7 rounded-full bg-[var(--color-bone-100)] ring-2 ring-white flex items-center justify-center text-[9px] font-bold text-[var(--color-ink-700)]">
                          {i}
                        </div>
                      ))}
                    </div>
                    <div className="text-[12px] text-[var(--color-ink-600)]">
                      <strong className="text-[var(--color-ink-900)]">4,9 / 5</strong> · 2 800+ avis Trustpilot
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Liste des prestations */}
        <section className="py-20 lg:py-24">
          <div className="container-page">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
              <div>
                <span className="eyebrow">Prestations</span>
                <h2 className="heading-display text-[36px] md:text-[44px] text-[var(--color-ink-900)] mt-4">
                  {cat.items.length} <em>formalité{cat.items.length > 1 ? 's' : ''}</em> disponible{cat.items.length > 1 ? 's' : ''}.
                </h2>
              </div>
              <p className="text-[14px] text-[var(--color-ink-500)] max-w-sm">
                Choisissez celle qui correspond à votre besoin. Démarrage immédiat, sans engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat.items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group relative rounded-[20px] bg-white ring-1 ring-[var(--color-border)] hover:ring-[var(--color-border-strong)] hover:-translate-y-1 transition-all p-6 flex flex-col"
                  style={{ boxShadow: 'var(--shadow-sm)' }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className={`inline-flex items-center gap-1 rounded-full ring-1 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.10em] ${a.pill}`}>
                      {cat.short}
                    </span>
                    {item.price && (
                      <div className="text-right shrink-0">
                        <div className="text-[10px] text-[var(--color-ink-500)] uppercase tracking-wider">dès</div>
                        <div className="text-[18px] font-bold tracking-tight text-[var(--color-ink-900)]">{item.price}€</div>
                      </div>
                    )}
                  </div>
                  <h3 className="text-[18px] font-bold tracking-tight text-[var(--color-ink-900)] group-hover:text-[var(--color-coral-600)] transition-colors">
                    {item.name}
                  </h3>
                  {item.fullName && (
                    <div className="text-[12px] text-[var(--color-ink-500)] mt-0.5">{item.fullName}</div>
                  )}
                  <p className="mt-3 text-[13.5px] text-[var(--color-ink-600)] leading-relaxed flex-1">{item.description}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-ink-900)] group-hover:gap-2.5 transition-all">
                    Démarrer
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}
