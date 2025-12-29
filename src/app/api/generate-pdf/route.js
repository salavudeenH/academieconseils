import { NextResponse } from 'next/server'
import { generateSarlStatuts, validateFormDataForPDF } from '@/lib/pdf-generator'

export async function POST(request) {
  try {
    const body = await request.json()
    const { formData, orderId } = body

    // Validation des données
    if (!formData) {
      return NextResponse.json(
        { error: 'Données du formulaire manquantes' },
        { status: 400 }
      )
    }

    // Validation complète des données du formulaire
    const validation = await validateFormDataForPDF(formData)
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          error: 'Données du formulaire invalides',
          details: validation.errors
        },
        { status: 400 }
      )
    }

    console.log('🔄 Génération du PDF en cours...')
    console.log('📊 Société:', formData.step1?.companyName)
    console.log('💰 Capital:', formData.step1?.capital + '€')

    // Génération du PDF
    const result = await generateSarlStatuts(formData, orderId)

    if (!result.success) {
      console.error('❌ Échec génération PDF:', result.error)
      return NextResponse.json(
        { 
          error: 'Erreur lors de la génération du PDF',
          details: result.error
        },
        { status: 500 }
      )
    }

    console.log('✅ PDF généré avec succès')
    console.log('📄 Fichier:', result.filename)
    console.log('📐 Taille:', (result.size / 1024).toFixed(1) + ' KB')

    // Réponse de succès
    return NextResponse.json({
      success: true,
      message: 'Statuts SARL générés avec succès',
      data: {
        filename: result.filename,
        downloadUrl: result.downloadUrl,
        size: result.size,
        company: formData.step1.companyName,
        capital: formData.step1.capital,
        generatedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('❌ Erreur API generate-pdf:', error)
    
    return NextResponse.json(
      { 
        error: 'Erreur serveur lors de la génération du PDF',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

// Méthode GET pour les tests
export async function GET() {
  return NextResponse.json({
    message: 'API de génération PDF active',
    usage: 'Utilisez POST avec formData pour générer un PDF',
    requiredFields: [
      'step1: { companyName, capital, purpose }',
      'step2: { address, city, postalCode }', 
      'step3: { managerFirstName, managerLastName, managerAddress, managerCity, managerPostalCode, shareholders }',
      'step4: { firstName, lastName, email }'
    ]
  })
}