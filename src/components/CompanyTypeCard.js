export default function CompanyTypeCard({ companyType, isSelected, onSelect, showPrice = true }) {
  return (
    <div 
      className={`
        relative cursor-pointer rounded-lg border-2 p-6 transition-all hover:shadow-lg
        ${isSelected 
          ? 'border-blue-600 bg-blue-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-gray-300'
        }
      `}
      onClick={() => onSelect(companyType.id)}
    >
      {/* Badge prix */}
      {showPrice && (
        <div className="absolute -top-3 -right-3">
          <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
            {companyType.price}€
          </span>
        </div>
      )}

      {/* En-tête */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-4xl">{companyType.icon}</div>
          {isSelected && (
            <div className="text-blue-600">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {companyType.name}
        </h3>
        <h4 className="text-sm font-medium text-gray-600 mb-3">
          {companyType.fullName}
        </h4>
        <p className="text-gray-700 text-sm leading-relaxed">
          {companyType.description}
        </p>
      </div>

      {/* Caractéristiques principales */}
      <div className="mb-4">
        <h5 className="text-sm font-semibold text-gray-800 mb-2">Caractéristiques :</h5>
        <ul className="space-y-1 text-xs text-gray-600">
          {companyType.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Avantages */}
      <div className="mb-4">
        <h5 className="text-sm font-semibold text-gray-800 mb-2">Avantages :</h5>
        <ul className="space-y-1 text-xs text-gray-600">
          {companyType.advantages.slice(0, 2).map((advantage, index) => (
            <li key={index} className="flex items-center">
              <span className="text-blue-500 mr-2">•</span>
              {advantage}
            </li>
          ))}
        </ul>
      </div>

      {/* Détails techniques */}
      <div className="border-t pt-3 mt-4">
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>
            <span className="font-medium">Capital min :</span><br/>
            {companyType.minCapital}€
          </div>
          <div>
            <span className="font-medium">Associés :</span><br/>
            {companyType.minShareholders === companyType.maxShareholders 
              ? companyType.minShareholders 
              : `${companyType.minShareholders}-${companyType.maxShareholders}`
            }
          </div>
        </div>
      </div>

      {/* Indicateur de sélection */}
      {isSelected && (
        <div className="absolute inset-0 rounded-lg ring-2 ring-blue-600 ring-opacity-50"></div>
      )}
    </div>
  )
}