'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'

const CATEGORY_LABELS = { creation: 'Création', modification: 'Modification', cession: 'Cession', dissolution: 'Dissolution' }

const STATUS_INFO = {
  PAID:                { label: 'Payée',          color: 'sage' },
  COMPLETED:           { label: 'Payée',          color: 'sage' },
  FILED_TO_REGISTRY:   { label: 'Payée',          color: 'sage' },
  DOCUMENTS_GENERATED: { label: 'Payée',          color: 'sage' },
  IN_REVIEW:           { label: 'Payée',          color: 'sage' },
  PENDING_PAYMENT:     { label: 'En attente',     color: 'butter' },
  CANCELLED:           { label: 'Annulée',        color: 'coral' },
  FAILED:              { label: 'Échec',          color: 'coral' },
}

const statusColors = {
  sage:   'bg-[var(--color-sage-50)] text-[var(--color-sage-500)] ring-[var(--color-sage-100)]',
  butter: 'bg-[var(--color-butter-50)] text-[var(--color-butter-300)] ring-[var(--color-butter-100)]',
  coral:  'bg-[var(--color-coral-50)] text-[var(--color-coral-600)] ring-[var(--color-coral-100)]',
}

export default function FacturesPage() {
  const [formalities, setFormalities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/formality')
      .then((r) => r.json())
      .then((j) => { if (j.success) setFormalities(j.formalities || []) })
      .finally(() => setLoading(false))
  }, [])

  // Une facture par formalité
  const factures = useMemo(() => formalities.map((f, i) => {
    const date = new Date(f.createdAt)
    const num = date.toISOString().slice(0, 10).replace(/-/g, '') + '-' + String(i + 1).padStart(3, '0')
    const info = STATUS_INFO[f.status] || STATUS_INFO.PENDING_PAYMENT
    return {
      id: f.id,
      num,
      date,
      label: `${CATEGORY_LABELS[f.category] || f.category} · ${f.type}`,
      company: f.data?.companyName || f.data?.cedantNom || '—',
      amount: f.price,
      status: info.label,
      statusColor: info.color,
      isPaid: ['PAID', 'COMPLETED', 'FILED_TO_REGISTRY', 'DOCUMENTS_GENERATED', 'IN_REVIEW'].includes(f.status),
    }
  }), [formalities])

  const totalPaye = factures.filter((f) => f.isPaid).reduce((s, f) => s + f.amount, 0)
  const totalEnAttente = factures.filter((f) => !f.isPaid).reduce((s, f) => s + f.amount, 0)
  const nbFactures = factures.length

  return (
    <DashboardLayout title="Factures" subtitle="Historique de vos paiements.">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)] rounded-2xl overflow-hidden ring-1 ring-[var(--color-border)] mb-8">
        <div className="bg-white p-5 lg:p-6">
          <div className="text-[11px] uppercase tracking-[0.10em] text-[var(--color-ink-500)] font-semibold">Total payé</div>
          <div className="mt-2 text-[32px] font-bold tracking-[-0.04em] text-[var(--color-ink-900)] leading-none">
            {loading ? '—' : totalPaye} <span className="text-[20px] text-[var(--color-ink-700)]">€</span>
          </div>
          <div className="mt-2 text-[11.5px] text-[var(--color-ink-500)]">depuis l'ouverture du compte</div>
        </div>
        <div className="bg-white p-5 lg:p-6">
          <div className="text-[11px] uppercase tracking-[0.10em] text-[var(--color-ink-500)] font-semibold">Factures</div>
          <div className="mt-2 text-[32px] font-bold tracking-[-0.04em] text-[var(--color-ink-900)] leading-none">{loading ? '—' : nbFactures}</div>
          <div className="mt-2 text-[11.5px] text-[var(--color-ink-500)]">{factures.filter((f) => f.isPaid).length} acquittées</div>
        </div>
        <div className="bg-white p-5 lg:p-6">
          <div className="text-[11px] uppercase tracking-[0.10em] text-[var(--color-ink-500)] font-semibold">En attente</div>
          <div className="mt-2 text-[32px] font-bold tracking-[-0.04em] text-[var(--color-ink-900)] leading-none">
            {loading ? '—' : totalEnAttente} <span className="text-[20px] text-[var(--color-ink-700)]">€</span>
          </div>
          <div className="mt-2 text-[11.5px] text-[var(--color-ink-500)]">{factures.filter((f) => !f.isPaid).length} à régler</div>
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl bg-white ring-1 ring-[var(--color-border)] p-10 text-center text-[14px] text-[var(--color-ink-500)]">
          Chargement…
        </div>
      ) : factures.length === 0 ? (
        <div className="rounded-2xl bg-white ring-1 ring-[var(--color-border)] p-12 text-center">
          <p className="text-[14px] text-[var(--color-ink-500)]">Aucune facture pour le moment.</p>
          <Link href="/create-company" className="btn-primary mt-6 text-[13px] inline-flex">
            Démarrer ma première formalité
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl ring-1 ring-[var(--color-border)] overflow-hidden" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <table className="w-full">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-[0.10em] text-[var(--color-ink-500)] font-semibold border-b border-[var(--color-border)] bg-[var(--color-bone-50)]">
                <th className="px-6 py-3.5">N° facture</th>
                <th className="px-6 py-3.5 hidden md:table-cell">Date</th>
                <th className="px-6 py-3.5">Prestation</th>
                <th className="px-6 py-3.5 text-right">Montant</th>
                <th className="px-6 py-3.5">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {factures.map((f) => (
                <tr key={f.id} className="hover:bg-[var(--color-bone-50)] transition-colors">
                  <td className="px-6 py-4 font-mono text-[13px] text-[var(--color-ink-700)]">#{f.num}</td>
                  <td className="px-6 py-4 text-[13px] text-[var(--color-ink-700)] hidden md:table-cell">{f.date.toLocaleDateString('fr-FR')}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-[13.5px] text-[var(--color-ink-900)]">{f.label}</div>
                    <div className="text-[12px] text-[var(--color-ink-500)]">{f.company}</div>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-[14px] text-[var(--color-ink-900)] tabular-nums">{f.amount}€</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full ring-1 px-2.5 py-0.5 text-[11px] font-semibold ${statusColors[f.statusColor]}`}>
                      {f.status}
                    </span>
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
