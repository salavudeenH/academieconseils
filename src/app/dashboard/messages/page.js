'use client'

import Link from 'next/link'
import DashboardLayout from '@/components/DashboardLayout'

export default function MessagesPage() {
  return (
    <DashboardLayout title="Messages" subtitle="Échangez en direct avec notre équipe juriste.">
      <div className="rounded-[24px] bg-white ring-1 ring-[var(--color-border)] p-12 lg:p-16 text-center" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-bone-100)] ring-1 ring-[var(--color-border)] mb-5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-700)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        </div>

        <h2 className="heading-section text-[24px] text-[var(--color-ink-900)]">
          Aucun message pour l'instant
        </h2>
        <p className="mt-3 text-[14.5px] text-[var(--color-ink-600)] max-w-md mx-auto leading-relaxed">
          Lorsque vous démarrez une formalité, un juriste vous accompagne ici.
          Pour toute question immédiate, utilisez le chat ou contactez-nous directement.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact" className="btn-primary text-[13px]">
            Contacter un juriste
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
          <Link href="/aide" className="btn-secondary text-[13px]">
            Centre d'aide
          </Link>
        </div>

        <div className="mt-10 pt-8 border-t border-[var(--color-border)] grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
          <div className="p-4 rounded-xl bg-[var(--color-bone-50)]">
            <div className="text-[11px] font-bold uppercase tracking-[0.10em] text-[var(--color-coral-600)]">Chat</div>
            <div className="text-[13.5px] font-semibold text-[var(--color-ink-900)] mt-1">Sous 5 minutes</div>
            <div className="text-[12px] text-[var(--color-ink-500)] mt-0.5">Lun-Dim 8h-22h</div>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bone-50)]">
            <div className="text-[11px] font-bold uppercase tracking-[0.10em] text-[var(--color-coral-600)]">Email</div>
            <div className="text-[13.5px] font-semibold text-[var(--color-ink-900)] mt-1">Sous 1h</div>
            <div className="text-[12px] text-[var(--color-ink-500)] mt-0.5">contact@academie-conseils.fr</div>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-bone-50)]">
            <div className="text-[11px] font-bold uppercase tracking-[0.10em] text-[var(--color-coral-600)]">Téléphone</div>
            <div className="text-[13.5px] font-semibold text-[var(--color-ink-900)] mt-1">7j/7</div>
            <div className="text-[12px] text-[var(--color-ink-500)] mt-0.5">01 23 45 67 89</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
