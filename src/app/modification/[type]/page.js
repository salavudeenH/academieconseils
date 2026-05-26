import { notFound } from 'next/navigation'
import FormalityFlow from '@/components/formality/FormalityFlow'
import { getFormality, getFormalitiesByCategory } from '@/lib/formalities/configs'

export async function generateStaticParams() {
  return getFormalitiesByCategory('modification').map((f) => ({ type: f.id }))
}

export async function generateMetadata({ params }) {
  const { type } = await params
  const f = getFormality('modification', type)
  if (!f) return {}
  return { title: `${f.name} — Académie Conseils`, description: f.description }
}

export default async function ModificationPage({ params }) {
  const { type } = await params
  const formality = getFormality('modification', type)
  if (!formality) notFound()
  return <FormalityFlow formality={formality} />
}
