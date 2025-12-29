export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">SARL Creator</h3>
            <p className="text-gray-300 mb-4">
              La solution automatisée pour créer vos statuts de SARL rapidement et en toute conformité.
            </p>
            <p className="text-sm text-gray-400">
              © 2024 SARL Creator. Tous droits réservés.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Service</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#avantages" className="hover:text-blue-400 transition-colors">Avantages</a></li>
              <li><a href="#comment-ca-marche" className="hover:text-blue-400 transition-colors">Comment ça marche</a></li>
              <li><a href="#tarifs" className="hover:text-blue-400 transition-colors">Tarifs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Légal</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/mentions-legales" className="hover:text-blue-400 transition-colors">Mentions légales</a></li>
              <li><a href="/confidentialite" className="hover:text-blue-400 transition-colors">Politique de confidentialité</a></li>
              <li><a href="/cgv" className="hover:text-blue-400 transition-colors">CGV</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}