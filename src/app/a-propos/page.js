import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FinalCtaSection from '@/components/FinalCtaSection'

export const metadata = {
  title: 'À propos — Académie Conseils',
  description: 'Notre mission : démocratiser les formalités juridiques en France grâce à la technologie et à un accompagnement humain.',
}

const TEAM = [
  { name: 'Camille Laurens',  role: 'CEO & Co-fondatrice', initials: 'CL', bio: 'Avocate au barreau de Paris, 12 ans en droit des sociétés', color: 'coral' },
  { name: 'Mehdi Belkacem',   role: 'CTO & Co-fondateur',   initials: 'MB', bio: 'Ex-Stripe, passionné de produits qui simplifient la vie', color: 'mist' },
  { name: 'Sofia Martelli',   role: 'Lead Juriste',         initials: 'SM', bio: 'Docteure en droit des affaires, ancienne DLA Piper', color: 'sage' },
  { name: 'Thomas Renaud',    role: 'Head of Customer',     initials: 'TR', bio: "Convaincu qu'un bon support, ce sont des humains qui répondent vite", color: 'lavender' },
]

const VALUES = [
  { title: 'Clarté',        desc: 'Un langage clair, pas de jargon. Vous comprenez ce que vous signez avant de signer.' },
  { title: 'Rapidité',      desc: 'Ce qui prend des semaines dans un cabinet, nous le faisons en heures.' },
  { title: 'Accessibilité', desc: 'Des tarifs justes, sans abonnement, sans frais cachés ni surfacturation greffe.' },
  { title: 'Bienveillance', desc: "On vous parle comme on parlerait à un ami qui se lance. Sans condescendance." },
]

const MILESTONES = [
  { year: '2024', title: 'Création de la société', desc: "Camille et Mehdi fondent Académie Conseils à Paris." },
  { year: '2024', title: 'Premier dossier validé', desc: 'Une SARL immatriculée en 27 heures.' },
  { year: '2025', title: '5 000 sociétés créées', desc: 'Levée de fonds de 4M€ menée par Serena.' },
  { year: '2026', title: '12 000 clients', desc: 'Note Trustpilot 4,9/5 sur 2 800 avis vérifiés.' },
]

const colorMap = {
  coral:    'bg-[var(--color-coral-100)] text-[var(--color-coral-600)]',
  sage:     'bg-[var(--color-sage-100)] text-[var(--color-sage-500)]',
  lavender: 'bg-[var(--color-lavender-100)] text-[var(--color-lavender-300)]',
  mist:     'bg-[var(--color-mist-100)] text-[var(--color-mist-300)]',
}

