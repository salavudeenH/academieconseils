import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
import { buildStatutsHtml } from './pdf-templates/statuts.js'
import { buildPvModificationHtml } from './pdf-templates/pv-modification.js'
import { buildCessionHtml } from './pdf-templates/cession.js'
import { buildDissolutionHtml } from './pdf-templates/dissolution.js'

const TEMPLATES_ROOT = path.join(process.cwd(), 'templates', 'formality')

const TITLE_BY_CATEGORY = {
  modification: 'Procès-verbal d\'assemblée générale extraordinaire',
  cession: 'Acte de cession',
  dissolution: 'Procès-verbal d\'assemblée générale extraordinaire — Dissolution',
}

function buildHtml(formality, data) {
  // 1) Templates dédiés par catégorie
  if (formality.category === 'creation' && ['SARL', 'SAS', 'SASU', 'EURL', 'SCI'].includes(formality.id)) {
    return buildStatutsHtml(formality, data)
  }
  if (formality.category === 'modification') {
    return buildPvModificationHtml(formality, data)
  }
  if (formality.category === 'cession') {
    return buildCessionHtml(formality, data)
  }
  if (formality.category === 'dissolution') {
    return buildDissolutionHtml(formality, data)
  }

  // 2) On charge le template HTML personnalisé si présent
  const specific = path.join(TEMPLATES_ROOT, formality.category, `${formality.id}.html`)
  if (fs.existsSync(specific)) {
    let html = fs.readFileSync(specific, 'utf8')
    return interpolate(html, data, formality)
  }

  // Génération HTML par défaut à partir des sections + données.
  const today = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })

  const renderSection = (section) => {
    const rows = section.fields
      .map((f) => {
        const v = data[f.name]
        if (v === undefined || v === '' || v === null) return ''
        let display = v
        if (f.type === 'select' && f.options) {
          const opt = f.options.find((o) => o.value === v)
          if (opt) display = opt.label
        }
        if (f.type === 'number' && typeof v === 'number') {
          display = v.toLocaleString('fr-FR')
        }
        return `<tr><td class="label">${f.label}</td><td class="value">${escapeHtml(display)}</td></tr>`
      })
      .join('')
    return `
      <section class="block">
        <h3 class="block-title">${section.title}</h3>
        <table class="data">${rows}</table>
      </section>
    `
  }

  const sectionsHtml = formality.sections.map(renderSection).join('')

  const title = TITLE_BY_CATEGORY[formality.category] || formality.name
  const denomination = data.companyName || data.cedantNom || '—'
  const forme = data.companyForm || ''
  const capital = data.capital ? `${Number(data.capital).toLocaleString('fr-FR')} €` : ''
  const adresse = [data.adresse, data.codePostal, data.ville].filter(Boolean).join(' — ')

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><title>${escapeHtml(formality.name)} — ${escapeHtml(denomination)}</title>
<style>
  @page { margin: 2cm; }
  body { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 11pt; color: #1a1a2e; line-height: 1.55; }
  .doc-header { border-bottom: 2px solid #0B132B; padding-bottom: 14px; margin-bottom: 28px; }
  .doc-header .denom { font-size: 18pt; font-weight: 800; letter-spacing: -0.02em; }
  .doc-header .sub { font-size: 10pt; color: #475569; margin-top: 4px; }
  h1 { font-size: 16pt; text-align: center; text-transform: uppercase; letter-spacing: 0.05em; margin: 24px 0 12px; }
  .sub-title { text-align: center; font-size: 12pt; font-weight: 600; margin-bottom: 28px; color: #475569; }
  .preamble { background: #FAF6F1; padding: 14px 18px; border-radius: 8px; margin: 20px 0; font-size: 10.5pt; }
  .block { margin: 18px 0; page-break-inside: avoid; }
  .block-title { font-size: 12pt; font-weight: 700; color: #0B132B; text-transform: uppercase; letter-spacing: 0.04em; border-left: 3px solid #FF6B47; padding-left: 10px; margin: 0 0 10px; }
  table.data { width: 100%; border-collapse: collapse; }
  table.data td { padding: 7px 0; border-bottom: 1px dotted #d6d3d1; vertical-align: top; }
  table.data td.label { width: 45%; color: #475569; font-weight: 500; }
  table.data td.value { font-weight: 600; }
  .resolution { background: #fff; border: 1px solid #e7e5e4; border-radius: 8px; padding: 14px 18px; margin: 14px 0; }
  .resolution-title { font-weight: 700; font-size: 11pt; color: #0B132B; margin-bottom: 6px; }
  .signature { margin-top: 50px; }
  .signature-grid { display: flex; gap: 60px; margin-top: 30px; }
  .signature-block { flex: 1; border-top: 1px solid #0B132B; padding-top: 8px; font-size: 10pt; }
  .signature-block strong { display: block; font-weight: 700; }
  .footer-note { margin-top: 40px; font-size: 9pt; color: #64748b; text-align: center; font-style: italic; }
  .badge { display: inline-block; background: #FFE5DC; color: #C13E1F; font-size: 9pt; font-weight: 700; padding: 2px 8px; border-radius: 999px; letter-spacing: 0.05em; text-transform: uppercase; }
</style>
</head><body>

<div class="doc-header">
  <div class="badge">${escapeHtml(formality.category)}</div>
  <div class="denom">${escapeHtml(denomination)} ${forme ? `· ${escapeHtml(forme)}` : ''}</div>
  <div class="sub">
    ${capital ? `Capital social : ${capital} ` : ''}
    ${adresse ? `· Siège : ${escapeHtml(adresse)}` : ''}
    ${data.siren ? `· SIREN : ${escapeHtml(data.siren)}` : ''}
    ${data.rcsVille ? `· RCS de ${escapeHtml(data.rcsVille)}` : ''}
  </div>
</div>

<h1>${escapeHtml(title)}</h1>
<div class="sub-title">${escapeHtml(formality.name)}</div>

<div class="preamble">
  Le ${escapeHtml(today)}, les soussignés se sont réunis afin de statuer sur l'objet suivant :
  <strong>${escapeHtml(formality.name).toLowerCase()}</strong>. Après lecture des documents et discussion,
  les résolutions suivantes ont été adoptées :
</div>

${sectionsHtml}

${renderResolutions(formality, data)}

<div class="signature">
  <div class="signature-block">
    <strong>Fait à ${escapeHtml(data.ville || '____________')}, le ${escapeHtml(today)}</strong>
  </div>
  <div class="signature-grid">
    <div class="signature-block">
      <strong>Le signataire</strong>
      ${escapeHtml([data.sigCivilite, data.sigPrenom, data.sigNom].filter(Boolean).join(' '))}<br>
      ${escapeHtml(data.sigRole || '')}
    </div>
  </div>
</div>

<div class="footer-note">
  Document généré par Académie Conseils — ${escapeHtml(today)} — Référence : ${escapeHtml(formality.id)}
</div>

</body></html>`
}

// Génère des « résolutions » spécifiques selon le type de formalité.
function renderResolutions(formality, data) {
  const f = formality
  const txt = (s) => escapeHtml(s)

  if (f.category === 'modification') {
    switch (f.id) {
      case 'transfert-siege':
        return `
          <div class="resolution">
            <div class="resolution-title">Première résolution</div>
            L'assemblée décide de transférer le siège social de <strong>${txt([data.adresse, data.codePostal, data.ville].filter(Boolean).join(' — '))}</strong>
            à <strong>${txt([data.newAdresse, data.newCodePostal, data.newVille].filter(Boolean).join(' — '))}</strong>
            à compter du ${txt(data.dateEffet || '')}.
          </div>
          <div class="resolution">
            <div class="resolution-title">Deuxième résolution</div>
            L'article correspondant des statuts est modifié en conséquence.
          </div>`
      case 'changement-dirigeant':
        return `
          <div class="resolution">
            <div class="resolution-title">Résolution unique</div>
            L'assemblée prend acte de la ${txt(data.typeChangement || '')} de
            ${data.sortantNom ? `<strong>${txt(`${data.sortantCivilite || ''} ${data.sortantPrenom || ''} ${data.sortantNom}`)}</strong> ` : ''}
            ${data.entrantNom ? `et nomme <strong>${txt(`${data.entrantCivilite || ''} ${data.entrantPrenom || ''} ${data.entrantNom}`)}</strong> en qualité de dirigeant` : ''}
            à compter du ${txt(data.dateEffet || '')}.
          </div>`
      case 'augmentation-capital':
        return `
          <div class="resolution">
            <div class="resolution-title">Première résolution</div>
            L'assemblée décide d'augmenter le capital social d'un montant de <strong>${txt((+data.montantAugmentation || 0).toLocaleString('fr-FR'))} €</strong>
            par ${txt(data.typeApport || '')}, pour le porter de ${txt((+data.capital || 0).toLocaleString('fr-FR'))} €
            à <strong>${txt((+data.nouveauCapital || 0).toLocaleString('fr-FR'))} €</strong>.
          </div>
          <div class="resolution">
            <div class="resolution-title">Deuxième résolution</div>
            ${txt(+data.nbPartsCreees || 0)} parts/actions nouvelles d'une valeur nominale de
            ${txt(+data.valeurNominale || 0)} € sont créées et attribuées aux apporteurs.
          </div>`
      case 'reduction-capital':
        return `
          <div class="resolution">
            <div class="resolution-title">Première résolution</div>
            L'assemblée décide de réduire le capital social d'un montant de
            <strong>${txt((+data.montantReduction || 0).toLocaleString('fr-FR'))} €</strong> (${txt(data.motifReduction || '')}),
            pour le porter à <strong>${txt((+data.nouveauCapital || 0).toLocaleString('fr-FR'))} €</strong>.
          </div>`
      case 'changement-objet':
        return `
          <div class="resolution">
            <div class="resolution-title">Résolution unique</div>
            L'assemblée décide la <strong>${txt(data.typeModification || '')}</strong> de l'objet social. Le nouvel objet social est rédigé comme suit :
            <p style="margin-top:8px; padding-left:14px; border-left: 3px solid #FFE5DC; font-style: italic;">
              ${txt(data.nouvelObjet || '')}
            </p>
          </div>`
      case 'changement-denomination':
        return `
          <div class="resolution">
            <div class="resolution-title">Résolution unique</div>
            La dénomination sociale, jusqu'alors « <strong>${txt(data.companyName || '')}</strong> », devient :
            <strong>« ${txt(data.nouvelleDenomination || '')} »</strong>
            ${data.nouveauSigle ? `<br>Nouveau sigle : <strong>${txt(data.nouveauSigle)}</strong>` : ''}.
          </div>`
      case 'transformation':
        return `
          <div class="resolution">
            <div class="resolution-title">Résolution unique</div>
            L'assemblée décide de transformer la société (actuellement ${txt(data.companyForm || '')})
            en <strong>${txt(data.nouvelleForme || '')}</strong>.
          </div>`
    }
  }

  if (f.category === 'cession') {
    const cedant = `${data.cedantCivilite || ''} ${data.cedantPrenom || ''} ${data.cedantNom || ''}`.trim()
    const cessionnaire = `${data.cessionnaireCivilite || ''} ${data.cessionnairePrenom || ''} ${data.cessionnaireNom || ''}`.trim()
    if (f.id === 'parts' || f.id === 'actions') {
      const unite = f.id === 'parts' ? 'parts sociales' : 'actions'
      const nb = f.id === 'parts' ? data.nbPartsCedees : data.nbActions
      return `
        <div class="resolution">
          <div class="resolution-title">Objet de la cession</div>
          <strong>${txt(cedant)}</strong> cède à <strong>${txt(cessionnaire)}</strong>
          <strong>${txt(+nb || 0)} ${unite}</strong> de la société <strong>${txt(data.companyName || '')}</strong>,
          d'une valeur nominale unitaire de ${txt(+data.valeurNominale || 0)} €,
          pour un prix total de <strong>${txt((+data.prixCession || 0).toLocaleString('fr-FR'))} €</strong>.
        </div>
        <div class="resolution">
          <div class="resolution-title">Conditions</div>
          La cession prend effet à compter du ${txt(data.dateCession || '')}.
          ${data.modalitePaiement ? `Modalité de paiement : ${txt(data.modalitePaiement)}.` : ''}
        </div>`
    }
    if (f.id === 'fonds') {
      return `
        <div class="resolution">
          <div class="resolution-title">Objet de la cession</div>
          <strong>${txt(data.cedantNom || '')}</strong> cède à <strong>${txt(data.cessionnaireNom || '')}</strong>
          le fonds de commerce d'<em>${txt(data.fondsActivite || '')}</em> exploité sous l'enseigne
          « <strong>${txt(data.fondsEnseigne || '')}</strong> » sis ${txt(data.fondsAdresseExploitation || '')}.
        </div>
        <div class="resolution">
          <div class="resolution-title">Prix</div>
          Prix total : <strong>${txt((+data.prixTotal || 0).toLocaleString('fr-FR'))} €</strong> réparti comme suit :
          <ul>
            <li>Éléments incorporels (clientèle, enseigne, droit au bail) : ${txt((+data.prixElementsIncorporels || 0).toLocaleString('fr-FR'))} €</li>
            <li>Éléments corporels (matériel, mobilier) : ${txt((+data.prixElementsCorporels || 0).toLocaleString('fr-FR'))} €</li>
            <li>Marchandises : ${txt((+data.prixMarchandises || 0).toLocaleString('fr-FR'))} €</li>
          </ul>
          Entrée en jouissance : ${txt(data.dateEntreeJouissance || '')}.
          Séquestre du prix : ${txt(data.sequestre || '')}.
        </div>
        <div class="resolution">
          <div class="resolution-title">Chiffres d'affaires des 3 derniers exercices</div>
          <ul>
            <li>N-1 : ${txt((+data.fondsCAExercice1 || 0).toLocaleString('fr-FR'))} € (résultat : ${txt((+data.fondsResultatExercice1 || 0).toLocaleString('fr-FR'))} €)</li>
            <li>N-2 : ${txt((+data.fondsCAExercice2 || 0).toLocaleString('fr-FR'))} € (résultat : ${txt((+data.fondsResultatExercice2 || 0).toLocaleString('fr-FR'))} €)</li>
            <li>N-3 : ${txt((+data.fondsCAExercice3 || 0).toLocaleString('fr-FR'))} € (résultat : ${txt((+data.fondsResultatExercice3 || 0).toLocaleString('fr-FR'))} €)</li>
          </ul>
        </div>`
    }
  }

  if (f.category === 'dissolution') {
    if (f.id === 'anticipee') {
      const liq = `${data.liqCivilite || ''} ${data.liqPrenom || ''} ${data.liqNom || ''}`.trim()
      return `
        <div class="resolution">
          <div class="resolution-title">Première résolution — Dissolution</div>
          L'assemblée décide la dissolution anticipée de la société à compter du ${txt(data.dateEffet || '')}.
          Motif : <em>${txt(data.motifDissolution || '')}</em>
        </div>
        <div class="resolution">
          <div class="resolution-title">Deuxième résolution — Nomination du liquidateur</div>
          <strong>${txt(liq)}</strong> est nommé(e) liquidateur amiable pour la durée de la liquidation.
        </div>
        <div class="resolution">
          <div class="resolution-title">Troisième résolution — Siège de liquidation</div>
          Le siège de la liquidation est fixé à : ${txt(data.siegeLiquidation || '')}.
        </div>`
    }
    if (f.id === 'liquidation') {
      return `
        <div class="resolution">
          <div class="resolution-title">Comptes de liquidation</div>
          Période : du ${txt(data.dateOuvertureLiq || '')} au ${txt(data.dateClotureLiq || '')}.
          <ul>
            <li>Total actif réalisé : <strong>${txt((+data.totalActif || 0).toLocaleString('fr-FR'))} €</strong></li>
            <li>Total passif apuré : <strong>${txt((+data.totalPassif || 0).toLocaleString('fr-FR'))} €</strong></li>
            <li>${(+data.boniMali || 0) >= 0 ? 'Boni' : 'Mali'} de liquidation : <strong>${txt(Math.abs(+data.boniMali || 0).toLocaleString('fr-FR'))} €</strong></li>
          </ul>
        </div>
        <div class="resolution">
          <div class="resolution-title">Clôture de la liquidation</div>
          L'assemblée approuve les comptes définitifs, donne quitus à ${txt(data.liquidateurNom || '')} et prononce la clôture de la liquidation.
        </div>`
    }
    if (f.id === 'radiation') {
      return `
        <div class="resolution">
          <div class="resolution-title">Demande de radiation</div>
          Demande de radiation au RCS suite à la clôture de la liquidation intervenue le ${txt(data.dateClotureLiq || '')}.
          Liquidateur : ${txt(data.liquidateurNom || '')}, domicilié ${txt(data.liquidateurAdresse || '')}.
        </div>`
    }
  }

  return ''
}

function interpolate(html, data, formality) {
  return html.replace(/\{\{(\w+)\}\}/g, (_, k) => escapeHtml(data[k] ?? formality?.[k] ?? ''))
}

function escapeHtml(v) {
  if (v === undefined || v === null) return ''
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function generateFormalityPdf(formality, data, submissionId) {
  const html = buildHtml(formality, data)
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  try {
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '2cm', right: '2cm', bottom: '2cm', left: '2cm' },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `<div style="font-size:8pt;color:#888;width:100%;text-align:center;">
        Page <span class="pageNumber"></span> / <span class="totalPages"></span>
      </div>`,
    })

    const documentsDir = path.join(process.cwd(), 'public', 'documents')
    if (!fs.existsSync(documentsDir)) fs.mkdirSync(documentsDir, { recursive: true })
    const filename = `${submissionId}.pdf`
    const filePath = path.join(documentsDir, filename)
    fs.writeFileSync(filePath, pdfBuffer)

    return {
      success: true,
      filename,
      downloadUrl: `/documents/${filename}`,
    }
  } finally {
    await browser.close()
  }
}
