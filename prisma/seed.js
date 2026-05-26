// Seed script — crée un admin + des users de test avec des formalités.
// Usage : npx prisma db seed

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const HASH_ROUNDS = 10

async function upsertUser({ email, password, firstName, lastName, role = 'USER', phone }) {
  const hashed = await bcrypt.hash(password, HASH_ROUNDS)
  return prisma.user.upsert({
    where: { email },
    update: { password: hashed, firstName, lastName, role, phone },
    create: { email, password: hashed, firstName, lastName, role, phone },
  })
}

async function createFormality(userId, { category, type, price, data, status = 'DOCUMENTS_GENERATED', createdAt }) {
  return prisma.formality.create({
    data: { userId, category, type, price, data, status, createdAt: createdAt || new Date() },
  })
}

async function main() {
  console.log('🌱 Seed en cours…')

  // ============================================
  //   Admin
  // ============================================
  const admin = await upsertUser({
    email: 'admin@academie-conseils.fr',
    password: 'admin123!',
    firstName: 'Admin',
    lastName: 'Académie',
    role: 'ADMIN',
    phone: '0123456789',
  })
  console.log('  ✓ Admin créé :', admin.email)

  // ============================================
  //   User 1 — Camille Dufresne (Studio Pollen, SAS)
  // ============================================
  const camille = await upsertUser({
    email: 'camille@studio-pollen.fr',
    password: 'test1234',
    firstName: 'Camille',
    lastName: 'Dufresne',
    phone: '0612345678',
  })

  // Nettoyage des anciennes formalités pour éviter les doublons en re-seed
  await prisma.formality.deleteMany({ where: { userId: camille.id } })

  await createFormality(camille.id, {
    category: 'creation',
    type: 'SAS',
    price: 199,
    status: 'DOCUMENTS_GENERATED',
    createdAt: new Date('2026-04-21'),
    data: {
      companyName: 'Studio Pollen', sigle: 'SP',
      objet: 'Studio créatif de design graphique et conseil en stratégie de marque ; conception de supports de communication print et digital.',
      adresse: '27 rue du Faubourg Saint-Antoine', codePostal: '75011', ville: 'Paris',
      dureeAnnees: 99,
      capital: 5000, nbParts: 500, valeurNominale: 10,
      apportNumeraire: 5000, apportNature: 0,
      banqueDepot: 'BNP Paribas, agence Paris Bastille',
      liberationCapital: 'integrale',
      fondateurCivilite: 'Mme', fondateurPrenom: 'Camille', fondateurNom: 'Dufresne',
      fondateurDateNaissance: '1990-03-15', fondateurLieuNaissance: 'Lyon', fondateurNationalite: 'Française',
      fondateurAdresse: '8 rue des Lilas', fondateurCP: '75011', fondateurVille: 'Paris',
      fondateurEmail: 'camille@studio-pollen.fr', fondateurTel: '0612345678',
      dirigeantMode: 'fondateur', dureeDirigeant: 'indeterminee', remunerationDirigeant: 'aucune',
      regimeFiscal: 'IS', tva: 'reel-normal', dateClotureExercice: '31/12', dureePremierExercice: 'longue',
      sigEmail: 'camille@studio-pollen.fr', sigTelephone: '0612345678',
      dateSignature: '2026-04-21', lieuSignature: 'Paris',
    },
  })

  await createFormality(camille.id, {
    category: 'modification',
    type: 'transfert-siege',
    price: 129,
    status: 'COMPLETED',
    createdAt: new Date('2026-05-05'),
    data: {
      companyName: 'Studio Pollen', companyForm: 'SAS', siren: '912345678', rcsVille: 'Paris',
      capital: 5000,
      adresse: '27 rue du Faubourg Saint-Antoine', codePostal: '75011', ville: 'Paris',
      newAdresse: '14 boulevard Voltaire', newCodePostal: '75011', newVille: 'Paris',
      dateAssemblee: '2026-05-05', dateEffet: '2026-05-05',
      motif: 'Croissance de l\'équipe, locaux plus grands',
      sigCivilite: 'Mme', sigPrenom: 'Camille', sigNom: 'Dufresne', sigRole: 'Présidente',
      sigEmail: 'camille@studio-pollen.fr', sigTelephone: '0612345678',
    },
  })
  console.log('  ✓ User créé :', camille.email, '(2 formalités)')

  // ============================================
  //   User 2 — Thomas Renaud (Renaud Conseil, EURL)
  // ============================================
  const thomas = await upsertUser({
    email: 'thomas@renaud-conseil.fr',
    password: 'test1234',
    firstName: 'Thomas',
    lastName: 'Renaud',
    phone: '0698765432',
  })
  await prisma.formality.deleteMany({ where: { userId: thomas.id } })

  await createFormality(thomas.id, {
    category: 'creation',
    type: 'EURL',
    price: 129,
    status: 'COMPLETED',
    createdAt: new Date('2026-02-10'),
    data: {
      companyName: 'Renaud Conseil', sigle: '',
      objet: 'Conseil en stratégie d\'entreprise pour PME ; accompagnement opérationnel ; formation continue.',
      adresse: '14 Place Bellecour', codePostal: '69002', ville: 'Lyon',
      dureeAnnees: 99,
      capital: 3000, nbParts: 300, valeurNominale: 10,
      apportNumeraire: 3000, apportNature: 0,
      banqueDepot: 'Crédit Agricole, agence Lyon Bellecour',
      liberationCapital: 'integrale',
      fondateurCivilite: 'M', fondateurPrenom: 'Thomas', fondateurNom: 'Renaud',
      fondateurDateNaissance: '1988-07-22', fondateurLieuNaissance: 'Bordeaux', fondateurNationalite: 'Française',
      fondateurAdresse: '5 rue Bouteille', fondateurCP: '69001', fondateurVille: 'Lyon',
      fondateurEmail: 'thomas@renaud-conseil.fr', fondateurTel: '0698765432',
      dirigeantMode: 'fondateur', dureeDirigeant: 'indeterminee', remunerationDirigeant: 'fixe',
      regimeFiscal: 'IR', tva: 'reel-simplifie', dateClotureExercice: '31/12', dureePremierExercice: 'normale',
      sigEmail: 'thomas@renaud-conseil.fr', sigTelephone: '0698765432',
      dateSignature: '2026-02-10', lieuSignature: 'Lyon',
    },
  })

  await createFormality(thomas.id, {
    category: 'dissolution',
    type: 'anticipee',
    price: 199,
    status: 'IN_REVIEW',
    createdAt: new Date('2026-05-20'),
    data: {
      companyName: 'Renaud Conseil', companyForm: 'EURL', siren: '932145678', rcsVille: 'Lyon',
      capital: 3000,
      adresse: '14 Place Bellecour', codePostal: '69002', ville: 'Lyon',
      dateAssemblee: '2026-05-20', dateEffet: '2026-06-01',
      motifDissolution: 'Cessation volontaire d\'activité, le fondateur rejoignant une autre structure.',
      siegeLiquidation: '5 rue Bouteille 69001 Lyon',
      liqCivilite: 'M', liqPrenom: 'Thomas', liqNom: 'Renaud',
      liqDateNaissance: '1988-07-22', liqAdresse: '5 rue Bouteille 69001 Lyon',
      sigCivilite: 'M', sigPrenom: 'Thomas', sigNom: 'Renaud', sigRole: 'Gérant',
      sigEmail: 'thomas@renaud-conseil.fr', sigTelephone: '0698765432',
    },
  })
  console.log('  ✓ User créé :', thomas.email, '(2 formalités)')

  // ============================================
  //   User 3 — Sofia Martelli (Cosmo TVS, SARL)
  // ============================================
  const sofia = await upsertUser({
    email: 'sofia@cosmo-tvs.com',
    password: 'test1234',
    firstName: 'Sofia',
    lastName: 'Martelli',
    phone: '0623456789',
  })
  await prisma.formality.deleteMany({ where: { userId: sofia.id } })

  await createFormality(sofia.id, {
    category: 'cession',
    type: 'parts',
    price: 149,
    status: 'PENDING_PAYMENT',
    createdAt: new Date('2026-05-18'),
    data: {
      companyName: 'Cosmo TVS', companyForm: 'SARL', siren: '933764417', rcsVille: 'Marseille',
      capital: 25000,
      adresse: '55 Rue Grignan', codePostal: '13006', ville: 'Marseille',
      cedantCivilite: 'Mme', cedantPrenom: 'Sofia', cedantNom: 'Martelli',
      cedantDateNaissance: '1986-11-04', cedantLieuNaissance: 'Naples',
      cedantAdresse: '12 boulevard Baille 13005 Marseille',
      cessionnaireCivilite: 'M', cessionnairePrenom: 'Karim', cessionnaireNom: 'Belkacem',
      cessionnaireDateNaissance: '1990-09-12', cessionnaireLieuNaissance: 'Alger',
      cessionnaireAdresse: '8 avenue du Prado 13008 Marseille',
      nbPartsCedees: 750, valeurNominale: 10, prixCession: 15000,
      modalitePaiement: 'comptant', dateCession: '2026-06-01',
      sigCivilite: 'Mme', sigPrenom: 'Sofia', sigNom: 'Martelli', sigRole: 'Cédante',
      sigEmail: 'sofia@cosmo-tvs.com', sigTelephone: '0623456789',
    },
  })
  console.log('  ✓ User créé :', sofia.email, '(1 formalité)')

  // ============================================
  //   User 4 — Karim Belkacem (juste un compte sans formalité)
  // ============================================
  const karim = await upsertUser({
    email: 'karim@example.com',
    password: 'test1234',
    firstName: 'Karim',
    lastName: 'Belkacem',
    phone: '0634567890',
  })
  await prisma.formality.deleteMany({ where: { userId: karim.id } })
  console.log('  ✓ User créé :', karim.email, '(0 formalité)')

  console.log('\n📊 Récapitulatif :')
  console.log('   Users        :', await prisma.user.count())
  console.log('   Formalités   :', await prisma.formality.count())
  console.log('\n🔑 Credentials :')
  console.log('   Admin   → admin@academie-conseils.fr / admin123!')
  console.log('   User 1  → camille@studio-pollen.fr / test1234')
  console.log('   User 2  → thomas@renaud-conseil.fr / test1234')
  console.log('   User 3  → sofia@cosmo-tvs.com / test1234')
  console.log('   User 4  → karim@example.com / test1234')
  console.log('\n✅ Seed terminé.')
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
