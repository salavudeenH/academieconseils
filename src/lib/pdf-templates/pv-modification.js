// Génération du PV de modification + annonce légale.
// Modèle : COSMO TVS — Procès-Verbal des décisions unanimes.

import { esc, formatDate, formatMoney, formatNumber, COMMON_CSS } from './_helpers.js'

const FORM_LABELS = {
  SARL: 'SARL',
  SAS: 'SAS',
  SASU: 'SASU',
  EURL: 'EURL',
  SCI: 'SCI',
  SA: 'SA',
}

const TITRES = {
  'transfert-siege':         'Transfert du siège social',
  'changement-dirigeant':    'Changement de dirigeant',
  'augmentation-capital':    'Augmentation de capital',
  'reduction-capital':       'Réduction de capital',
  'changement-objet':        "Modification de l'objet social",
  'changement-denomination': 'Changement de dénomination sociale',
  'transformation':          'Transformation de la société',
}

export function buildPvModificationHtml(formality, data) {
  const form = FORM_LABELS[data.companyForm] || data.companyForm || 'Société'
  const denom = data.companyName || '—'
  const addr = [data.adresse, [data.codePostal, data.ville].filter(Boolean).join(' ')].filter(Boolean).join(' ')
  const capital = Number(data.capital) || 0
  const signataire = [data.sigCivilite === 'Mme' ? 'Madame' : 'Monsieur', data.sigPrenom, data.sigNom].filter(Boolean).join(' ')
  const dateAss = formatDate(data.dateAssemblee || data.dateEffet)
  const today = formatDate(new Date().toISOString())
  const isUni = form === 'SASU' || form === 'EURL'
  const partsName = (form === 'SAS' || form === 'SASU') ? 'actions' : 'parts sociales'
  const associeLabel = isUni ? (form === 'SASU' ? 'actionnaire unique' : 'associé unique') : 'associés'
  const collectif = isUni ? `${form === 'SASU' ? "L'actionnaire unique" : "L'associé unique"}` : "L'assemblée"
  const titre = TITRES[formality.id] || formality.name

  const header = `
    <div class="pv-header">
      <div class="denom">« ${esc(denom)} »</div>
      <div class="form">${esc(form)}${form !== 'SARL' && form !== 'SCI' ? ', société par actions simplifiée' : ''}</div>
      <div class="meta">
        au capital de ${esc(formatMoney(capital))}<br>
        Siège social : ${esc(addr)}${data.siren ? `<br>R.C.S. de ${esc(data.rcsVille || '')} ${esc(data.siren)}` : ''}
      </div>
    </div>
    <h1 class="pv-title">Procès-Verbal en date du ${esc(dateAss || today)}</h1>
    <h2 class="pv-subtitle">${esc(isUni ? "DÉCISIONS UNANIMES DE L'ASSOCIÉ" : "ASSEMBLÉE GÉNÉRALE EXTRAORDINAIRE")}</h2>
  `

  const intro = `
    <p>Le ${esc(dateAss || today)},</p>
    <p>${isUni ? `${collectif} de la société <strong>${esc(denom)}</strong>` : `Les ${associeLabel} de la société <strong>${esc(denom)}</strong> se sont réunis en assemblée générale`} au siège social, sur convocation de la ${form === 'SARL' || form === 'EURL' ? 'gérance' : 'présidence'}.</p>
    <p>Le total des ${partsName} ${isUni ? 'présenté est égal' : 'présentes ou représentées est égal'} au nombre ${(form === 'SAS' || form === 'SASU') ? "d'actions composant" : 'de parts composant'} le capital social, ${isUni ? 'la consultation est' : "l'assemblée est"} donc déclarée régulièrement constituée et peut valablement délibérer.</p>
    <p>${isUni ? '' : 'La séance est présidée par le ' + (form === 'SARL' ? 'gérant' : 'président') + ' de la société.'}</p>
    <p>${isUni ? `${collectif} rappelle l'ordre du jour suivant` : `Le président rappelle que l'Assemblée va délibérer sur l'ordre du jour suivant`} :</p>
    <ul><li>${esc(titre)}</li></ul>
  `

  const resolutions = buildResolutions(formality, data, { form, denom, isUni, collectif, partsName, addr })

  const cloture = `
    <p>L'ordre du jour étant épuisé, et personne ne demandant plus la parole, ${isUni ? collectif : 'le président'} déclare la séance levée.</p>
    <p>De tout ce que dessus, il a été dressé le présent procès-verbal qui a été signé, après lecture, par ${isUni ? collectif.toLowerCase() : 'le président'}.</p>
    <p>Fait en 4 originaux,<br>À ${esc(data.ville || '____________')},<br>Le ${esc(today)}.</p>
    <div class="signature-block">
      <div class="signature-grid">
        <div class="signature-cell">
          <div class="who">${esc(signataire)}</div>
          <div>${esc(data.sigRole || (form === 'SARL' || form === 'EURL' ? 'Gérant' : 'Président'))}</div>
        </div>
      </div>
    </div>
  `

  // Annonce légale
  const annonce = buildAnnonceLegale(formality, data, { form, denom, addr, capital })

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><title>${esc(formality.name)} — ${esc(denom)}</title>
<style>${COMMON_CSS}
.pv-header { text-align: center; margin: 0 0 30px; padding-bottom: 20px; border-bottom: 1px solid #14141A; }
.pv-header .denom { font-size: 16pt; font-weight: 700; }
.pv-header .form { font-style: italic; margin-top: 4px; }
.pv-header .meta { margin-top: 10px; font-size: 10.5pt; line-height: 1.6; }
.pv-title { font-size: 14pt; font-weight: 700; text-align: center; margin: 20px 0 8px; }
.pv-subtitle { font-size: 11pt; text-align: center; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 30px; font-weight: 700; }
.resolution { margin: 16px 0; }
.resolution-title { font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 6px; }
.annonce { margin-top: 50px; padding: 20px; border: 1px solid #14141A; background: #FCFAF6; }
.annonce h3 { margin: 0 0 12px; text-align: center; font-size: 13pt; }
.annonce p { font-size: 10.5pt; text-align: justify; }
</style></head><body>

${header}
${intro}
${resolutions}
${cloture}

<div class="page-break"></div>
${annonce}

</body></html>`
}

