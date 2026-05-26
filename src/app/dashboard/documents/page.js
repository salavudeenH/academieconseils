'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'

const DOC_TYPE_BY_CAT = {
  creation:     { type: 'Statuts',  label: 'Statuts complets de la société' },
  modification: { type: 'PV',       label: "Procès-verbal d'assemblée + annonce légale" },
  cession:      { type: 'Acte',     label: 'Acte de cession' },
  dissolution:  { type: 'PV',       label: 'Procès-verbal de dissolution / liquidation' },
}

const typeColors = {
  Statuts: 'bg-[var(--color-coral-50)] text-[var(--color-coral-600)] ring-[var(--color-coral-100)]',
  PV:      'bg-[var(--color-lavender-50)] text-[var(--color-lavender-300)] ring-[var(--color-lavender-100)]',
  Acte:    'bg-[var(--color-sage-50)] text-[var(--color-sage-500)] ring-[var(--color-sage-100)]',
}

export default function DocumentsPage() {
  const [formalities, setFormalities] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [downloadingId, setDownloadingId] = useState(null)

  useEffect(() => {
    fetch('/api/formality').then((r) => r.json()).then((j) => {
      if (j.success) setFormalities(j.formalities || [])
    }).finally(() => setLoading(false))
  }, [])

  const docs = useMemo(() => formalities.map((f) => {
    const meta = DOC_TYPE_BY_CAT[f.category] || { type: 'Document', label: 'Document' }
    const company = f.data?.companyName || f.data?.cedantNom || '—'
    return {
      id: f.id,
      type: meta.type,
      label: meta.label,
      company,
      formalityType: f.type,
      category: f.category,
      createdAt: f.createdAt,
    }
  }), [formalities])

  const filtered = docs.filter((d) =>
    !query || d.label.toLowerCase().includes(query.toLowerCase()) || d.company.toLowerCase().includes(query.toLowerCase())
  )

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
    <DashboardLayout title="Documents" subtitle="Vos documents juridiques générés à la demande.">
      <div className="mb-5 relative max-w-md">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-400)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un document…"
          className="input-base pl-10"
        />
      </div>

      {loading ? (
        <div className="rounded-2xl bg-white ring-1 ring-[var(--color-border)] p-10 text-center text-[14px] text-[var(--color-ink-500)]">
          Chargement…
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl bg-white ring-1 ring-[var(--color-border)] p-12 text-center">
          <p className="text-[14px] text-[var(--color-ink-500)]">
            {query ? 'Aucun document ne correspond à votre recherche.' : 'Aucun document pour le moment.'}
          </p>
          {!query && (
            <Link href="/create-company" className="btn-primary mt-6 text-[13px] inline-flex">
              Démarrer ma première formalité
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl ring-1 ring-[var(--color-border)] overflow-hidden" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <table className="w-full">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-[0.10em] text-[var(--color-ink-500)] font-semibold border-b border-[var(--color-border)] bg-[var(--color-bone-50)]">
                <th className="px-6 py-3.5">Document</th>
                <th className="px-6 py-3.5">Type</th>
                <th className="px-6 py-3.5 hidden md:table-cell">Société</th>
                <th className="px-6 py-3.5 hidden md:table-cell">Créé le</th>
                <th className="px-6 py-3.5 text-right" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-[var(--color-bone-50)] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-[var(--color-bone-100)] ring-1 ring-[var(--color-border)] flex items-center justify-center shrink-0">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-700)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[13.5px] text-[var(--color-ink-900)]">{d.label}</div>
                        <div className="text-[11.5px] text-[var(--color-ink-500)]">{d.formalityType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full ring-1 px-2 py-0.5 text-[11px] font-semibold ${typeColors[d.type] || typeColors.PV}`}>
                      {d.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-[var(--color-ink-700)] hidden md:table-cell">{d.company}</td>
                  <td className="px-6 py-4 text-[13px] text-[var(--color-ink-700)] hidden md:table-cell">{new Date(d.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => downloadPdf(d.id)}
                      disabled={downloadingId === d.id}
                      className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-[var(--color-ink-900)] hover:text-[var(--color-coral-600)] transition-colors disabled:opacity-60"
                    >
                      {downloadingId === d.id ? 'Génération…' : (
                        <>
                          Télécharger
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  )
}
