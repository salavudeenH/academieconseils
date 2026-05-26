'use client'

import DashboardLayout from '@/components/DashboardLayout'

const FACTURES = [
  { num: '2026-0521', date: '21 mai 2026',  label: 'Cession de parts sociales', company: 'Cosmo TVS',       amount: 149, status: 'Payée',     statusColor: 'sage' },
  { num: '2026-0505', date: '5 mai 2026',   label: 'Transfert de siège social', company: 'Studio Pollen',   amount: 129, status: 'Payée',     statusColor: 'sage' },
  { num: '2026-0421', date: '21 avr. 2026', label: 'Création SAS',              company: 'Renaud Conseil',  amount: 199, status: 'Payée',     statusColor: 'sage' },
]

const statusColors = {
  sage:   'bg-[var(--color-sage-50)] text-[var(--color-sage-500)] ring-[var(--color-sage-100)]',
  butter: 'bg-[var(--color-butter-50)] text-[var(--color-butter-300)] ring-[var(--color-butter-100)]',
  coral:  'bg-[var(--color-coral-50)] text-[var(--color-coral-600)] ring-[var(--color-coral-100)]',
}

export default function FacturesPage() {
  const total = FACTURES.reduce((s, f) => s + f.amount, 0)

  return (
    <DashboardLayout title="Factures" subtitle="Historique de vos paiements.">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)] rounded-2xl overflow-hidden ring-1 ring-[var(--color-border)] mb-8">
        <div className="bg-white p-5 lg:p-6">
          <div className="text-[11px] uppercase tracking-[0.10em] text-[var(--color-ink-500)] font-semibold">Total payé</div>
          <div className="mt-2 text-[32px] font-bold tracking-[-0.04em] text-[var(--color-ink-900)] leading-none">{total} <span className="text-[20px] text-[var(--color-ink-700)]">€</span></div>
          <div className="mt-2 text-[11.5px] text-[var(--color-ink-500)]">depuis l'ouverture du compte</div>
        </div>
        <div className="bg-white p-5 lg:p-6">
          <div className="text-[11px] uppercase tracking-[0.10em] text-[var(--color-ink-500)] font-semibold">Factures</div>
          <div className="mt-2 text-[32px] font-bold tracking-[-0.04em] text-[var(--color-ink-900)] leading-none">{FACTURES.length}</div>
          <div className="mt-2 text-[11.5px] text-[var(--color-ink-500)]">toutes acquittées</div>
        </div>
        <div className="bg-white p-5 lg:p-6">
          <div className="text-[11px] uppercase tracking-[0.10em] text-[var(--color-ink-500)] font-semibold">En attente</div>
          <div className="mt-2 text-[32px] font-bold tracking-[-0.04em] text-[var(--color-ink-900)] leading-none">0 <span className="text-[20px] text-[var(--color-ink-700)]">€</span></div>
          <div className="mt-2 text-[11.5px] text-[var(--color-ink-500)]">aucun impayé</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl ring-1 ring-[var(--color-border)] overflow-hidden" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <table className="w-full">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.10em] text-[var(--color-ink-500)] font-semibold border-b border-[var(--color-border)] bg-[var(--color-bone-50)]">
              <th className="px-6 py-3.5">N° facture</th>
              <th className="px-6 py-3.5 hidden md:table-cell">Date</th>
              <th className="px-6 py-3.5">Prestation</th>
              <th className="px-6 py-3.5 text-right">Montant</th>
              <th className="px-6 py-3.5">Statut</th>
              <th className="px-6 py-3.5 text-right" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {FACTURES.map((f) => (
              <tr key={f.num} className="hover:bg-[var(--color-bone-50)] transition-colors">
                <td className="px-6 py-4 font-mono text-[13px] text-[var(--color-ink-700)]">#{f.num}</td>
                <td className="px-6 py-4 text-[13px] text-[var(--color-ink-700)] hidden md:table-cell">{f.date}</td>
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
                <td className="px-6 py-4 text-right">
                  <button className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-[var(--color-ink-900)] hover:text-[var(--color-coral-600)] transition-colors">
                    PDF
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
