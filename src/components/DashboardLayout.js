'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

const NAV = [
  { href: '/dashboard',           label: 'Vue d\'ensemble', icon: 'home' },
  { href: '/dashboard/societes',  label: 'Mes sociétés',    icon: 'building' },
  { href: '/dashboard/dossiers',  label: 'Mes dossiers',    icon: 'folder' },
  { href: '/dashboard/documents', label: 'Documents',       icon: 'doc' },
  { href: '/dashboard/factures',  label: 'Factures',        icon: 'receipt' },
  { href: '/dashboard/messages',  label: 'Messages',        icon: 'chat' },
  { href: '/dashboard/profil',    label: 'Mon profil',      icon: 'user' },
]

export default function DashboardLayout({ children, title, subtitle, actions }) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Redirect si non connecté (après chargement de la session)
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=' + encodeURIComponent(pathname))
    }
  }, [status, pathname, router])

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-[var(--color-bone-50)] flex items-center justify-center text-[var(--color-ink-500)]">
        Chargement…
      </div>
    )
  }

  const user = session?.user
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.name || 'Utilisateur'
  const initials = fullName.split(' ').map((n) => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || 'AC'

  const logout = () => signOut({ callbackUrl: '/' })

  return (
    <div className="min-h-screen bg-[var(--color-bone-50)] flex">
      {/* Sidebar */}
      <aside className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-0 left-0 z-40 h-screen w-[260px] bg-white border-r border-[var(--color-border)] flex flex-col transition-transform`}>
        <div className="p-5 border-b border-[var(--color-border)]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-9 w-9">
              <div className="absolute inset-0 rounded-[10px] bg-[var(--color-ink-900)]" />
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-[15px]">A</div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[var(--color-coral-500)] ring-2 ring-white" />
            </div>
            <span className="font-semibold text-[14.5px] tracking-tight text-[var(--color-ink-900)]">Académie Conseils</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map((n) => {
            const active = pathname === n.href || (n.href !== '/dashboard' && pathname?.startsWith(n.href))
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-colors ${
                  active
                    ? 'bg-[var(--color-ink-900)] text-white'
                    : 'text-[var(--color-ink-700)] hover:bg-[var(--color-bone-100)] hover:text-[var(--color-ink-900)]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <SidebarIcon name={n.icon} active={active} />
                  {n.label}
                </span>
                {n.badge && (
                  <span className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full text-[10.5px] font-bold px-1.5 ${
                    active ? 'bg-[var(--color-coral-500)] text-white' : 'bg-[var(--color-coral-500)] text-white'
                  }`}>
                    {n.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-[var(--color-border)]">
          <Link
            href="/create-company"
            className="block w-full text-center bg-[var(--color-coral-500)] hover:bg-[var(--color-coral-600)] text-white rounded-xl font-semibold text-[13px] py-2.5 mb-3 transition-colors"
          >
            + Nouvelle formalité
          </Link>
          <div className="flex items-center gap-2.5 mb-2 px-2">
            <div className="h-9 w-9 rounded-full bg-[var(--color-coral-100)] text-[var(--color-coral-600)] flex items-center justify-center text-[11px] font-bold">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold truncate text-[var(--color-ink-900)]">{fullName}</div>
              <div className="text-[11.5px] text-[var(--color-ink-500)] truncate">{user?.email || ''}</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full text-[12.5px] py-2 px-3 rounded-lg hover:bg-[var(--color-bone-100)] text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)] transition-colors text-left flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Backdrop mobile */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar mobile */}
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-[var(--color-border)] px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 -ml-2 rounded-lg hover:bg-[var(--color-bone-100)]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <><path d="M3 6h18M3 12h18M3 18h18"/></>}
            </svg>
          </button>
          <div className="font-semibold text-[14px]">{title}</div>
          <div className="w-8" />
        </header>

        <main className="flex-1 px-5 py-7 lg:px-10 lg:py-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="min-w-0">
              <h1 className="heading-display text-[32px] md:text-[40px] text-[var(--color-ink-900)] leading-[1.05]">
                {title}
              </h1>
              {subtitle && <p className="text-[var(--color-ink-600)] mt-2 text-[15px]">{subtitle}</p>}
            </div>
            {actions && <div className="flex gap-2 flex-wrap">{actions}</div>}
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}

function SidebarIcon({ name, active }) {
  const stroke = active ? 'white' : 'var(--color-ink-700)'
  const props = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'home':     return <svg {...props}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2z"/></svg>
    case 'building': return <svg {...props}><path d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 7h2M9 11h2M9 15h2M13 7h2M13 11h2M13 15h2"/></svg>
    case 'folder':   return <svg {...props}><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
    case 'doc':      return <svg {...props}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
    case 'receipt':  return <svg {...props}><path d="M4 2v20l4-2 4 2 4-2 4 2V2L16 4l-4-2-4 2-4-2zM8 7h8M8 11h8M8 15h5"/></svg>
    case 'chat':     return <svg {...props}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    case 'user':     return <svg {...props}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    default: return null
  }
}
