import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FaqSection from '@/components/FaqSection'

export const metadata = {
  title: 'Centre d\'aide — Académie Conseils',
  description: 'Trouvez les réponses à toutes vos questions sur la création, modification, cession et dissolution de société.',
}

const TOPICS = [
  { id: 'creation',      title: 'Création de société',     count: 24, href: '/aide/creation',      desc: 'Choix de la forme, capital, statuts, immatriculation' },
  { id: 'modification',  title: 'Modifications statutaires', count: 18, href: '/aide/modification', desc: 'Siège, dirigeant, capital, dénomination, objet social' },
  { id: 'cession',       title: 'Cessions',                count: 12, href: '/aide/cession',       desc: 'Parts sociales, actions, fonds de commerce' },
  { id: 'dissolution',   title: 'Fermeture / Dissolution', count: 9,  href: '/aide/dissolution',   desc: 'Dissolution amiable, liquidation, radiation' },
  { id: 'paiement',      title: 'Paiement & facturation',  count: 8,  href: '/aide/paiement',      desc: 'Moyens de paiement, factures, remboursement' },
  { id: 'espace-client', title: 'Mon espace client',       count: 6,  href: '/aide/espace-client', desc: 'Compte, mot de passe, suivi de dossier, documents' },
]

const ARTICLES = [
  { title: 'Comment choisir entre SARL et SAS ?',         topic: 'Création',     time: '6 min' },
  { title: 'Déposer son capital social en ligne',          topic: 'Création',     time: '4 min' },
  { title: 'Transfert de siège : quelles démarches ?',     topic: 'Modification', time: '5 min' },
  { title: 'Acte de cession de parts : modèle commenté',   topic: 'Cession',      time: '8 min' },
  { title: 'Liquidation amiable : étape par étape',        topic: 'Dissolution',  time: '7 min' },
  { title: 'Mes documents ont-ils valeur légale ?',        topic: 'Légal',        time: '3 min' },
]

export default function AidePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero + search */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-[var(--color-bone-50)]">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-[var(--color-coral-100)] opacity-40 blur-[100px]" />
            <div className="absolute inset-0 bg-noise opacity-30" />
          </div>
          <div className="container-page relative text-center max-w-3xl mx-auto">
            <span className="eyebrow">Centre d'aide</span>
            <h1 className="heading-display text-[56px] md:text-[80px] text-[var(--color-ink-900)] mt-5 leading-[0.98]">
              On peut <em>vous aider ?</em>
            </h1>
            <p className="mt-6 text-[17px] text-[var(--color-ink-600)] leading-relaxed">
              Plus de 100 articles écrits par nos juristes et un support humain
              disponible 7j/7. Tapez votre question.
            </p>
            <form className="mt-10 max-w-xl mx-auto relative">
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-ink-400)]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input
                type="search"
                placeholder="Rechercher un sujet (ex: transfert de siège)…"
                className="w-full rounded-full bg-white pl-12 pr-32 py-4 text-[14.5px] ring-1 ring-[var(--color-border)] shadow-[var(--shadow-sm)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ink-900)] focus:shadow-[var(--shadow-md)]"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[var(--color-ink-900)] text-white px-5 py-2.5 text-[13px] font-semibold hover:bg-[var(--color-ink-800)] transition-colors">
                Rechercher
              </button>
            </form>
          </div>
        </section>

        {/* Thèmes */}
        <section className="py-24 lg:py-28">
          <div className="container-page">
            <div className="max-w-2xl mb-12">
              <span className="eyebrow">Par thème</span>
              <h2 className="heading-display text-[36px] md:text-[44px] text-[var(--color-ink-900)] mt-4">
                Trouvez votre <em>réponse.</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)] rounded-3xl overflow-hidden ring-1 ring-[var(--color-border)]">
              {TOPICS.map((t) => (
                <Link key={t.id} href={t.href} className="group bg-white p-7 hover:bg-[var(--color-bone-50)] transition-colors">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-[18px] text-[var(--color-ink-900)] tracking-tight group-hover:text-[var(--color-coral-600)] transition-colors">
                      {t.title}
                    </h3>
                    <span className="text-[11px] font-bold text-[var(--color-ink-700)] bg-[var(--color-bone-100)] px-2 py-1 rounded-md tabular-nums">
                      {t.count}
                    </span>
                  </div>
                  <p className="mt-2 text-[13.5px] text-[var(--color-ink-600)] leading-relaxed">
                    {t.desc}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-[var(--color-ink-700)] group-hover:gap-2 group-hover:text-[var(--color-ink-900)] transition-all">
                    Voir les articles
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Articles populaires */}
        <section className="py-20 lg:py-24 bg-[var(--color-bone-50)]">
          <div className="container-page max-w-5xl">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div>
                <span className="eyebrow">Populaire</span>
                <h2 className="heading-display text-[32px] md:text-[40px] text-[var(--color-ink-900)] mt-3">
                  Les plus consultés.
                </h2>
              </div>
            </div>
            <div className="bg-white rounded-2xl ring-1 ring-[var(--color-border)] divide-y divide-[var(--color-border)]">
              {ARTICLES.map((a, i) => (
                <a key={i} href="#" className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-[var(--color-bone-50)] transition-colors group">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="text-[11px] font-bold text-[var(--color-ink-400)] tabular-nums w-6">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-[14.5px] text-[var(--color-ink-900)] group-hover:text-[var(--color-coral-600)] transition-colors">
                        {a.title}
                      </div>
                      <div className="text-[12px] text-[var(--color-ink-500)] mt-0.5">
                        {a.topic} · {a.time} de lecture
                      </div>
                    </div>
                  </div>
                  <svg className="text-[var(--color-ink-400)] group-hover:text-[var(--color-ink-900)] group-hover:translate-x-1 transition-all shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact rapide */}
        <section className="py-24 lg:py-28">
          <div className="container-page max-w-5xl">
            <div className="text-center mb-12">
              <span className="eyebrow">Aucune réponse ?</span>
              <h2 className="heading-display text-[32px] md:text-[44px] text-[var(--color-ink-900)] mt-4">
                Parlez à un <em>juriste.</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: 'Chat en direct', desc: 'Réponse en 5 min', cta: 'Démarrer le chat', href: '#' },
                { title: 'Email',          desc: 'contact@academie-conseils.fr', cta: 'Nous écrire', href: 'mailto:contact@academie-conseils.fr' },
                { title: 'Téléphone',      desc: '01 23 45 67 89 · 7j/7', cta: 'Appeler', href: 'tel:0123456789' },
              ].map((c) => (
                <div key={c.title} className="card text-center">
                  <h3 className="font-bold text-[18px] text-[var(--color-ink-900)]">{c.title}</h3>
                  <p className="text-[13.5px] text-[var(--color-ink-500)] mt-2 mb-5">{c.desc}</p>
                  <Link href={c.href} className="btn-secondary text-[13px] py-2 px-4">{c.cta}</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FaqSection />
      </main>
      <Footer />
    </>
  )
}
