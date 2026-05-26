import { notFound } from 'next/navigation'
import FormalityFlow from '@/components/formality/FormalityFlow'
import { getFormality, getFormalitiesByCategory } from '@/lib/formalities/configs'

export async function generateStaticParams() {
  return getFormalitiesByCategory('dissolution').map((f) => ({ type: f.id }))
}

export async function generateMetadata({ params }) {
  const { type } = await params
  const f = getFormality('dissolution', type)
  if (!f) return {}
  return { title: `${f.name} — Académie Conseils`, description: f.description }
}

export default async function DissolutionPage({ params }) {
  const { type } = await params
  const formality = getFormality('dissolution', type)
  if (!formality) notFound()
  return <FormalityFlow formality={formality} />
}
