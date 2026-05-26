import { notFound } from 'next/navigation'
import FormalityFlow from '@/components/formality/FormalityFlow'
import { getFormality, getFormalitiesByCategory } from '@/lib/formalities/configs'

export async function generateStaticParams() {
  return getFormalitiesByCategory('cession').map((f) => ({ type: f.id }))
}

export async function generateMetadata({ params }) {
  const { type } = await params
  const f = getFormality('cession', type)
  if (!f) return {}
  return { title: `${f.name} — Académie Conseils`, description: f.description }
}

export default async function CessionPage({ params }) {
  const { type } = await params
  const formality = getFormality('cession', type)
  if (!formality) notFound()
  return <FormalityFlow formality={formality} />
}
