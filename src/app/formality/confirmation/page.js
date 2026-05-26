'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ConfirmationPage() {
  const params = useSearchParams()
  const id = params.get('id')
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const pdfUrl = id ? `/documents/${id}.pdf` : null

  return (
    <div className="min-h-screen bg-[var(--color-bone-50)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-[var(--color-sage-100)] opacity-50 blur-[100px]" />
        <div className="absolute inset-0 bg-noise opacity-30" />
      </div>

      <div className="relative max-w-xl w-full">
        <Link href="/" className="inline-flex items-center gap-2.5 mb-8">
          <div className="relative h-9 w-9">
            <div className="absolute inset-0 rounded-[10px] bg-[var(--color-ink-900)]" />
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-[15px]">A</div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[var(--color-coral-500)] ring-2 ring-[var(--color-bone-50)]" />
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-[var(--color-ink-900)]">Académie Conseils</span>
        </Link>

        <div className="bg-white rounded-[28px] ring-1 ring-[var(--color-border)] p-10 lg:p-12 shadow-[var(--shadow-md)]">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-sage-100)] mb-6">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-sage-500)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7"/>
            </svg>
          </div>

          <span className="eyebrow">Demande reçue</span>
          <h1 className="heading-display text-[40px] md:text-[52px] text-[var(--color-ink-900)] mt-3 leading-[1.02]">
            Votre dossier<br /><em>est en route.</em>
          </h1>
          <p className="mt-5 text-[15px] text-[var(--color-ink-600)] leading-relaxed">
            Nos juristes vérifient votre dossier et reviennent vers vous sous 24h.
            Vous recevez aussi une copie par email avec tous vos documents.
          </p>

          {mounted && id && (
            <div className="mt-8 rounded-2xl bg-[var(--color-bone-50)] ring-1 ring-[var(--color-border)] p-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.10em] text-[var(--color-ink-500)]">
                Référence dossier
              </div>
              <div className="font-mono text-[13px] mt-1.5 text-[var(--color-ink-900)] break-all">{id}</div>
            </div>
          )}

          {/* Prochaines étapes */}
          <div className="mt-8 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-[0.10em] text-[var(--color-ink-500)]">
              Prochaines étapes
            </div>
            {[
              { n: '01', label: 'Vérification par un juriste', delay: 'sous 24h' },
              { n: '02', label: 'Signature de vos documents',   delay: 'à votre rythme' },
              { n: '03', label: 'Dépôt au greffe',              delay: '48 à 72h' },
              { n: '04', label: 'Réception du Kbis',            delay: 'par email' },
            ].map((s) => (
              <div key={s.n} className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-bone-50)] ring-1 ring-[var(--color-border)]">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-[var(--color-border)] text-[10.5px] font-bold text-[var(--color-ink-700)]">
                  {s.n}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[13.5px] text-[var(--color-ink-900)]">{s.label}</div>
                </div>
                <span className="text-[11px] text-[var(--color-ink-500)] shrink-0">{s.delay}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {pdfUrl && (
              <a href={pdfUrl} target="_blank" rel="noopener" className="btn-primary flex-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                Télécharger le document
              </a>
            )}
            <Link href="/dashboard" className="btn-secondary flex-1 sm:flex-none">
              Accéder à mon espace
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-[12.5px] text-[var(--color-ink-500)]">
          Une question ?{' '}
          <a href="mailto:contact@academie-conseils.fr" className="font-semibold text-[var(--color-ink-900)] underline underline-offset-2 hover:text-[var(--color-coral-600)]">
            contact@academie-conseils.fr
          </a>
        </p>
      </div>
    </div>
  )
}
