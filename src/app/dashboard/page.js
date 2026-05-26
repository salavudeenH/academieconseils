'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'

const CATEGORY_LABELS = {
  creation:     'Création',
  modification: 'Modification',
  cession:      'Cession',
  dissolution:  'Dissolution',
}

const STATUS_COLORS = {
  PENDING_PAYMENT:     'butter',
  PAID:                'butter',
  IN_REVIEW:           'butter',
  DOCUMENTS_GENERATED: 'sage',
  FILED_TO_REGISTRY:   'sage',
  COMPLETED:           'sage',
  CANCELLED:           'coral',
  FAILED:              'coral',
}

const STATUS_LABELS = {
  PENDING_PAYMENT:     'En attente paiement',
  PAID:                'Payé',
  IN_REVIEW:           'En revue',
  DOCUMENTS_GENERATED: 'Documents prêts',
  FILED_TO_REGISTRY:   'Déposé au greffe',
  COMPLETED:           'Terminé',
  CANCELLED:           'Annulé',
  FAILED:              'Échec',
}

const statusClass = {
  butter: 'bg-[var(--color-butter-50)] text-[var(--color-butter-300)] ring-[var(--color-butter-100)]',
  sage:   'bg-[var(--color-sage-50)] text-[var(--color-sage-500)] ring-[var(--color-sage-100)]',
  coral:  'bg-[var(--color-coral-50)] text-[var(--color-coral-600)] ring-[var(--color-coral-100)]',
}

const QUICK_ACTIONS = [
  { label: 'Modifier ma société',     href: '/services/modification', icon: 'edit' },
  { label: 'Céder mes parts',         href: '/services/cession',      icon: 'handshake' },
  { label: 'Créer une autre société', href: '/create-company',        icon: 'plus' },
  { label: 'Contacter un juriste',    href: '/contact',               icon: 'chat' },
]

export default function DashboardHome() {
  const { data: session } = useSession()
  const [formalities, setFormalities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/formality')
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setFormalities(j.formalities || [])
      })
      .finally(() => setLoading(false))
  }, [])

  const firstName = session?.user?.firstName || session?.user?.name?.split(' ')[0] || ''
  const recent = formalities.slice(0, 5)
  const inProgress = formalities.filter((f) => !['COMPLETED', 'CANCELLED', 'FAILED'].includes(f.status)).length
  const totalDocs = formalities.filter((f) => f.status === 'DOCUMENTS_GENERATED' || f.status === 'COMPLETED').length

  return (
    <DashboardLayout
      title={firstName ? `Bonjour, ${firstName}` : 'Bonjour'}
      subtitle="Aperçu de vos dossiers et formalités en cours."
      actions={
        <Link href="/create-company" className="btn-accent text-[13px] py-2.5 px-5">
          + Nouvelle formalité
        </Link>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-border)] rounded-2xl overflow-hidden ring-1 ring-[var(--color-border)] mb-8">
        {[
          { label: 'Sociétés',          value: formalities.filter((f) => f.category === 'creation').length, delta: 'créées via la plateforme' },
          { label: 'Dossiers en cours', value: inProgress,           delta: inProgress > 0 ? 'à finaliser' : 'tout est à jour' },
          { label: 'Documents',         value: totalDocs,            delta: 'téléchargeables' },
          { label: 'Formalités totales', value: formalities.length,  delta: 'depuis votre inscription' },
        ].map((s) => (
          <div key={s.label} className="bg-white p-5 lg:p-6">
            <div className="text-[11px] uppercase tracking-[0.10em] text-[var(--color-ink-500)] font-semibold">{s.label}</div>
            <div className="mt-2 text-[32px] font-bold tracking-[-0.04em] text-[var(--color-ink-900)] leading-none">
              {loading ? '—' : s.value}
            </div>
            <div className="mt-2 text-[11.5px] text-[var(--color-ink-500)]">{s.delta}</div>
          </div>
        ))}
      </div>

      {/* Dossiers récents + actions rapides */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 card p-0 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
            <h2 className="font-bold text-[16px] text-[var(--color-ink-900)] tracking-tight">Dossiers récents</h2>
            <Link href="/dashboard/dossiers" className="text-[12.5px] font-semibold text-[var(--color-ink-700)] hover:text-[var(--color-coral-600)] inline-flex items-center gap-1">
              Tout voir
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
          </div>
          {loading ? (
            <div className="p-10 text-center text-[14px] text-[var(--color-ink-500)]">Chargement…</div>
          ) : recent.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-[14px] text-[var(--color-ink-500)]">Aucun dossier pour le moment.</p>
              <Link href="/create-company" className="btn-primary mt-5 text-[13px]">Démarrer ma première formalité</Link>
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-border)]">
              {recent.map((f) => {
                const company = f.data?.companyName || f.data?.cedantNom || '—'
                const color = STATUS_COLORS[f.status] || 'butter'
                return (
                  <Link
                    key={f.id}
                    href="/dashboard/dossiers"
                    className="flex items-center gap-4 px-6 py-4 hover:bg-[var(--color-bone-50)] transition-colors group"
                  >
                    <div className="h-10 w-10 rounded-xl bg-[var(--color-bone-100)] flex items-center justify-center text-[11px] font-bold tracking-tight text-[var(--color-ink-700)] ring-1 ring-[var(--color-border)]">
                      {(CATEGORY_LABELS[f.category] || f.category).slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[14px] text-[var(--color-ink-900)] truncate group-hover:text-[var(--color-coral-600)] transition-colors">
                        {CATEGORY_LABELS[f.category] || f.category} · {f.type}
                      </div>
                      <div className="text-[12px] text-[var(--color-ink-500)] mt-0.5">
                        {company} · {new Date(f.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    <span className={`inline-flex rounded-full ring-1 px-2.5 py-0.5 text-[11px] font-semibold ${statusClass[color]}`}>
                      {STATUS_LABELS[f.status] || f.status}
                    </span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="card p-0 overflow-hidden">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h2 className="font-bold text-[16px] text-[var(--color-ink-900)] tracking-tight">Actions rapides</h2>
          </div>
          <div className="p-2">
            {QUICK_ACTIONS.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--color-bone-100)] transition-colors group"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-bone-100)] ring-1 ring-[var(--color-border)] group-hover:bg-white transition-colors">
                  <QuickIcon name={a.icon} />
                </span>
                <span className="text-[13px] font-medium flex-1">{a.label}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-400)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:text-[var(--color-ink-900)] transition-all">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function QuickIcon({ name }) {
  const props = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'var(--color-ink-900)', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'edit':      return <svg {...props}><path d="M12 20h9M16.5 3.5a2.12 2.12 0 113 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
    case 'handshake': return <svg {...props}><path d="M14 9l-3 3 3 3M10 9l3 3-3 3M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg>
    case 'plus':      return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>
    case 'chat':      return <svg {...props}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    default: return null
  }
}
