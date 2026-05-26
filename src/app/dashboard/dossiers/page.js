'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

const CATEGORY_LABELS = { creation: 'Création', modification: 'Modification', cession: 'Cession', dissolution: 'Dissolution' }

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

export default function DossiersPage() {
  const [formalities, setFormalities] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [downloadingId, setDownloadingId] = useState(null)

  useEffect(() => {
    fetch('/api/formality').then((r) => r.json()).then((j) => {
      if (j.success) setFormalities(j.formalities || [])
    }).finally(() => setLoading(false))
  }, [])

  const counts = useMemo(() => ({
    all: formalities.length,
    creation: formalities.filter((f) => f.category === 'creation').length,
    modification: formalities.filter((f) => f.category === 'modification').length,
    cession: formalities.filter((f) => f.category === 'cession').length,
    dissolution: formalities.filter((f) => f.category === 'dissolution').length,
  }), [formalities])

  const filtered = formalities.filter((f) => filter === 'all' || f.category === filter)

  const downloadPdf = async (formalityId) => {
    setDownloadingId(formalityId)
    try {
      const res = await fetch(`/api/formality/${formalityId}/pdf`)
      if (!res.ok) {
        alert('Impossible de générer le PDF.')
        return
      }
      const blob = await res.blob()
      const cd = res.headers.get('Content-Disposition') || ''
      const m = /filename="([^"]+)"/.exec(cd)
      const filename = m?.[1] || `document-${formalityId}.pdf`
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = filename
      document.body.appendChild(a); a.click(); a.remove()
      URL.revokeObjectURL(url)
    } finally {
      setDownloadingId(null)
    }
  }

  return (
    <DashboardLayout title="Mes dossiers" subtitle="Suivez l'avancement de toutes vos formalités.">
      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
        {[
          { id: 'all',          label: 'Tous',         count: counts.all },
          { id: 'creation',     label: 'Création',     count: counts.creation },
          { id: 'modification', label: 'Modification', count: counts.modification },
          { id: 'cession',      label: 'Cession',      count: counts.cession },
          { id: 'dissolution',  label: 'Dissolution',  count: counts.dissolution },
        ].map((f) => {
          const active = filter === f.id
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors whitespace-nowrap ${
                active
                  ? 'bg-[var(--color-ink-900)] text-white'
                  : 'bg-white ring-1 ring-[var(--color-border)] text-[var(--color-ink-700)] hover:bg-[var(--color-bone-100)]'
              }`}
            >
              {f.label}
              <span className={`text-[10.5px] ${active ? 'bg-white/15 text-white' : 'bg-[var(--color-bone-100)] text-[var(--color-ink-700)]'} px-1.5 py-0.5 rounded-md tabular-nums font-bold`}>
                {f.count}
              </span>
            </button>
          )
        })}
      </div>

      {loading ? (
        <div className="rounded-2xl bg-white ring-1 ring-[var(--color-border)] p-10 text-center text-[14px] text-[var(--color-ink-500)]">
          Chargement…
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl bg-white ring-1 ring-[var(--color-border)] p-12 text-center">
          <p className="text-[14px] text-[var(--color-ink-500)]">Aucun dossier dans cette catégorie.</p>
          <Link href="/create-company" className="btn-primary mt-6 text-[13px] inline-flex">
            Démarrer ma première formalité
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((f) => {
            const color = STATUS_COLORS[f.status] || 'butter'
            const company = f.data?.companyName || f.data?.cedantNom || '—'
            const canDownload = f.status === 'DOCUMENTS_GENERATED' || f.status === 'PAID' || f.status === 'PENDING_PAYMENT' || f.status === 'COMPLETED' || f.status === 'FILED_TO_REGISTRY'
            return (
              <div
                key={f.id}
                className="rounded-2xl bg-white ring-1 ring-[var(--color-border)] p-5"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[var(--color-bone-100)] ring-1 ring-[var(--color-border)] flex items-center justify-center text-[11px] font-bold text-[var(--color-ink-700)] tracking-tight shrink-0">
                    {(CATEGORY_LABELS[f.category] || f.category).slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-semibold text-[14.5px] text-[var(--color-ink-900)]">
                        {CATEGORY_LABELS[f.category] || f.category} · {f.type}
                      </span>
                      <span className="text-[12.5px] text-[var(--color-ink-500)]">· {company}</span>
                    </div>
                    <div className="text-[12px] text-[var(--color-ink-500)] mt-0.5">
                      Démarré le {new Date(f.createdAt).toLocaleDateString('fr-FR')} · {f.price}€
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`inline-flex rounded-full ring-1 px-2.5 py-0.5 text-[11px] font-semibold ${statusClass[color]}`}>
                      {STATUS_LABELS[f.status] || f.status}
                    </span>
                    {canDownload && (
                      <button
                        onClick={() => downloadPdf(f.id)}
                        disabled={downloadingId === f.id}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink-900)] hover:bg-[var(--color-ink-800)] text-white text-[12px] font-semibold py-1.5 px-3 transition-colors disabled:opacity-60"
                      >
                        {downloadingId === f.id ? (
                          'Génération…'
                        ) : (
                          <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                            PDF
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </DashboardLayout>
  )
}
