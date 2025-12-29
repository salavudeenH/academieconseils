import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

export async function generateSarlStatuts(formData, orderId) {
  try {
    // Validation des données requises
    if (!formData.step1 || !formData.step2 || !formData.step3 || !formData.step4) {
      throw new Error('Données du formulaire incomplètes')
    }

    // Lecture du template HTML
    const templatePath = path.join(process.cwd(), 'templates', 'sarl', 'statuts-base.html')
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8')

    // Préparation des données
    const currentDate = new Date()
    const dateCreation = currentDate.toLocaleDateString('fr-FR')
    const anneeCreation = currentDate.getFullYear()
    
    // Construction du tableau des associés
    const tableauAssocies = formData.step3.shareholders
      .map(shareholder => {
        const montant = Math.round((formData.step1.capital * shareholder.shares) / 100)
        return `
          <tr>
            <td>${shareholder.name}</td>
            <td>${montant}</td>
            <td>${shareholder.shares}%</td>
            <td>${montant} €</td>
          </tr>`
      })
      .join('')

    // Construction de l'adresse complète du siège
    const siegeComplet = `${formData.step2.address}\n${formData.step2.postalCode} ${formData.step2.city}`
    
    // Construction du nom complet du gérant avec adresse
    const gerantComplet = `${formData.step3.managerFirstName} ${formData.step3.managerLastName}\nDemeurant : ${formData.step3.managerAddress}, ${formData.step3.managerPostalCode} ${formData.step3.managerCity}`

    // Remplacement des variables dans le template
    const variables = {
      '{{DENOMINATION}}': formData.step1.companyName,
      '{{SIEGE_COMPLET}}': siegeComplet,
      '{{VILLE_SIEGE}}': formData.step2.city,
      '{{CAPITAL}}': formData.step1.capital.toLocaleString('fr-FR'),
      '{{OBJET}}': formData.step1.purpose,
      '{{GERANT_COMPLET}}': gerantComplet,
      '{{DUREE}}': '99', // Durée standard
      '{{DATE_CREATION}}': dateCreation,
      '{{ANNEE_CREATION}}': anneeCreation.toString(),
      '{{TABLEAU_ASSOCIES}}': tableauAssocies,
      '{{DATE_GENERATION}}': dateCreation
    }

    // Application des remplacements
    for (const [variable, value] of Object.entries(variables)) {
      htmlTemplate = htmlTemplate.replace(new RegExp(variable, 'g'), value)
    }

    // Configuration Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process'
      ]
    })

    const page = await browser.newPage()
    
    // Configuration de la page
    await page.setContent(htmlTemplate, {
      waitUntil: 'networkidle0'
    })

    // Configuration PDF
    const pdfOptions = {
      format: 'A4',
      margin: {
        top: '2cm',
        right: '2cm',
        bottom: '2cm',
        left: '2cm'
      },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-size: 10px; text-align: center; width: 100%; color: #666;">
          Page <span class="pageNumber"></span> sur <span class="totalPages"></span>
        </div>
      `
    }

    // Génération du PDF
    const pdfBuffer = await page.pdf(pdfOptions)
    
    await browser.close()

    // Sauvegarde du fichier
    const documentsDir = path.join(process.cwd(), 'public', 'documents')
    if (!fs.existsSync(documentsDir)) {
      fs.mkdirSync(documentsDir, { recursive: true })
    }

    const filename = `statuts-${orderId || Date.now()}.pdf`
    const filePath = path.join(documentsDir, filename)
    
    fs.writeFileSync(filePath, pdfBuffer)

    // Log de succès
    console.log(`✅ PDF généré avec succès: ${filename}`)
    console.log(`📁 Chemin: ${filePath}`)

    return {
      success: true,
      filename,
      path: filePath,
      downloadUrl: `/documents/${filename}`,
      size: pdfBuffer.length
    }

  } catch (error) {
    console.error('❌ Erreur lors de la génération PDF:', error)
    
    return {
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }
  }
}

export async function validateFormDataForPDF(formData) {
  const errors = []

  // Validation étape 1
  if (!formData.step1?.companyName) {
    errors.push('Dénomination sociale manquante')
  }
  if (!formData.step1?.capital || formData.step1.capital < 1) {
    errors.push('Capital social invalide')
  }
  if (!formData.step1?.purpose) {
    errors.push('Objet social manquant')
  }

  // Validation étape 2
  if (!formData.step2?.address || !formData.step2?.city || !formData.step2?.postalCode) {
    errors.push('Adresse du siège social incomplète')
  }

  // Validation étape 3
  if (!formData.step3?.managerFirstName || !formData.step3?.managerLastName) {
    errors.push('Informations du gérant manquantes')
  }
  if (!formData.step3?.shareholders || formData.step3.shareholders.length === 0) {
    errors.push('Aucun associé défini')
  }

  // Validation répartition du capital
  if (formData.step3?.shareholders) {
    const totalShares = formData.step3.shareholders.reduce((sum, sh) => sum + (sh.shares || 0), 0)
    if (totalShares !== 100) {
      errors.push(`Répartition du capital incorrecte: ${totalShares}% au lieu de 100%`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}