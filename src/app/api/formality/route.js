import { NextResponse } from 'next/server'
import fs from 'fs'
import { prisma } from '@/lib/prisma'
import { getFormality } from '@/lib/formalities/configs'
import { generateFormalityPdf } from '@/lib/formality-pdf'

export async function POST(request) {
  try {
    const body = await request.json()
    const { category, type, data } = body

    const formality = getFormality(category, type)
    if (!formality) {
      return NextResponse.json({ success: false, error: 'Formalité inconnue' }, { status: 400 })
    }

    // Validation côté serveur (champs requis)
    const missing = []
    for (const section of formality.sections) {
      for (const f of section.fields) {
        if (f.required) {
          const v = data?.[f.name]
          if (v === undefined || v === '' || v === null) {
            missing.push(f.label)
          }
        }
      }
    }
    if (missing.length) {
      return NextResponse.json(
        { success: false, error: `Champs manquants : ${missing.join(', ')}` },
        { status: 400 }
      )
    }

    // Création de la formalité en DB
    const formalityRecord = await prisma.formality.create({
      data: {
        category,
        type,
        price: formality.price,
        data,
        status: 'PENDING_PAYMENT',
      },
    })

    // Génération du PDF (en MVP, immédiatement après soumission)
    // En production : à déclencher après confirmation Stripe webhook
    let pdfResult = null
    let documentRecord = null
    try {
      pdfResult = await generateFormalityPdf(formality, data, formalityRecord.id)

      if (pdfResult?.success) {
        // Récupération de la taille du fichier
        let sizeBytes = null
        try {
          const fullPath = `${process.cwd()}/public${pdfResult.downloadUrl}`
          sizeBytes = fs.statSync(fullPath).size
        } catch {}

        // Inscription du document généré en DB
        documentRecord = await prisma.document.create({
          data: {
            type: mapDocumentType(category, type),
            filename: pdfResult.filename,
            path: pdfResult.downloadUrl,
            sizeBytes,
            formalityId: formalityRecord.id,
          },
        })

        await prisma.formality.update({
          where: { id: formalityRecord.id },
          data: { status: 'DOCUMENTS_GENERATED' },
        })
      }
    } catch (e) {
      console.error('PDF gen failed:', e)
      await prisma.formality.update({
        where: { id: formalityRecord.id },
        data: { status: 'FAILED' },
      })
    }

    return NextResponse.json({
      success: true,
      submissionId: formalityRecord.id,
      pdf: pdfResult,
      document: documentRecord
        ? { id: documentRecord.id, filename: documentRecord.filename, downloadUrl: documentRecord.path }
        : null,
      redirectUrl: `/formality/confirmation?id=${formalityRecord.id}`,
    })
  } catch (e) {
    console.error('Formality POST error:', e)
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      const formality = await prisma.formality.findUnique({
        where: { id },
        include: { documents: true },
      })
      if (!formality) {
        return NextResponse.json({ success: false, error: 'Formalité introuvable' }, { status: 404 })
      }
      return NextResponse.json({ success: true, formality })
    }

    // Liste — utile pour le dashboard (à brancher sur l'utilisateur connecté plus tard)
    const list = await prisma.formality.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { documents: true },
    })
    return NextResponse.json({ success: true, formalities: list })
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}

// Mapping catégorie+type vers DocumentType de la DB
function mapDocumentType(category, type) {
  if (category === 'creation') return 'STATUTES'
  if (category === 'cession') return 'CESSION_ACT'
  if (category === 'modification') return 'PV'
  if (category === 'dissolution') return 'PV'
  return 'OTHER'
}
