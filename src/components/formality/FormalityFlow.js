'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function FormalityFlow({ formality }) {
  const router = useRouter()
  const steps = [...formality.sections, { id: '__recap', title: 'Récapitulatif', isRecap: true }]
  const [stepIndex, setStepIndex] = useState(0)
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const currentStep = steps[stepIndex]
  const progress = ((stepIndex) / (steps.length - 1)) * 100

  const setField = (name, value) => {
    setData((d) => ({ ...d, [name]: value }))
    setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const validateStep = () => {
    if (currentStep.isRecap) return true
    const newErrors = {}
    for (const f of currentStep.fields) {
      const v = data[f.name]
      if (f.required && (v === undefined || v === '' || v === null)) {
        newErrors[f.name] = 'Champ obligatoire'
      } else if (v && f.pattern) {
        const re = new RegExp(`^${f.pattern}$`)
        if (!re.test(String(v).replace(/\s/g, ''))) {
          newErrors[f.name] = 'Format invalide'
        }
      } else if (v && f.type === 'email') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
          newErrors[f.name] = 'Email invalide'
        }
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const next = () => {
    if (!validateStep()) return
    setStepIndex((i) => Math.min(i + 1, steps.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const prev = () => {
    setStepIndex((i) => Math.max(i - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/formality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: formality.category,
          type: formality.id,
          data,
        }),
      })
      const json = await res.json()
      if (json.success && json.redirectUrl) {
        router.push(json.redirectUrl)
      } else {
        alert(json.error || 'Une erreur est survenue')
        setSubmitting(false)
      }
    } catch (e) {
      alert('Erreur réseau : ' + e.message)
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bone-50)] flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-[var(--color-border)] sticky top-0 z-30">
        <div className="container-page py-3.5 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-[8px] bg-[var(--color-ink-900)]" />
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-[13px]">A</div>
              <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[var(--color-coral-500)] ring-2 ring-white" />
            </div>
            <span className="hidden sm:inline font-semibold text-[14px] tracking-tight text-[var(--color-ink-900)]">
              Académie Conseils
            </span>
          </Link>
          <div className="flex items-center gap-3 text-[12.5px]">
            <span className="hidden md:inline-flex items-center gap-2 rounded-full bg-[var(--color-bone-100)] px-3 py-1 ring-1 ring-[var(--color-border)] font-semibold text-[var(--color-ink-700)]">
              {formality.name}
            </span>
            <Link href={`/services/${formality.category}`} className="text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)] inline-flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Quitter
            </Link>
          </div>
        </div>
        {/* Progress */}
        <div className="h-[3px] bg-[var(--color-bone-200)]">
          <div className="h-full bg-[var(--color-coral-500)] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main className="flex-1 container-page py-10 lg:py-14 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Stepper */}
          <aside className="lg:col-span-3">
            <div className="sticky top-28">
              <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-coral-600)] mb-1">
                Étape {stepIndex + 1} sur {steps.length}
              </div>
              <h2 className="heading-section text-[20px] text-[var(--color-ink-900)]">
                {currentStep.title}
              </h2>

              <ol className="mt-8 relative">
                <div className="absolute left-[13px] top-2 bottom-2 w-px bg-[var(--color-border)]" />
                {steps.map((s, i) => {
                  const done = i < stepIndex
                  const active = i === stepIndex
                  return (
                    <li
                      key={s.id}
                      className={`relative flex items-start gap-3 pl-9 py-2 text-[13px] ${
                        active ? 'font-semibold text-[var(--color-ink-900)]'
                          : done ? 'text-[var(--color-ink-700)]'
                          : 'text-[var(--color-ink-400)]'
                      }`}
                    >
                      <span className={`absolute left-0 top-2 flex h-[26px] w-[26px] items-center justify-center rounded-full text-[10px] font-bold ring-4 ring-[var(--color-bone-50)] ${
                        active ? 'bg-[var(--color-coral-500)] text-white'
                          : done ? 'bg-[var(--color-sage-500)] text-white'
                          : 'bg-white text-[var(--color-ink-400)] ring-[var(--color-border)]'
                      }`}>
                        {done ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
                        ) : i + 1}
                      </span>
                      <span className="pt-0.5 leading-snug">{s.title}</span>
                    </li>
                  )
                })}
              </ol>

              <div className="mt-8 rounded-2xl bg-white ring-1 ring-[var(--color-border)] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-coral-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                  <div className="text-[12px] font-semibold text-[var(--color-ink-900)]">Bon à savoir</div>
                </div>
                <div className="text-[12px] text-[var(--color-ink-600)] leading-relaxed">
                  Vos réponses sont sauvegardées automatiquement. Vous pouvez revenir
                  en arrière à tout moment.
                </div>
              </div>
            </div>
          </aside>

          {/* Form */}
          <section className="lg:col-span-9">
            <div className="bg-white rounded-[24px] ring-1 ring-[var(--color-border)] p-8 lg:p-10 shadow-[var(--shadow-sm)]">
              {currentStep.isRecap ? (
                <RecapStep formality={formality} data={data} onEdit={(i) => setStepIndex(i)} />
              ) : (
                <>
                  <h2 className="heading-display text-[32px] text-[var(--color-ink-900)] leading-[1.05]">
                    {currentStep.title}
                  </h2>
                  {currentStep.description && (
                    <p className="mt-3 text-[15px] text-[var(--color-ink-600)] leading-relaxed">
                      {currentStep.description}
                    </p>
                  )}

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                    {currentStep.fields.map((field) => (
                      <FieldRenderer
                        key={field.name}
                        field={field}
                        value={data[field.name] ?? ''}
                        error={errors[field.name]}
                        onChange={(v) => setField(field.name, v)}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="mt-10 flex flex-col-reverse sm:flex-row justify-between gap-3 pt-6 border-t border-[var(--color-border)]">
                {stepIndex > 0 ? (
                  <button onClick={prev} className="btn-secondary" disabled={submitting}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    Précédent
                  </button>
                ) : <div />}

                {currentStep.isRecap ? (
                  <button onClick={submit} className="btn-accent" disabled={submitting}>
                    {submitting ? (
                      'Traitement…'
                    ) : (
                      <>
                        Payer {formality.price}€ et générer
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                      </>
                    )}
                  </button>
                ) : (
                  <button onClick={next} className="btn-primary">
                    Continuer
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="container-page py-6 text-[12px] text-[var(--color-ink-500)] flex flex-wrap gap-x-4 gap-y-1">
        <span>© {new Date().getFullYear()} Académie Conseils</span>
        <Link href="/aide" className="hover:text-[var(--color-ink-900)] transition-colors">Aide</Link>
        <Link href="/cgv" className="hover:text-[var(--color-ink-900)] transition-colors">CGV</Link>
        <Link href="/confidentialite" className="hover:text-[var(--color-ink-900)] transition-colors">Confidentialité</Link>
      </footer>
    </div>
  )
}

function FieldRenderer({ field, value, error, onChange }) {
  const wrapperClass = field.full ? 'md:col-span-2' : ''
  const inputClass = `input-base ${error ? 'ring-[var(--color-coral-400)] focus:ring-[var(--color-coral-500)]' : ''}`

  return (
    <div className={wrapperClass}>
      <label className="label-base">
        {field.label}
        {field.required && <span className="text-[var(--color-coral-500)] font-normal ml-0.5">*</span>}
      </label>

      {field.type === 'select' ? (
        <select className={inputClass} value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">— Sélectionner —</option>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea
          className={inputClass}
          rows={field.rows || 4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      ) : (
        <input
          type={field.type}
          className={inputClass}
          value={value}
          onChange={(e) => onChange(field.type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value)}
          placeholder={field.placeholder}
          min={field.min}
        />
      )}

      {field.help && !error && <div className="mt-1.5 text-[12px] text-[var(--color-ink-500)]">{field.help}</div>}
      {error && <div className="mt-1.5 text-[12px] font-medium text-[var(--color-coral-600)]">{error}</div>}
    </div>
  )
}

function RecapStep({ formality, data, onEdit }) {
  return (
    <div>
      <span className="eyebrow">Dernière étape</span>
      <h2 className="heading-display text-[32px] text-[var(--color-ink-900)] mt-3 leading-[1.05]">
        Récapitulatif.
      </h2>
      <p className="mt-3 text-[15px] text-[var(--color-ink-600)] leading-relaxed">
        Vérifiez vos informations avant de finaliser et de procéder au paiement sécurisé Stripe.
      </p>

      <div className="mt-8 space-y-3">
        {formality.sections.map((section, sIdx) => (
          <div key={section.id} className="rounded-2xl ring-1 ring-[var(--color-border)] bg-[var(--color-bone-50)] p-5 lg:p-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-bold text-[16px] text-[var(--color-ink-900)] tracking-tight">{section.title}</h3>
              <button
                onClick={() => onEdit(sIdx)}
                className="text-[12.5px] font-semibold text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)] inline-flex items-center gap-1 group"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 113 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
                Modifier
              </button>
            </div>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-[13.5px]">
              {section.fields.map((f) => {
                const v = data[f.name]
                const displayValue = (() => {
                  if (v === undefined || v === '') return '—'
                  if (f.type === 'select') {
                    const opt = f.options?.find((o) => o.value === v)
                    return opt?.label || v
                  }
                  return String(v)
                })()
                return (
                  <div key={f.name}>
                    <dt className="text-[11px] uppercase tracking-[0.08em] text-[var(--color-ink-500)] font-semibold">{f.label}</dt>
                    <dd className="font-semibold text-[var(--color-ink-900)] mt-0.5">{displayValue}</dd>
                  </div>
                )
              })}
            </dl>
          </div>
        ))}

        {/* Pricing summary */}
        <div className="rounded-2xl bg-[var(--color-ink-900)] text-white p-6 lg:p-8 mt-6">
          <div className="flex justify-between items-baseline">
            <div>
              <div className="text-[11px] uppercase tracking-[0.12em] text-white/55 font-semibold">À payer</div>
              <div className="font-bold text-[15px] mt-1">{formality.name}</div>
              <div className="text-[12px] text-white/55 mt-0.5">Délai de traitement : {formality.delay}</div>
            </div>
            <div className="text-right">
              <div className="text-[36px] font-bold tracking-[-0.04em] leading-none">{formality.price}€</div>
              <div className="text-[11px] text-white/55 mt-1">HT · paiement unique</div>
            </div>
          </div>
          <div className="mt-5 pt-5 border-t border-white/10 flex flex-wrap items-center gap-3 text-[12px] text-white/65">
            <span className="inline-flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              Paiement Stripe sécurisé
            </span>
            <span>·</span>
            <span>Documents générés à la validation</span>
          </div>
        </div>
      </div>
    </div>
  )
}
