import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = { title: 'Blog — Académie Conseils', description: 'Ressources juridiques pour entrepreneurs.' }

const ARTICLES = [
  { slug: 'sarl-ou-sas-comment-choisir',         title: 'SARL ou SAS : comment choisir en 2026 ?',                category: 'Création',     readTime: '6 min',  date: '15 mai 2026',  accent: 'coral',    featured: true },
  { slug: 'cession-parts-sociales-guide',         title: 'Cession de parts sociales : le guide complet',           category: 'Cession',      readTime: '12 min', date: '10 mai 2026',  accent: 'sage' },
  { slug: 'transfert-siege-social-comment-faire', title: 'Transfert de siège social : la procédure pas à pas',     category: 'Modification', readTime: '5 min',  date: '5 mai 2026',   accent: 'lavender' },
  { slug: 'dissolution-amiable-sarl',             title: 'Dissolution amiable d\'une SARL : ce qu\'il faut savoir', category: 'Dissolution',  readTime: '8 min',  date: '28 avr. 2026', accent: 'butter' },
  { slug: 'capital-social-comment-fixer',         title: 'Capital social : comment le fixer intelligemment ?',     category: 'Création',     readTime: '7 min',  date: '20 avr. 2026', accent: 'coral' },
  { slug: 'fonds-commerce-cession-fiscalite',     title: 'Cession de fonds de commerce : la fiscalité expliquée',  category: 'Cession',      readTime: '10 min', date: '12 avr. 2026', accent: 'sage' },
]

const accentMap = {
  coral:    { pill: 'bg-[var(--color-coral-50)] text-[var(--color-coral-600)] ring-[var(--color-coral-100)]',    cover: 'bg-[var(--color-coral-100)]' },
  lavender: { pill: 'bg-[var(--color-lavender-50)] text-[var(--color-lavender-300)] ring-[var(--color-lavender-100)]', cover: 'bg-[var(--color-lavender-100)]' },
  sage:     { pill: 'bg-[var(--color-sage-50)] text-[var(--color-sage-500)] ring-[var(--color-sage-100)]',       cover: 'bg-[var(--color-sage-100)]' },
  butter:   { pill: 'bg-[var(--color-butter-50)] text-[var(--color-butter-300)] ring-[var(--color-butter-100)]', cover: 'bg-[var(--color-butter-100)]' },
}

const CATEGORIES = ['Tous', 'Création', 'Modification', 'Cession', 'Dissolution', 'Fiscalité']

