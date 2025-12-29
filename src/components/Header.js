import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
            Academie Conseils
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#avantages" className="text-gray-600 hover:text-blue-600 transition-colors">
              Avantages
            </Link>
            <Link href="#comment-ca-marche" className="text-gray-600 hover:text-blue-600 transition-colors">
              Comment ça marche
            </Link>
            <Link href="#tarifs" className="text-gray-600 hover:text-blue-600 transition-colors">
              Tarifs
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/create-company"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Créer ma société
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}