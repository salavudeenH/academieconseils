import puppeteer from 'puppeteer'
import { buildStatutsHtml } from './pdf-templates/statuts.js'
import { buildPvModificationHtml } from './pdf-templates/pv-modification.js'
import { buildCessionHtml } from './pdf-templates/cession.js'
import { buildDissolutionHtml } from './pdf-templates/dissolution.js'

/**
 * Construit le HTML du document selon la catégorie et le type.
 */
function buildHtml(formality, data) {
  if (formality.category === 'creation' && ['SARL', 'SAS', 'SASU', 'EURL', 'SCI'].includes(formality.id)) {
    return buildStatutsHtml(formality, data)
  }
  if (formality.category === 'modification') return buildPvModificationHtml(formality, data)
  if (formality.category === 'cession')      return buildCessionHtml(formality, data)
  if (formality.category === 'dissolution')  return buildDissolutionHtml(formality, data)

  // Fallback minimal
  return `<!DOCTYPE html><html><body><h1>${escapeHtml(formality.name)}</h1><p>Type de document non supporté.</p></body></html>`
}

function escapeHtml(v) {
  if (v === undefined || v === null) return ''
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Construit un nom de fichier lisible.
 */
export function buildFilename(formality, data) {
  const slug = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase()
  const denom = slug(data.companyName || data.cedantNom || formality.id)
  const cat = formality.category
  const type = formality.id
  return `${cat}_${type}_${denom || 'document'}.pdf`
}

/**
 * Génère le PDF en mémoire et retourne le buffer (Uint8Array).
 * Ne touche pas au disque.
 */
export async function generateFormalityPdfBuffer(formality, data) {
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
    return pdfBuffer
  } finally {
    await browser.close()
  }
}
