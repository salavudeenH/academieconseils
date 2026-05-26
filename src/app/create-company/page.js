'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SERVICE_CATEGORIES } from '@/lib/services'

const COMPANY_TYPES = SERVICE_CATEGORIES.creation.items

export default function CreateCompanyPage() {
  return (
    <Suspense fallback={<CreateCompanyFallback />}>
      <CreateCompanyContent />
    </Suspense>
  )
}

function CreateCompanyFallback() {
  return (
    <>
      <Header />
      <main className="bg-[var(--color-bone-50)] min-h-[60vh] flex items-center justify-center">
        <div className="text-[var(--color-ink-500)]">Chargement…</div>
      </main>
      <Footer />
    </>
  )
}

const COMPARISON_RAW = [
  { label: 'Capital min.',        SARL: '1 €',    SAS: '1 €',     SASU: '1 €',    EURL: '1 €',    SCI: '1 €',  AE: '—',     ASSOC: '—' },
  { label: "Nb d'associés",      SARL: '2 à 100',SAS: '2 à 999', SASU: '1',      EURL: '1',      SCI: '2+',   AE: '1',     ASSOC: '2+' },
  { label: 'Dirigeant',           SARL: 'Gérant', SAS: 'Président', SASU: 'Président', EURL: 'Gérant', SCI: 'Gérant', AE: '—', ASSOC: 'Président' },
  { label: 'Responsabilité',      SARL: 'Limitée',SAS: 'Limitée', SASU: 'Limitée',EURL: 'Limitée',SCI: 'Indéfinie', AE: 'Patrimoine perso', ASSOC: 'Limitée' },
  { label: 'Régime social',       SARL: 'TNS / assimilé', SAS: 'Assimilé salarié', SASU: 'Assimilé salarié', EURL: 'TNS', SCI: 'TNS', AE: 'TNS micro', ASSOC: '—' },
  { label: 'IS / IR par défaut',  SARL: 'IS',     SAS: 'IS',      SASU: 'IS',     EURL: 'IR',     SCI: 'IR',   AE: 'IR',    ASSOC: '—' },
]

