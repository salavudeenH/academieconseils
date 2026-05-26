'use client'

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

export default function ProfilPage() {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const [pwOpen, setPwOpen] = useState(false)
  const [pwData, setPwData] = useState({ currentPassword: '', newPassword: '', confirm: '' })
  const [pwSaving, setPwSaving] = useState(false)
  const [pwError, setPwError] = useState('')
  const [pwSaved, setPwSaved] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setUser({
          firstName: j.user.firstName || '',
          lastName:  j.user.lastName  || '',
          email:     j.user.email     || '',
          phone:     j.user.phone     || '',
        })
      })
      .finally(() => setLoading(false))
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setSaving(true); setError(''); setSaved(false)
    try {
      const res = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName:  user.lastName,
          phone:     user.phone,
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) { setError(json.error || 'Erreur lors de la mise à jour.'); return }
      setSaved(true); setTimeout(() => setSaved(false), 2500)
    } finally { setSaving(false) }
  }

  const submitPw = async (e) => {
    e.preventDefault()
    setPwError(''); setPwSaved(false)
    if (pwData.newPassword !== pwData.confirm) { setPwError('Les deux mots de passe ne correspondent pas.'); return }
    if (pwData.newPassword.length < 8) { setPwError('Mot de passe : 8 caractères minimum.'); return }
    setPwSaving(true)
    try {
      const res = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: pwData.currentPassword, newPassword: pwData.newPassword }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) { setPwError(json.error || 'Erreur'); return }
      setPwSaved(true)
      setPwData({ currentPassword: '', newPassword: '', confirm: '' })
      setTimeout(() => { setPwOpen(false); setPwSaved(false) }, 2000)
    } finally { setPwSaving(false) }
  }

  const setField = (k, v) => setUser((s) => ({ ...s, [k]: v }))
  const setPwField = (k, v) => setPwData((s) => ({ ...s, [k]: v }))

  return (
    <DashboardLayout title="Mon profil" subtitle="Gérez vos informations personnelles et votre sécurité.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 card p-0 overflow-hidden">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h2 className="font-bold text-[16px] text-[var(--color-ink-900)] tracking-tight">Informations personnelles</h2>
            <p className="text-[12.5px] text-[var(--color-ink-500)] mt-0.5">Mettez à jour vos coordonnées à tout moment.</p>
          </div>
          <form onSubmit={submit} className="p-6 lg:p-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Prénom" value={user.firstName} onChange={(v) => setField('firstName', v)} required />
              <Field label="Nom"    value={user.lastName}  onChange={(v) => setField('lastName', v)}  required />
            </div>
            <Field label="Email" type="email" value={user.email} disabled help="Pour changer d'email, contactez le support." />
            <Field label="Téléphone" type="tel" value={user.phone} onChange={(v) => setField('phone', v)} />

            {error && <div className="text-[13px] text-[var(--color-coral-700)] bg-[var(--color-coral-50)] ring-1 ring-[var(--color-coral-200)] rounded-xl px-3 py-2">{error}</div>}

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" className="btn-primary" disabled={saving || loading}>
                {saving ? 'Enregistrement…' : 'Enregistrer'}
              </button>
              {saved && (
                <span className="text-[12.5px] font-medium text-[var(--color-sage-500)] inline-flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
                  Modifications enregistrées
                </span>
              )}
            </div>
          </form>
        </div>

        <div className="space-y-5">
          <div className="card">
            <h3 className="font-bold text-[15px] tracking-tight text-[var(--color-ink-900)] mb-4">Sécurité</h3>
            <button
              onClick={() => setPwOpen((v) => !v)}
              className="w-full text-left flex items-center justify-between gap-3 p-3 rounded-xl bg-[var(--color-bone-50)] hover:bg-[var(--color-bone-100)] transition-colors text-[13px]"
            >
              <span className="flex items-center gap-2.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                Changer mon mot de passe
              </span>
              <svg className={`text-[var(--color-ink-400)] transition-transform ${pwOpen ? 'rotate-90' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>

            {pwOpen && (
              <form onSubmit={submitPw} className="mt-4 space-y-3">
                <Field label="Mot de passe actuel" type="password" value={pwData.currentPassword} onChange={(v) => setPwField('currentPassword', v)} required />
                <Field label="Nouveau mot de passe" type="password" value={pwData.newPassword} onChange={(v) => setPwField('newPassword', v)} required help="8 caractères minimum." />
                <Field label="Confirmer le nouveau" type="password" value={pwData.confirm} onChange={(v) => setPwField('confirm', v)} required />
                {pwError && <div className="text-[12.5px] text-[var(--color-coral-700)] bg-[var(--color-coral-50)] ring-1 ring-[var(--color-coral-200)] rounded-xl px-3 py-2">{pwError}</div>}
                {pwSaved && <div className="text-[12.5px] text-[var(--color-sage-500)]">Mot de passe mis à jour.</div>}
                <button type="submit" className="btn-primary w-full text-[13px]" disabled={pwSaving}>
                  {pwSaving ? 'Mise à jour…' : 'Mettre à jour'}
                </button>
              </form>
            )}
          </div>

          <div className="rounded-2xl bg-[var(--color-coral-50)] ring-1 ring-[var(--color-coral-100)] p-5">
            <h3 className="font-bold text-[15px] tracking-tight text-[var(--color-coral-700)] mb-2">Zone de danger</h3>
            <p className="text-[12.5px] text-[var(--color-ink-600)] mb-4 leading-relaxed">
              La suppression de votre compte est définitive et irréversible. Vos dossiers en cours seront
              conservés 10 ans conformément à la loi.
            </p>
            <button className="text-[12.5px] font-semibold text-[var(--color-coral-700)] hover:text-[var(--color-coral-600)] underline underline-offset-2 transition-colors">
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function Field({ label, type = 'text', value, onChange, required, disabled, help }) {
  return (
    <div>
      <label className="label-base">{label}</label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        disabled={disabled}
        className={`input-base ${disabled ? 'opacity-60 cursor-not-allowed bg-[var(--color-bone-50)]' : ''}`}
      />
      {help && <p className="mt-1.5 text-[12px] text-[var(--color-ink-500)]">{help}</p>}
    </div>
  )
}
