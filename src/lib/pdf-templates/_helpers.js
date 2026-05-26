// Helpers communs aux templates PDF.

export function esc(v) {
  if (v === undefined || v === null) return ''
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function formatDate(v) {
  if (!v) return ''
  try {
    const d = new Date(v)
    if (isNaN(d.getTime())) return String(v)
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch { return String(v) }
}

export function formatMoney(v) {
  const n = Number(v) || 0
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + ' €'
}

export function formatNumber(v) {
  const n = Number(v) || 0
  return n.toLocaleString('fr-FR')
}

// 1234 → "mille deux cent trente-quatre"
const UNITS = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf']
const TENS = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt']

function below100(n) {
  if (n < 20) return UNITS[n]
  const t = Math.floor(n / 10), u = n % 10
  if (t === 7 || t === 9) {
    return TENS[t] + (t === 7 && u === 1 ? ' et ' : '-') + UNITS[10 + u]
  }
  if (t === 8) return 'quatre-vingt' + (u === 0 ? 's' : '-' + UNITS[u])
  return TENS[t] + (u === 1 ? ' et un' : (u ? '-' + UNITS[u] : ''))
}

function below1000(n) {
  if (n < 100) return below100(n)
  const c = Math.floor(n / 100), r = n % 100
  const cents = c === 1 ? 'cent' : UNITS[c] + ' cent' + (r === 0 ? 's' : '')
  return cents + (r ? ' ' + below100(r) : '')
}

export function numberToFrench(n) {
  n = Number(n) || 0
  if (n === 0) return 'zéro'
  if (n < 0) return 'moins ' + numberToFrench(-n)
  if (n < 1000) return below1000(n)
  if (n < 1000000) {
    const m = Math.floor(n / 1000), r = n % 1000
    const mille = m === 1 ? 'mille' : below1000(m) + ' mille'
    return mille + (r ? ' ' + below1000(r) : '')
  }
  if (n < 1000000000) {
    const m = Math.floor(n / 1000000), r = n % 1000000
    return below1000(m) + ' million' + (m > 1 ? 's' : '') + (r ? ' ' + numberToFrench(r) : '')
  }
  return String(n)
}

export function moneyInWords(v) {
  const n = Math.floor(Number(v) || 0)
  return numberToFrench(n) + ' EUROS'
}

export function pageBreak() {
  return '<div class="page-break"></div>'
}

// CSS commun à tous les actes
export const COMMON_CSS = `
@page { margin: 2.4cm 2.2cm; size: A4; }

* { box-sizing: border-box; }

body {
  font-family: 'Times New Roman', Cambria, Georgia, serif;
  font-size: 11pt;
  color: #14141A;
  line-height: 1.55;
}

h1.cover-title {
  font-size: 32pt;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-align: center;
  margin: 80px 0 60px;
  border-top: 2px solid #14141A;
  border-bottom: 2px solid #14141A;
  padding: 24px 0;
}

.cover-header {
  text-align: center;
  margin: 200px 0 0;
}
.cover-header .denom {
  font-size: 24pt;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.cover-header .form {
  font-size: 13pt;
  font-style: italic;
  margin-top: 10px;
}
.cover-header .meta {
  margin-top: 20px;
  font-size: 11pt;
  line-height: 1.7;
}

.cover-footer {
  position: absolute;
  bottom: 1cm;
  left: 2.2cm;
  right: 2.2cm;
  text-align: center;
  font-size: 9pt;
  color: #6B6B75;
  border-top: 1px solid #C5C5CB;
  padding-top: 8px;
}

h2.part-title {
  font-size: 13pt;
  font-weight: 700;
  text-align: center;
  margin: 32px 0 14px;
  text-transform: none;
  letter-spacing: 0.01em;
  page-break-after: avoid;
}

h3.article-title {
  font-size: 11.5pt;
  font-weight: 700;
  margin: 18px 0 8px;
  page-break-after: avoid;
}

h4.subsection {
  font-size: 11pt;
  font-weight: 700;
  margin: 14px 0 6px;
  page-break-after: avoid;
}

p, ul, ol {
  margin: 0 0 9px;
  text-align: justify;
  hyphens: auto;
}

ul, ol { padding-left: 24px; }
li { margin-bottom: 4px; }

strong { font-weight: 700; }
em { font-style: italic; }

.preamble {
  margin: 18px 0;
  text-align: justify;
}

.signature-block {
  margin-top: 60px;
  page-break-inside: avoid;
}
.signature-block .place-date {
  margin-bottom: 30px;
}
.signature-grid {
  display: table;
  width: 100%;
  border-spacing: 30px 0;
}
.signature-cell {
  display: table-cell;
  width: 50%;
  border-top: 1px solid #14141A;
  padding-top: 6px;
  font-size: 10pt;
  vertical-align: top;
}
.signature-cell .who { font-weight: 700; margin-bottom: 4px; }

.page-break { page-break-after: always; }

.toc { margin: 30px 0; font-size: 10.5pt; }
.toc-entry { display: flex; justify-content: space-between; padding: 3px 0; border-bottom: 1px dotted #C5C5CB; }
.toc-num { font-weight: 700; margin-right: 10px; }

.footer-mention {
  margin-top: 60px;
  padding-top: 14px;
  border-top: 1px solid #C5C5CB;
  font-size: 9pt;
  font-style: italic;
  color: #6B6B75;
  text-align: center;
}
`