function CreateCompanyContent() {
  const router = useRouter()
  const params = useSearchParams()
  const initialType = params.get('type')
  const [selected, setSelected] = useState(initialType || null)
  const [showCompare, setShowCompare] = useState(false)
  const [recoOpen, setRecoOpen] = useState(false)

  const goNext = () => {
    if (!selected) return
    router.push(`/create-company/${selected}`)
  }

  return (
    <>
      <Header />
      <main className="bg-[var(--color-bone-50)]">
        {/* Hero */}
        <section className="relative overflow-hidden pt-10 pb-10 lg:pt-16">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-[var(--color-coral-100)] opacity-40 blur-[100px]" />
            <div className="absolute inset-0 bg-noise opacity-30" />
          </div>
          <div className="container-page relative text-center max-w-3xl mx-auto">
            <span className="eyebrow">Étape 1 sur 4 · Forme juridique</span>
            <h1 className="heading-display text-[48px] md:text-[64px] text-[var(--color-ink-900)] mt-5 leading-[0.98]">
              Quelle <em>forme juridique</em><br />pour votre projet ?
            </h1>
            <p className="mt-6 text-[16px] text-[var(--color-ink-600)] leading-relaxed">
              Choisissez votre statut. Pas sûr ? Notre guide vous aide à décider en 1 minute.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              <button onClick={() => setShowCompare((v) => !v)} className="btn-ghost text-[13px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                {showCompare ? 'Masquer' : 'Voir'} le comparatif
              </button>
              <button onClick={() => setRecoOpen(true)} className="btn-secondary text-[13px] py-2 px-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26A7 7 0 0012 2z"/></svg>
                M'aider à choisir
              </button>
            </div>
          </div>
        </section>

        {/* Comparatif */}
        {showCompare && (
          <section className="pb-8 animate-fade-up">
            <div className="container-page">
              <div className="bg-white rounded-2xl ring-1 ring-[var(--color-border)] overflow-x-auto">
                <table className="w-full text-[13px] min-w-[820px]">
                  <thead>
                    <tr className="border-b border-[var(--color-border)]">
                      <th className="px-4 py-3 text-left font-semibold text-[var(--color-ink-500)] text-[11px] uppercase tracking-[0.10em]">Critère</th>
                      {COMPANY_TYPES.map((t) => (
                        <th key={t.id} className="px-4 py-3 text-center font-bold text-[var(--color-ink-900)]">{t.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)]">
                    {COMPARISON_RAW.map((row, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3 font-medium text-[var(--color-ink-700)] bg-[var(--color-bone-50)]">{row.label}</td>
                        {COMPANY_TYPES.map((t) => (
                          <td key={t.id} className="px-4 py-3 text-center text-[var(--color-ink-700)]">{row[t.id]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Cartes choix */}
        <section className="py-10 lg:py-14">
          <div className="container-page">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {COMPANY_TYPES.map((t) => {
                const active = selected === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelected(t.id)}
                    className={`relative text-left rounded-[20px] bg-white ring-1 transition-all p-6 group ${
                      active
                        ? 'ring-2 ring-[var(--color-ink-900)] shadow-[var(--shadow-lg)]'
                        : 'ring-[var(--color-border)] hover:ring-[var(--color-border-strong)] hover:-translate-y-1'
                    }`}
                    style={{ boxShadow: active ? 'var(--shadow-lg)' : 'var(--shadow-sm)' }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-bold text-[14px] tracking-tight ${
                        active ? 'bg-[var(--color-ink-900)] text-white' : 'bg-[var(--color-bone-100)] text-[var(--color-ink-700)] ring-1 ring-[var(--color-border)]'
                      }`}>
                        {t.id === 'AE' ? 'AE' : t.id === 'ASSOC' ? 'AS' : t.name.slice(0, 2)}
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase tracking-wider text-[var(--color-ink-500)]">dès</div>
                        <div className="text-[18px] font-bold tracking-tight text-[var(--color-ink-900)]">{t.price}€</div>
                      </div>
                    </div>
                    <h3 className="mt-5 text-[20px] font-bold tracking-tight text-[var(--color-ink-900)]">{t.name}</h3>
                    {t.fullName && (
                      <div className="text-[12px] text-[var(--color-ink-500)] mt-0.5">{t.fullName}</div>
                    )}
                    <p className="mt-3 text-[13.5px] text-[var(--color-ink-600)] leading-relaxed">{t.description}</p>

                    {active && (
                      <div className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--color-ink-900)]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
                        Sélectionné
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {selected && (
              <div className="sticky bottom-6 mt-10 z-30">
                <div className="mx-auto max-w-2xl bg-[var(--color-ink-900)] text-white rounded-2xl shadow-[var(--shadow-xl)] p-5 flex items-center justify-between gap-4 animate-fade-up">
                  <div className="min-w-0">
                    <div className="text-[11px] text-white/55 uppercase tracking-[0.10em]">Vous avez choisi</div>
                    <div className="font-bold text-[15px] truncate">
                      {COMPANY_TYPES.find((t) => t.id === selected)?.name} — {COMPANY_TYPES.find((t) => t.id === selected)?.fullName}
                    </div>
                  </div>
                  <button onClick={goNext} className="btn-accent whitespace-nowrap shrink-0">
                    Continuer
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Bandeau confiance */}
        <section className="py-20 bg-white border-t border-[var(--color-border)]">
          <div className="container-page text-center max-w-2xl mx-auto">
            <span className="eyebrow">Pas seul</span>
            <h2 className="heading-display text-[32px] md:text-[40px] text-[var(--color-ink-900)] mt-4">
              Une équipe juriste,<br /><em>7j/7.</em>
            </h2>
            <p className="mt-5 text-[15px] text-[var(--color-ink-600)] leading-relaxed">
              Une question, un doute sur votre choix ? Un juriste répond par chat, email
              ou téléphone en moins de 5 minutes en moyenne.
            </p>
            <Link href="/contact" className="btn-secondary mt-7 text-[14px]">
              Parler à un juriste
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />

      {/* Modal recommandation */}
      {recoOpen && (
        <RecoModal onClose={() => setRecoOpen(false)} onResult={(id) => { setSelected(id); setRecoOpen(false); }} />
      )}
    </>
  )
}

function RecoModal({ onClose, onResult }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  const questions = [
    { id: 'count', label: "Combien d'associés ?", options: [
      { value: 'solo', label: 'Seul' },
      { value: 'multi', label: 'À plusieurs' },
    ] },
    { id: 'activity', label: 'Quelle est votre activité ?', options: [
      { value: 'commercial', label: 'Commerciale / conseil' },
      { value: 'immobilier', label: 'Immobilier' },
      { value: 'small', label: 'Petite activité indépendante' },
      { value: 'assoc', label: 'But non lucratif' },
    ] },
    { id: 'invest', label: 'Pensez-vous lever des fonds ?', options: [
      { value: 'yes', label: 'Oui, possiblement' },
      { value: 'no',  label: 'Non, pas dans l\'immédiat' },
    ] },
  ]

  const recommend = () => {
    if (answers.activity === 'assoc') return 'ASSOC'
    if (answers.activity === 'small') return 'AE'
    if (answers.activity === 'immobilier') return 'SCI'
    if (answers.count === 'solo') {
      if (answers.invest === 'yes') return 'SASU'
      return 'EURL'
    }
    if (answers.invest === 'yes') return 'SAS'
    return 'SARL'
  }

  const onAnswer = (v) => {
    const q = questions[step]
    const newA = { ...answers, [q.id]: v }
    setAnswers(newA)
    if (step + 1 < questions.length) setStep(step + 1)
  }

  const q = questions[step]
  const done = Object.keys(answers).length === questions.length
  const reco = done ? recommend() : null
  const COMPANY_TYPES = SERVICE_CATEGORIES.creation.items
  const recoItem = COMPANY_TYPES.find((t) => t.id === reco)

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-up" onClick={onClose}>
      <div className="bg-white rounded-[24px] shadow-[var(--shadow-xl)] max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <span className="eyebrow">Guide de choix</span>
          <button onClick={onClose} className="text-[var(--color-ink-400)] hover:text-[var(--color-ink-900)] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {!done ? (
          <>
            <div className="h-1 bg-[var(--color-bone-200)] rounded-full mb-6 overflow-hidden">
              <div className="h-full bg-[var(--color-coral-500)] transition-all" style={{ width: `${((step) / questions.length) * 100}%` }} />
            </div>
            <h3 className="heading-display text-[24px] text-[var(--color-ink-900)] leading-tight">{q.label}</h3>
            <div className="mt-6 space-y-2">
              {q.options.map((o) => (
                <button key={o.value} onClick={() => onAnswer(o.value)}
                  className="w-full text-left p-4 rounded-xl ring-1 ring-[var(--color-border)] hover:ring-[var(--color-ink-400)] hover:bg-[var(--color-bone-50)] transition-all flex items-center justify-between gap-3 group">
                  <span className="font-medium text-[14px]">{o.label}</span>
                  <svg className="text-[var(--color-ink-400)] group-hover:text-[var(--color-ink-900)] group-hover:translate-x-1 transition-all" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-coral-600)] mb-2">Notre recommandation</div>
            <h3 className="heading-display text-[40px] text-[var(--color-ink-900)] leading-none">{recoItem?.name}</h3>
            <p className="text-[12.5px] text-[var(--color-ink-500)] mt-1">{recoItem?.fullName}</p>
            <p className="mt-5 text-[14px] text-[var(--color-ink-700)] leading-relaxed">{recoItem?.description}</p>
            <button onClick={() => onResult(reco)} className="btn-primary mt-7 w-full">
              Choisir {recoItem?.name}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
            <button onClick={() => { setStep(0); setAnswers({}); }} className="block mx-auto mt-3 text-[13px] text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)] underline underline-offset-2 transition-colors">
              Refaire le test
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
