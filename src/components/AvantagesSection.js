export default function AvantagesSection() {
  const avantages = [
    {
      icon: '⚡',
      titre: 'Création ultra-rapide',
      description: 'Vos statuts de SARL générés en moins de 10 minutes grâce à notre processus automatisé.'
    },
    {
      icon: '💰',
      titre: 'Prix transparent',
      description: 'Un tarif unique de 149€ tout compris, sans frais cachés ni abonnement.'
    },
    {
      icon: '📋',
      titre: 'Conformité garantie',
      description: 'Documents conformes au Code de commerce français, validés par nos experts juridiques.'
    },
    {
      icon: '🔒',
      titre: 'Sécurisé et fiable',
      description: 'Vos données sont protégées et vos documents stockés de manière sécurisée.'
    },
    {
      icon: '📱',
      titre: 'Accès instantané',
      description: 'Téléchargez vos statuts immédiatement après validation du paiement.'
    },
    {
      icon: '🎯',
      titre: 'Simple et guidé',
      description: 'Interface intuitive qui vous guide pas à pas dans la création de votre société.'
    }
  ]

  return (
    <section id="avantages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir SARL Creator ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La solution la plus simple et rapide pour créer votre SARL en toute conformité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {avantages.map((avantage, index) => (
            <div 
              key={index} 
              className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{avantage.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {avantage.titre}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {avantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}