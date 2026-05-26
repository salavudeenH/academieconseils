import { NextResponse } from 'next/server'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { getFormality } from '@/lib/formalities/configs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
          if (v === undefined || v === '' || v === null) missing.push(f.label)
        }
      }
    }
    if (missing.length) {
      return NextResponse.json(
        { success: false, error: `Champs manquants : ${missing.join(', ')}` },
        { status: 400 }
      )
    }

    // Utilisateur connecté ?
    const session = await getServerSession(authOptions)
    let userId = session?.user?.id || null
    let createdUser = null
    let tempPassword = null

    // Pas connecté → on crée un compte avec l'email du fondateur/signataire
    if (!userId) {
      const userEmail = (data.sigEmail || data.fondateurEmail || '').toLowerCase().trim()
      if (userEmail && EMAIL_RE.test(userEmail)) {
        const existing = await prisma.user.findUnique({ where: { email: userEmail } })
        if (existing) {
          userId = existing.id
        } else {
          tempPassword = crypto.randomBytes(8).toString('base64')
            .replace(/[^a-zA-Z0-9]/g, '').slice(0, 10) + 'a1!'
          const hashed = await bcrypt.hash(tempPassword, 10)
          const firstName = data.fondateurPrenom || data.sigPrenom || 'Client'
          const lastName = data.fondateurNom || data.sigNom || ''
          const phone = data.fondateurTel || data.sigTelephone || null
          createdUser = await prisma.user.create({
            data: { firstName, lastName, email: userEmail, password: hashed, phone },
            select: { id: true, email: true, firstName: true, lastName: true },
          })
          userId = createdUser.id
        }
      }
    }

    // Persistance des données seulement (le PDF est généré à la demande)
    const formalityRecord = await prisma.formality.create({
      data: {
        category,
        type,
        price: formality.price,
        data,
        status: 'PENDING_PAYMENT',
        userId,
      },
      select: { id: true, category: true, type: true, status: true, createdAt: true },
    })

    return NextResponse.json({
      success: true,
      submissionId: formalityRecord.id,
      account: createdUser ? { email: createdUser.email, tempPassword } : null,
      redirectUrl: `/formality/confirmation?id=${formalityRecord.id}`,
    })
  } catch (e) {
    console.error('Formality POST error:', e)
    return NextResponse.json({ success: false, error: 'Erreur serveur.' }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    if (!userId) {
      return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      const formality = await prisma.formality.findFirst({ where: { id, userId } })
      if (!formality) {
        return NextResponse.json({ success: false, error: 'Formalité introuvable' }, { status: 404 })
      }
      return NextResponse.json({ success: true, formality })
    }

    const list = await prisma.formality.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, formalities: list })
  } catch (e) {
    console.error('Formality GET error:', e)
    return NextResponse.json({ success: false, error: 'Erreur serveur.' }, { status: 500 })
  }
}
