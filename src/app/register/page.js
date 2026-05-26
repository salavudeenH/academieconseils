'use client'

import { useState } from 'react'
import Link from 'next/link'
import AuthLayout from '@/components/AuthLayout'

export default function RegisterPage() {
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', password: '', cgv: false })
  const [loading, setLoading] = useState(false)
  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.cgv) return
    setLoading(true)
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('ac_user', JSON.stringify({ email: form.email, name: `${form.prenom} ${form.nom}` }))
        window.location.href = '/dashboard'
      }
    }, 500)
  }

  return (
    <AuthLayout>
      <div>
        <span className="eyebrow">Inscription</span>
        <h1 className="heading-display text-[40px] text-[var(--color-ink-900)] mt-3 leading-[1.05]">
          Créez votre <em>compte.</em>
        </h1>
        <p className="mt-4 text-[15px] text-[var(--color-ink-600)] leading-relaxed">
          2 minutes pour démarrer, votre espace client est prêt à l'instant.
        </p>
      </div>

      <form onSubmit={submit} className="mt-10 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Prénom" htmlFor="prenom">
            <input id="prenom" required value={form.prenom} onChange={(e) => setField('prenom', e.target.value)}
              className="input-base" placeholder="Marie" />
          </FormField>
          <FormField label="Nom" htmlFor="nom">
            <input id="nom" required value={form.nom} onChange={(e) => setField('nom', e.target.value)}
              className="input-base" placeholder="Dubois" />
          </FormField>
        </div>

        <FormField label="Email pro" htmlFor="email">
          <input id="email" type="email" required value={form.email} onChange={(e) => setField('email', e.target.value)}
            className="input-base" placeholder="vous@entreprise.fr" />
        </FormField>

        <FormField label="Mot de passe" htmlFor="password" help="8 caractères minimum.">
          <input id="password" type="password" required minLength={8} value={form.password} onChange={(e) => setField('password', e.target.value)}
            className="input-base" placeholder="••••••••" />
        </FormField>

        <label className="flex items-start gap-3 text-[13px] text-[var(--color-ink-700)] pt-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.cgv}
            onChange={(e) => setField('cgv', e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded shrink-0"
            style={{ accentColor: 'var(--color-coral-500)' }}
          />
          <span className="leading-snug">
            J'accepte les{' '}
            <Link href="/cgv" className="text-[var(--color-ink-900)] underline underline-offset-2 hover:text-[var(--color-coral-600)]">CGV</Link>
            {' '}et la{' '}
            <Link href="/confidentialite" className="text-[var(--color-ink-900)] underline underline-offset-2 hover:text-[var(--color-coral-600)]">politique de confidentialité</Link>.
          </span>
        </label>

        <button type="submit" className="btn-primary w-full" disabled={!form.cgv || loading}>
          {loading ? 'Création…' : 'Créer mon compte'}
          {!loading && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>}
        </button>

        <p className="text-[14px] text-center text-[var(--color-ink-600)] pt-4">
          Déjà un compte ? <Link href="/login" className="font-semibold text-[var(--color-ink-900)] hover:text-[var(--color-coral-600)] underline underline-offset-2">Se connecter</Link>
        </p>
      </form>
    </AuthLayout>
  )
}

function FormField({ label, htmlFor, help, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label-base">{label}</label>
      {children}
      {help && <p className="mt-1.5 text-[12px] text-[var(--color-ink-500)]">{help}</p>}
    </div>
  )
}
