// Génération PV dissolution / liquidation / radiation.
// Modèle : COSMO TVS (dissolution + clôture de liquidation).

import { esc, formatDate, formatMoney, COMMON_CSS } from './_helpers.js'

const FORM_MAP = {
  SARL: { dirigeant: 'Gérant',   isSAS: false },
  EURL: { dirigeant: 'Gérant',   isSAS: false },
  SAS:  { dirigeant: 'Président', isSAS: true },
  SASU: { dirigeant: 'Président', isSAS: true },
  SCI:  { dirigeant: 'Gérant',   isSAS: false },
  SA:   { dirigeant: 'Président', isSAS: true },
}

export function buildDissolutionHtml(formality, data) {
  switch (formality.id) {
    case 'anticipee':   return buildPvDissolution(formality, data)
    case 'liquidation': return buildPvLiquidation(formality, data)
    case 'radiation':   return buildPvRadiation(formality, data)
    default: return `<p>Type de dissolution non reconnu</p>`
  }
}

function header(data) {
  const form = data.companyForm || 'Société'
  const denom = data.companyName || '—'
  const addr = [data.adresse, [data.codePostal, data.ville].filter(Boolean).join(' ')].filter(Boolean).join(' ')
  return `
    <div class="pv-header">
      <div class="denom">« ${esc(denom)} »</div>
      <div class="form">${esc(form)}</div>
      <div class="meta">
        au capital de ${esc(formatMoney(data.capital))}<br>
        Siège social : ${esc(addr)}${data.siren ? `<br>R.C.S. de ${esc(data.rcsVille || '')} ${esc(data.siren)}` : ''}
      </div>
    </div>
  `
}