function buildResolutions(formality, data, ctx) {
  const { form, denom, isUni, collectif, addr } = ctx
  const today = formatDate(new Date().toISOString())
  const dateEffet = formatDate(data.dateEffet || data.dateAssemblee)

  switch (formality.id) {
    case 'transfert-siege':
      return `
        <div class="resolution">
          <div class="resolution-title">Première résolution</div>
          <p>${collectif} décide de transférer le siège social de la société à compter du <strong>${esc(dateEffet)}</strong> :</p>
          <p style="margin-left:20px;">de : <strong>${esc(addr)}</strong></p>
          <p style="margin-left:20px;">à : <strong>${esc([data.newAdresse, [data.newCodePostal, data.newVille].filter(Boolean).join(' ')].filter(Boolean).join(' '))}</strong>.</p>
          ${data.motif ? `<p>Motif : ${esc(data.motif)}.</p>` : ''}
          <p>Cette résolution est adoptée ${isUni ? 'par ' + collectif.toLowerCase() : 'à l\'unanimité'}.</p>
        </div>
        <div class="resolution">
          <div class="resolution-title">Deuxième résolution — Modification des statuts</div>
          <p>L'article 4 « Siège social » des statuts est modifié en conséquence. Les statuts mis à jour figurent en annexe.</p>
          <p>Cette résolution est adoptée ${isUni ? 'par ' + collectif.toLowerCase() : 'à l\'unanimité'}.</p>
        </div>
        <div class="resolution">
          <div class="resolution-title">Troisième résolution — Pouvoirs</div>
          <p>Tous pouvoirs sont conférés au porteur d'une copie ou d'un extrait du présent procès-verbal pour effectuer toutes formalités légales de publicité.</p>
        </div>`

    case 'changement-dirigeant': {
      const sortant = [data.sortantCivilite === 'Mme' ? 'Madame' : 'Monsieur', data.sortantPrenom, data.sortantNom].filter(Boolean).join(' ')
      const entrant = [data.entrantCivilite === 'Mme' ? 'Madame' : 'Monsieur', data.entrantPrenom, data.entrantNom].filter(Boolean).join(' ')
      const dirigeantLabel = form === 'SARL' || form === 'EURL' ? 'gérant' : 'président'
      return `
        ${data.typeChangement !== 'nomination' && sortant ? `<div class="resolution">
          <div class="resolution-title">Première résolution — ${data.typeChangement === 'demission' ? 'Démission' : data.typeChangement === 'revocation' ? 'Révocation' : 'Démission'} du ${dirigeantLabel}</div>
          <p>${collectif} prend acte de la ${data.typeChangement === 'demission' || data.typeChangement === 'remplacement' ? 'démission' : 'révocation'} de <strong>${esc(sortant)}</strong> de ses fonctions de ${dirigeantLabel} à compter du <strong>${esc(dateEffet)}</strong> et lui donne quitus entier et définitif de sa gestion.</p>
          <p>Cette résolution est adoptée ${isUni ? 'par ' + collectif.toLowerCase() : 'à l\'unanimité'}.</p>
        </div>` : ''}
        ${data.typeChangement !== 'demission' && data.typeChangement !== 'revocation' && entrant ? `<div class="resolution">
          <div class="resolution-title">Deuxième résolution — Nomination du nouveau ${dirigeantLabel}</div>
          <p>Est nommé(e) en qualité de ${dirigeantLabel} pour une durée indéterminée à compter du <strong>${esc(dateEffet)}</strong> : <strong>${esc(entrant)}</strong>${data.entrantDateNaissance ? `, né(e) le ${formatDate(data.entrantDateNaissance)}` : ''}${data.entrantAdresse ? `, demeurant ${esc(data.entrantAdresse)}` : ''}.</p>
          <p>${esc(entrant)} déclare accepter ses fonctions et n'être frappé(e) d'aucune incompatibilité ou interdiction susceptible d'empêcher l'exercice de son mandat.</p>
          <p>Cette résolution est adoptée ${isUni ? 'par ' + collectif.toLowerCase() : 'à l\'unanimité'}.</p>
        </div>` : ''}
        <div class="resolution">
          <div class="resolution-title">Pouvoirs</div>
          <p>Tous pouvoirs sont conférés au porteur d'une copie ou d'un extrait du présent procès-verbal pour effectuer toutes formalités légales de publicité.</p>
        </div>`
    }

    case 'augmentation-capital':
      return `
        <div class="resolution">
          <div class="resolution-title">Première résolution — Augmentation de capital</div>
          <p>${collectif} décide d'augmenter le capital social d'un montant de <strong>${formatMoney(data.montantAugmentation)}</strong> par ${esc(data.typeApport || 'apport en numéraire')}, pour le porter de ${formatMoney(data.capital)} à <strong>${formatMoney(data.nouveauCapital)}</strong>.</p>
          <p>Cette augmentation est réalisée par la création de <strong>${formatNumber(data.nbPartsCreees)} ${form === 'SAS' || form === 'SASU' ? 'actions' : 'parts sociales'} nouvelles</strong> d'une valeur nominale de <strong>${formatMoney(data.valeurNominale)}</strong> chacune.</p>
          <p>Cette résolution est adoptée ${isUni ? 'par ' + collectif.toLowerCase() : 'à l\'unanimité'}.</p>
        </div>
        <div class="resolution">
          <div class="resolution-title">Deuxième résolution — Modification des statuts</div>
          <p>Les articles 6 (Apports) et 7 (Capital social) des statuts sont modifiés en conséquence.</p>
        </div>
        <div class="resolution">
          <div class="resolution-title">Pouvoirs</div>
          <p>Tous pouvoirs sont donnés au porteur d'une copie ou d'un extrait du présent procès-verbal pour effectuer les formalités de publicité légale.</p>
        </div>`

    case 'reduction-capital':
      return `
        <div class="resolution">
          <div class="resolution-title">Première résolution — Réduction de capital</div>
          <p>${collectif} décide de réduire le capital social d'un montant de <strong>${formatMoney(data.montantReduction)}</strong> (${esc(data.motifReduction || '')}), pour le porter à <strong>${formatMoney(data.nouveauCapital)}</strong>.</p>
          <p>Cette résolution est adoptée ${isUni ? 'par ' + collectif.toLowerCase() : 'à l\'unanimité'}.</p>
        </div>
        <div class="resolution">
          <div class="resolution-title">Deuxième résolution — Modification des statuts</div>
          <p>L'article 7 (Capital social) des statuts est modifié en conséquence.</p>
        </div>`

    case 'changement-objet':
      return `
        <div class="resolution">
          <div class="resolution-title">Première résolution — Modification de l'objet social</div>
          <p>${collectif} décide ${data.typeModification === 'extension' ? "l'extension" : data.typeModification === 'reduction' ? 'la réduction' : 'le remplacement'} de l'objet social. Le nouvel objet social est ainsi rédigé :</p>
          <p style="margin-left:20px; font-style:italic; padding:10px 14px; border-left:3px solid #14141A;">${esc(data.nouvelObjet || '')}</p>
          <p>L'article 2 (Objet) des statuts est modifié en conséquence.</p>
          <p>Cette résolution est adoptée ${isUni ? 'par ' + collectif.toLowerCase() : 'à l\'unanimité'}.</p>
        </div>`

    case 'changement-denomination':
      return `
        <div class="resolution">
          <div class="resolution-title">Première résolution — Changement de dénomination</div>
          <p>${collectif} décide de modifier la dénomination sociale. La dénomination, jusqu'alors « <strong>${esc(data.companyName)}</strong> », devient :</p>
          <p style="text-align:center; font-size:14pt; font-weight:700; margin:14px 0;">« ${esc(data.nouvelleDenomination)} »</p>
          ${data.nouveauSigle ? `<p>Nouveau sigle : <strong>${esc(data.nouveauSigle)}</strong>.</p>` : ''}
          <p>L'article 3 (Dénomination) des statuts est modifié en conséquence.</p>
          <p>Cette résolution est adoptée ${isUni ? 'par ' + collectif.toLowerCase() : 'à l\'unanimité'}.</p>
        </div>`

    case 'transformation':
      return `
        <div class="resolution">
          <div class="resolution-title">Première résolution — Transformation de la société</div>
          <p>${collectif} décide de transformer la société, actuellement de forme <strong>${esc(form)}</strong>, en <strong>${esc(data.nouvelleForme)}</strong>.</p>
          ${data.motif ? `<p>Motif : ${esc(data.motif)}.</p>` : ''}
          <p>Les statuts sont entièrement refondus pour correspondre à la nouvelle forme. Les statuts refondus figurent en annexe.</p>
          <p>Cette résolution est adoptée ${isUni ? 'par ' + collectif.toLowerCase() : 'à l\'unanimité'}.</p>
        </div>`

    default:
      return `<p><em>Type de modification non reconnu : ${esc(formality.id)}</em></p>`
  }
}

