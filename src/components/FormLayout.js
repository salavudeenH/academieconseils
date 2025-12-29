export default function FormLayout({ children, currentStep, totalSteps, title }) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Création de votre SARL</h1>
            <div className="text-sm text-gray-500">
              Étape {currentStep} sur {totalSteps}
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {title && (
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          )}
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}