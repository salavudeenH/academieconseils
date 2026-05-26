'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

export default function ProfilPage() {
  const [user, setUser] = useState({ prenom: '', nom: '', email: '', telephone: '', adresse: '' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const u = JSON.parse(window.localStorage.getItem('ac_user') || '{}')
        const [prenom, ...nomParts] = (u.name || '').split(' ')
        setUser((s) => ({ ...s, prenom: prenom || '', nom: nomParts.join(' '), email: u.email || '' }))
      } catch {}
    }
  }, [])

  const submit = (e) => {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('ac_user', JSON.stringify({ name: `${user.prenom} ${user.nom}`, email: user.email }))
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const setField = (k, v) => setUser((s) => ({ ...s, [k]: v }))

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
              <Field label="Prénom" value={user.prenom} onChange={(v) => setField('prenom', v)} />
              <Field label="Nom"    value={user.nom}    onChange={(v) => setField('nom', v)} />
            </div>
            <Field label="Email"            type="email" value={user.email} onChange={(v) => setField('email', v)} />
            <Field label="Téléphone"        type="tel"   value={user.telephone} onChange={(v) => setField('telephone', v)} />
            <Field label="Adresse postale"  value={user.adresse}   onChange={(v) => setField('adresse', v)} />

            <div className="flex items-center gap-3 pt-2">
              <button type="submit" className="btn-primary">Enregistrer</button>
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
            <button className="w-full text-left flex items-center justify-between gap-3 p-3 rounded-xl bg-[var(--color-bone-50)] hover:bg-[var(--color-bone-100)] transition-colors text-[13px]">
              <span className="flex items-center gap-2.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                Changer mon mot de passe
              </span>
              <svg className="text-[var(--color-ink-400)]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
            <button className="mt-2 w-full text-left flex items-center justify-between gap-3 p-3 rounded-xl bg-[var(--color-bone-50)] hover:bg-[var(--color-bone-100)] transition-colors text-[13px]">
              <span className="flex items-center gap-2.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>
                Activer la double authentification
              </span>
              <svg className="text-[var(--color-ink-400)]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          </div>

          <div className="card">
            <h3 className="font-bold text-[15px] tracking-tight text-[var(--color-ink-900)] mb-4">Notifications</h3>
            <div className="space-y-3">
              {[
                { label: 'Email — nouveaux messages',     def: true },
                { label: 'Email — changement de statut',  def: true },
                { label: 'SMS — urgences uniquement',     def: false },
              ].map((n, i) => (
                <label key={i} className="flex items-center justify-between py-1 text-[13px] cursor-pointer">
                  <span className="text-[var(--color-ink-700)]">{n.label}</span>
                  <input
                    type="checkbox"
                    defaultChecked={n.def}
                    className="h-4 w-4 rounded"
                    style={{ accentColor: 'var(--color-coral-500)' }}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[var(--color-coral-50)] ring-1 ring-[var(--color-coral-100)] p-5">
            <h3 className="font-bold text-[15px] tracking-tight text-[var(--color-coral-700)] mb-2">Zone de danger</h3>
            <p className="text-[12.5px] text-[var(--color-ink-600)] mb-4 leading-relaxed">
              La suppression de votre compte est définitive et irréversible. Vos dossiers
              en cours seront conservés 10 ans conformément à la loi.
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

function Field({ label, type = 'text', value, onChange }) {
  return (
    <div>
      <label className="label-base">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="input-base" />
    </div>
  )
}