export default function BlogPage() {
  const featured = ARTICLES.find((a) => a.featured)
  const others = ARTICLES.filter((a) => !a.featured)

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-[var(--color-coral-100)] opacity-40 blur-[100px]" />
          </div>
          <div className="container-page max-w-4xl">
            <span className="eyebrow">Le journal</span>
            <h1 className="heading-display text-[56px] md:text-[80px] text-[var(--color-ink-900)] mt-5 leading-[0.98]">
              Les <em>bonnes pratiques</em><br />juridiques des entrepreneurs.
            </h1>
            <p className="mt-6 text-[17px] text-[var(--color-ink-600)] leading-relaxed max-w-2xl">
              Guides, analyses, décryptages : les contenus écrits par nos juristes
              pour ne plus jamais être bloqué par le droit.
            </p>
          </div>
        </section>

        {/* Filtres */}
        <section className="border-b border-[var(--color-border)]">
          <div className="container-page py-4 overflow-x-auto">
            <div className="flex items-center gap-2 whitespace-nowrap">
              {CATEGORIES.map((c, i) => (
                <button
                  key={c}
                  className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
                    i === 0
                      ? 'bg-[var(--color-ink-900)] text-white'
                      : 'text-[var(--color-ink-700)] hover:bg-[var(--color-bone-100)]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured + grille */}
        <section className="py-16 lg:py-20">
          <div className="container-page">
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-[28px] bg-white ring-1 ring-[var(--color-border)] hover:ring-[var(--color-border-strong)] hover:-translate-y-1 transition-all overflow-hidden mb-12"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className={`aspect-[16/10] lg:aspect-auto ${accentMap[featured.accent].cover} flex items-center justify-center relative overflow-hidden`}>
                  <FeaturedCover />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className={`inline-flex rounded-full ring-1 px-2.5 py-1 font-semibold uppercase tracking-[0.08em] ${accentMap[featured.accent].pill}`}>
                      À la une
                    </span>
                    <span className="text-[var(--color-ink-500)]">·</span>
                    <span className="text-[var(--color-ink-500)]">{featured.readTime} de lecture</span>
                  </div>
                  <h2 className="heading-display text-[32px] md:text-[40px] mt-5 text-[var(--color-ink-900)] leading-[1.05]">
                    {featured.title}
                  </h2>
                  <div className="mt-5 text-[13px] text-[var(--color-ink-500)]">{featured.date} · par Camille Laurens</div>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--color-ink-900)] group-hover:gap-3 transition-all">
                    Lire l'article
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </Link>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {others.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group flex flex-col rounded-[20px] bg-white ring-1 ring-[var(--color-border)] hover:ring-[var(--color-border-strong)] hover:-translate-y-1 transition-all overflow-hidden"
                  style={{ boxShadow: 'var(--shadow-sm)' }}
                >
                  <div className={`aspect-[16/10] ${accentMap[a.accent].cover} relative overflow-hidden`}>
                    <CardCover />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-[11.5px]">
                      <span className={`inline-flex rounded-full ring-1 px-2 py-0.5 font-semibold uppercase tracking-[0.08em] ${accentMap[a.accent].pill}`}>
                        {a.category}
                      </span>
                      <span className="text-[var(--color-ink-500)]">{a.readTime}</span>
                    </div>
                    <h3 className="mt-3 font-bold text-[16px] text-[var(--color-ink-900)] leading-snug tracking-tight group-hover:text-[var(--color-coral-600)] transition-colors">
                      {a.title}
                    </h3>
                    <div className="mt-auto pt-4 text-[12px] text-[var(--color-ink-500)]">{a.date}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 lg:py-20 bg-[var(--color-bone-50)]">
          <div className="container-page max-w-2xl text-center">
            <span className="eyebrow">Newsletter</span>
            <h2 className="heading-display text-[32px] md:text-[40px] text-[var(--color-ink-900)] mt-4">
              Une <em>actu juridique</em> par mois.
            </h2>
            <p className="mt-4 text-[15px] text-[var(--color-ink-600)] leading-relaxed">
              Les réformes qui vous concernent, les décisions qui font jurisprudence,
              les bonnes pratiques. Sans spam, désinscription en 1 clic.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input type="email" placeholder="vous@entreprise.fr" className="input-base flex-1" />
              <button className="btn-primary whitespace-nowrap">S'inscrire</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function FeaturedCover() {
  return (
    <svg viewBox="0 0 600 400" className="absolute inset-0 w-full h-full">
      <rect x="120" y="60" width="220" height="280" rx="14" fill="white" stroke="currentColor" strokeWidth="2" className="text-[var(--color-ink-900)]/10"/>
      <rect x="140" y="84" width="120" height="6" rx="3" fill="var(--color-ink-900)" opacity="0.4"/>
      <rect x="140" y="100" width="160" height="3" rx="1.5" fill="var(--color-ink-900)" opacity="0.2"/>
      <rect x="140" y="108" width="140" height="3" rx="1.5" fill="var(--color-ink-900)" opacity="0.2"/>
      <rect x="140" y="116" width="150" height="3" rx="1.5" fill="var(--color-ink-900)" opacity="0.2"/>
      <rect x="260" y="180" width="220" height="160" rx="14" fill="var(--color-ink-900)" transform="rotate(8 370 260)"/>
      <rect x="290" y="220" width="80" height="5" rx="2.5" fill="white" opacity="0.7" transform="rotate(8 370 260)"/>
      <rect x="290" y="234" width="120" height="3" rx="1.5" fill="white" opacity="0.4" transform="rotate(8 370 260)"/>
    </svg>
  )
}

function CardCover() {
  return (
    <svg viewBox="0 0 300 180" className="absolute inset-0 w-full h-full">
      <rect x="70" y="30" width="160" height="120" rx="10" fill="white" stroke="currentColor" strokeWidth="2" className="text-[var(--color-ink-900)]/10"/>
      <rect x="86" y="50" width="80" height="5" rx="2.5" fill="var(--color-ink-900)" opacity="0.5"/>
      <rect x="86" y="64" width="120" height="3" rx="1.5" fill="var(--color-ink-900)" opacity="0.2"/>
      <rect x="86" y="72" width="100" height="3" rx="1.5" fill="var(--color-ink-900)" opacity="0.2"/>
      <rect x="86" y="80" width="110" height="3" rx="1.5" fill="var(--color-ink-900)" opacity="0.2"/>
      <circle cx="186" cy="120" r="14" fill="var(--color-ink-900)"/>
      <path d="M180 120 l4 4 l8 -8" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
