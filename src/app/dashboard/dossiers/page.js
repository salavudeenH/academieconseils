'use client'

import Link from 'next/link'
import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

const DOSSIERS = [
  { id: 'cession-parts-1747846291', name: 'Cession de parts sociales', company: 'Cosmo TVS',      formality: 'Cession',      status: 'En cours',             statusColor: 'butter', date: '18 mai 2026',  progress: 60 },
  { id: 'modif-siege-1746431098',   name: 'Transfert de siège social', company: 'Studio Pollen',  formality: 'Modification', status: 'Terminé',              statusColor: 'sage',   date: '5 mai 2026',   progress: 100 },
  { id: 'creation-sas-1745098712',  name: 'Création SAS',              company: 'Renaud Conseil', formality: 'Création',     status: 'Terminé',              statusColor: 'sage',   date: '21 avr. 2026', progress: 100 },
  { id: 'dissolution-1744123456',   name: 'Dissolution',               company: 'Ancienne SCI',   formality: 'Dissolution',  status: 'En attente paiement',  statusColor: 'coral',  date: '15 avr. 2026', progress: 20 },
]

const statusColors = {
  butter: 'bg-[var(--color-butter-50)] text-[var(--color-butter-300)] ring-[var(--color-butter-100)]',
  sage:   'bg-[var(--color-sage-50)] text-[var(--color-sage-500)] ring-[var(--color-sage-100)]',
  coral:  'bg-[var(--color-coral-50)] text-[var(--color-coral-600)] ring-[var(--color-coral-100)]',
}

export default function DossiersPage() {
  const [filter, setFilter] = useState('all')
  const filtered = DOSSIERS.filter((d) => filter === 'all' || d.formality.toLowerCase() === filter)

  return (
    <DashboardLayout title="Mes dossiers" subtitle="Suivez l'avancement de toutes vos formalités.">
      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
        {[
          { id: 'all',         label: 'Tous',          count: DOSSIERS.length },
          { id: 'création',    label: 'Création',      count: DOSSIERS.filter((d) => d.formality === 'Création').length },
          { id: 'modification',label: 'Modification',  count: DOSSIERS.filter((d) => d.formality === 'Modification').length },
          { id: 'cession',     label: 'Cession',       count: DOSSIERS.filter((d) => d.formality === 'Cession').length },
          { id: 'dissolution', label: 'Dissolution',   count: DOSSIERS.filter((d) => d.formality === 'Dissolution').length },
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

      <div className="space-y-3">
        {filtered.map((d) => (
          <Link
            key={d.id}
            href={`/dashboard/dossiers/${d.id}`}
            className="block rounded-2xl bg-white ring-1 ring-[var(--color-border)] hover:ring-[var(--color-border-strong)] hover:-translate-y-px transition-all p-5"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-[var(--color-bone-100)] ring-1 ring-[var(--color-border)] flex items-center justify-center text-[11px] font-bold text-[var(--color-ink-700)] tracking-tight shrink-0">
                {d.formality.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-semibold text-[14.5px] text-[var(--color-ink-900)]">{d.name}</span>
                  <span className="text-[12.5px] text-[var(--color-ink-500)]">· {d.company}</span>
                </div>
                <div className="text-[12px] text-[var(--color-ink-500)] mt-0.5">{d.formality} · démarré le {d.date}</div>
                <div className="mt-3 flex items-center gap-3 max-w-md">
                  <div className="flex-1 h-1.5 rounded-full bg-[var(--color-bone-200)] overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${d.progress === 100 ? 'bg-[var(--color-sage-500)]' : 'bg-[var(--color-coral-500)]'}`} style={{ width: `${d.progress}%` }} />
                  </div>
                  <span className="text-[11px] font-bold tabular-nums text-[var(--color-ink-700)] w-9 text-right">{d.progress}%</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`inline-flex rounded-full ring-1 px-2.5 py-0.5 text-[11px] font-semibold ${statusColors[d.statusColor]}`}>
                  {d.status}
                </span>
                <svg className="text-[var(--color-ink-400)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-2xl bg-white ring-1 ring-[var(--color-border)] p-10 text-center">
            <p className="text-[14px] text-[var(--color-ink-500)]">Aucun dossier dans cette catégorie.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
