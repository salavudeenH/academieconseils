'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import AuthLayout from '@/components/AuthLayout'

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[var(--color-ink-500)]">Chargement…</div>}>
      <LoginContent />
    </Suspense>
  )
}

function LoginContent() {
  const router = useRouter()
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl') || '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
      return
    }

    router.push(callbackUrl)
    router.refresh()
  }

  return (
    <AuthLayout>
      <div>
        <span className="eyebrow">Connexion</span>
        <h1 className="heading-display text-[40px] text-[var(--color-ink-900)] mt-3 leading-[1.05]">
          Heureux de vous<br /><em>revoir.</em>
        </h1>
        <p className="mt-4 text-[15px] text-[var(--color-ink-600)] leading-relaxed">
          Connectez-vous à votre espace pour suivre vos dossiers en cours.
        </p>
      </div>

      <form onSubmit={submit} className="mt-10 space-y-4">
        <Field label="Email" htmlFor="email">
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="input-base" placeholder="vous@entreprise.fr" autoComplete="email" />
        </Field>

        <Field
          label="Mot de passe"
          htmlFor="password"
          extra={<Link href="/mot-de-passe-oublie" className="text-[12px] text-[var(--color-coral-600)] hover:underline">Mot de passe oublié ?</Link>}
        >
          <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            className="input-base" placeholder="••••••••" autoComplete="current-password" />
        </Field>

        {error && (
          <div className="text-[13px] text-[var(--color-coral-700)] bg-[var(--color-coral-50)] ring-1 ring-[var(--color-coral-200)] rounded-xl px-3 py-2">
            {error}
          </div>
        )}

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Connexion…' : 'Se connecter'}
          {!loading && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>}
        </button>

        <p className="text-[14px] text-center text-[var(--color-ink-600)] pt-6">
          Pas encore de compte ? <Link href="/register" className="font-semibold text-[var(--color-ink-900)] hover:text-[var(--color-coral-600)] underline underline-offset-2">Créer un compte</Link>
        </p>
      </form>
    </AuthLayout>
  )
}

function Field({ label, htmlFor, extra, children }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={htmlFor} className="text-[12.5px] font-semibold text-[var(--color-ink-700)]">{label}</label>
        {extra}
      </div>
      {children}
    </div>
  )
}
