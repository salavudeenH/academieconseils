// Génération des statuts complets pour SARL, SAS, SASU, EURL, SCI.
// Inspiré directement du modèle Statuts_NEOFORMA (25 articles).

import { esc, formatDate, formatMoney, formatNumber, moneyInWords, numberToFrench, COMMON_CSS } from './_helpers.js'

const FORM_LABELS = {
  SARL: { name: 'Société à Responsabilité Limitée',     short: 'SARL',  dirigeant: 'Gérant',   parts: 'parts sociales', associe: 'associé' },
  SAS:  { name: 'Société par Actions Simplifiée',       short: 'SAS',   dirigeant: 'Président', parts: 'actions',        associe: 'actionnaire' },
  SASU: { name: 'Société par Actions Simplifiée Unipersonnelle', short: 'SASU', dirigeant: 'Président', parts: 'actions', associe: 'actionnaire' },
  EURL: { name: "Entreprise Unipersonnelle à Responsabilité Limitée", short: 'EURL', dirigeant: 'Gérant', parts: 'parts sociales', associe: 'associé' },
  SCI:  { name: 'Société Civile Immobilière',           short: 'SCI',   dirigeant: 'Gérant',   parts: 'parts sociales', associe: 'associé' },
}

export function buildStatutsHtml(formality, data) {
  const f = FORM_LABELS[formality.id] || FORM_LABELS.SARL
  const isSAS = formality.id === 'SAS' || formality.id === 'SASU'
  const isUni = formality.id === 'SASU' || formality.id === 'EURL'
  const denom = data.companyName || '—'
  const sigle = data.sigle ? ` (${data.sigle})` : ''
  const capital = Number(data.capital) || 0
  const nbParts = Number(data.nbParts) || 0
  const valeurNom = Number(data.valeurNominale) || 1
  const addr = [data.adresse, [data.codePostal, data.ville].filter(Boolean).join(' ')].filter(Boolean).join(' ')

  const fondateurFull = [
    data.fondateurCivilite === 'Mme' ? 'Madame' : 'Monsieur',
    data.fondateurPrenom,
    data.fondateurNom,
  ].filter(Boolean).join(' ')

  const fondateurDetails = `${fondateurFull}, né${data.fondateurCivilite === 'Mme' ? 'e' : ''} le ${formatDate(data.fondateurDateNaissance)} à ${esc(data.fondateurLieuNaissance || '')} de nationalité ${esc(data.fondateurNationalite || 'Française')}, demeurant au ${esc(data.fondateurAdresse || '')} ${esc(data.fondateurCP || '')} ${esc(data.fondateurVille || '')}`

  const dirigeantUseFondateur = data.dirigeantMode !== 'autre'
  const dirigeantFull = dirigeantUseFondateur ? fondateurFull
    : [data.dirigeantPrenom, data.dirigeantNom].filter(Boolean).join(' ')

  const dureeAnnees = Number(data.dureeAnnees) || 99
  const dateCloture = data.dateClotureExercice || '31/12'
  const liberation = data.liberationCapital === 'integrale' ? 'intégralement libérées'
    : data.liberationCapital === 'moitie' ? 'libérées de moitié'
    : 'libérées du quart au moins'

  // Identité haute (en cartouche en haut de chaque page après la couverture)
  const headerBlock = `
    <div class="cover-header">
      <div class="denom">« ${esc(denom)}${sigle} »</div>
      <div class="form">${esc(f.name)}</div>
      <div class="meta">
        au capital de ${esc(formatMoney(capital))}<br>
        Siège social : ${esc(addr)}
      </div>
    </div>
    <h1 class="cover-title">STATUTS</h1>
  `

  // Préambule : LE SOUSSIGNÉ / LES SOUSSIGNÉS
  const preambule = isUni
    ? `<p class="preamble"><strong>LE SOUSSIGNÉ,</strong></p>
       <p class="preamble">${esc(fondateurDetails)},</p>
       <p class="preamble">Ci-après dénommé « ${isSAS ? "l'actionnaire unique" : "l'associé unique"} »,</p>
       <p class="preamble">A établi, ainsi qu'il suit, les statuts de la ${esc(f.name.toLowerCase())} qu'il a décidé d'instituer.</p>`
    : `<p class="preamble"><strong>LES SOUSSIGNÉS,</strong></p>
       <p class="preamble">${esc(fondateurDetails)},</p>
       ${data.associe2Nom ? `<p class="preamble">${esc([data.associe2Civilite === 'Mme' ? 'Madame' : 'Monsieur', data.associe2Prenom, data.associe2Nom].filter(Boolean).join(' '))}, né${data.associe2Civilite === 'Mme' ? 'e' : ''} le ${formatDate(data.associe2DateNaissance)} à ${esc(data.associe2LieuNaissance || '')} de nationalité ${esc(data.associe2Nationalite || 'Française')}, demeurant au ${esc(data.associe2Adresse || '')},</p>` : ''}
       <p class="preamble">Ci-après dénommés « les ${f.associe}s »,</p>
       <p class="preamble">Ont établi, ainsi qu'il suit, les statuts de la ${esc(f.name.toLowerCase())} qu'ils ont décidé d'instituer.</p>`

  // PARTIE I — Identité
  const partie1 = `
    <h2 class="part-title">Forme · Dénomination · Objet · Siège · Durée</h2>

    <h3 class="article-title">Article 1 — Forme</h3>
    <p>${isUni
      ? `Il est formé par ${isSAS ? "l'actionnaire unique" : "l'associé unique"} propriétaire des ${f.parts} ci-après créées une ${f.name.toLowerCase()} régie par les lois et règlements en vigueur, ainsi que par les présents statuts. Elle fonctionne sous la même forme avec un ou plusieurs ${f.associe}s. Dans le cas où la société comporte plusieurs ${f.associe}s, les attributions de ${isSAS ? "l'actionnaire unique" : "l'associé unique"} sont dévolues à la collectivité des ${f.associe}s.`
      : `Il est formé entre les soussignés et toute personne qui deviendrait ultérieurement ${f.associe} une ${f.name.toLowerCase()} régie par les lois et règlements en vigueur, ainsi que par les présents statuts.`
    }${isSAS ? " Elle ne peut procéder à une offre au public de ses titres mais peut néanmoins procéder à des offres réservées à des investisseurs qualifiés ou à un cercle restreint d'investisseurs." : ""}</p>

    <h3 class="article-title">Article 2 — Objet</h3>
    <p>La Société a pour objet, en France et à l'étranger :</p>
    <p style="margin-left:14px;">${esc(data.objet || '—')}</p>
    <p>Toutes opérations industrielles et commerciales se rapportant à :</p>
    <ul>
      <li>la création, l'acquisition, la location, la prise en location-gérance de tous fonds de commerce, la prise à bail, l'installation, l'exploitation de tous établissements, fonds de commerce, usines, ateliers, se rapportant à l'une ou l'autre des activités spécifiées ci-dessus ;</li>
      <li>la prise, l'acquisition, l'exploitation ou la cession de tous procédés, brevets et droits de propriété intellectuelle concernant ces activités ;</li>
      <li>la participation, directe ou indirecte, de la Société dans toutes opérations financières, mobilières ou immobilières ou entreprises commerciales ou industrielles pouvant se rattacher à l'objet social ou à tout objet similaire ou connexe ;</li>
      <li>toutes opérations quelconques contribuant à la réalisation de cet objet.</li>
    </ul>

    <h3 class="article-title">Article 3 — Dénomination</h3>
    <p>La dénomination sociale est : <strong>${esc(denom)}</strong>${data.sigle ? ` (sigle : ${esc(data.sigle)})` : ''}</p>
    <p>Dans tous les actes et documents émanant de la Société et destinés aux tiers, la dénomination sera précédée ou suivie immédiatement des mots écrits lisiblement « ${esc(f.name)} » ou des initiales « ${esc(f.short)} » et de l'énonciation du montant du capital social.</p>
    <p>En outre, la Société doit indiquer en tête de ses factures, notes de commandes, tarifs et documents publicitaires, ainsi que sur toutes correspondances et récépissés concernant son activité et signés par elle ou en son nom, le siège du tribunal au greffe duquel elle est immatriculée au Registre du commerce et des sociétés, et le numéro d'immatriculation qu'elle a reçu.</p>

    <h3 class="article-title">Article 4 — Siège social</h3>
    <p>Le siège social est fixé : <strong>${esc(addr)}</strong>.</p>
    <p>Il peut être transféré en tout endroit par décision ${isUni ? `de ${isSAS ? "l'actionnaire unique" : "l'associé unique"}` : 'collective des ' + f.associe + 's'}.</p>

    <h3 class="article-title">Article 5 — Durée</h3>
    <p>La durée de la Société est fixée à <strong>${dureeAnnees} années</strong> à compter de la date de son immatriculation au Registre du commerce et des sociétés, sauf les cas de dissolution anticipée ou de prorogation.</p>
  `

  // PARTIE II — Apports et Capital
  const partie2 = `
    <h2 class="part-title">Apports · Capital social · ${isSAS ? 'Actions' : 'Parts sociales'}</h2>

    <h3 class="article-title">Article 6 — Apports</h3>
    <p>Lors de la constitution, ${isUni ? `${isSAS ? "l'actionnaire unique" : "l'associé unique"}, soussigné, apporte` : 'les ' + f.associe + 's soussignés apportent'} à la Société :</p>
    <h4 class="subsection">Apports en numéraire</h4>
    <p>Une somme en numéraire d'un montant total de <strong>${moneyInWords(data.apportNumeraire || capital)} (${formatMoney(data.apportNumeraire || capital)})</strong>, correspondant au montant du capital social et à <strong>${formatNumber(nbParts)} ${f.parts}</strong> d'une valeur nominale de <strong>${formatMoney(valeurNom)}</strong>, souscrites en totalité et ${liberation}.</p>
    <p>Cette somme de ${formatMoney(data.apportNumeraire || capital)} euros a été régulièrement déposée à un compte ouvert au nom de la Société en formation, à la banque <strong>${esc(data.banqueDepot || '—')}</strong>.</p>
    ${data.apportNature && Number(data.apportNature) > 0 ? `
      <h4 class="subsection">Apports en nature</h4>
      <p>Apports en nature évalués à <strong>${formatMoney(data.apportNature)}</strong> conformément au rapport du commissaire aux apports.</p>
    ` : ''}
    <h4 class="subsection">Récapitulation des apports</h4>
    <ul>
      <li>Apports en numéraire : ${moneyInWords(data.apportNumeraire || capital)}, ci ${formatMoney(data.apportNumeraire || capital)}</li>
      ${data.apportNature && Number(data.apportNature) > 0 ? `<li>Apports en nature : ${formatMoney(data.apportNature)}</li>` : ''}
    </ul>
    <p><strong>TOTAL DES APPORTS : ${moneyInWords(capital)}, ci ${formatMoney(capital)}</strong></p>

    <h3 class="article-title">Article 7 — Capital social</h3>
    <p>Le capital social est fixé à la somme de <strong>${moneyInWords(capital)} (${formatMoney(capital)})</strong>. Il est divisé en <strong>${formatNumber(nbParts)} ${f.parts}</strong> numérotées de 1 à ${formatNumber(nbParts)}, ${liberation} et de même catégorie.</p>

    <h3 class="article-title">Article 8 — Modifications du capital social</h3>
    <p>1. Le capital social peut être augmenté par tous procédés et selon toutes modalités prévues par la loi et les règlements en vigueur, en vertu d'une décision ${isUni ? 'de ' + (isSAS ? "l'actionnaire unique" : "l'associé unique") : 'collective extraordinaire des ' + f.associe + 's'} statuant sur le rapport du ${f.dirigeant}.</p>
    <p>2. Le capital social peut être réduit par tous procédés et selon toutes modalités prévues par la loi et les règlements en vigueur, en vertu d'une décision ${isUni ? 'de ' + (isSAS ? "l'actionnaire unique" : "l'associé unique") : 'collective extraordinaire des ' + f.associe + 's'} statuant sur le rapport du ${f.dirigeant}.</p>

    <h3 class="article-title">Article 9 — Libération des ${f.parts}</h3>
    <p>Lors de la constitution de la Société, les ${f.parts} de numéraire sont libérées, lors de la souscription, ${data.liberationCapital === 'integrale' ? 'intégralement' : data.liberationCapital === 'moitie' ? 'de la moitié au moins' : "d'un quart au moins"} de leur valeur nominale.</p>
    <p>La libération du surplus doit intervenir en une ou plusieurs fois sur appel du ${f.dirigeant}, dans le délai de cinq ans à compter de l'immatriculation au Registre du commerce et des sociétés.</p>

    <h3 class="article-title">Article 10 — Forme des ${f.parts}</h3>
    <p>Les ${f.parts} sont obligatoirement nominatives. Elles donnent lieu à une inscription en compte individuel dans les conditions et selon les modalités prévues par la loi et les règlements en vigueur.</p>
    <p>Tout ${f.associe} peut demander à la Société la délivrance d'une attestation d'inscription en compte.</p>

    <h3 class="article-title">Article 11 — Transmission des ${f.parts}</h3>
    ${isUni ? `<p>Les cessions ou transmissions, sous quelque forme que ce soit, des ${f.parts} détenues par ${isSAS ? "l'actionnaire unique" : "l'associé unique"} sont libres.</p>
    <p>En cas de pluralité d'${f.associe}s, la cession de ${f.parts} à un tiers est soumise à l'agrément préalable de la collectivité des ${f.associe}s statuant à la majorité ${isSAS ? 'des voix' : 'des trois-quarts des parts sociales'}.</p>`
    : `<p>La cession de ${f.parts} à un tiers est soumise à l'agrément préalable de la collectivité des ${f.associe}s statuant à la majorité ${isSAS ? 'des voix' : 'des trois-quarts des parts sociales'}. Les cessions entre ${f.associe}s sont libres.</p>
    <p>Le cédant doit notifier par lettre recommandée avec demande d'avis de réception une demande d'agrément au ${f.dirigeant} en indiquant les nom, prénoms et adresse du cessionnaire, le nombre de ${f.parts} dont la cession est envisagée et le prix offert.</p>`}

    <h3 class="article-title">Article 12 — Droits et obligations attachés aux ${f.parts}</h3>
    <p>Toute ${isSAS ? 'action' : 'part sociale'} donne droit, dans les bénéfices et l'actif social, à une part nette proportionnelle à la quotité de capital qu'elle représente.</p>
    <p>${isUni ? (isSAS ? "L'actionnaire unique" : "L'associé unique") + ' ne supporte les pertes' : 'Les ' + f.associe + 's ne supportent les pertes'} qu'à concurrence de ${isUni ? 'ses' : 'leurs'} apports.</p>
    <p>Les droits et obligations suivent la ${isSAS ? 'action' : 'part sociale'} quel qu'en soit le titulaire. La propriété d'une ${isSAS ? 'action' : 'part sociale'} comporte de plein droit adhésion aux statuts de la Société et aux décisions ${isUni ? (isSAS ? "de l'actionnaire unique" : "de l'associé unique") : 'collectives'}.</p>
  `

  // PARTIE III — Direction
  const partie3 = `
    <h2 class="part-title">Direction et contrôle de la Société</h2>

    <h3 class="article-title">Article 13 — ${f.dirigeant} de la Société</h3>
    <p>La société est ${isSAS ? 'représentée, dirigée et administrée' : 'dirigée et administrée'} par un ${f.dirigeant}, personne physique${isSAS ? ' ou morale' : ''}, ${f.associe} ou non de la Société.</p>

    <h4 class="subsection">13.1 Désignation</h4>
    <p>Le ${f.dirigeant} est nommé ou renouvelé dans ses fonctions par ${isUni ? (isSAS ? "l'actionnaire unique" : "l'associé unique") : 'la collectivité des ' + f.associe + 's'}, qui fixe son éventuelle rémunération.</p>
    <p>Est nommé en qualité de premier ${f.dirigeant} de la Société : <strong>${esc(dirigeantFull)}</strong>${data.dirigeantMode === 'autre' && data.dirigeantDateNaissance ? `, né${data.dirigeantCivilite === 'Mme' ? 'e' : ''} le ${formatDate(data.dirigeantDateNaissance)} à ${esc(data.dirigeantLieuNaissance || '')}, de nationalité ${esc(data.dirigeantNationalite || 'Française')}, demeurant ${esc(data.dirigeantAdresse || '')}` : ''}.</p>
    <p>Durée du mandat : ${data.dureeDirigeant === 'indeterminee' ? 'durée indéterminée' : data.dureeDirigeant === '6ans' ? '6 années renouvelables' : '3 années renouvelables'}.</p>
    <p>Rémunération : ${data.remunerationDirigeant === 'aucune' ? 'aucune rémunération à ce jour' : 'à définir par décision ' + (isUni ? (isSAS ? "de l'actionnaire unique" : "de l'associé unique") : 'collective')}.</p>

    <h4 class="subsection">13.2 Durée des fonctions</h4>
    <p>Les fonctions de ${f.dirigeant} prennent fin soit par le décès, la démission, la révocation, l'expiration de son mandat, soit par l'ouverture à l'encontre de celui-ci d'une procédure de redressement ou de liquidation judiciaires.</p>
    <p>Le ${f.dirigeant} peut démissionner de son mandat à la condition de notifier sa décision à ${isUni ? (isSAS ? "l'actionnaire unique" : "l'associé unique") : 'la collectivité des ' + f.associe + 's'}, par lettre recommandée.</p>

    <h4 class="subsection">13.3 Pouvoirs</h4>
    <p>Le ${f.dirigeant} dirige la Société et la représente à l'égard des tiers. À ce titre, il est investi des pouvoirs les plus étendus pour agir en toute circonstance au nom de la Société dans les limites de l'objet social et des pouvoirs expressément dévolus par la loi et les statuts à ${isUni ? (isSAS ? "l'actionnaire unique" : "l'associé unique") : 'la collectivité des ' + f.associe + 's'}.</p>

    ${isSAS ? `
      <h3 class="article-title">Article 14 — Directeur(s) général(aux)</h3>
      <p>L'actionnaire unique ou la collectivité des actionnaires peut nommer en qualité de Directeur Général une ou plusieurs personnes physiques ou morales, pour assister le Président. Le ou les Directeurs Généraux disposent des mêmes pouvoirs que le Président, sous réserve des limitations éventuellement fixées par la décision de nomination.</p>

      <h3 class="article-title">Article 15 — Conventions règlementées</h3>
      <p>Les conventions intervenues directement ou par personne interposée entre la Société et son Président, l'un de ses dirigeants, son actionnaire unique ou la société la contrôlant, sont mentionnées sur le registre des décisions et soumises au régime des conventions règlementées prévu par les articles L. 227-10 et suivants du Code de commerce.</p>
    ` : `
      <h3 class="article-title">Article 14 — Cogérance</h3>
      <p>La Société peut être dirigée par un ou plusieurs cogérants nommés ${isUni ? `par ${isSAS ? "l'actionnaire unique" : "l'associé unique"}` : 'par décision collective des ' + f.associe + 's'}. En cas de cogérance, chaque cogérant dispose séparément des pouvoirs prévus à l'article 13.3.</p>

      <h3 class="article-title">Article 15 — Conventions règlementées</h3>
      <p>Les conventions intervenues directement ou par personne interposée entre la Société et l'un de ses dirigeants ou ${f.associe}s sont soumises au régime des conventions règlementées prévu par les articles L. 223-19 et suivants du Code de commerce.</p>
    `}

    <h3 class="article-title">Article 16 — Commissaires aux comptes</h3>
    <p>${isUni ? (isSAS ? "L'actionnaire unique" : "L'associé unique") : 'La collectivité des ' + f.associe + 's'} peut nommer un ou plusieurs Commissaires aux Comptes, en application des articles L. 823-1 et suivants du Code de commerce. Cette nomination est obligatoire si la Société dépasse, à la clôture d'un exercice social, les seuils définis légalement.</p>
  `

  // PARTIE IV — Décisions
  const partie4 = isUni ? `
    <h2 class="part-title">Décisions</h2>

    <h3 class="article-title">Article 17 — Décisions de ${isSAS ? "l'actionnaire unique" : "l'associé unique"}</h3>
    <p>${isSAS ? "L'actionnaire unique" : "L'associé unique"} est seul compétent pour prendre les décisions suivantes :</p>
    <ul>
      <li>approbation des comptes annuels et affectation du résultat ;</li>
      <li>modification des statuts ;</li>
      <li>augmentation, amortissement ou réduction du capital social ;</li>
      <li>fusion, scission ou apport partiel d'actif ;</li>
      <li>transformation en une société d'une autre forme ;</li>
      <li>dissolution de la Société ;</li>
      <li>nomination des Commissaires aux Comptes ;</li>
      <li>nomination, révocation et rémunération des dirigeants.</li>
    </ul>
    <p>${isSAS ? "L'actionnaire unique" : "L'associé unique"} ne peut pas déléguer ses pouvoirs. Les décisions de ${isSAS ? "l'actionnaire unique" : "l'associé unique"} font l'objet de procès-verbaux consignés dans un registre coté et paraphé.</p>

    <h3 class="article-title">Article 18 — Décisions collectives (en cas de pluralité)</h3>
    <p>Si la Société comporte plusieurs ${f.associe}s, les pouvoirs dévolus à ${isSAS ? "l'actionnaire unique" : "l'associé unique"} sont exercés par la collectivité des ${f.associe}s.</p>
    <p>Les décisions collectives sont prises soit en assemblée générale, soit par consultation écrite, soit par acte unanime signé par tous les ${f.associe}s. Les décisions entraînant modification des statuts sont prises ${isSAS ? 'à la majorité des deux tiers des voix' : 'à la majorité des trois-quarts des ' + f.parts}.</p>
  ` : `
    <h2 class="part-title">Décisions collectives</h2>

    <h3 class="article-title">Article 17 — Modalités</h3>
    <p>Les décisions collectives sont prises soit en assemblée générale, soit par consultation écrite, soit par acte unanime signé par tous les ${f.associe}s. Tout ${f.associe} a le droit de participer aux décisions collectives, personnellement ou par mandataire, quel que soit le nombre de ${f.parts} qu'il possède.</p>

    <h3 class="article-title">Article 18 — Majorités</h3>
    <p>Les décisions ordinaires sont prises à la majorité simple des ${f.parts}. Les décisions entraînant modification des statuts sont prises ${isSAS ? 'à la majorité des deux tiers des voix' : 'à la majorité des trois-quarts des ' + f.parts}.</p>
    <p>Doivent être prises à l'unanimité les décisions ayant pour effet d'augmenter les engagements des ${f.associe}s ou de supprimer la clause d'agrément.</p>
  `

  // PARTIE V — Exercice / résultats
  const partie5 = `
    <h2 class="part-title">Exercice social · Comptes sociaux · Affectation et répartition des bénéfices</h2>

    <h3 class="article-title">Article 19 — Exercice social</h3>
    <p>Chaque exercice social a une durée d'une année, qui commence le ${exerciceDebut(dateCloture)} et finit le <strong>${dateCloture}</strong>.</p>
    <p>Par exception, le premier exercice commencera le jour de l'immatriculation de la Société au Registre du commerce et des sociétés et se terminera ${data.dureePremierExercice === 'longue' ? `au plus tard le ${dateCloture} de l'année suivante (durée maximale de 24 mois).` : `le ${dateCloture} de l'année en cours.`}</p>

    <h3 class="article-title">Article 20 — Inventaire — Comptes annuels</h3>
    <p>Il est tenu une comptabilité régulière des opérations sociales, conformément à la loi et aux usages du commerce. À la clôture de chaque exercice, le ${f.dirigeant} dresse l'inventaire des divers éléments de l'actif et du passif existant à cette date et établit les comptes annuels comprenant le bilan, le compte de résultat et l'annexe, conformément aux lois et règlements en vigueur.</p>
    <p>${isUni ? (isSAS ? "L'actionnaire unique" : "L'associé unique") : "L'assemblée"} approuve les comptes annuels, dans les six mois de la clôture de l'exercice social, et décide l'affectation du résultat.</p>

    <h3 class="article-title">Article 21 — Affectation et répartition du résultat</h3>
    <p>Sur le bénéfice de l'exercice diminué, le cas échéant, des pertes antérieures, il est prélevé cinq pour cent au moins pour constituer le fonds de réserve légale. Ce prélèvement cesse d'être obligatoire lorsque le fonds de réserve atteint le dixième du capital social.</p>
    <p>Le bénéfice distribuable est constitué par le bénéfice de l'exercice diminué des pertes antérieures et des sommes à porter en réserve, et augmenté du report bénéficiaire. Il est attribué ${isUni ? `à ${isSAS ? "l'actionnaire unique" : "l'associé unique"}` : `aux ${f.associe}s au prorata de leurs droits dans le capital social`}.</p>

    <h3 class="article-title">Article 22 — Paiement des dividendes — Acomptes</h3>
    <p>Les modalités de mise en paiement des dividendes en numéraire sont fixées par ${isUni ? (isSAS ? "l'actionnaire unique" : "l'associé unique") : 'la collectivité des ' + f.associe + 's'}. La mise en paiement des dividendes en numéraire doit avoir lieu dans un délai maximal de neuf mois après la clôture de l'exercice.</p>
  `

  // PARTIE VI — Capitaux propres, transformation, dissolution
  const partie6 = `
    <h2 class="part-title">Capitaux propres · Transformation · Dissolution · Liquidation</h2>

    <h3 class="article-title">Article 23 — Capitaux propres inférieurs à la moitié du capital social</h3>
    <p>Si, du fait des pertes constatées dans les documents comptables, les capitaux propres de la Société deviennent inférieurs à la moitié du capital social, le ${f.dirigeant} doit, dans les quatre mois qui suivent l'approbation des comptes ayant fait apparaître ces pertes, consulter ${isUni ? (isSAS ? "l'actionnaire unique" : "l'associé unique") : 'la collectivité des ' + f.associe + 's'}, à l'effet de décider s'il y a lieu à dissolution anticipée de la Société.</p>

    <h3 class="article-title">Article 24 — Transformation de la société</h3>
    <p>La Société peut se transformer en société d'une autre forme sur décision ${isUni ? 'de ' + (isSAS ? "l'actionnaire unique" : "l'associé unique") : 'collective des ' + f.associe + 's'}, à la condition que la Société remplisse les conditions propres à la nouvelle forme de société.</p>

    <h3 class="article-title">Article 25 — Dissolution — Liquidation</h3>
    <p>La Société est dissoute dans les cas prévus par la loi et, sauf prorogation, à l'expiration du terme fixé par les statuts ou par décision ${isUni ? 'de ' + (isSAS ? "l'actionnaire unique" : "l'associé unique") : 'collective des ' + f.associe + 's'}.</p>
    <p>Un ou plusieurs liquidateurs sont alors nommés. Le liquidateur représente la Société. Il est investi des pouvoirs les plus étendus pour réaliser l'actif, même à l'amiable. Il est habilité à payer les créanciers et à répartir le solde disponible entre les ${f.associe}s proportionnellement à leurs droits.</p>
  `

  // Signature
  const signature = `
    <div class="signature-block">
      <p class="place-date">Fait à <strong>${esc(data.lieuSignature || data.ville || '____________')}</strong>, le <strong>${formatDate(data.dateSignature) || '____________'}</strong>.</p>
      <p>En autant d'exemplaires originaux que de parties signataires, plus un exemplaire pour les formalités d'enregistrement.</p>
      <div class="signature-grid">
        <div class="signature-cell">
          <div class="who">${esc(fondateurFull)}</div>
          <div>${isUni ? (isSAS ? "Actionnaire unique" : "Associé unique") : f.associe[0].toUpperCase() + f.associe.slice(1)}</div>
        </div>
        ${!isUni && data.associe2Nom ? `<div class="signature-cell">
          <div class="who">${esc([data.associe2Civilite === 'Mme' ? 'Madame' : 'Monsieur', data.associe2Prenom, data.associe2Nom].filter(Boolean).join(' '))}</div>
          <div>${f.associe[0].toUpperCase() + f.associe.slice(1)}</div>
        </div>` : ''}
      </div>
    </div>
    <p class="footer-mention">Statuts générés par Académie Conseils — Document à signer en autant d'exemplaires originaux que de parties, plus un exemplaire pour l'enregistrement.</p>
  `

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><title>Statuts ${esc(f.short)} — ${esc(denom)}</title>
<style>${COMMON_CSS}</style>
</head><body>

${headerBlock}

<div class="page-break"></div>

${preambule}

${partie1}

${partie2}

${partie3}

${partie4}

${partie5}

${partie6}

${signature}

</body></html>`
}

function exerciceDebut(cloture) {
  const map = { '31/12': '1er janvier', '30/06': '1er juillet', '30/09': '1er octobre', '31/03': '1er avril' }
  return map[cloture] || '1er janvier'
}
