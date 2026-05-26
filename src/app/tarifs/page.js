import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PricingSection from '@/components/PricingSection'
import FaqSection from '@/components/FaqSection'
import FinalCtaSection from '@/components/FinalCtaSection'
import { getAllCategories } from '@/lib/services'

export const metadata = {
  title: 'Tarifs — Académie Conseils',
  description: 'Tous nos tarifs : création, modification, cession, dissolution. Prix transparents, payables une seule fois.',
}

export default function TarifsPage() {
  const categories = getAllCategories()

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-[var(--color-coral-100)] opacity-50 blur-[100px]" />
            <div className="absolute inset-0 bg-noise opacity-30" />
          </div>
          <div className="container-page text-center max-w-3xl mx-auto">
            <span className="eyebrow">Tarifs</span>
            <h1 className="heading-display text-[56px] md:text-[80px] text-[var(--color-ink-900)] mt-5 leading-[0.98]">
              Prix transparents.<br /><em>Payables une fois.</em>
            </h1>
            <p className="mt-6 text-[17px] text-[var(--color-ink-600)] leading-relaxed max-w-xl mx-auto">
              Pas d'abonnement, pas de frais cachés. Vous payez la formalité dont vous
              avez besoin, au moment où vous en avez besoin.
            </p>
          </div>
        </section>

        <PricingSection />

        {/* Tableau de tous les tarifs par catégorie */}
        <section className="py-24 lg:py-32 bg-[var(--color-bone-50)] relative">
          <div aria-hidden className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
          <div className="container-page relative">
            <div className="max-w-2xl mb-14">
              <span className="eyebrow">Catalogue complet</span>
              <h2 className="heading-display text-[40px] md:text-[52px] text-[var(--color-ink-900)] mt-4">
                Tous nos tarifs,<br /><em>en un coup d'œil.</em>
              </h2>
              <p className="mt-4 text-[15px] text-[var(--color-ink-600)] leading-relaxed">
                Tarifs HT pour la prestation Académie Conseils. Les frais administratifs
                (greffe, INPI, annonce légale) sont reversés au coût réel.
              </p>
            </div>

            <div className="space-y-5">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white rounded-[24px] ring-1 ring-[var(--color-border)] overflow-hidden">
                  <div className="px-6 py-5 lg:px-8 lg:py-6 border-b border-[var(--color-border)] flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-coral-600)]">
                        {cat.short}
                      </div>
                      <h3 className="font-bold text-[20px] tracking-tight text-[var(--color-ink-900)] mt-1">{cat.label}</h3>
                      <div className="text-[13px] text-[var(--color-ink-500)] mt-0.5">{cat.tagline}</div>
                    </div>
                    <Link href={cat.href} className="btn-secondary text-[13px] py-2 px-4 whitespace-nowrap shrink-0">
                      Voir
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                    </Link>
                  </div>
                  <div className="divide-y divide-[var(--color-border)]">
                    {cat.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="group flex items-center justify-between gap-4 px-6 lg:px-8 py-4 hover:bg-[var(--color-bone-50)] transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-[14.5px] text-[var(--color-ink-900)] group-hover:text-[var(--color-coral-600)] transition-colors">
                            {item.name}
                          </div>
                          <div className="text-[12.5px] text-[var(--color-ink-500)] mt-0.5 line-clamp-1">{item.description}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-[16px] font-bold text-[var(--color-ink-900)]">
                            {item.price}€
                            <span className="text-[11px] text-[var(--color-ink-500)] font-normal ml-0.5">HT</span>
                          </div>
                          <div className="text-[12px] font-semibold text-[var(--color-ink-700)] group-hover:text-[var(--color-coral-600)] mt-0.5 inline-flex items-center gap-0.5 group-hover:gap-1 transition-all">
                            Commencer
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
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
