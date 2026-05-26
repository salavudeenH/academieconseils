'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

const CONVERSATIONS = [
  {
    id: 1,
    juriste: 'Sofia Martelli',
    role: 'Juriste · Cession',
    initials: 'SM',
    color: 'coral',
    subject: 'Cession de parts — Cosmo TVS',
    preview: "Bonjour, j'ai relu votre acte. Tout est conforme, vous pouvez le faire signer aux deux parties cette semaine.",
    time: 'il y a 2h',
    unread: true,
  },
  {
    id: 2,
    juriste: 'Mehdi Belkacem',
    role: 'Support · Modification',
    initials: 'MB',
    color: 'mist',
    subject: 'Transfert de siège — Studio Pollen',
    preview: 'Votre annonce légale a bien été publiée dans Les Échos. Voici la copie pour vos archives.',
    time: 'hier',
    unread: true,
  },
  {
    id: 3,
    juriste: 'Sofia Martelli',
    role: 'Juriste · Création',
    initials: 'SM',
    color: 'coral',
    subject: 'Création SAS — Renaud Conseil',
    preview: "Félicitations ! Votre Kbis vient d'arriver. Je l'ai déposé dans votre espace Documents.",
    time: 'il y a 1 semaine',
    unread: false,
  },
]

const colorMap = {
  coral:    'bg-[var(--color-coral-100)] text-[var(--color-coral-600)]',
  sage:     'bg-[var(--color-sage-100)] text-[var(--color-sage-500)]',
  lavender: 'bg-[var(--color-lavender-100)] text-[var(--color-lavender-300)]',
  mist:     'bg-[var(--color-mist-100)] text-[var(--color-mist-300)]',
}

export default function MessagesPage() {
  const [selected, setSelected] = useState(CONVERSATIONS[0])
  const [reply, setReply] = useState('')

  return (
    <DashboardLayout title="Messages" subtitle="Échangez en direct avec votre juriste dédié.">
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-4 h-[640px]">
        {/* Liste convs */}
        <div className="bg-white rounded-2xl ring-1 ring-[var(--color-border)] overflow-hidden flex flex-col" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <div className="p-3 border-b border-[var(--color-border)] relative">
            <svg className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--color-ink-400)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input
              placeholder="Rechercher…"
              className="w-full rounded-lg bg-[var(--color-bone-100)] pl-9 pr-3 py-2 text-[13px] focus:outline-none focus:ring-2 focus:ring-[var(--color-ink-900)]"
            />
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-[var(--color-border)]">
            {CONVERSATIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`w-full text-left p-4 transition-colors ${
                  selected?.id === c.id ? 'bg-[var(--color-bone-50)]' : 'hover:bg-[var(--color-bone-50)]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${colorMap[c.color]}`}>
                    {c.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-[13.5px] truncate text-[var(--color-ink-900)]">{c.juriste}</span>
                      {c.unread && <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-coral-500)] shrink-0" />}
                    </div>
                    <div className="text-[12px] font-medium text-[var(--color-ink-700)] truncate mt-0.5">{c.subject}</div>
                    <div className="text-[12px] text-[var(--color-ink-500)] truncate mt-0.5">{c.preview}</div>
                    <div className="text-[11px] text-[var(--color-ink-400)] mt-1.5">{c.time}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Conversation */}
        <div className="bg-white rounded-2xl ring-1 ring-[var(--color-border)] overflow-hidden flex flex-col" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <div className="p-4 border-b border-[var(--color-border)] flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-[12px] font-bold ${colorMap[selected.color]}`}>
              {selected.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[14.5px] text-[var(--color-ink-900)]">{selected.juriste}</div>
              <div className="text-[12px] text-[var(--color-ink-500)] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-sage-500)]" />
                En ligne · {selected.role}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[var(--color-bone-50)]/40">
            <div className="text-center text-[11px] font-semibold uppercase tracking-[0.10em] text-[var(--color-ink-500)]">Aujourd'hui</div>
            <div className="flex gap-2.5 max-w-md">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${colorMap[selected.color]}`}>
                {selected.initials}
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-white ring-1 ring-[var(--color-border)] px-4 py-3 text-[13.5px] text-[var(--color-ink-800)] leading-relaxed shadow-[var(--shadow-xs)]">
                {selected.preview}
              </div>
            </div>
            <div className="flex justify-end">
              <div className="rounded-2xl rounded-tr-sm bg-[var(--color-ink-900)] text-white px-4 py-3 text-[13.5px] max-w-md leading-relaxed">
                Merci ! Je vous prépare ça pour ce soir.
              </div>
            </div>
          </div>

          <form
            className="p-3 border-t border-[var(--color-border)] flex gap-2 bg-white"
            onSubmit={(e) => { e.preventDefault(); setReply('') }}
          >
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Écrivez votre message…"
              className="flex-1 rounded-full bg-[var(--color-bone-100)] px-4 py-2.5 text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[var(--color-ink-900)]"
            />
            <button type="submit" className="rounded-full bg-[var(--color-ink-900)] hover:bg-[var(--color-ink-800)] text-white font-semibold text-[13px] py-2.5 px-5 transition-colors">
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
