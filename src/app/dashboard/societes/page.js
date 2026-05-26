'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

const formColors = {
  SAS:  'bg-[var(--color-coral-50)] text-[var(--color-coral-600)] ring-[var(--color-coral-100)]',
  EURL: 'bg-[var(--color-sage-50)] text-[var(--color-sage-500)] ring-[var(--color-sage-100)]',
  SARL: 'bg-[var(--color-lavender-50)] text-[var(--color-lavender-300)] ring-[var(--color-lavender-100)]',
  SASU: 'bg-[var(--color-butter-50)] text-[var(--color-butter-300)] ring-[var(--color-butter-100)]',
  SCI:  'bg-[var(--color-mist-100)] text-[var(--color-mist-300)] ring-[var(--color-mist-100)]',
}

export default function MesSocietesPage() {
  const [societes, setSocietes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/formality')
      .then((r) => r.json())
      .then((j) => {
        if (!j.success) return
        // On garde uniquement les créations + on déduplique par dénomination
        const creations = (j.formalities || []).filter((f) => f.category === 'creation')
        const seen = new Set()
        const list = []
        for (const f of creations) {
          const name = f.data?.companyName
          if (!name || seen.has(name)) continue
          seen.add(name)
          list.push({
            id: f.id,
            name,
            form: f.type,
            siren: f.data?.siren || '—',
            capital: f.data?.capital || 0,
            ville: f.data?.ville || '—',
            adresse: f.data?.adresse || '',
            objet: f.data?.objet || '',
            status: f.status,
            createdAt: f.createdAt,
          })
        }
        setSocietes(list)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <DashboardLayout
      title="Mes sociétés"
      subtitle="Toutes les sociétés créées via la plateforme."
      actions={<Link href="/create-company" className="btn-accent text-[13px] py-2.5 px-5">+ Nouvelle société</Link>}
    >
      {loading ? (
        <div className="rounded-2xl bg-white ring-1 ring-[var(--color-border)] p-10 text-center text-[14px] text-[var(--color-ink-500)]">
          Chargement…
        </div>
      ) : societes.length === 0 ? (
        <div className="rounded-2xl bg-white ring-1 ring-[var(--color-border)] p-12 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-bone-100)] ring-1 ring-[var(--color-border)] mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-700)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 7h2M9 11h2M9 15h2M13 7h2M13 11h2M13 15h2"/></svg>
          </div>
          <h2 className="font-bold text-[18px] text-[var(--color-ink-900)]">Aucune société pour l'instant</h2>
          <p className="text-[14px] text-[var(--color-ink-500)] mt-2 max-w-md mx-auto">
            Lancez votre première création de société en quelques minutes — statuts générés instantanément.
          </p>
          <Link href="/create-company" className="btn-primary mt-6 text-[13px] inline-flex">
            Créer ma première société
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {societes.map((s) => (
            <div
              key={s.id}
              className="rounded-[20px] bg-white ring-1 ring-[var(--color-border)] hover:ring-[var(--color-border-strong)] hover:-translate-y-1 transition-all p-6"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 rounded-xl bg-[var(--color-ink-900)] text-white flex items-center justify-center text-[14px] font-bold tracking-tight">
                  {s.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </div>
                <span className={`inline-flex rounded-full ring-1 px-2.5 py-0.5 text-[11px] font-semibold tracking-tight ${formColors[s.form] || formColors.SAS}`}>
                  {s.form}
                </span>
              </div>
              <h3 className="mt-5 font-bold text-[18px] text-[var(--color-ink-900)] tracking-tight">{s.name}</h3>
              <div className="text-[12.5px] text-[var(--color-ink-500)] mt-0.5 line-clamp-1">{s.objet || 'Objet non renseigné'}</div>

              <dl className="mt-5 space-y-2 text-[13px]">
                <div className="flex justify-between"><dt className="text-[var(--color-ink-500)]">SIREN</dt><dd className="font-mono text-[var(--color-ink-700)]">{s.siren}</dd></div>
                <div className="flex justify-between"><dt className="text-[var(--color-ink-500)]">Capital</dt><dd className="font-semibold text-[var(--color-ink-900)]">{Number(s.capital).toLocaleString('fr-FR')} €</dd></div>
                <div className="flex justify-between"><dt className="text-[var(--color-ink-500)]">Ville</dt><dd className="text-[var(--color-ink-700)]">{s.ville}</dd></div>
                <div className="flex justify-between"><dt className="text-[var(--color-ink-500)]">Créée le</dt><dd className="text-[var(--color-ink-700)]">{new Date(s.createdAt).toLocaleDateString('fr-FR')}</dd></div>
              </dl>

              <div className="mt-6 grid grid-cols-2 gap-2">
                <Link href="/dashboard/dossiers" className="text-center rounded-full bg-[var(--color-bone-100)] hover:bg-[var(--color-bone-200)] text-[var(--color-ink-900)] text-[12.5px] font-semibold py-2 transition-colors">
                  Détails
                </Link>
                <Link href="/services/modification" className="text-center rounded-full bg-[var(--color-ink-900)] hover:bg-[var(--color-ink-800)] text-white text-[12.5px] font-semibold py-2 transition-colors">
                  Modifier
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
