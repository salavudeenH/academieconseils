'use client'

import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'

const SOCIETES = [
  { id: '1', name: 'Studio Pollen',  form: 'SAS',  siren: '912 345 678', capital: 10000, ville: 'Paris',     activity: 'Studio créatif' },
  { id: '2', name: 'Renaud Conseil', form: 'EURL', siren: '824 567 890', capital: 5000,  ville: 'Lyon',      activity: 'Conseil B2B' },
  { id: '3', name: 'Cosmo TVS',      form: 'SARL', siren: '756 123 098', capital: 25000, ville: 'Marseille', activity: 'Services techniques' },
]

const formColors = {
  SAS:  'bg-[var(--color-coral-50)] text-[var(--color-coral-600)] ring-[var(--color-coral-100)]',
  EURL: 'bg-[var(--color-sage-50)] text-[var(--color-sage-500)] ring-[var(--color-sage-100)]',
  SARL: 'bg-[var(--color-lavender-50)] text-[var(--color-lavender-300)] ring-[var(--color-lavender-100)]',
  SASU: 'bg-[var(--color-butter-50)] text-[var(--color-butter-300)] ring-[var(--color-butter-100)]',
  SCI:  'bg-[var(--color-mist-100)] text-[var(--color-mist-300)] ring-[var(--color-mist-100)]',
}

export default function MesSocietesPage() {
  return (
    <DashboardLayout
      title="Mes sociétés"
      subtitle="Toutes les sociétés rattachées à votre compte."
      actions={<Link href="/create-company" className="btn-accent text-[13px] py-2.5 px-5">+ Nouvelle société</Link>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SOCIETES.map((s) => (
          <div key={s.id} className="rounded-[20px] bg-white ring-1 ring-[var(--color-border)] hover:ring-[var(--color-border-strong)] hover:-translate-y-1 transition-all p-6" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <div className="flex items-start justify-between">
              <div className="h-12 w-12 rounded-xl bg-[var(--color-ink-900)] text-white flex items-center justify-center text-[14px] font-bold tracking-tight">
                {s.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </div>
              <span className={`inline-flex rounded-full ring-1 px-2.5 py-0.5 text-[11px] font-semibold tracking-tight ${formColors[s.form] || formColors.SAS}`}>
                {s.form}
              </span>
            </div>
            <h3 className="mt-5 font-bold text-[18px] text-[var(--color-ink-900)] tracking-tight">{s.name}</h3>
            <div className="text-[12.5px] text-[var(--color-ink-500)] mt-0.5">{s.activity}</div>

            <dl className="mt-5 space-y-2 text-[13px]">
              <div className="flex justify-between"><dt className="text-[var(--color-ink-500)]">SIREN</dt><dd className="font-mono text-[var(--color-ink-700)]">{s.siren}</dd></div>
              <div className="flex justify-between"><dt className="text-[var(--color-ink-500)]">Capital</dt><dd className="font-semibold text-[var(--color-ink-900)]">{s.capital.toLocaleString('fr-FR')} €</dd></div>
              <div className="flex justify-between"><dt className="text-[var(--color-ink-500)]">Ville</dt><dd className="text-[var(--color-ink-700)]">{s.ville}</dd></div>
            </dl>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <Link href={`/dashboard/societes/${s.id}`} className="text-center rounded-full bg-[var(--color-bone-100)] hover:bg-[var(--color-bone-200)] text-[var(--color-ink-900)] text-[12.5px] font-semibold py-2 transition-colors">
                Détails
              </Link>
              <Link href="/services/modification" className="text-center rounded-full bg-[var(--color-ink-900)] hover:bg-[var(--color-ink-800)] text-white text-[12.5px] font-semibold py-2 transition-colors">
                Modifier
              </Link>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
