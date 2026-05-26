// Génération de l'acte de cession (parts sociales / actions / fonds de commerce).
// Modèle : SM FORMATION pour la cession d'actions.

import { esc, formatDate, formatMoney, formatNumber, moneyInWords, COMMON_CSS } from './_helpers.js'

export function buildCessionHtml(formality, data) {
  switch (formality.id) {
    case 'parts':
    case 'actions':
      return buildCessionParts(formality, data)
    case 'fonds':
      return buildCessionFonds(formality, data)
    default:
      return `<p>Type de cession non reconnu : ${esc(formality.id)}</p>`
  }
}

function buildCessionParts(formality, data) {
  const unite = formality.id === 'parts' ? 'parts sociales' : 'actions'
  const uniteSing = formality.id === 'parts' ? 'part sociale' : 'action'
  const cedant = [data.cedantCivilite === 'Mme' ? 'Madame' : 'Monsieur', data.cedantPrenom, data.cedantNom].filter(Boolean).join(' ')
  const cessionnaire = [data.cessionnaireCivilite === 'Mme' ? 'Madame' : 'Monsieur', data.cessionnairePrenom, data.cessionnaireNom].filter(Boolean).join(' ')
  const today = formatDate(new Date().toISOString())
  const dateCession = formatDate(data.dateCession)
  const addr = [data.adresse, [data.codePostal, data.ville].filter(Boolean).join(' ')].filter(Boolean).join(' ')
  const nb = Number(data.nbPartsCedees || data.nbActions) || 0
  const prix = Number(data.prixCession) || 0
  const modalite = data.modalitePaiement === 'comptant' ? 'au comptant à la signature des présentes'
    : data.modalitePaiement === 'echelonne' ? 'de manière échelonnée selon le calendrier convenu entre les parties'
    : data.modalitePaiement === 'credit' ? 'par crédit vendeur dans les conditions convenues entre les parties'
    : 'au comptant'

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><title>Acte de cession — ${esc(data.companyName || '')}</title>
<style>${COMMON_CSS}
.acte-title { font-size: 16pt; font-weight: 700; text-align: center; margin: 30px 0 8px; text-transform: uppercase; letter-spacing: 0.08em; }
.acte-subtitle { text-align: center; font-style: italic; margin-bottom: 30px; }
.party-block { margin: 18px 0; padding: 14px 18px; background: #FCFAF6; border-left: 3px solid #14141A; }
.party-block strong { display: block; margin-bottom: 6px; font-size: 11.5pt; }
.article-clause { margin: 16px 0; }
.article-clause .num { font-weight: 700; }
</style></head><body>

<h1 class="acte-title">Acte de cession de ${esc(unite)}</h1>
<p class="acte-subtitle">de la société ${esc(data.companyName || '')} (${esc(data.companyForm || '')})</p>

<p>ENTRE LES SOUSSIGNÉS :</p>

<div class="party-block">
  <strong>${esc(cedant)}</strong>
  ${data.cedantDateNaissance ? `né(e) le ${formatDate(data.cedantDateNaissance)} à ${esc(data.cedantLieuNaissance || '')},` : ''}
  demeurant ${esc(data.cedantAdresse || '')},<br>
  ci-après dénommé(e) <strong>« le Cédant »</strong>, d'une part,
</div>

<p style="text-align:center; font-weight:700;">ET</p>

<div class="party-block">
  <strong>${esc(cessionnaire)}</strong>
  ${data.cessionnaireDateNaissance ? `né(e) le ${formatDate(data.cessionnaireDateNaissance)} à ${esc(data.cessionnaireLieuNaissance || '')},` : ''}
  demeurant ${esc(data.cessionnaireAdresse || '')},<br>
  ci-après dénommé(e) <strong>« le Cessionnaire »</strong>, d'autre part.
</div>

<p style="font-weight:700; margin-top:24px;">IL A ÉTÉ EXPOSÉ ET CONVENU CE QUI SUIT :</p>

<h3 class="article-title">Préambule</h3>
<p>Le Cédant est propriétaire de <strong>${formatNumber(nb)} ${unite}</strong> de la société <strong>${esc(data.companyName || '')}</strong>, ${esc(data.companyForm || '')} au capital de ${formatMoney(data.capital)}${data.siren ? `, immatriculée au R.C.S. de ${esc(data.rcsVille || '')} sous le numéro ${esc(data.siren)}` : ''}, dont le siège social est sis ${esc(addr)} (ci-après « la Société »).</p>
<p>Le Cédant souhaite céder, et le Cessionnaire souhaite acquérir, lesdites ${unite} aux conditions et modalités définies ci-après.</p>

<h3 class="article-title">Article 1 — Objet de la cession</h3>
<p>Le Cédant cède au Cessionnaire, qui accepte, <strong>${formatNumber(nb)} ${unite}</strong> qu'il détient dans le capital de la Société, d'une valeur nominale unitaire de <strong>${formatMoney(data.valeurNominale)}</strong>.</p>

<h3 class="article-title">Article 2 — Prix de cession</h3>
<p>La présente cession est consentie et acceptée moyennant le prix global, ferme et définitif de <strong>${moneyInWords(prix)} (${formatMoney(prix)})</strong>, soit un prix unitaire de <strong>${formatMoney(nb > 0 ? prix / nb : 0)}</strong> par ${esc(uniteSing)}.</p>

<h3 class="article-title">Article 3 — Modalités de paiement</h3>
<p>Le prix de cession est payable ${modalite}.</p>

<h3 class="article-title">Article 4 — Transfert de propriété</h3>
<p>Le transfert de propriété des ${unite} cédées intervient ${formality.id === 'actions' ? "à la date d'inscription au compte du Cessionnaire au registre des mouvements de titres tenu par la Société" : "à la date de signature du présent acte"}, soit le <strong>${esc(dateCession || today)}</strong>.</p>
<p>Le Cessionnaire est, à compter de cette date, subrogé dans tous les droits et obligations attachés aux ${unite} cédées.</p>

<h3 class="article-title">Article 5 — Garanties du Cédant</h3>
<p>Le Cédant garantit au Cessionnaire :</p>
<ul>
  <li>être propriétaire des ${unite} cédées, libres de tout privilège, gage, nantissement ou droit quelconque au profit d'un tiers ;</li>
  <li>la régularité et la validité des ${unite} cédées et de leur inscription au registre de la Société ;</li>
  <li>n'avoir connaissance d'aucun fait, événement ou élément susceptible d'affecter substantiellement la valeur des ${unite} cédées.</li>
</ul>

${formality.id === 'parts' ? `
<h3 class="article-title">Article 6 — Agrément</h3>
<p>La présente cession a fait l'objet d'un agrément préalable de la collectivité des associés conformément à l'article 11 des statuts et à l'article L. 223-14 du Code de commerce.</p>
` : `
<h3 class="article-title">Article 6 — Notification à la Société</h3>
<p>Conformément à l'article L. 228-1 du Code de commerce, la présente cession sera notifiée à la Société qui procèdera à l'inscription du transfert au registre des mouvements de titres.</p>
`}

<h3 class="article-title">Article 7 — Enregistrement et formalités fiscales</h3>
<p>Le présent acte sera enregistré auprès du service de l'enregistrement compétent dans le délai d'un mois à compter de sa signature. Les droits d'enregistrement (${formality.id === 'parts' ? '3% après abattement' : '0,1% du prix de cession'}) sont à la charge du <strong>${esc(data.fraisCharge === 'cedant' ? 'Cédant' : 'Cessionnaire')}</strong>.</p>

<h3 class="article-title">Article 8 — Élection de domicile</h3>
<p>Pour l'exécution des présentes et de leurs suites, les parties font élection de domicile en leur adresse respective indiquée en tête du présent acte.</p>

<h3 class="article-title">Article 9 — Loi applicable et juridiction compétente</h3>
<p>Le présent acte est soumis au droit français. Tout litige relatif à son exécution ou son interprétation sera de la compétence exclusive des tribunaux français.</p>

<div class="signature-block">
  <p class="place-date">Fait à <strong>${esc(data.ville || data.cedantVille || '____________')}</strong>, le <strong>${esc(dateCession || today)}</strong>, en quatre exemplaires originaux, dont :</p>
  <ul style="margin-top:4px;">
    <li>un pour le Cédant ;</li>
    <li>un pour le Cessionnaire ;</li>
    <li>un pour la Société ;</li>
    <li>un pour l'enregistrement.</li>
  </ul>
  <div class="signature-grid">
    <div class="signature-cell">
      <div class="who">${esc(cedant)}</div>
      <div>Le Cédant</div>
    </div>
    <div class="signature-cell">
      <div class="who">${esc(cessionnaire)}</div>
      <div>Le Cessionnaire</div>
    </div>
  </div>
</div>

</body></html>`
}

function buildCessionFonds(formality, data) {
  const cedant = data.cedantNom || '—'
  const cessionnaire = data.cessionnaireNom || '—'
  const today = formatDate(new Date().toISOString())
  const dateEntree = formatDate(data.dateEntreeJouissance)
  const prix = Number(data.prixTotal) || 0

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><title>Cession de fonds de commerce</title>
<style>${COMMON_CSS}
.acte-title { font-size: 16pt; font-weight: 700; text-align: center; margin: 30px 0 30px; text-transform: uppercase; letter-spacing: 0.08em; }
.party-block { margin: 18px 0; padding: 14px 18px; background: #FCFAF6; border-left: 3px solid #14141A; }
.party-block strong { display: block; margin-bottom: 6px; font-size: 11.5pt; }
.fin-table { width: 100%; border-collapse: collapse; margin: 14px 0; }
.fin-table th, .fin-table td { padding: 8px 12px; border: 1px solid #C5C5CB; text-align: right; }
.fin-table th { background: #F8F4ED; text-align: center; font-weight: 700; }
.fin-table td:first-child { text-align: left; font-weight: 600; }
</style></head><body>

<h1 class="acte-title">Acte de cession de fonds de commerce</h1>

<p>ENTRE LES SOUSSIGNÉS :</p>

<div class="party-block">
  <strong>${esc(cedant)}</strong>
  ${data.cedantType === 'societe' ? '(personne morale)' : ''}<br>
  ${esc(data.cedantAdresse || '')},<br>
  ci-après dénommé(e) <strong>« le Cédant »</strong>, d'une part,
</div>

<p style="text-align:center; font-weight:700;">ET</p>

<div class="party-block">
  <strong>${esc(cessionnaire)}</strong>
  ${data.cessionnaireType === 'societe' ? '(personne morale)' : ''}<br>
  ${esc(data.cessionnaireAdresse || '')},<br>
  ci-après dénommé(e) <strong>« le Cessionnaire »</strong>, d'autre part.
</div>

<p style="font-weight:700; margin-top:24px;">IL A ÉTÉ CONVENU CE QUI SUIT :</p>

<h3 class="article-title">Article 1 — Objet</h3>
<p>Le Cédant cède et transfère au Cessionnaire, qui accepte, le fonds de commerce d'<strong>${esc(data.fondsActivite || '')}</strong>, exploité sous l'enseigne « <strong>${esc(data.fondsEnseigne || '')}</strong> », sis <strong>${esc(data.fondsAdresseExploitation || '')}</strong>.</p>

<h3 class="article-title">Article 2 — Désignation du fonds</h3>
<p>Le fonds de commerce cédé comprend tous les éléments corporels et incorporels qui le composent, et notamment :</p>
<ul>
  <li>l'enseigne, le nom commercial et la clientèle attachée audit fonds ;</li>
  <li>le droit au bail commercial portant sur les locaux d'exploitation (durée restante : ${esc(data.fondsBailDureeRestante || '—')} années, loyer annuel : ${formatMoney(data.fondsLoyer)}) ;</li>
  <li>le matériel, mobilier et agencements affectés à l'exploitation, suivant inventaire annexé ;</li>
  <li>les marchandises en stock évaluées contradictoirement au jour de la signature.</li>
</ul>

<h3 class="article-title">Article 3 — Chiffres d'affaires et résultats des trois derniers exercices</h3>
<table class="fin-table">
  <thead><tr><th>Exercice</th><th>Chiffre d'affaires HT</th><th>Résultat</th></tr></thead>
  <tbody>
    <tr><td>N-1</td><td>${formatMoney(data.fondsCAExercice1)}</td><td>${formatMoney(data.fondsResultatExercice1)}</td></tr>
    <tr><td>N-2</td><td>${formatMoney(data.fondsCAExercice2)}</td><td>${formatMoney(data.fondsResultatExercice2)}</td></tr>
    <tr><td>N-3</td><td>${formatMoney(data.fondsCAExercice3)}</td><td>${formatMoney(data.fondsResultatExercice3)}</td></tr>
  </tbody>
</table>

<h3 class="article-title">Article 4 — Prix de cession</h3>
<p>La présente cession est consentie et acceptée moyennant le prix global de <strong>${moneyInWords(prix)} (${formatMoney(prix)})</strong>, ainsi réparti :</p>
<ul>
  <li>Éléments incorporels (clientèle, enseigne, droit au bail) : <strong>${formatMoney(data.prixElementsIncorporels)}</strong></li>
  <li>Éléments corporels (matériel, mobilier, agencements) : <strong>${formatMoney(data.prixElementsCorporels)}</strong></li>
  <li>Marchandises en stock : <strong>${formatMoney(data.prixMarchandises)}</strong></li>
</ul>

<h3 class="article-title">Article 5 — Séquestre du prix</h3>
<p>Conformément aux dispositions des articles L. 141-12 et suivants du Code de commerce, le prix de cession est séquestré entre les mains de <strong>${esc(data.sequestre || '')}</strong>, qui se chargera de le libérer au Cédant à l'expiration des délais d'opposition légaux et après accomplissement des formalités de publicité.</p>

<h3 class="article-title">Article 6 — Entrée en jouissance</h3>
<p>Le Cessionnaire entrera en jouissance du fonds cédé à compter du <strong>${esc(dateEntree)}</strong>.</p>

<h3 class="article-title">Article 7 — Publicité</h3>
<p>La présente cession fera l'objet, conformément aux dispositions des articles L. 141-12 et suivants du Code de commerce, des publicités légales suivantes : insertion dans un journal d'annonces légales du département, publication au BODACC, dépôt au greffe du Tribunal de commerce.</p>

<h3 class="article-title">Article 8 — Garanties du Cédant</h3>
<p>Le Cédant garantit au Cessionnaire la libre disposition du fonds cédé, l'absence de privilèges et nantissements autres que ceux éventuellement déclarés, ainsi que la régularité de l'exploitation et la sincérité des chiffres d'affaires et résultats déclarés.</p>

<h3 class="article-title">Article 9 — Enregistrement</h3>
<p>Le présent acte sera enregistré dans le mois de sa signature. Les droits d'enregistrement sont à la charge du Cessionnaire.</p>

<div class="signature-block">
  <p class="place-date">Fait à <strong>${esc(data.lieuSignature || '____________')}</strong>, le <strong>${esc(dateEntree || today)}</strong>, en cinq exemplaires originaux.</p>
  <div class="signature-grid">
    <div class="signature-cell"><div class="who">${esc(cedant)}</div><div>Le Cédant</div></div>
    <div class="signature-cell"><div class="who">${esc(cessionnaire)}</div><div>Le Cessionnaire</div></div>
  </div>
</div>

</body></html>`
}
