import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request) {
  try {
    const body = await request.json()
    let { firstName, lastName, email, password, phone } = body

    // Sanitization
    firstName = (firstName || '').trim()
    lastName = (lastName || '').trim()
    email = (email || '').toLowerCase().trim()

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ success: false, error: 'Tous les champs sont obligatoires.' }, { status: 400 })
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ success: false, error: 'Email invalide.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ success: false, error: 'Le mot de passe doit contenir au moins 8 caractères.' }, { status: 400 })
    }

    // Unicité
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ success: false, error: 'Un compte existe déjà avec cet email.' }, { status: 409 })
    }

    // Hash password (10 rounds = bon compromis perf / sécu)
    const hashed = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { firstName, lastName, email, password: hashed, phone: phone || null },
      select: { id: true, firstName: true, lastName: true, email: true },
    })

    return NextResponse.json({ success: true, user })
  } catch (e) {
    console.error('Register error:', e)
    return NextResponse.json({ success: false, error: 'Erreur serveur.' }, { status: 500 })
  }
}
