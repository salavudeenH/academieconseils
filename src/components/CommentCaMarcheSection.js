export default function CommentCaMarcheSection() {
  const etapes = [
    {
      numero: 1,
      titre: 'Remplissez le formulaire',
      description: 'Saisissez les informations de votre future SARL : dénomination, capital, associés, objet social...',
      icone: '📝'
    },
    {
      numero: 2,
      titre: 'Vérifiez et validez',
      description: 'Relisez le récapitulatif de votre société et validez les informations saisies.',
      icone: '✅'
    },
    {
      numero: 3,
      titre: 'Effectuez le paiement',
      description: 'Réglez en ligne de manière sécurisée par carte bancaire via Stripe.',
      icone: '💳'
    },
    {
      numero: 4,
      titre: 'Recevez vos statuts',
      description: 'Accédez instantanément à votre espace client et téléchargez vos statuts au format PDF.',
      icone: '📄'
    }
  ]

  return (
    <section id="comment-ca-marche" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Un processus simple en 4 étapes pour créer votre SARL
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {etapes.map((etape, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                {etape.numero}
              </div>
              <div className="text-4xl mb-4">{etape.icone}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {etape.titre}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {etape.description}
              </p>
              {index < etapes.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full">
                  <div className="w-8 h-0.5 bg-blue-200 mx-auto"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/create-company"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Commencer maintenant
          </a>
        </div>
      </div>
    </section>
  )
}