'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

const DOCS = [
  { name: 'Statuts SARL — Studio Pollen.pdf',       type: 'Statuts',     company: 'Studio Pollen',  date: '12 avr. 2026', size: '124 Ko' },
  { name: 'PV transfert siège — Studio Pollen.pdf', type: 'PV',          company: 'Studio Pollen',  date: '5 mai 2026',   size: '78 Ko' },
  { name: 'Acte cession parts — Cosmo TVS.pdf',     type: 'Acte',        company: 'Cosmo TVS',      date: '18 mai 2026',  size: '95 Ko' },
  { name: 'Kbis — Studio Pollen.pdf',               type: 'Officiel',    company: 'Studio Pollen',  date: '14 avr. 2026', size: '52 Ko' },
  { name: 'Annonce légale — Renaud Conseil.pdf',    type: 'Publication', company: 'Renaud Conseil', date: '21 avr. 2026', size: '34 Ko' },
  { name: 'Facture #2024-0421.pdf',                  type: 'Facture',     company: 'Académie Conseils', date: '21 avr. 2026', size: '28 Ko' },
]

const typeColors = {
  Statuts:     'bg-[var(--color-coral-50)] text-[var(--color-coral-600)] ring-[var(--color-coral-100)]',
  PV:          'bg-[var(--color-lavender-50)] text-[var(--color-lavender-300)] ring-[var(--color-lavender-100)]',
  Acte:        'bg-[var(--color-sage-50)] text-[var(--color-sage-500)] ring-[var(--color-sage-100)]',
  Officiel:    'bg-[var(--color-ink-900)] text-white ring-[var(--color-ink-900)]',
  Publication: 'bg-[var(--color-butter-50)] text-[var(--color-butter-300)] ring-[var(--color-butter-100)]',
  Facture:     'bg-[var(--color-mist-100)] text-[var(--color-mist-300)] ring-[var(--color-mist-100)]',
}

export default function DocumentsPage() {
  const [query, setQuery] = useState('')
  const filtered = DOCS.filter((d) => !query || d.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <DashboardLayout title="Documents" subtitle="Tous vos documents juridiques et factures.">
      <div className="mb-5 relative max-w-md">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-400)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un document…"
          className="input-base pl-10"
        />
      </div>

      <div className="bg-white rounded-2xl ring-1 ring-[var(--color-border)] overflow-hidden" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <table className="w-full">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.10em] text-[var(--color-ink-500)] font-semibold border-b border-[var(--color-border)] bg-[var(--color-bone-50)]">
              <th className="px-6 py-3.5">Document</th>
              <th className="px-6 py-3.5">Type</th>
              <th className="px-6 py-3.5 hidden md:table-cell">Société</th>
              <th className="px-6 py-3.5 hidden md:table-cell">Date</th>
              <th className="px-6 py-3.5 hidden lg:table-cell">Taille</th>
              <th className="px-6 py-3.5 text-right" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {filtered.map((d, i) => (
              <tr key={i} className="hover:bg-[var(--color-bone-50)] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[var(--color-bone-100)] ring-1 ring-[var(--color-border)] flex items-center justify-center shrink-0">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-700)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
                    </div>
                    <span className="font-semibold text-[13.5px] text-[var(--color-ink-900)]">{d.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full ring-1 px-2 py-0.5 text-[11px] font-semibold ${typeColors[d.type] || typeColors.Facture}`}>
                    {d.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-[13px] text-[var(--color-ink-700)] hidden md:table-cell">{d.company}</td>
                <td className="px-6 py-4 text-[13px] text-[var(--color-ink-700)] hidden md:table-cell">{d.date}</td>
                <td className="px-6 py-4 text-[13px] text-[var(--color-ink-500)] hidden lg:table-cell">{d.size}</td>
                <td className="px-6 py-4 text-right">
                  <button className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-[var(--color-ink-900)] hover:text-[var(--color-coral-600)] transition-colors">
                    Télécharger
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-[14px] text-[var(--color-ink-500)]">
                  Aucun document ne correspond à votre recherche.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
