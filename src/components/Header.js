'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getAllCategories } from '@/lib/services'

export default function Header() {
  const [open, setOpen] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const categories = getAllCategories()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-[var(--color-border)]'
          : 'bg-transparent'
      }`}
      onMouseLeave={() => setOpen(null)}
    >
      <div className="container-page">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <LogoMark />
            <span className="font-semibold text-[15px] tracking-tight text-[var(--color-ink-900)]">
              Académie Conseils
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onMouseEnter={() => setOpen(cat.id)}
                onFocus={() => setOpen(cat.id)}
                onClick={() => setOpen(open === cat.id ? null : cat.id)}
                className={`flex items-center gap-1 px-3 py-2 rounded-full text-[14px] font-medium transition-colors ${
                  open === cat.id
                    ? 'text-[var(--color-ink-900)] bg-[var(--color-bone-200)]'
                    : 'text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)] hover:bg-[var(--color-bone-200)]'
                }`}
              >
                {cat.short}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open === cat.id ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
            ))}
            <Link href="/tarifs" className="px-3 py-2 rounded-full text-[14px] font-medium text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)] hover:bg-[var(--color-bone-200)] transition-colors">
              Tarifs
            </Link>
            <Link href="/aide" className="px-3 py-2 rounded-full text-[14px] font-medium text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)] hover:bg-[var(--color-bone-200)] transition-colors">
              Aide
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/login" className="text-[14px] font-medium text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)] px-3 py-2">
              Connexion
            </Link>
            <Link href="/create-company" className="btn-accent text-[14px] py-2.5 px-5">
              Commencer
              <ArrowIcon />
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-[var(--color-bone-200)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <><path d="M3 6h18M3 12h18M3 18h18"/></>}
            </svg>
          </button>
        </div>

        {/* Mega menu */}
        {open && (
          <div
            className="absolute left-0 right-0 top-full bg-white border-t border-[var(--color-border)] shadow-[var(--shadow-lg)] animate-fade-up"
            onMouseEnter={() => setOpen(open)}
          >
            <div className="container-page py-10">
              {categories
                .filter((c) => c.id === open)
                .map((cat) => (
                  <div key={cat.id} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-4">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-coral-500)]">
                        {cat.short}
                      </div>
                      <h3 className="heading-section text-2xl text-[var(--color-ink-900)] mt-2">
                        {cat.label}
                      </h3>
                      <p className="text-[var(--color-ink-600)] mt-3 text-sm leading-relaxed">
                        {cat.description}
                      </p>
                      <Link
                        href={cat.href}
                        className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-[var(--color-ink-900)] hover:gap-2.5 transition-all"
                      >
                        Voir tout
                        <ArrowIcon />
                      </Link>
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-1">
                      {cat.items.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          className="group flex items-start justify-between gap-4 rounded-xl px-4 py-3 hover:bg-[var(--color-bone-100)] transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-[var(--color-ink-900)] text-[14px] group-hover:text-[var(--color-coral-600)] transition-colors">
                              {item.name}
                            </div>
                            <div className="text-[12.5px] text-[var(--color-ink-500)] mt-0.5 line-clamp-1">
                              {item.description}
                            </div>
                          </div>
                          {item.price && (
                            <span className="text-[11px] font-semibold text-[var(--color-ink-500)] whitespace-nowrap mt-0.5">
                              dès {item.price}€
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[var(--color-border)] py-3 space-y-0.5 bg-white max-h-[calc(100vh-72px)] overflow-y-auto">
            {categories.map((cat) => (
              <details key={cat.id} className="group">
                <summary className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[var(--color-bone-100)] cursor-pointer list-none">
                  <span className="font-medium text-[15px]">{cat.label}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-open:rotate-180 transition-transform"><path d="M6 9l6 6 6-6"/></svg>
                </summary>
                <div className="pl-6 py-1 space-y-0.5">
                  {cat.items.map((item) => (
                    <Link key={item.id} href={item.href} className="block px-4 py-2.5 rounded-lg text-[14px] text-[var(--color-ink-700)] hover:bg-[var(--color-bone-100)]">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
            <Link href="/tarifs" className="block px-4 py-3 rounded-xl hover:bg-[var(--color-bone-100)] font-medium text-[15px]">Tarifs</Link>
            <Link href="/aide" className="block px-4 py-3 rounded-xl hover:bg-[var(--color-bone-100)] font-medium text-[15px]">Aide</Link>
            <div className="px-2 pt-4 flex flex-col gap-2">
              <Link href="/login" className="btn-secondary w-full">Connexion</Link>
              <Link href="/create-company" className="btn-accent w-full">Commencer</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

function LogoMark() {
  return (
    <div className="relative h-9 w-9">
      <div className="absolute inset-0 rounded-[10px] bg-[var(--color-ink-900)]" />
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-[15px] tracking-tight">
        A
      </div>
      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[var(--color-coral-500)] ring-2 ring-[var(--color-bone-100)]" />
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </svg>
  )
}
