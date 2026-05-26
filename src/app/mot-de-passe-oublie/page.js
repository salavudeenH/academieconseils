'use client'

import { useState } from 'react'
import Link from 'next/link'
import AuthLayout from '@/components/AuthLayout'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <AuthLayout>
      <div>
        <span className="eyebrow">Récupération</span>
        <h1 className="heading-display text-[40px] text-[var(--color-ink-900)] mt-3 leading-[1.05]">
          Mot de passe<br /><em>oublié ?</em>
        </h1>
        <p className="mt-4 text-[15px] text-[var(--color-ink-600)] leading-relaxed">
          Pas de panique. Indiquez votre email, on vous envoie un lien de
          réinitialisation valable 1h.
        </p>
      </div>

      {sent ? (
        <div className="mt-10 rounded-2xl bg-[var(--color-sage-50)] ring-1 ring-[var(--color-sage-100)] p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-sage-100)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-sage-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>
              </svg>
            </div>
            <h2 className="font-bold text-[17px] text-[var(--color-ink-900)]">Email envoyé</h2>
          </div>
          <p className="text-[13.5px] text-[var(--color-ink-700)] leading-relaxed">
            Si un compte est associé à <strong>{email}</strong>, vous recevrez un
            lien dans quelques minutes. Pensez à vérifier vos spams.
          </p>
          <Link href="/login" className="btn-secondary mt-6 text-[14px] inline-flex">
            ← Retour à la connexion
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-10 space-y-4">
          <div>
            <label htmlFor="email" className="label-base">Email du compte</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="input-base" placeholder="vous@entreprise.fr" />
          </div>

          <button type="submit" className="btn-primary w-full">
            Envoyer le lien
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </button>

          <p className="text-[14px] text-center text-[var(--color-ink-600)] pt-4">
            <Link href="/login" className="font-semibold text-[var(--color-ink-900)] hover:text-[var(--color-coral-600)] underline underline-offset-2">← Retour à la connexion</Link>
          </p>
        </form>
      )}
    </AuthLayout>
  )
}
