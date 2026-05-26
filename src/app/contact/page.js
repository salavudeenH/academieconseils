'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const CONTACT_CHANNELS = [
  {
    icon: 'chat',
    title: 'Chat en direct',
    desc: '7j/7 de 8h à 22h · réponse sous 5 min',
    href: '#',
  },
  {
    icon: 'mail',
    title: 'Par email',
    desc: 'contact@academie-conseils.fr',
    href: 'mailto:contact@academie-conseils.fr',
  },
  {
    icon: 'phone',
    title: 'Par téléphone',
    desc: '01 23 45 67 89 · prix appel local',
    href: 'tel:0123456789',
  },
  {
    icon: 'building',
    title: 'Nos bureaux',
    desc: '12 rue de la Liberté, 75001 Paris',
    href: '#',
  },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', tel: '', sujet: '', message: '',
  })
  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const submit = (e) => { e.preventDefault(); setSubmitted(true) }

  return (
    <>
      <Header />
      <main className="py-16 lg:py-24">
        <div className="container-page max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_560px] gap-12 lg:gap-20">
            {/* Infos */}
            <div>
              <span className="eyebrow">Contact</span>
              <h1 className="heading-display text-[52px] md:text-[72px] text-[var(--color-ink-900)] mt-5 leading-[0.98]">
                On est là<br /><em>pour vous aider.</em>
              </h1>
              <p className="mt-6 text-[17px] text-[var(--color-ink-600)] leading-relaxed max-w-md">
                Une question, un projet, un blocage ? Notre équipe juriste répond
                en moins de 5 minutes en moyenne.
              </p>

              <div className="mt-10 space-y-3">
                {CONTACT_CHANNELS.map((c) => (
                  <a
                    key={c.title}
                    href={c.href}
                    className="group flex items-center gap-4 p-4 rounded-2xl ring-1 ring-[var(--color-border)] bg-white hover:ring-[var(--color-border-strong)] hover:-translate-y-px transition-all"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-bone-100)] ring-1 ring-[var(--color-border)] group-hover:bg-white transition-colors">
                      <ChannelIcon name={c.icon} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[14.5px] text-[var(--color-ink-900)]">{c.title}</div>
                      <div className="text-[13px] text-[var(--color-ink-500)]">{c.desc}</div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-400)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 group-hover:translate-x-1 group-hover:text-[var(--color-ink-900)] transition-all">
                      <path d="M5 12h14M13 5l7 7-7 7"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Formulaire */}
            <div>
              <div className="bg-white rounded-[28px] ring-1 ring-[var(--color-border)] p-7 lg:p-10 shadow-[var(--shadow-md)]">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-[var(--color-sage-100)]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-sage-500)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
                    </div>
                    <h2 className="heading-section text-[24px] text-[var(--color-ink-900)] mt-5">Message envoyé</h2>
                    <p className="mt-3 text-[14px] text-[var(--color-ink-600)] leading-relaxed">
                      Nous vous répondons dans les meilleurs délais (en général sous 1h
                      les jours ouvrés).
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-4">
                    <h2 className="heading-section text-[24px] text-[var(--color-ink-900)] mb-2">Écrivez-nous</h2>

                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Prénom" value={form.prenom} onChange={(v) => setField('prenom', v)} required />
                      <Field label="Nom"    value={form.nom}    onChange={(v) => setField('nom', v)}    required />
                    </div>
                    <Field label="Email"     type="email" value={form.email} onChange={(v) => setField('email', v)} required />
                    <Field label="Téléphone" type="tel"   value={form.tel}   onChange={(v) => setField('tel', v)} />

                    <div>
                      <label className="label-base">Sujet</label>
                      <select
                        className="input-base"
                        value={form.sujet}
                        onChange={(e) => setField('sujet', e.target.value)}
                      >
                        <option value="">— Choisir un sujet —</option>
                        <option value="creation">Création de société</option>
                        <option value="modification">Modification statutaire</option>
                        <option value="cession">Cession / reprise</option>
                        <option value="dissolution">Dissolution / liquidation</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="label-base">Votre message</label>
                      <textarea
                        rows={5}
                        className="input-base"
                        value={form.message}
                        onChange={(e) => setField('message', e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full">
                      Envoyer le message
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                    </button>
                    <p className="text-[12px] text-[var(--color-ink-500)] text-center">
                      En envoyant ce formulaire, vous acceptez notre{' '}
                      <a href="/confidentialite" className="text-[var(--color-ink-900)] underline underline-offset-2">politique de confidentialité</a>.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Field({ label, type = 'text', value, onChange, required }) {
  return (
    <div>
      <label className="label-base">
        {label} {required && <span className="text-[var(--color-coral-500)] font-normal">*</span>}
      </label>
      <input
        type={type}
        className="input-base"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  )
}

function ChannelIcon({ name }) {
  const props = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'var(--color-ink-900)', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'chat':     return <svg {...props}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    case 'mail':     return <svg {...props}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
    case 'phone':    return <svg {...props}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg>
    case 'building': return <svg {...props}><path d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 7h2M9 11h2M9 15h2M13 7h2M13 11h2M13 15h2"/></svg>
    default: return null
  }
}
