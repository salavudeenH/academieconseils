import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 })
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, email: true, firstName: true, lastName: true, phone: true, role: true, createdAt: true },
  })
  if (!user) return NextResponse.json({ success: false, error: 'Introuvable' }, { status: 404 })
  return NextResponse.json({ success: true, user })
}

export async function PATCH(request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Non autorisé' }, { status: 401 })
  }

  const body = await request.json()
  const data = {}

  if (typeof body.firstName === 'string') data.firstName = body.firstName.trim()
  if (typeof body.lastName === 'string')  data.lastName = body.lastName.trim()
  if (typeof body.phone === 'string')     data.phone = body.phone.trim() || null

  // Changement de mot de passe (optionnel — exige l'ancien)
  if (body.newPassword) {
    if (typeof body.newPassword !== 'string' || body.newPassword.length < 8) {
      return NextResponse.json({ success: false, error: 'Le mot de passe doit contenir au moins 8 caractères.' }, { status: 400 })
    }
    if (!body.currentPassword) {
      return NextResponse.json({ success: false, error: 'Mot de passe actuel requis.' }, { status: 400 })
    }
    const current = await prisma.user.findUnique({ where: { id: session.user.id }, select: { password: true } })
    const ok = current?.password ? await bcrypt.compare(body.currentPassword, current.password) : false
    if (!ok) return NextResponse.json({ success: false, error: 'Mot de passe actuel incorrect.' }, { status: 400 })
    data.password = await bcrypt.hash(body.newPassword, 10)
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ success: false, error: 'Rien à mettre à jour.' }, { status: 400 })
  }

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data,
    select: { id: true, email: true, firstName: true, lastName: true, phone: true },
  })

  return NextResponse.json({ success: true, user: updated })
}
