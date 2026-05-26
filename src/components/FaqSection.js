'use client'

import { useState } from 'react'
import Link from 'next/link'

const FAQS = [
  {
    q: 'Combien de temps pour créer ma société ?',
    a: "Vous remplissez le formulaire en 10 à 15 minutes. Vos statuts sont générés instantanément. L'immatriculation au RCS prend ensuite 24 à 72h selon le greffe.",
  },
  {
    q: 'Quels documents vais-je recevoir ?',
    a: "Statuts personnalisés (PDF signable), attestation de dépôt de capital, justificatif d'annonce légale, formulaire M0 prérempli, et après immatriculation : extrait Kbis et SIREN.",
  },
  {
    q: 'Que se passe-t-il après le paiement ?',
    a: "Un espace client sécurisé est automatiquement créé. Vous y retrouvez tous vos documents, suivez l'avancement de votre dossier et pouvez échanger avec nos juristes.",
  },
  {
    q: 'Puis-je modifier ma société plus tard ?',
    a: "Oui, depuis votre espace client, vous lancez en quelques clics tout type de modification : transfert de siège, changement de gérant, augmentation de capital, etc.",
  },
  {
    q: "Comment se passe une cession de parts ?",
    a: "Vous indiquez le cédant, le cessionnaire, le nombre de parts et le prix. Nous générons l'acte de cession, gérons l'agrément des associés et l'enregistrement aux impôts.",
  },
  {
    q: "Dois-je signer un contrat d'engagement ?",
    a: "Non, aucune obligation d'engagement. Vous payez votre formalité une fois, sans abonnement ni frais récurrents.",
  },
  {
    q: 'Vos documents sont-ils opposables ?',
    a: "Oui. Nos modèles sont rédigés par des juristes spécialisés et conformes au Code de commerce. Ils sont acceptés par tous les greffes et l'INPI.",
  },
  {
    q: 'Proposez-vous un accompagnement humain ?',
    a: "Oui, par chat, email ou téléphone — 7j/7. Avec l'offre Premium, vous bénéficiez en plus d'un rendez-vous personnalisé avec un juriste.",
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">Questions fréquentes</span>
            <h2 className="heading-display text-[40px] md:text-[52px] text-[var(--color-ink-900)] mt-4">
              On a sûrement<br /><em>déjà la réponse.</em>
            </h2>
            <p className="mt-5 text-[15px] text-[var(--color-ink-600)] leading-relaxed">
              Une autre interrogation ? Notre équipe juriste répond en moins de
              5 minutes en moyenne, du lundi au dimanche.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <Link href="/contact" className="btn-primary inline-flex w-fit">
                Contacter un juriste
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/aide" className="btn-ghost inline-flex w-fit -ml-3">
                Centre d'aide complet
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8 divide-y divide-[var(--color-border)] border-t border-b border-[var(--color-border)]">
            {FAQS.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full py-5 text-left flex items-center justify-between gap-4 group"
                  >
                    <span className={`text-[16px] font-semibold transition-colors ${isOpen ? 'text-[var(--color-ink-900)]' : 'text-[var(--color-ink-800)] group-hover:text-[var(--color-ink-900)]'}`}>
                      {item.q}
                    </span>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1 transition-all ${
                      isOpen
                        ? 'bg-[var(--color-ink-900)] text-white ring-[var(--color-ink-900)] rotate-45'
                        : 'bg-white text-[var(--color-ink-700)] ring-[var(--color-border)] group-hover:ring-[var(--color-ink-400)]'
                    }`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pb-5 pr-12 text-[14.5px] text-[var(--color-ink-600)] leading-relaxed animate-fade-up">
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
