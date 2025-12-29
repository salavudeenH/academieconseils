'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { loadFormData, clearFormData } from '@/lib/localStorage'

export default function SummaryPage() {
  const router = useRouter()
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pdfGenerating, setPdfGenerating] = useState(false)
  const [pdfResult, setPdfResult] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const data = loadFormData()
    if (!data || !data.step1 || !data.step2 || !data.step3 || !data.step4) {
      router.push('/create-company/sarl')
      return
    }
    setFormData(data)
    setLoading(false)
  }, [router])

  const generatePDF = async () => {
    if (!formData) return

    setPdfGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          orderId: 'test-' + Date.now()
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de la génération du PDF')
      }

      setPdfResult(result.data)
    } catch (err) {
      setError(err.message)
      console.error('Erreur génération PDF:', err)
    } finally {
      setPdfGenerating(false)
    }
  }

  const handlePayment = async () => {
    // Cette fonction sera implémentée avec Stripe
    console.log('Redirection vers le paiement...', formData)
    // Pour l'instant, on simule
    alert('Redirection vers Stripe - À implémenter!')
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>
  }

  if (!formData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Félicitations ! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              Votre SARL <strong>{formData.step1?.companyName}</strong> est prête à être créée
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Ce qui va se passer après le paiement :</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
              <div className="flex items-start space-x-2">
                <span>✓</span>
                <span>Génération automatique des statuts</span>
              </div>
              <div className="flex items-start space-x-2">
                <span>✓</span>
                <span>Création de votre espace client</span>
              </div>
              <div className="flex items-start space-x-2">
                <span>✓</span>
                <span>Téléchargement immédiat des documents</span>
              </div>
              <div className="flex items-start space-x-2">
                <span>✓</span>
                <span>Envoi par email de confirmation</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Total à payer</h3>
              <span className="text-4xl font-bold text-blue-600">149€</span>
            </div>

            {/* Section génération PDF */}
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <h4 className="text-lg font-semibold text-green-900 mb-4">🎯 Testez la génération de vos statuts !</h4>
              <p className="text-green-800 mb-4">
                Avant de procéder au paiement, vous pouvez générer un aperçu de vos statuts SARL pour vérifier que tout est correct.
              </p>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <strong>Erreur :</strong> {error}
                </div>
              )}

              {pdfResult && (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong>✅ PDF généré avec succès !</strong>
                      <p className="text-sm mt-1">
                        Fichier : {pdfResult.filename} ({(pdfResult.size / 1024).toFixed(1)} KB)
                      </p>
                    </div>
                    <a
                      href={pdfResult.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      📥 Télécharger
                    </a>
                  </div>
                </div>
              )}

              <button
                onClick={generatePDF}
                disabled={pdfGenerating}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pdfGenerating ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Génération en cours...
                  </span>
                ) : (
                  '📄 Générer l\'aperçu PDF'
                )}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/create-company/sarl')}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Retour au formulaire
              </button>
              <button
                onClick={handlePayment}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                Payer maintenant avec Stripe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}