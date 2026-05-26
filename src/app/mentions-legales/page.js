import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata = { title: 'Mentions légales — Académie Conseils' }

export default function Page() {
  return (
    <LegalPageLayout title="Mentions légales" lastUpdated="20 mai 2026">
      <h2>Éditeur du site</h2>
      <p>
        Le site Académie Conseils est édité par la société <strong>Académie Conseils SAS</strong>,
        société par actions simplifiée au capital de 50 000€, immatriculée au RCS de Paris sous le numéro
        912 345 678, dont le siège social est situé au 12 rue de la Liberté, 75001 Paris.
      </p>
      <ul>
        <li>Numéro de TVA intracommunautaire : FR12 912345678</li>
        <li>Directrice de la publication : Camille Laurens</li>
        <li>Email : contact@academie-conseils.fr</li>
        <li>Téléphone : 01 23 45 67 89</li>
      </ul>

      <h2>Hébergeur</h2>
      <p>
        Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133,
        Walnut, CA 91789, États-Unis.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble du contenu du site (textes, graphismes, logo, icônes, images, ...) est la propriété
        exclusive d'Académie Conseils. Toute reproduction, modification ou utilisation sans autorisation préalable
        est interdite.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement de vos données personnelles est décrit dans notre Politique de confidentialité.
      </p>
    </LegalPageLayout>
  )
}
