import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata = { title: 'Politique cookies — Académie Conseils' }

export default function Page() {
  return (
    <LegalPageLayout title="Politique cookies" lastUpdated="20 mai 2026">
      <p>
        Notre site utilise des cookies pour assurer son bon fonctionnement, mesurer son audience
        et améliorer votre expérience.
      </p>

      <h2>Types de cookies utilisés</h2>
      <h3>Cookies strictement nécessaires</h3>
      <p>Permettent le fonctionnement de base du site (session, sécurité). Ils ne peuvent pas être désactivés.</p>

      <h3>Cookies de mesure d'audience</h3>
      <p>Nous permettent de comprendre comment vous utilisez le site (Plausible Analytics, hébergé en UE,
      sans cookie de tracking individuel).</p>

      <h3>Cookies de paiement</h3>
      <p>Stripe utilise des cookies pour sécuriser les transactions et détecter la fraude.</p>

      <h2>Gérer vos préférences</h2>
      <p>
        Vous pouvez modifier vos préférences à tout moment via le bouton « Gérer les cookies »
        en bas de page, ou directement dans les paramètres de votre navigateur.
      </p>
    </LegalPageLayout>
  )
}