export default function AProposPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-32 -right-32 h-[32rem] w-[32rem] rounded-full bg-[var(--color-coral-100)] opacity-50 blur-[100px]" />
            <div className="absolute inset-0 bg-noise opacity-30" />
          </div>
          <div className="container-page max-w-4xl">
            <span className="eyebrow">À propos</span>
            <h1 className="heading-display text-[56px] md:text-[84px] text-[var(--color-ink-900)] mt-5 leading-[0.98]">
              Rendre le droit<br />
              <em>accessible à tous.</em>
            </h1>
            <p className="mt-8 text-[18px] md:text-[20px] text-[var(--color-ink-600)] leading-relaxed max-w-2xl">
              Académie Conseils est née d'un constat : créer ou modifier une société en France
              devrait être aussi simple que d'envoyer un email. Pas de RDV chez un notaire,
              pas de CERFA incompréhensibles, pas de devis à 3 000 €.
            </p>
          </div>
        </section>

        {/* Mission + stats */}
        <section className="py-20 lg:py-24 bg-[var(--color-ink-950)] text-white relative overflow-hidden">
          <div aria-hidden className="absolute inset-0">
            <div className="absolute -top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-[var(--color-coral-500)] opacity-20 blur-[100px]" />
            <div className="absolute inset-0 bg-noise opacity-20" />
          </div>
          <div className="container-page relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ring-1 ring-white/10">
                Notre mission
              </span>
              <h2 className="heading-display text-[40px] md:text-[56px] mt-5 leading-[1.02]">
                Démocratiser<br />les <em>formalités juridiques.</em>
              </h2>
              <p className="mt-6 text-[16px] text-white/70 leading-relaxed">
                Depuis 2024, nous accompagnons les entrepreneurs français à chaque étape de
                la vie de leur société : création, modification, cession, dissolution.
                Notre technologie automatise ce qui peut l'être, et nos juristes vous
                accompagnent sur le reste.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden ring-1 ring-white/10">
              {[
                { v: '12 480', l: 'sociétés accompagnées' },
                { v: '4,9 / 5', l: 'note Trustpilot' },
                { v: '24h', l: 'délai moyen dépôt' },
                { v: '4M €', l: 'levés en série A' },
              ].map((s) => (
                <div key={s.l} className="bg-[var(--color-ink-950)] p-6 lg:p-8">
                  <div className="text-[34px] lg:text-[40px] font-bold tracking-[-0.04em] leading-none">{s.v}</div>
                  <div className="text-[12px] text-white/55 mt-2">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Valeurs */}
        <section className="py-24 lg:py-32">
          <div className="container-page">
            <div className="flex items-end justify-between flex-wrap gap-6 max-w-5xl mb-14">
              <div className="max-w-2xl">
                <span className="eyebrow">Nos valeurs</span>
                <h2 className="heading-display text-[40px] md:text-[52px] text-[var(--color-ink-900)] mt-4">
                  Quatre principes,<br /><em>aucun compromis.</em>
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)] rounded-3xl overflow-hidden ring-1 ring-[var(--color-border)]">
              {VALUES.map((v, i) => (
                <div key={v.title} className="bg-white p-7 lg:p-8 hover:bg-[var(--color-bone-50)] transition-colors">
                  <div className="text-[11px] font-bold text-[var(--color-coral-500)] tracking-tight">0{i + 1}</div>
                  <h3 className="mt-4 text-[20px] font-bold tracking-tight text-[var(--color-ink-900)]">{v.title}</h3>
                  <p className="mt-2 text-[14px] text-[var(--color-ink-600)] leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 lg:py-32 bg-[var(--color-bone-50)] relative">
          <div aria-hidden className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
          <div className="container-page relative max-w-5xl">
            <div className="max-w-2xl mb-14">
              <span className="eyebrow">Notre histoire</span>
              <h2 className="heading-display text-[40px] md:text-[52px] text-[var(--color-ink-900)] mt-4">
                <em>De zéro à 12 000</em><br />en deux ans.
              </h2>
            </div>
            <div className="relative">
              <div className="absolute left-[18px] top-2 bottom-2 w-px bg-[var(--color-border-strong)]" />
              <div className="space-y-8">
                {MILESTONES.map((m, i) => (
                  <div key={i} className="relative pl-14">
                    <div className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-ink-900)] text-white text-[11px] font-bold ring-4 ring-[var(--color-bone-50)]">
                      {m.year.slice(-2)}
                    </div>
                    <div className="text-[12px] font-semibold uppercase tracking-[0.10em] text-[var(--color-coral-600)]">{m.year}</div>
                    <h3 className="mt-1 text-[20px] font-bold tracking-tight text-[var(--color-ink-900)]">{m.title}</h3>
                    <p className="mt-1.5 text-[14.5px] text-[var(--color-ink-600)] leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Équipe */}
        <section className="py-24 lg:py-32">
          <div className="container-page">
            <div className="flex items-end justify-between flex-wrap gap-6 max-w-5xl mb-14">
              <div className="max-w-2xl">
                <span className="eyebrow">L'équipe</span>
                <h2 className="heading-display text-[40px] md:text-[52px] text-[var(--color-ink-900)] mt-4">
                  Juristes, designers,<br /><em>ingénieurs.</em>
                </h2>
              </div>
              <p className="text-[15px] text-[var(--color-ink-600)] max-w-md">
                Réunis par une même obsession : rendre les formalités juridiques aussi
                simples que possible, sans jamais sacrifier la rigueur.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {TEAM.map((m) => (
                <div key={m.name} className="card">
                  <div className={`h-14 w-14 rounded-full ${colorMap[m.color]} flex items-center justify-center text-[14px] font-bold`}>
                    {m.initials}
                  </div>
                  <h3 className="mt-5 font-bold text-[16px] text-[var(--color-ink-900)]">{m.name}</h3>
                  <div className="text-[12.5px] text-[var(--color-coral-600)] font-semibold mt-0.5">{m.role}</div>
                  <p className="text-[13px] text-[var(--color-ink-600)] mt-3 leading-relaxed">{m.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}
