import Link from 'next/link'
import { getAllCategories } from '@/lib/services'

const COMPANY_LINKS = [
  { label: 'À propos',    href: '/a-propos' },
  { label: 'Tarifs',      href: '/tarifs' },
  { label: 'Blog',        href: '/blog' },
  { label: 'Contact',     href: '/contact' },
]

const SUPPORT_LINKS = [
  { label: 'Centre d\'aide',  href: '/aide' },
  { label: 'Connexion',       href: '/login' },
  { label: 'Créer un compte', href: '/register' },
]

const LEGAL_LINKS = [
  { label: 'Mentions légales',  href: '/mentions-legales' },
  { label: 'Confidentialité',   href: '/confidentialite' },
  { label: 'CGV',               href: '/cgv' },
  { label: 'Cookies',           href: '/cookies' },
]

export default function Footer() {
  const categories = getAllCategories()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-ink-950)] text-white relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

      <div className="container-page py-16 lg:py-20 relative">
        {/* Newsletter */}
        <div className="rounded-3xl bg-white/[0.04] ring-1 ring-white/10 p-8 lg:p-10 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h3 className="heading-section text-[28px] lg:text-[32px]">
              Restez informé des évolutions juridiques
            </h3>
            <p className="text-white/55 mt-2 text-[14px]">
              Une newsletter mensuelle, sans spam, désinscription en 1 clic.
            </p>
          </div>
          <form className="lg:col-span-5 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="vous@entreprise.fr"
              className="flex-1 rounded-full bg-white/5 ring-1 ring-white/15 px-5 py-3 text-[14px] text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[var(--color-coral-400)]"
            />
            <button className="rounded-full bg-[var(--color-coral-500)] hover:bg-[var(--color-coral-600)] px-5 py-3 font-semibold text-[14px] whitespace-nowrap transition-colors" type="submit">
              S'inscrire
            </button>
          </form>
        </div>

        {/* Liens */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 mb-14">
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative h-9 w-9">
                <div className="absolute inset-0 rounded-[10px] bg-white" />
                <div className="absolute inset-0 flex items-center justify-center text-[var(--color-ink-900)] font-bold text-[15px]">
                  A
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[var(--color-coral-500)] ring-2 ring-[var(--color-ink-950)]" />
              </div>
              <span className="font-semibold text-[15px] tracking-tight">Académie Conseils</span>
            </Link>
            <p className="text-white/55 text-[14px] mt-5 max-w-xs leading-relaxed">
              La plateforme tout-en-un pour les formalités juridiques des entrepreneurs français.
            </p>
            <div className="flex gap-2 mt-6">
              {[
                { name: 'Twitter',   path: 'M22 5.92a8.3 8.3 0 01-2.36.65A4.13 4.13 0 0021.45 4a8.27 8.27 0 01-2.6 1 4.12 4.12 0 00-7.02 3.76A11.7 11.7 0 013 4.92a4.12 4.12 0 001.27 5.5 4.1 4.1 0 01-1.87-.5v.05a4.12 4.12 0 003.31 4.04 4.1 4.1 0 01-1.86.07 4.13 4.13 0 003.85 2.87A8.27 8.27 0 012 18.57 11.66 11.66 0 008.29 20.4c7.55 0 11.68-6.26 11.68-11.69v-.53A8.4 8.4 0 0022 5.92z' },
                { name: 'LinkedIn',  path: 'M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.34 17h-2.6V9.66h2.6V17zM7.04 8.52a1.51 1.51 0 110-3.02 1.51 1.51 0 010 3.02zM17 17h-2.6v-3.74c0-.89-.02-2.04-1.24-2.04-1.24 0-1.43.97-1.43 1.98V17h-2.6V9.66h2.49v1.01h.04c.35-.66 1.2-1.36 2.46-1.36 2.64 0 3.12 1.74 3.12 4v3.69z' },
                { name: 'Instagram', path: 'M12 2c2.72 0 3.06 0 4.12.06 1.06.05 1.79.22 2.43.47.66.25 1.22.6 1.78 1.16.56.56.9 1.12 1.16 1.78.25.64.42 1.37.47 2.43C22 8.94 22 9.28 22 12s0 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43-.25.66-.6 1.22-1.16 1.78-.56.56-1.12.9-1.78 1.16-.64.25-1.37.42-2.43.47C15.06 22 14.72 22 12 22s-3.06 0-4.12-.06c-1.06-.05-1.79-.22-2.43-.47-.66-.25-1.22-.6-1.78-1.16-.56-.56-.9-1.12-1.16-1.78-.25-.64-.42-1.37-.47-2.43C2 15.06 2 14.72 2 12s0-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.25-.66.6-1.22 1.16-1.78.56-.56 1.12-.9 1.78-1.16.64-.25 1.37-.42 2.43-.47C8.94 2 9.28 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.4-.7a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zM12 9.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5z' },
              ].map((s) => (
                <a key={s.name} href="#" className="h-9 w-9 rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 flex items-center justify-center transition-all" aria-label={s.name}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/80"><path d={s.path}/></svg>
                </a>
              ))}
            </div>
          </div>

          {categories.map((cat) => (
            <div key={cat.id} className="md:col-span-2">
              <h4 className="font-semibold text-[13px] mb-4 uppercase tracking-[0.08em] text-white/70">{cat.short}</h4>
              <ul className="space-y-2.5 text-[13.5px]">
                {cat.items.slice(0, 5).map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} className="text-white/55 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 2nd row : entreprise / support / légal */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pb-12 border-b border-white/10">
          <div>
            <h4 className="font-semibold text-[13px] mb-4 uppercase tracking-[0.08em] text-white/70">Entreprise</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-white/55 hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[13px] mb-4 uppercase tracking-[0.08em] text-white/70">Support</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-white/55 hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[13px] mb-4 uppercase tracking-[0.08em] text-white/70">Légal</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-white/55 hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bas */}
        <div className="pt-8 flex flex-col md:flex-row justify-between gap-4 text-[12.5px] text-white/45">
          <div>© {year} Académie Conseils · Tous droits réservés.</div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span>Paiement sécurisé via Stripe</span>
            <span>·</span>
            <span>Documents conformes au Code de commerce</span>
            <span>·</span>
            <span>RGPD</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