function buildPvDissolution(formality, data) {
  const form = data.companyForm || 'SARL'
  const f = FORM_MAP[form] || FORM_MAP.SARL
  const denom = data.companyName || '—'
  const signataire = [data.sigCivilite === 'Mme' ? 'Madame' : 'Monsieur', data.sigPrenom, data.sigNom].filter(Boolean).join(' ')
  const liquidateur = [data.liqCivilite === 'Mme' ? 'Madame' : 'Monsieur', data.liqPrenom, data.liqNom].filter(Boolean).join(' ')
  const dateAss = formatDate(data.dateAssemblee)
  const dateEffet = formatDate(data.dateEffet)
  const today = formatDate(new Date().toISOString())

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><title>Dissolution — ${esc(denom)}</title>
<style>${COMMON_CSS}
.pv-header { text-align: center; margin: 0 0 30px; padding-bottom: 20px; border-bottom: 1px solid #14141A; }
.pv-header .denom { font-size: 16pt; font-weight: 700; }
.pv-header .form { font-style: italic; margin-top: 4px; }
.pv-header .meta { margin-top: 10px; font-size: 10.5pt; line-height: 1.6; }
.pv-title { font-size: 14pt; font-weight: 700; text-align: center; margin: 20px 0 8px; }
.pv-subtitle { font-size: 11pt; text-align: center; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 24px; font-weight: 700; }
.resolution { margin: 16px 0; }
.resolution-title { font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 6px; }
</style></head><body>

${header(data)}
<h1 class="pv-title">Procès-Verbal en date du ${esc(dateAss)}</h1>
<h2 class="pv-subtitle">Assemblée Générale Extraordinaire — Dissolution anticipée</h2>

<p>Le ${esc(dateAss)}, ${f.isSAS ? "l'actionnaire unique ou la collectivité des actionnaires" : "les associés"} de la société <strong>${esc(denom)}</strong> se ${f.isSAS ? "sont" : "sont"} réuni(s) en assemblée générale au siège social, sur convocation de la ${f.isSAS ? 'présidence' : 'gérance'}.</p>
<p>L'assemblée délibère sur l'ordre du jour suivant :</p>
<ul><li>Dissolution anticipée pour cause de cessation d'activité</li><li>Nomination du liquidateur amiable</li><li>Détermination du siège de liquidation</li><li>Pouvoirs en vue des formalités</li></ul>

<div class="resolution">
  <div class="resolution-title">Première résolution — Dissolution</div>
  <p>L'assemblée décide de dissoudre par anticipation la société à compter du <strong>${esc(dateEffet)}</strong>. Elle est par conséquent mise en liquidation volontaire à compter de la même date.</p>
  ${data.motifDissolution ? `<p>Motif : <em>${esc(data.motifDissolution)}</em></p>` : ''}
  <p>La dénomination sociale sera suivie de la mention « Société en liquidation » sur tous les actes et documents émanant de la société.</p>
  <p>Cette résolution est adoptée à l'unanimité.</p>
</div>

<div class="resolution">
  <div class="resolution-title">Deuxième résolution — Nomination du liquidateur</div>
  <p>Est nommé en qualité de liquidateur amiable, pour toute la durée de la liquidation : <strong>${esc(liquidateur)}</strong>${data.liqDateNaissance ? `, né le ${formatDate(data.liqDateNaissance)}` : ''}${data.liqAdresse ? `, demeurant au ${esc(data.liqAdresse)}` : ''}.</p>
  <p>Le liquidateur déclare accepter ses fonctions et n'être frappé d'aucune incompatibilité ou interdiction susceptible d'empêcher l'exercice de son mandat.</p>
  <p>Cette résolution est adoptée à l'unanimité.</p>
</div>

<div class="resolution">
  <div class="resolution-title">Troisième résolution — Siège de liquidation</div>
  <p>Le siège de la liquidation est fixé à : <strong>${esc(data.siegeLiquidation || '—')}</strong>. C'est à cette adresse que doivent être adressés tous les actes et documents concernant la liquidation.</p>
  <p>Cette résolution est adoptée à l'unanimité.</p>
</div>

<div class="resolution">
  <div class="resolution-title">Quatrième résolution — Pouvoirs du liquidateur</div>
  <p>L'assemblée donne tous pouvoirs au liquidateur pour effectuer la liquidation de l'entreprise. À ce titre, le liquidateur pourra payer le passif, réaliser l'actif et répartir le solde de la liquidation entre les ${f.isSAS ? 'actionnaires' : 'associés'} au prorata de leurs droits.</p>
</div>

<div class="resolution">
  <div class="resolution-title">Cinquième résolution — Pouvoirs en vue des formalités</div>
  <p>L'assemblée donne tous pouvoirs au porteur de copies ou d'extraits du présent procès-verbal pour remplir toutes formalités de droit (annonce légale, dépôt au greffe, inscription au RCS).</p>
</div>

<p>L'ordre du jour étant épuisé, la séance est levée.</p>
<p>Fait en 4 originaux, à ${esc(data.ville || '____________')}, le ${esc(today)}.</p>

<div class="signature-block">
  <div class="signature-grid">
    <div class="signature-cell">
      <div class="who">${esc(signataire)}</div>
      <div>${esc(data.sigRole || f.dirigeant)}</div>
    </div>
  </div>
</div>

</body></html>`
}

function buildPvLiquidation(formality, data) {
  const form = data.companyForm || 'SARL'
  const f = FORM_MAP[form] || FORM_MAP.SARL
  const denom = data.companyName || '—'
  const today = formatDate(new Date().toISOString())
  const dateOuv = formatDate(data.dateOuvertureLiq)
  const dateCloture = formatDate(data.dateClotureLiq)
  const actif = Number(data.totalActif) || 0
  const passif = Number(data.totalPassif) || 0
  const boniMali = Number(data.boniMali) || 0

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><title>Clôture de liquidation — ${esc(denom)}</title>
<style>${COMMON_CSS}
.pv-header { text-align: center; margin: 0 0 30px; padding-bottom: 20px; border-bottom: 1px solid #14141A; }
.pv-header .denom { font-size: 16pt; font-weight: 700; }
.pv-header .form { font-style: italic; margin-top: 4px; }
.pv-header .meta { margin-top: 10px; font-size: 10.5pt; line-height: 1.6; }
.pv-title { font-size: 14pt; font-weight: 700; text-align: center; margin: 20px 0 8px; }
.pv-subtitle { font-size: 11pt; text-align: center; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 24px; font-weight: 700; }
.resolution { margin: 16px 0; }
.resolution-title { font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 6px; }
.compte-table { width: 100%; border-collapse: collapse; margin: 20px 0; max-width: 480px; }
.compte-table td { padding: 8px 14px; border-bottom: 1px solid #C5C5CB; }
.compte-table td:last-child { text-align: right; font-weight: 700; }
.compte-total { background: #F8F4ED; font-weight: 700; }
</style></head><body>

${header(data)}
<h1 class="pv-title">Procès-Verbal de clôture de liquidation</h1>
<h2 class="pv-subtitle">en date du ${esc(dateCloture)}</h2>

<p>Le ${esc(dateCloture)}, ${f.isSAS ? "l'actionnaire unique ou la collectivité des actionnaires" : "les associés"} de la société <strong>${esc(denom)}</strong>, société en liquidation, se ${f.isSAS ? "sont" : "sont"} réuni(s) sur convocation du liquidateur <strong>${esc(data.liquidateurNom || '')}</strong>.</p>
<p>L'assemblée délibère sur l'ordre du jour suivant : <em>Clôture des opérations de liquidation</em>.</p>

<div class="resolution">
  <div class="resolution-title">Première résolution — Approbation des comptes de clôture</div>
  <p>L'assemblée approuve les comptes de clôture de liquidation établis par le liquidateur pour la période du ${esc(dateOuv)} au ${esc(dateCloture)} et constate la clôture de la liquidation.</p>
  <table class="compte-table">
    <tr><td>Total actif réalisé</td><td>${formatMoney(actif)}</td></tr>
    <tr><td>Total passif apuré</td><td>${formatMoney(passif)}</td></tr>
    <tr class="compte-total"><td>${boniMali >= 0 ? 'Boni' : 'Mali'} de liquidation</td><td>${formatMoney(Math.abs(boniMali))}</td></tr>
  </table>
  <p>Cette résolution est adoptée à l'unanimité.</p>
</div>

<div class="resolution">
  <div class="resolution-title">Deuxième résolution — Quitus au liquidateur</div>
  <p>L'assemblée décharge de sa mission de liquidateur <strong>${esc(data.liquidateurNom || '')}</strong> et lui donne quitus entier et définitif de sa gestion.</p>
  <p>Cette résolution est adoptée à l'unanimité.</p>
</div>

<div class="resolution">
  <div class="resolution-title">Troisième résolution — Clôture de la liquidation</div>
  <p>L'assemblée prononce la clôture de la liquidation. La société est définitivement dissoute à compter de ce jour et perdra sa personnalité morale dès l'inscription de la radiation au Registre du commerce et des sociétés.</p>
  <p>Cette résolution est adoptée à l'unanimité.</p>
</div>

<div class="resolution">
  <div class="resolution-title">Quatrième résolution — Pouvoirs en vue des formalités</div>
  <p>L'assemblée donne tous pouvoirs au porteur de copies ou d'extraits du présent procès-verbal pour remplir toutes formalités de publicité légale et notamment la demande de radiation au Registre du commerce et des sociétés.</p>
</div>

<p>L'ordre du jour étant épuisé, la séance est levée.</p>
<p>Fait en 4 originaux, à ${esc(data.ville || '____________')}, le ${esc(today)}.</p>

<div class="signature-block">
  <div class="signature-grid">
    <div class="signature-cell">
      <div class="who">${esc(data.liquidateurNom || '')}</div>
      <div>Liquidateur</div>
    </div>
  </div>
</div>

<div class="page-break"></div>

${header(data)}
<h1 class="pv-title">Comptes de clôture de liquidation</h1>

<table class="compte-table" style="max-width:none;">
  <tr><td>Total actif réalisé</td><td>${formatMoney(actif)}</td></tr>
  <tr><td>Total passif apuré</td><td>${formatMoney(passif)}</td></tr>
  <tr><td>Capital social remboursé aux ${f.isSAS ? 'actionnaires' : 'associés'}</td><td>${formatMoney(data.capital || 0)}</td></tr>
  <tr class="compte-total"><td>${boniMali >= 0 ? 'Boni' : 'Mali'} de liquidation</td><td>${formatMoney(Math.abs(boniMali))}</td></tr>
</table>

<p>Fait en 4 originaux, à ${esc(data.ville || '____________')}, le ${esc(today)}.</p>

</body></html>`
}

function buildPvRadiation(formality, data) {
  const denom = data.companyName || '—'
  const today = formatDate(new Date().toISOString())

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><title>Radiation — ${esc(denom)}</title>
<style>${COMMON_CSS}
.pv-header { text-align: center; margin: 0 0 30px; padding-bottom: 20px; border-bottom: 1px solid #14141A; }
.pv-header .denom { font-size: 16pt; font-weight: 700; }
.pv-header .form { font-style: italic; margin-top: 4px; }
.pv-header .meta { margin-top: 10px; font-size: 10.5pt; line-height: 1.6; }
.pv-title { font-size: 14pt; font-weight: 700; text-align: center; margin: 20px 0 30px; }
</style></head><body>

${header(data)}
<h1 class="pv-title">Demande de radiation au Registre du Commerce et des Sociétés</h1>

<p>Je soussigné <strong>${esc(data.liquidateurNom || '')}</strong>, demeurant ${esc(data.liquidateurAdresse || '')}, agissant en qualité de liquidateur de la société <strong>${esc(denom)}</strong>, ${esc(data.companyForm || '')} au capital de ${formatMoney(data.capital)}${data.siren ? `, immatriculée au R.C.S. de ${esc(data.rcsVille || '')} sous le numéro ${esc(data.siren)}` : ''},</p>

<p>Demande la radiation de la société du Registre du commerce et des sociétés.</p>

<p>La liquidation a été clôturée par décision de l'assemblée des ${esc(data.companyForm || '').includes('SAS') ? 'actionnaires' : 'associés'} en date du <strong>${formatDate(data.dateClotureLiq)}</strong>.</p>

<p>Le procès-verbal de clôture de la liquidation, les comptes de clôture et l'avis d'insertion publiés dans un journal d'annonces légales sont joints à la présente demande.</p>

<p style="margin-top:40px;">Fait à ${esc(data.ville || '____________')}, le ${esc(today)}.</p>

<div class="signature-block">
  <div class="signature-grid">
    <div class="signature-cell">
      <div class="who">${esc(data.liquidateurNom || '')}</div>
      <div>Liquidateur</div>
    </div>
  </div>
</div>

</body></html>`
}
