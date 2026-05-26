import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getFormality } from '@/lib/formalities/configs'
import { generateFormalityPdf } from '@/lib/formality-pdf'

// Stockage MVP : on persiste les soumissions dans un fichier JSON.
// En production : remplacer par une vraie écriture en base via Prisma + Stripe Checkout.
const SUBMISSIONS_DIR = path.join(process.cwd(), '.data')
const SUBMISSIONS_FILE = path.join(SUBMISSIONS_DIR, 'formality-submissions.json')

function loadSubmissions() {
  try {
    if (!fs.existsSync(SUBMISSIONS_FILE)) return []
    return JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf8'))
  } catch {
    return []
  }
}

function saveSubmissions(list) {
  if (!fs.existsSync(SUBMISSIONS_DIR)) fs.mkdirSync(SUBMISSIONS_DIR, { recursive: true })
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(list, null, 2))
}

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

    const id = `${category}-${type}-${Date.now()}`
    const submission = {
      id,
      category,
      type,
      data,
      price: formality.price,
      createdAt: new Date().toISOString(),
      status: 'pending_payment',
    }
    const list = loadSubmissions()
    list.push(submission)
    saveSubmissions(list)

    // PDF — en MVP, on génère immédiatement après soumission.
    // En production : générer après confirmation Stripe webhook.
    let pdfResult = null
    try {
      pdfResult = await generateFormalityPdf(formality, data, id)
    } catch (e) {
      console.error('PDF gen failed:', e)
    }

    return NextResponse.json({
      success: true,
      submissionId: id,
      pdf: pdfResult,
      // Pour MVP : redirige vers une page de confirmation. À brancher sur Stripe Checkout.
      redirectUrl: `/formality/confirmation?id=${id}`,
    })
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
