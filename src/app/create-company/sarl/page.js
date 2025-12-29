'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import FormLayout from '@/components/FormLayout'
import { loadFormData, updateFormStep } from '@/lib/localStorage'
import { validateStep1, validateStep2, validateStep3, validateStep4 } from '@/lib/formValidation'

export default function CreateSarlPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: { shareholders: [{ name: '', shares: 100 }] },
    step4: {}
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const savedData = loadFormData()
    if (savedData) {
      setFormData(savedData)
      setCurrentStep(savedData.lastStep || 1)
    }
  }, [])

  const handleNext = () => {
    const stepData = formData[`step${currentStep}`]
    let stepErrors = {}

    switch (currentStep) {
      case 1:
        stepErrors = validateStep1(stepData)
        break
      case 2:
        stepErrors = validateStep2(stepData)
        break
      case 3:
        stepErrors = validateStep3(stepData)
        break
      case 4:
        stepErrors = validateStep4(stepData)
        break
    }

    setErrors(stepErrors)

    if (Object.keys(stepErrors).length === 0) {
      updateFormStep(currentStep, stepData)
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1)
      } else {
        router.push('/create-company/sarl/summary')
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateStepData = (field, value) => {
    const newFormData = {
      ...formData,
      [`step${currentStep}`]: {
        ...formData[`step${currentStep}`],
        [field]: value
      }
    }
    setFormData(newFormData)
    updateFormStep(currentStep, newFormData[`step${currentStep}`])
  }

  const renderStep = () => {
    const stepData = formData[`step${currentStep}`] || {}

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dénomination sociale *
              </label>
              <input
                type="text"
                value={stepData.companyName || ''}
                onChange={(e) => updateStepData('companyName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nom de votre société"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capital social (€) *
              </label>
              <input
                type="number"
                value={stepData.capital || ''}
                onChange={(e) => updateStepData('capital', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1000"
                min="1"
              />
              {errors.capital && (
                <p className="text-red-500 text-sm mt-1">{errors.capital}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objet social *
              </label>
              <textarea
                value={stepData.purpose || ''}
                onChange={(e) => updateStepData('purpose', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="Décrivez l'activité principale de votre société..."
              />
              {errors.purpose && (
                <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse du siège social *
              </label>
              <input
                type="text"
                value={stepData.address || ''}
                onChange={(e) => updateStepData('address', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123 rue de la République"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Code postal *
                </label>
                <input
                  type="text"
                  value={stepData.postalCode || ''}
                  onChange={(e) => updateStepData('postalCode', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="75001"
                  maxLength="5"
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ville *
                </label>
                <input
                  type="text"
                  value={stepData.city || ''}
                  onChange={(e) => updateStepData('city', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Paris"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            {/* Informations du gérant */}
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations du gérant</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    value={stepData.managerFirstName || ''}
                    onChange={(e) => updateStepData('managerFirstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Jean"
                  />
                  {errors.managerFirstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.managerFirstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={stepData.managerLastName || ''}
                    onChange={(e) => updateStepData('managerLastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Dupont"
                  />
                  {errors.managerLastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.managerLastName}</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse personnelle *
                </label>
                <input
                  type="text"
                  value={stepData.managerAddress || ''}
                  onChange={(e) => updateStepData('managerAddress', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="456 avenue des Champs"
                />
                {errors.managerAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.managerAddress}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    value={stepData.managerPostalCode || ''}
                    onChange={(e) => updateStepData('managerPostalCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="75008"
                    maxLength="5"
                  />
                  {errors.managerPostalCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.managerPostalCode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville *
                  </label>
                  <input
                    type="text"
                    value={stepData.managerCity || ''}
                    onChange={(e) => updateStepData('managerCity', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Paris"
                  />
                  {errors.managerCity && (
                    <p className="text-red-500 text-sm mt-1">{errors.managerCity}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Associés */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Associés et répartition du capital</h3>
              {(stepData.shareholders || [{ name: '', shares: 100 }]).map((shareholder, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet de l'associé *
                    </label>
                    <input
                      type="text"
                      value={shareholder.name || ''}
                      onChange={(e) => {
                        const newShareholders = [...(stepData.shareholders || [{ name: '', shares: 100 }])]
                        newShareholders[index].name = e.target.value
                        updateStepData('shareholders', newShareholders)
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Jean Dupont"
                    />
                    {errors[`shareholder_${index}_name`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`shareholder_${index}_name`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parts (%) *
                    </label>
                    <input
                      type="number"
                      value={shareholder.shares || ''}
                      onChange={(e) => {
                        const newShareholders = [...(stepData.shareholders || [{ name: '', shares: 100 }])]
                        newShareholders[index].shares = parseInt(e.target.value) || 0
                        updateStepData('shareholders', newShareholders)
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="50"
                      min="1"
                      max="100"
                    />
                    {errors[`shareholder_${index}_shares`] && (
                      <p className="text-red-500 text-sm mt-1">{errors[`shareholder_${index}_shares`]}</p>
                    )}
                  </div>

                  {(stepData.shareholders || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newShareholders = (stepData.shareholders || []).filter((_, i) => i !== index)
                        updateStepData('shareholders', newShareholders)
                      }}
                      className="col-span-3 text-red-600 text-sm hover:text-red-800"
                    >
                      Supprimer cet associé
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  const newShareholders = [...(stepData.shareholders || [{ name: '', shares: 100 }]), { name: '', shares: 0 }]
                  updateStepData('shareholders', newShareholders)
                }}
                className="text-blue-600 text-sm hover:text-blue-800 font-medium"
              >
                + Ajouter un associé
              </button>

              {errors.shareholders && (
                <p className="text-red-500 text-sm mt-2">{errors.shareholders}</p>
              )}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Dernière étape !</h3>
              <p className="text-gray-600">Vos coordonnées pour finaliser la création</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  value={stepData.firstName || ''}
                  onChange={(e) => updateStepData('firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Votre prénom"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  value={stepData.lastName || ''}
                  onChange={(e) => updateStepData('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Votre nom"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={stepData.email || ''}
                onChange={(e) => updateStepData('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone (optionnel)
              </label>
              <input
                type="tel"
                value={stepData.phone || ''}
                onChange={(e) => updateStepData('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="06 12 34 56 78"
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Récapitulatif de votre SARL</h3>
              <p className="text-gray-600">Vérifiez les informations avant de procéder au paiement</p>
            </div>

            {/* Section 1: Informations générales */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-900">Informations générales</h4>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-blue-600 text-sm hover:text-blue-800"
                >
                  Modifier
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Dénomination:</span>
                  <p className="font-medium">{formData.step1?.companyName || 'Non renseigné'}</p>
                </div>
                <div>
                  <span className="text-gray-600">Capital social:</span>
                  <p className="font-medium">{formData.step1?.capital ? `${formData.step1.capital}€` : 'Non renseigné'}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Objet social:</span>
                  <p className="font-medium">{formData.step1?.purpose || 'Non renseigné'}</p>
                </div>
              </div>
            </div>

            {/* Section 2: Siège social */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-900">Siège social</h4>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-blue-600 text-sm hover:text-blue-800"
                >
                  Modifier
                </button>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Adresse:</span>
                <p className="font-medium">
                  {formData.step2?.address || 'Non renseigné'}<br/>
                  {formData.step2?.postalCode} {formData.step2?.city}
                </p>
              </div>
            </div>

            {/* Section 3: Direction */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-900">Direction et associés</h4>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="text-blue-600 text-sm hover:text-blue-800"
                >
                  Modifier
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Gérant:</span>
                  <p className="font-medium">
                    {formData.step3?.managerFirstName} {formData.step3?.managerLastName}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Associés:</span>
                  {(formData.step3?.shareholders || []).map((sh, idx) => (
                    <p key={idx} className="font-medium">{sh.name} ({sh.shares}%)</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 4: Contact */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-900">Coordonnées</h4>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="text-blue-600 text-sm hover:text-blue-800"
                >
                  Modifier
                </button>
              </div>
              <div className="text-sm">
                <p className="font-medium">
                  {formData.step4?.firstName} {formData.step4?.lastName}
                </p>
                <p className="text-gray-600">{formData.step4?.email}</p>
                {formData.step4?.phone && <p className="text-gray-600">{formData.step4.phone}</p>}
              </div>
            </div>

            {/* Prix et paiement */}
            <div className="border-t pt-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xl font-bold text-gray-900">Total</h4>
                  <span className="text-3xl font-bold text-blue-600">149€</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Prix tout compris - Aucun frais supplémentaire
                </p>
                <div className="text-xs text-gray-500">
                  ✓ Génération des statuts de SARL<br/>
                  ✓ Documents conformes au droit français<br/>
                  ✓ Accès immédiat après paiement
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return <div>Étape non implémentée</div>
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Informations générales'
      case 2: return 'Siège social'
      case 3: return 'Direction et associés'
      case 4: return 'Vos coordonnées'
      case 5: return 'Récapitulatif'
      default: return ''
    }
  }

  return (
    <FormLayout
      currentStep={currentStep}
      totalSteps={5}
      title={getStepTitle()}
    >
      <div className="bg-white rounded-lg shadow-sm p-8">
        {renderStep()}

        <div className="flex justify-between mt-8 pt-6 border-t">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Précédent
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {currentStep === 5 ? 'Procéder au paiement' : 'Suivant'}
          </button>
        </div>
      </div>
    </FormLayout>
  )
}