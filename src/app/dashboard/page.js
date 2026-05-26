'use client'

import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'

const RECENT_DOSSIERS = [
  { id: 'cession-parts-1747846291',   name: 'Cession de parts sociales',  company: 'Cosmo TVS',       status: 'En cours',  statusColor: 'butter', date: '18 mai 2026',  formality: 'Cession' },
  { id: 'modif-siege-1746431098',     name: 'Transfert de siège social',  company: 'Studio Pollen',   status: 'Terminé',   statusColor: 'sage',   date: '5 mai 2026',   formality: 'Modification' },
  { id: 'creation-sas-1745098712',    name: 'Création SAS',               company: 'Renaud Conseil',  status: 'Terminé',   statusColor: 'sage',   date: '21 avr. 2026', formality: 'Création' },
]

const statusColors = {
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
  return (
    <DashboardLayout
      title="Bonjour, Marie"
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
          { label: 'Sociétés',       value: '3',  delta: '+1 ce mois',  trend: 'up' },
          { label: 'Dossiers en cours', value: '1', delta: 'Cession',     trend: 'flat' },
          { label: 'Documents',     value: '24', delta: '+3 cette semaine', trend: 'up' },
          { label: 'Messages',      value: '2',  delta: '2 non lus',     trend: 'flat' },
        ].map((s) => (
          <div key={s.label} className="bg-white p-5 lg:p-6">
            <div className="text-[11px] uppercase tracking-[0.10em] text-[var(--color-ink-500)] font-semibold">{s.label}</div>
            <div className="mt-2 text-[32px] font-bold tracking-[-0.04em] text-[var(--color-ink-900)] leading-none">
              {s.value}
            </div>
            <div className="mt-2 text-[11.5px] text-[var(--color-ink-500)] inline-flex items-center gap-1">
              {s.trend === 'up' && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-sage-500)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 7l-9.2 9.2M17 7v10M17 7H7"/></svg>}
              {s.delta}
            </div>
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
          <div className="divide-y divide-[var(--color-border)]">
            {RECENT_DOSSIERS.map((d) => (
              <Link
                key={d.id}
                href={`/dashboard/dossiers`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-[var(--color-bone-50)] transition-colors group"
              >
                <div className="h-10 w-10 rounded-xl bg-[var(--color-bone-100)] flex items-center justify-center text-[11px] font-bold tracking-tight text-[var(--color-ink-700)] ring-1 ring-[var(--color-border)]">
                  {d.formality.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[14px] text-[var(--color-ink-900)] truncate group-hover:text-[var(--color-coral-600)] transition-colors">
                    {d.name}
                  </div>
                  <div className="text-[12px] text-[var(--color-ink-500)] mt-0.5">
                    {d.company} · {d.date}
                  </div>
                </div>
                <span className={`inline-flex rounded-full ring-1 px-2.5 py-0.5 text-[11px] font-semibold ${statusColors[d.statusColor]}`}>
                  {d.status}
                </span>
              </Link>
            ))}
          </div>
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

      {/* Astuce */}
      <div className="mt-8 relative overflow-hidden rounded-[24px] bg-[var(--color-ink-900)] text-white p-8 lg:p-10">
        <div aria-hidden className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[var(--color-coral-500)] opacity-25 blur-[80px]" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26A7 7 0 0012 2z"/></svg>
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-coral-300)]">Astuce du jour</div>
            <h3 className="font-bold text-[18px] mt-1.5">Téléchargez votre Kbis dès qu'il est disponible</h3>
            <p className="text-[13.5px] text-white/65 mt-1 leading-relaxed">
              Vous trouvez votre extrait Kbis dans la section Documents dès qu'il
              nous est notifié par le greffe — généralement sous 48h.
            </p>
          </div>
          <Link href="/aide" className="rounded-full bg-white text-[var(--color-ink-900)] font-semibold text-[13px] py-2.5 px-5 hover:bg-white/90 transition-colors whitespace-nowrap">
            En savoir plus
          </Link>
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
