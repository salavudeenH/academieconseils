import LegalPageLayout from '@/components/LegalPageLayout'

export const metadata = { title: 'Conditions générales de vente — Académie Conseils' }

const SECTIONS = [
  { id: 'objet',          label: '1. Objet' },
  { id: 'prestations',    label: '2. Description des prestations' },
  { id: 'tarifs',         label: '3. Tarifs' },
  { id: 'delais',         label: '4. Délais' },
  { id: 'retractation',   label: '5. Droit de rétractation' },
  { id: 'responsabilite', label: '6. Responsabilité' },
  { id: 'litiges',        label: '7. Litiges' },
]

export default function Page() {
  return (
    <LegalPageLayout title="Conditions générales de vente" lastUpdated="20 mai 2026" sections={SECTIONS}>
      <h2 id="objet">Article 1 — Objet</h2>
      <p>
        Les présentes CGV régissent les relations contractuelles entre Académie Conseils SAS
        et tout utilisateur (« Client ») souhaitant bénéficier de ses prestations de génération
        de documents juridiques et de réalisation de formalités auprès des organismes officiels.
      </p>

      <h2 id="prestations">Article 2 — Description des prestations</h2>
      <p>
        Académie Conseils propose des prestations standardisées de génération de documents
        juridiques (statuts, procès-verbaux, actes de cession, etc.) ainsi qu'un accompagnement
        dans la réalisation des formalités associées (dépôt au greffe, annonce légale, etc.).
        Ces prestations ne constituent pas un conseil juridique personnalisé.
      </p>

      <h2 id="tarifs">Article 3 — Tarifs</h2>
      <p>
        Les tarifs des prestations sont indiqués en euros toutes taxes comprises sur le site.
        Le paiement est exigible à la commande. Les frais administratifs (greffe, INPI, BODACC)
        sont reversés intégralement aux organismes concernés.
      </p>

      <h2 id="delais">Article 4 — Délais</h2>
      <p>
        Les délais indiqués sur le site sont des délais moyens constatés. Ils ne constituent pas
        un engagement contractuel, des aléas pouvant être imputables aux organismes officiels.
      </p>

      <h2 id="retractation">Article 5 — Droit de rétractation</h2>
      <p>
        Conformément à l'article L.221-28 du Code de la consommation, le Client renonce
        expressément à son droit de rétractation dès lors que la prestation a commencé à être
        exécutée (génération du document) à sa demande expresse.
      </p>

      <h2 id="responsabilite">Article 6 — Responsabilité</h2>
      <p>
        Académie Conseils est tenue d'une obligation de moyens. Sa responsabilité ne saurait être
        engagée en cas de retard ou de refus d'enregistrement par les organismes officiels imputable
        à des informations erronées fournies par le Client.
      </p>

      <h2 id="litiges">Article 7 — Litiges</h2>
      <p>
        En cas de litige, le Client est invité à contacter notre service client.
        À défaut d'accord amiable, le tribunal compétent est celui du siège social d'Académie Conseils.
      </p>
    </LegalPageLayout>
  )
}
