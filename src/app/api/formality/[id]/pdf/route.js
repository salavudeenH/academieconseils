import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { getFormality } from '@/lib/formalities/configs'
import { generateFormalityPdfBuffer, buildFilename } from '@/lib/formality-pdf'

/**
 * GET /api/formality/[id]/pdf
 * Génère et stream le PDF de la formalité à la demande.
 * Vérifie que l'utilisateur connecté est bien le propriétaire.
 */
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 })
    }

    const { id } = await params

    // Récupère la formalité ET vérifie qu'elle appartient bien à l'user
    const record = await prisma.formality.findFirst({
      where: { id, userId: session.user.id },
    })

    if (!record) {
      return NextResponse.json({ success: false, error: 'Formalité introuvable' }, { status: 404 })
    }

    const formality = getFormality(record.category, record.type)
    if (!formality) {
      return NextResponse.json({ success: false, error: 'Type de formalité inconnu' }, { status: 400 })
    }

    // Génération à la volée
    const pdfBuffer = await generateFormalityPdfBuffer(formality, record.data)
    const filename = buildFilename(formality, record.data)

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, no-store',
      },
    })
  } catch (e) {
    console.error('PDF generation error:', e)
    return NextResponse.json({ success: false, error: 'Erreur lors de la génération du PDF.' }, { status: 500 })
  }
}
