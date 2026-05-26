import { notFound } from 'next/navigation'
import FormalityFlow from '@/components/formality/FormalityFlow'
import { getFormality, getFormalitiesByCategory } from '@/lib/formalities/configs'

export async function generateStaticParams() {
  return getFormalitiesByCategory('creation').map((f) => ({ type: f.id }))
}

export async function generateMetadata({ params }) {
  const { type } = await params
  const f = getFormality('creation', type)
  if (!f) return {}
  return { title: `Créer une ${f.name} — Académie Conseils`, description: f.description }
}

export default async function CreateCompanyTypePage({ params }) {
  const { type } = await params
  const formality = getFormality('creation', type)
  if (!formality) notFound()
  return <FormalityFlow formality={formality} />
}
