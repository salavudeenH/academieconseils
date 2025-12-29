export const COMPANY_TYPES = {
  SARL: {
    id: 'SARL',
    name: 'SARL',
    fullName: 'Société à Responsabilité Limitée',
    description: 'Structure classique pour PME, responsabilité limitée au capital.',
    icon: '🏢',
    minCapital: 1,
    maxCapital: 10000000,
    minShareholders: 2,
    maxShareholders: 100,
    managerTitle: 'Gérant',
    features: [
      'Capital minimum de 1€',
      '2 à 100 associés',
      'Responsabilité limitée',
      'Gérant majoritaire ou minoritaire'
    ],
    advantages: [
      'Structure simple et souple',
      'Crédibilité auprès des partenaires',
      'Protection du patrimoine personnel',
      'Transmission facilitée'
    ],
    price: 149
  },
  
  SAS: {
    id: 'SAS',
    name: 'SAS',
    fullName: 'Société par Actions Simplifiée',
    description: 'Structure moderne et flexible, idéale pour les projets innovants.',
    icon: '🚀',
    minCapital: 1,
    maxCapital: 50000000,
    minShareholders: 2,
    maxShareholders: 999,
    managerTitle: 'Président',
    features: [
      'Capital minimum de 1€',
      '2 à 999 actionnaires',
      'Fonctionnement très flexible',
      'Président obligatoire'
    ],
    advantages: [
      'Grande liberté statutaire',
      'Facilite l\'entrée d\'investisseurs',
      'Cession d\'actions simplifiée',
      'Pas de commissaire aux comptes obligatoire'
    ],
    price: 199
  },

  SASU: {
    id: 'SASU',
    name: 'SASU',
    fullName: 'Société par Actions Simplifiée Unipersonnelle',
    description: 'Version unipersonnelle de la SAS, parfaite pour entrepreneurs solo.',
    icon: '👤',
    minCapital: 1,
    maxCapital: 10000000,
    minShareholders: 1,
    maxShareholders: 1,
    managerTitle: 'Président',
    features: [
      'Capital minimum de 1€',
      '1 seul actionnaire',
      'Président unique',
      'Régime social avantageux'
    ],
    advantages: [
      'Protection sociale du dirigeant',
      'Pas de cotisations si pas de rémunération',
      'Facilité de transformation en SAS',
      'Crédibilité professionnelle'
    ],
    price: 179
  },

  EURL: {
    id: 'EURL',
    name: 'EURL',
    fullName: 'Entreprise Unipersonnelle à Responsabilité Limitée',
    description: 'Version unipersonnelle de la SARL, simple et protectrice.',
    icon: '🛡️',
    minCapital: 1,
    maxCapital: 5000000,
    minShareholders: 1,
    maxShareholders: 1,
    managerTitle: 'Gérant',
    features: [
      'Capital minimum de 1€',
      '1 seul associé',
      'Gérant unique',
      'Transformation en SARL possible'
    ],
    advantages: [
      'Simplicité de gestion',
      'Protection du patrimoine',
      'Option pour l\'IR ou l\'IS',
      'Évolution vers SARL facilitée'
    ],
    price: 129
  },

  SCI: {
    id: 'SCI',
    name: 'SCI',
    fullName: 'Société Civile Immobilière',
    description: 'Structure dédiée à la détention et gestion de biens immobiliers.',
    icon: '🏠',
    minCapital: 1,
    maxCapital: 1000000,
    minShareholders: 2,
    maxShareholders: 999,
    managerTitle: 'Gérant',
    features: [
      'Capital minimum de 1€',
      '2 à 999 associés',
      'Objet civil exclusif',
      'Gérance libre ou statutaire'
    ],
    advantages: [
      'Optimisation succession',
      'Gestion collective d\'un patrimoine',
      'Avantages fiscaux possibles',
      'Éviter l\'indivision'
    ],
    price: 169
  }
}

export const getCompanyTypeById = (id) => {
  return COMPANY_TYPES[id] || null
}

export const getAllCompanyTypes = () => {
  return Object.values(COMPANY_TYPES)
}

export const getCompanyTypesByCategory = () => {
  return {
    commercial: [COMPANY_TYPES.SARL, COMPANY_TYPES.SAS],
    unipersonal: [COMPANY_TYPES.SASU, COMPANY_TYPES.EURL],
    civil: [COMPANY_TYPES.SCI]
  }
}