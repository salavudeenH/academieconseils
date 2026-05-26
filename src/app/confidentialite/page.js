import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata = { title: 'Politique de confidentialité — Académie Conseils' }

const SECTIONS = [
  { id: 'donnees',       label: '1. Données collectées' },
  { id: 'finalites',     label: '2. Finalités du traitement' },
  { id: 'conservation',  label: '3. Durée de conservation' },
  { id: 'droits',        label: '4. Vos droits' },
  { id: 'cookies',       label: '5. Cookies' },
]

export default function Page() {
  return (
    <LegalPageLayout title="Politique de confidentialité" lastUpdated="20 mai 2026" sections={SECTIONS}>
      <p>
        Académie Conseils s'engage à protéger la vie privée des utilisateurs de son site et à respecter
        le Règlement Général sur la Protection des Données (RGPD).
      </p>

      <h2 id="donnees">1. Données collectées</h2>
      <p>Nous collectons les données suivantes lorsque vous utilisez nos services :</p>
      <ul>
        <li>Identité : civilité, nom, prénom, date de naissance, lieu de naissance</li>
        <li>Coordonnées : email, téléphone, adresse postale</li>
        <li>Informations relatives à votre société : dénomination, SIREN, capital, etc.</li>
        <li>Données de paiement (traitées par notre prestataire Stripe — nous ne stockons aucun numéro de carte)</li>
      </ul>

      <h2 id="finalites">2. Finalités du traitement</h2>
      <ul>
        <li>Génération de vos documents juridiques</li>
        <li>Réalisation des formalités auprès des organismes officiels (greffe, INPI, BODACC)</li>
        <li>Communication relative à votre dossier</li>
        <li>Respect de nos obligations légales et fiscales</li>
      </ul>

      <h2 id="conservation">3. Durée de conservation</h2>
      <p>
        Vos données sont conservées 10 ans après la dernière transaction, conformément à la durée légale
        de conservation des documents commerciaux. Elles peuvent être supprimées sur demande sous réserve
        de nos obligations légales.
      </p>

      <h2 id="droits">4. Vos droits</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li>Droit d'accès à vos données</li>
        <li>Droit de rectification</li>
        <li>Droit à l'effacement (sous conditions)</li>
        <li>Droit à la limitation du traitement</li>
        <li>Droit à la portabilité</li>
        <li>Droit d'opposition</li>
      </ul>
      <p>
        Pour exercer ces droits, écrivez-nous à <strong>dpo@academie-conseils.fr</strong>.
      </p>

      <h2 id="cookies">5. Cookies</h2>
      <p>
        Nous utilisons des cookies pour le bon fonctionnement du site et la mesure d'audience.
        Consultez notre <a href="/cookies">politique cookies</a> pour plus de détails.
      </p>
    </LegalPageLayout>
  )
}
