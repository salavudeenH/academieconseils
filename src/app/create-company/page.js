'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import CompanyTypeCard from '@/components/CompanyTypeCard'
import { getAllCompanyTypes, getCompanyTypesByCategory } from '@/lib/companyTypes'
import { updateFormStep } from '@/lib/localStorage'

export default function CreateCompanyPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState(null)
  const [showComparison, setShowComparison] = useState(false)
  
  const companyTypes = getAllCompanyTypes()
  const categorizedTypes = getCompanyTypesByCategory()

  const handleTypeSelect = (typeId) => {
    setSelectedType(typeId)
  }

  const handleContinue = () => {
    if (!selectedType) {
      alert('Veuillez sélectionner un type de société')
      return
    }

    // Sauvegarder le type sélectionné
    updateFormStep(0, { companyType: selectedType })
    
    // Rediriger vers le formulaire adapté
    router.push(`/create-company/${selectedType.toLowerCase()}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choisissez votre forme juridique
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Sélectionnez le statut juridique le mieux adapté à votre projet entrepreneurial
          </p>
          
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            {showComparison ? 'Masquer le comparatif' : 'Voir le comparatif détaillé'}
          </button>
        </div>

        {/* Tableau comparatif (optionnel) */}
        {showComparison && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-12 overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Comparatif des formes juridiques
            </h2>
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Critère</th>
                  {companyTypes.map(type => (
                    <th key={type.id} className="text-center py-3 px-4 font-semibold">
                      {type.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Capital minimum</td>
                  {companyTypes.map(type => (
                    <td key={type.id} className="text-center py-3 px-4">
                      {type.minCapital}€
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Nb. associés</td>
                  {companyTypes.map(type => (
                    <td key={type.id} className="text-center py-3 px-4">
                      {type.minShareholders === type.maxShareholders 
                        ? type.minShareholders 
                        : `${type.minShareholders}-${type.maxShareholders}`}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Dirigeant</td>
                  {companyTypes.map(type => (
                    <td key={type.id} className="text-center py-3 px-4">
                      {type.managerTitle}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Prix création</td>
                  {companyTypes.map(type => (
                    <td key={type.id} className="text-center py-3 px-4 font-semibold text-blue-600">
                      {type.price}€
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Section Sociétés Commerciales */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            💼 Sociétés Commerciales
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {categorizedTypes.commercial.map(type => (
              <CompanyTypeCard
                key={type.id}
                companyType={type}
                isSelected={selectedType === type.id}
                onSelect={handleTypeSelect}
              />
            ))}
          </div>
        </div>

        {/* Section Sociétés Unipersonnelles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            👤 Sociétés Unipersonnelles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {categorizedTypes.unipersonal.map(type => (
              <CompanyTypeCard
                key={type.id}
                companyType={type}
                isSelected={selectedType === type.id}
                onSelect={handleTypeSelect}
              />
            ))}
          </div>
        </div>

        {/* Section Sociétés Civiles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🏠 Sociétés Civiles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 max-w-md mx-auto">
            {categorizedTypes.civil.map(type => (
              <CompanyTypeCard
                key={type.id}
                companyType={type}
                isSelected={selectedType === type.id}
                onSelect={handleTypeSelect}
              />
            ))}
          </div>
        </div>

        {/* Section sélection */}
        {selectedType && (
          <div className="bg-white border-l-4 border-blue-500 p-6 mb-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  ✅ Vous avez sélectionné : {getAllCompanyTypes().find(t => t.id === selectedType)?.fullName}
                </h3>
                <p className="text-gray-600 mt-1">
                  Prix de création : <span className="font-semibold text-blue-600">
                    {getAllCompanyTypes().find(t => t.id === selectedType)?.price}€
                  </span>
                </p>
              </div>
              <button
                onClick={handleContinue}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Continuer →
              </button>
            </div>
          </div>
        )}

        {/* Aide à la décision */}
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            💡 Besoin d'aide pour choisir ?
          </h3>
          <p className="text-blue-800 mb-4">
            Notre outil de recommandation vous aide à identifier la forme juridique 
            la plus adaptée à votre situation en quelques questions.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Utiliser le guide de choix
          </button>
        </div>
      </div>
    </div>
  )
}