function buildAnnonceLegale(formality, data, ctx) {
  const { form, denom, addr, capital } = ctx
  const today = formatDate(new Date().toISOString())
  const dateEffet = formatDate(data.dateEffet || data.dateAssemblee)

  let texte = ''
  switch (formality.id) {
    case 'transfert-siege':
      texte = `<p>Suivant procès-verbal en date du <strong>${dateEffet}</strong>, ${ctx.isUni ? "l'associé unique" : 'les associés'} de la société <strong>${esc(denom)}</strong>, ${esc(form)} au capital de ${formatMoney(capital)}${data.siren ? `, immatriculée au R.C.S. de ${esc(data.rcsVille)} sous le numéro ${esc(data.siren)}` : ''}, ont décidé de transférer le siège social de <strong>${esc(addr)}</strong> à <strong>${esc([data.newAdresse, [data.newCodePostal, data.newVille].filter(Boolean).join(' ')].filter(Boolean).join(' '))}</strong> à compter du ${dateEffet}.</p><p>L'article 4 des statuts a été modifié en conséquence. Mention sera faite au R.C.S.</p>`
      break
    case 'changement-dirigeant': {
      const entrant = [data.entrantCivilite === 'Mme' ? 'Madame' : 'Monsieur', data.entrantPrenom, data.entrantNom].filter(Boolean).join(' ')
      texte = `<p>Suivant procès-verbal en date du <strong>${dateEffet}</strong>, ${ctx.isUni ? "l'associé unique" : 'les associés'} de la société <strong>${esc(denom)}</strong>, ${esc(form)} au capital de ${formatMoney(capital)}, ${data.siren ? `R.C.S. ${esc(data.rcsVille)} ${esc(data.siren)}, ` : ''}ont décidé de nommer ${entrant ? '<strong>' + esc(entrant) + '</strong>' : 'un nouveau dirigeant'} en qualité de ${form === 'SARL' || form === 'EURL' ? 'gérant' : 'président'} à compter du ${dateEffet}.</p>`
      break
    }
    case 'augmentation-capital':
      texte = `<p>Suivant décision de l'assemblée du <strong>${dateEffet}</strong>, le capital social de la société <strong>${esc(denom)}</strong>, ${esc(form)} au capital de ${formatMoney(capital)}, a été augmenté d'un montant de <strong>${formatMoney(data.montantAugmentation)}</strong> pour être porté à <strong>${formatMoney(data.nouveauCapital)}</strong>. Les statuts ont été modifiés en conséquence.</p>`
      break
    case 'reduction-capital':
      texte = `<p>Suivant décision de l'assemblée du <strong>${dateEffet}</strong>, le capital social de la société <strong>${esc(denom)}</strong>, ${esc(form)} au capital de ${formatMoney(capital)}, a été réduit d'un montant de <strong>${formatMoney(data.montantReduction)}</strong> pour être ramené à <strong>${formatMoney(data.nouveauCapital)}</strong>.</p>`
      break
    case 'changement-objet':
      texte = `<p>Suivant décision de l'assemblée du <strong>${dateEffet}</strong>, ${ctx.isUni ? "l'associé unique" : 'les associés'} de la société <strong>${esc(denom)}</strong>, ${esc(form)} au capital de ${formatMoney(capital)}, ${data.siren ? `R.C.S. ${esc(data.rcsVille)} ${esc(data.siren)}, ` : ''}ont décidé de modifier l'objet social. Nouvel objet : ${esc(data.nouvelObjet || '')}.</p>`
      break
    case 'changement-denomination':
      texte = `<p>Suivant décision de l'assemblée du <strong>${dateEffet}</strong>, la dénomination sociale de la société <strong>${esc(denom)}</strong>, ${esc(form)} au capital de ${formatMoney(capital)}, ${data.siren ? `R.C.S. ${esc(data.rcsVille)} ${esc(data.siren)}, ` : ''}a été modifiée. La nouvelle dénomination est : <strong>${esc(data.nouvelleDenomination)}</strong>.</p>`
      break
    case 'transformation':
      texte = `<p>Suivant décision de l'assemblée du <strong>${dateEffet}</strong>, la société <strong>${esc(denom)}</strong>, ${esc(form)} au capital de ${formatMoney(capital)}, a été transformée en <strong>${esc(data.nouvelleForme)}</strong>. Les statuts ont été entièrement refondus.</p>`
      break
    default:
      texte = `<p>Avis de modification de la société ${esc(denom)}.</p>`
  }

  return `
    <div class="annonce">
      <h3>Avis de modification</h3>
      <p style="text-align:center; font-weight:700; margin-bottom:14px;">${esc(denom)}<br>${esc(form)} au capital de ${formatMoney(capital)}<br>Siège social : ${esc(addr)}${data.siren ? `<br>R.C.S. ${esc(data.rcsVille || '')} ${esc(data.siren)}` : ''}</p>
      ${texte}
      <p style="margin-top:14px;">Pour avis,<br><em>La ${form === 'SARL' || form === 'EURL' ? 'Gérance' : 'Présidence'}</em></p>
    </div>
  `
}
