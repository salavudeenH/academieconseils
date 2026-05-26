// Configurations des formalités (modification / cession / dissolution).
// Chaque config définit : sections, champs, prix, template PDF, libellés.

// Sections communes réutilisables
const SECTION_SOCIETE = {
  id: 'societe',
  title: 'Votre société',
  description: 'Les informations qui figurent sur votre Kbis.',
  fields: [
    { name: 'companyName', label: 'Dénomination sociale', type: 'text', required: true, placeholder: 'NEOFORMA' },
    { name: 'companyForm', label: 'Forme juridique', type: 'select', required: true, options: [
      { value: 'SARL', label: 'SARL' },
      { value: 'SAS', label: 'SAS' },
      { value: 'SASU', label: 'SASU' },
      { value: 'EURL', label: 'EURL' },
      { value: 'SCI', label: 'SCI' },
      { value: 'SA', label: 'SA' },
    ] },
    { name: 'siren', label: 'Numéro SIREN', type: 'text', required: true, pattern: '\\d{9}', placeholder: '123 456 789' },
    { name: 'rcsVille', label: 'RCS de', type: 'text', required: true, placeholder: 'Paris' },
    { name: 'capital', label: 'Capital social (€)', type: 'number', required: true, min: 1 },
    { name: 'adresse', label: 'Adresse du siège social', type: 'text', required: true, full: true },
    { name: 'codePostal', label: 'Code postal', type: 'text', required: true, pattern: '\\d{5}' },
    { name: 'ville', label: 'Ville', type: 'text', required: true },
  ],
}

const SECTION_SIGNATAIRE = {
  id: 'signataire',
  title: 'Signataire',
  description: 'La personne qui signera l\'acte.',
  fields: [
    { name: 'sigCivilite', label: 'Civilité', type: 'select', required: true, options: [
      { value: 'M', label: 'Monsieur' },
      { value: 'Mme', label: 'Madame' },
    ] },
    { name: 'sigPrenom', label: 'Prénom', type: 'text', required: true },
    { name: 'sigNom', label: 'Nom', type: 'text', required: true },
    { name: 'sigRole', label: 'En qualité de', type: 'text', required: true, placeholder: 'Gérant, Président...' },
    { name: 'sigEmail', label: 'Email', type: 'email', required: true },
    { name: 'sigTelephone', label: 'Téléphone', type: 'tel', required: true },
  ],
}

// ---------- CRÉATIONS ----------

const SECTION_FONDATEUR = {
  id: 'fondateur',
  title: 'Vous, le fondateur',
  description: 'Les informations du dirigeant principal.',
  fields: [
    { name: 'fondateurCivilite', label: 'Civilité', type: 'select', required: true, options: [{ value: 'M', label: 'Monsieur' }, { value: 'Mme', label: 'Madame' }] },
    { name: 'fondateurPrenom', label: 'Prénom', type: 'text', required: true },
    { name: 'fondateurNom', label: 'Nom', type: 'text', required: true },
    { name: 'fondateurDateNaissance', label: 'Date de naissance', type: 'date', required: true },
    { name: 'fondateurLieuNaissance', label: 'Lieu de naissance', type: 'text', required: true },
    { name: 'fondateurNationalite', label: 'Nationalité', type: 'text', required: true, placeholder: 'Française' },
    { name: 'fondateurAdresse', label: 'Adresse personnelle', type: 'text', required: true, full: true },
    { name: 'fondateurCP', label: 'Code postal', type: 'text', required: true, pattern: '\\d{5}' },
    { name: 'fondateurVille', label: 'Ville', type: 'text', required: true },
    { name: 'fondateurEmail', label: 'Email', type: 'email', required: true },
    { name: 'fondateurTel', label: 'Téléphone', type: 'tel', required: true },
  ],
}

const baseCreationSections = ({ form, multiShareholders = false }) => {
  const isSAS = form === 'SAS' || form === 'SASU'
  const partsLabel = isSAS ? 'actions' : 'parts sociales'
  const dirigeantLabel = isSAS ? 'Président' : 'Gérant'

  return [
    {
      id: 'societe',
      title: 'Votre future société',
      description: 'Identité, objet et siège social — figureront sur le Kbis.',
      fields: [
        { name: 'companyName', label: 'Dénomination sociale', type: 'text', required: true, placeholder: 'Ex : Studio Pollen' },
        { name: 'sigle', label: 'Sigle (facultatif)', type: 'text', required: false, placeholder: 'Ex : SP' },
        { name: 'objet', label: 'Objet social', type: 'textarea', required: true, full: true, rows: 5, placeholder: "Décrivez précisément les activités exercées (ex : Organisme de formation / Formation continue pour adultes ; toutes opérations industrielles et commerciales se rapportant à...)." },
        { name: 'adresse',    label: 'Adresse du siège social', type: 'text', required: true, full: true, placeholder: '12 rue de la Liberté' },
        { name: 'codePostal', label: 'Code postal',  type: 'text',   required: true, pattern: '\\d{5}', placeholder: '75001' },
        { name: 'ville',      label: 'Ville',        type: 'text',   required: true, placeholder: 'Paris' },
        { name: 'dureeAnnees', label: 'Durée (années)', type: 'number', required: true, min: 1, placeholder: '99' },
      ],
    },
    {
      id: 'capital',
      title: 'Capital et apports',
      description: `Montant du capital social et répartition entre les ${isSAS ? 'actionnaires' : 'associés'}.`,
      fields: [
        { name: 'capital',          label: 'Capital social total (€)', type: 'number', required: true, min: 1, placeholder: '1000' },
        { name: 'nbParts',          label: `Nombre total de ${partsLabel}`, type: 'number', required: true, min: 1, placeholder: '1000' },
        { name: 'valeurNominale',   label: `Valeur nominale unitaire (€)`, type: 'number', required: true, min: 1, placeholder: '1' },
        { name: 'apportNumeraire',  label: 'Total apports en numéraire (€)', type: 'number', required: true, min: 0, placeholder: '1000' },
        { name: 'apportNature',     label: 'Total apports en nature (€)',  type: 'number', required: false, min: 0, placeholder: '0' },
        { name: 'banqueDepot',      label: 'Banque dépositaire du capital', type: 'text', required: true, full: true, placeholder: 'Ex : BNP Paribas, agence Paris Opéra' },
        { name: 'liberationCapital', label: 'Libération du capital à la souscription', type: 'select', required: true, options: [
          { value: 'integrale',   label: 'Intégralement libéré (100%)' },
          { value: 'moitie',      label: 'Moitié libérée (50%) — SAS uniquement' },
          { value: 'quart',       label: 'Quart libéré (25%)' },
        ], help: 'Le solde devra être libéré dans les 5 ans.' },
      ],
    },
    SECTION_FONDATEUR,
    ...(multiShareholders ? [{
      id: 'associes',
      title: `Les autres ${isSAS ? 'actionnaires' : 'associés'}`,
      description: `Vous pourrez en ajouter d'autres après le paiement. Les ${partsLabel} se répartissent au prorata des apports.`,
      fields: [
        { name: 'associe2Civilite', label: 'Civilité associé 2', type: 'select', required: false, options: [{ value: 'M', label: 'M.' }, { value: 'Mme', label: 'Mme' }] },
        { name: 'associe2Prenom',   label: 'Prénom associé 2', type: 'text',   required: false },
        { name: 'associe2Nom',      label: 'Nom associé 2',    type: 'text',   required: false },
        { name: 'associe2DateNaissance', label: 'Date de naissance',  type: 'date', required: false },
        { name: 'associe2LieuNaissance', label: 'Lieu de naissance',  type: 'text', required: false },
        { name: 'associe2Nationalite',   label: 'Nationalité',        type: 'text', required: false, placeholder: 'Française' },
        { name: 'associe2Adresse',  label: 'Adresse personnelle', type: 'text', required: false, full: true },
        { name: 'associe2NbParts',  label: `Nombre de ${partsLabel} attribuées`, type: 'number', required: false, min: 0 },
        { name: 'associe2Apport',   label: 'Apport en numéraire (€)', type: 'number', required: false, min: 0 },
      ],
    }] : []),
    {
      id: 'direction',
      title: 'Direction',
      description: `${dirigeantLabel} ${isSAS ? '' : 'unique ou cogérant'} de la société.`,
      fields: [
        { name: 'dirigeantMode', label: 'Le dirigeant est', type: 'select', required: true, options: [
          { value: 'fondateur', label: `Le fondateur lui-même (${dirigeantLabel})` },
          { value: 'autre',     label: `Une autre personne (${dirigeantLabel})` },
        ] },
        { name: 'dirigeantPrenom', label: `Prénom du ${dirigeantLabel.toLowerCase()} (si autre)`, type: 'text', required: false },
        { name: 'dirigeantNom',    label: `Nom du ${dirigeantLabel.toLowerCase()} (si autre)`,    type: 'text', required: false },
        { name: 'dirigeantDateNaissance', label: 'Date de naissance (si autre)', type: 'date', required: false },
        { name: 'dirigeantLieuNaissance', label: 'Lieu de naissance (si autre)', type: 'text', required: false },
        { name: 'dirigeantNationalite', label: 'Nationalité (si autre)', type: 'text', required: false, placeholder: 'Française' },
        { name: 'dirigeantAdresse', label: 'Adresse personnelle (si autre)', type: 'text', required: false, full: true },
        { name: 'dureeDirigeant',  label: 'Durée du mandat', type: 'select', required: true, options: [
          { value: 'indeterminee', label: 'Durée indéterminée' },
          { value: '6ans',         label: '6 ans, renouvelable' },
          { value: '3ans',         label: '3 ans, renouvelable' },
        ] },
        { name: 'remunerationDirigeant', label: 'Rémunération', type: 'select', required: true, options: [
          { value: 'aucune',  label: 'Non rémunéré (à ce jour)' },
          { value: 'fixe',    label: 'Fixe (à définir en AG)' },
          { value: 'variable', label: 'Variable (à définir en AG)' },
        ] },
      ],
    },
    {
      id: 'fiscalite',
      title: 'Fiscalité et exercice social',
      description: 'Régime fiscal et dates de clôture comptable.',
      fields: [
        { name: 'regimeFiscal', label: 'Régime d\'imposition', type: 'select', required: true, options: [
          { value: 'IS',  label: 'Impôt sur les sociétés (IS) — par défaut' },
          { value: 'IR',  label: 'Impôt sur le revenu (IR) — option 5 ans max' },
        ] },
        { name: 'tva', label: 'Régime TVA', type: 'select', required: true, options: [
          { value: 'reel-normal',     label: 'Réel normal (déclaration mensuelle)' },
          { value: 'reel-simplifie',  label: 'Réel simplifié (déclaration annuelle)' },
          { value: 'franchise',       label: 'Franchise en base (sous seuil)' },
        ] },
        { name: 'dateClotureExercice', label: 'Date de clôture de l\'exercice', type: 'select', required: true, options: [
          { value: '31/12', label: '31 décembre (recommandé)' },
          { value: '30/06', label: '30 juin' },
          { value: '30/09', label: '30 septembre' },
          { value: '31/03', label: '31 mars' },
          { value: 'autre', label: 'Autre date' },
        ] },
        { name: 'dureePremierExercice', label: 'Durée du 1er exercice', type: 'select', required: true, options: [
          { value: 'normale', label: 'De l\'immatriculation au 31/12 prochain' },
          { value: 'longue',  label: 'De l\'immatriculation au 31/12 de l\'année suivante (max 24 mois)' },
        ] },
      ],
    },
    {
      id: 'signataire',
      title: 'Signataire et finalisation',
      description: 'Le signataire des statuts (généralement le fondateur).',
      fields: [
        { name: 'sigEmail',    label: 'Email du signataire',     type: 'email', required: true, placeholder: 'vous@entreprise.fr' },
        { name: 'sigTelephone', label: 'Téléphone du signataire', type: 'tel',   required: true, placeholder: '06 12 34 56 78' },
        { name: 'dateSignature', label: 'Date prévue de signature', type: 'date', required: true },
        { name: 'lieuSignature', label: 'Lieu de signature', type: 'text', required: true, placeholder: 'Paris' },
      ],
    },
  ]
}

export const CREATIONS = {
  'SARL': {
    id: 'SARL',
    category: 'creation',
    name: 'SARL',
    fullName: 'Société à Responsabilité Limitée',
    description: 'Statuts, dépôt de capital, annonce légale, immatriculation : on s\'occupe de tout.',
    price: 149,
    delay: '48h',
    icon: '🏢',
    accent: 'coral',
    sections: baseCreationSections({ form: 'SARL', multiShareholders: true }),
  },
  'SAS': {
    id: 'SAS',
    category: 'creation',
    name: 'SAS',
    fullName: 'Société par Actions Simplifiée',
    description: 'Idéale pour les projets innovants et l\'entrée d\'investisseurs.',
    price: 199,
    delay: '48h',
    icon: '🚀',
    accent: 'coral',
    sections: baseCreationSections({ form: 'SAS', multiShareholders: true }),
  },
  'SASU': {
    id: 'SASU',
    category: 'creation',
    name: 'SASU',
    fullName: 'SAS Unipersonnelle',
    description: 'La SAS en solo, régime social du président avantageux.',
    price: 179,
    delay: '48h',
    icon: '👤',
    accent: 'coral',
    sections: baseCreationSections({ form: 'SASU', multiShareholders: false }),
  },
  'EURL': {
    id: 'EURL',
    category: 'creation',
    name: 'EURL',
    fullName: 'Entreprise Unipersonnelle à Responsabilité Limitée',
    description: 'SARL avec un seul associé, simple et protectrice.',
    price: 129,
    delay: '48h',
    icon: '🛡️',
    accent: 'coral',
    sections: baseCreationSections({ form: 'EURL', multiShareholders: false }),
  },
  'SCI': {
    id: 'SCI',
    category: 'creation',
    name: 'SCI',
    fullName: 'Société Civile Immobilière',
    description: 'Détenir et transmettre un patrimoine immobilier à plusieurs.',
    price: 169,
    delay: '72h',
    icon: '🏠',
    accent: 'coral',
    sections: baseCreationSections({ form: 'SCI', multiShareholders: true }),
  },
  'AE': {
    id: 'AE',
    category: 'creation',
    name: 'Auto-entrepreneur',
    fullName: 'Micro-entreprise',
    description: 'Démarrer une activité indépendante sans capital ni statuts.',
    price: 69,
    delay: '24h',
    icon: '⚡',
    accent: 'coral',
    sections: [
      {
        id: 'activite',
        title: 'Votre activité',
        fields: [
          { name: 'activitePrincipale', label: 'Activité principale', type: 'text', required: true, full: true, placeholder: 'Ex : Conseil en communication digitale' },
          { name: 'natureActivite', label: 'Nature de l\'activité', type: 'select', required: true, options: [
            { value: 'commerciale', label: 'Commerciale' },
            { value: 'artisanale', label: 'Artisanale' },
            { value: 'liberale', label: 'Libérale' },
          ] },
          { name: 'dateDebut', label: 'Date de début d\'activité', type: 'date', required: true },
        ],
      },
      SECTION_FONDATEUR,
    ],
  },
  'ASSOC': {
    id: 'ASSOC',
    category: 'creation',
    name: 'Association',
    fullName: 'Association loi 1901',
    description: 'Créer une structure à but non lucratif.',
    price: 89,
    delay: '7j',
    icon: '🤝',
    accent: 'coral',
    sections: [
      {
        id: 'association',
        title: 'Votre association',
        fields: [
          { name: 'nomAssoc', label: 'Nom de l\'association', type: 'text', required: true, full: true },
          { name: 'objet', label: 'Objet de l\'association', type: 'textarea', required: true, full: true, rows: 4 },
          { name: 'adresse', label: 'Adresse du siège', type: 'text', required: true, full: true },
          { name: 'codePostal', label: 'Code postal', type: 'text', required: true, pattern: '\\d{5}' },
          { name: 'ville', label: 'Ville', type: 'text', required: true },
          { name: 'dateAssembleeConstitutive', label: 'Date de l\'AG constitutive', type: 'date', required: true },
        ],
      },
      SECTION_FONDATEUR,
    ],
  },
}

// ---------- MODIFICATIONS ----------

export const MODIFICATIONS = {
  'transfert-siege': {
    id: 'transfert-siege',
    category: 'modification',
    name: 'Transfert de siège social',
    description: 'Changement d\'adresse du siège — PV d\'AG + statuts mis à jour + annonce légale + formulaire M2.',
    price: 129,
    delay: '48h',
    icon: '📍',
    accent: 'lavender',
    template: 'modification/transfert-siege.html',
    sections: [
      SECTION_SOCIETE,
      {
        id: 'modification',
        title: 'Nouveau siège social',
        description: 'La nouvelle adresse de votre société.',
        fields: [
          { name: 'newAdresse', label: 'Nouvelle adresse', type: 'text', required: true, full: true },
          { name: 'newCodePostal', label: 'Code postal', type: 'text', required: true, pattern: '\\d{5}' },
          { name: 'newVille', label: 'Ville', type: 'text', required: true },
          { name: 'dateEffet', label: 'Date d\'effet du transfert', type: 'date', required: true },
          { name: 'motif', label: 'Motif (facultatif)', type: 'textarea', required: false, placeholder: 'Ex : Regroupement de nos activités, etc.' },
        ],
      },
      SECTION_SIGNATAIRE,
    ],
  },

  'changement-dirigeant': {
    id: 'changement-dirigeant',
    category: 'modification',
    name: 'Changement de dirigeant',
    description: 'Nomination, démission, révocation d\'un gérant ou président — PV d\'AG + déclaration M3.',
    price: 119,
    delay: '48h',
    icon: '👔',
    accent: 'lavender',
    template: 'modification/changement-dirigeant.html',
    sections: [
      SECTION_SOCIETE,
      {
        id: 'modification',
        title: 'Changement de dirigeant',
        description: 'Sortant et entrant.',
        fields: [
          { name: 'typeChangement', label: 'Type de changement', type: 'select', required: true, options: [
            { value: 'nomination', label: 'Nomination d\'un nouveau dirigeant' },
            { value: 'demission', label: 'Démission du dirigeant actuel' },
            { value: 'revocation', label: 'Révocation du dirigeant actuel' },
            { value: 'remplacement', label: 'Remplacement (démission + nomination)' },
          ] },
          { name: 'sortantNom', label: 'Nom du dirigeant sortant', type: 'text', required: false },
          { name: 'sortantPrenom', label: 'Prénom du dirigeant sortant', type: 'text', required: false },
          { name: 'entrantNom', label: 'Nom du nouveau dirigeant', type: 'text', required: false },
          { name: 'entrantPrenom', label: 'Prénom du nouveau dirigeant', type: 'text', required: false },
          { name: 'entrantDateNaissance', label: 'Date de naissance', type: 'date', required: false },
          { name: 'entrantAdresse', label: 'Adresse du nouveau dirigeant', type: 'text', required: false, full: true },
          { name: 'dateEffet', label: 'Date d\'effet', type: 'date', required: true },
        ],
      },
      SECTION_SIGNATAIRE,
    ],
  },

  'augmentation-capital': {
    id: 'augmentation-capital',
    category: 'modification',
    name: 'Augmentation de capital',
    description: 'Apports en numéraire, en nature ou incorporation de réserves.',
    price: 159,
    delay: '72h',
    icon: '📈',
    accent: 'lavender',
    template: 'modification/augmentation-capital.html',
    sections: [
      SECTION_SOCIETE,
      {
        id: 'modification',
        title: 'Détails de l\'augmentation',
        fields: [
          { name: 'typeApport', label: 'Type d\'apport', type: 'select', required: true, options: [
            { value: 'numeraire', label: 'Apport en numéraire' },
            { value: 'nature', label: 'Apport en nature' },
            { value: 'reserves', label: 'Incorporation de réserves' },
          ] },
          { name: 'montantAugmentation', label: 'Montant de l\'augmentation (€)', type: 'number', required: true, min: 1 },
          { name: 'nouveauCapital', label: 'Nouveau capital (€)', type: 'number', required: true, min: 1 },
          { name: 'nbPartsCreees', label: 'Nombre de parts/actions créées', type: 'number', required: true, min: 1 },
          { name: 'valeurNominale', label: 'Valeur nominale d\'une part (€)', type: 'number', required: true, min: 1 },
          { name: 'dateAssemblee', label: 'Date de l\'assemblée', type: 'date', required: true },
        ],
      },
      SECTION_SIGNATAIRE,
    ],
  },

  'reduction-capital': {
    id: 'reduction-capital',
    category: 'modification',
    name: 'Réduction de capital',
    description: 'Réduction motivée ou non par des pertes.',
    price: 159,
    delay: '72h',
    icon: '📉',
    accent: 'lavender',
    template: 'modification/reduction-capital.html',
    sections: [
      SECTION_SOCIETE,
      {
        id: 'modification',
        title: 'Détails de la réduction',
        fields: [
          { name: 'motifReduction', label: 'Motif', type: 'select', required: true, options: [
            { value: 'pertes', label: 'Réduction motivée par des pertes' },
            { value: 'remboursement', label: 'Réduction non motivée par des pertes (remboursement)' },
          ] },
          { name: 'montantReduction', label: 'Montant de la réduction (€)', type: 'number', required: true, min: 1 },
          { name: 'nouveauCapital', label: 'Nouveau capital (€)', type: 'number', required: true, min: 1 },
          { name: 'dateAssemblee', label: 'Date de l\'assemblée', type: 'date', required: true },
        ],
      },
      SECTION_SIGNATAIRE,
    ],
  },

  'changement-objet': {
    id: 'changement-objet',
    category: 'modification',
    name: 'Changement d\'objet social',
    description: 'Modification ou extension de l\'objet social inscrit dans les statuts.',
    price: 139,
    delay: '72h',
    icon: '🎯',
    accent: 'lavender',
    template: 'modification/changement-objet.html',
    sections: [
      SECTION_SOCIETE,
      {
        id: 'modification',
        title: 'Nouvel objet social',
        fields: [
          { name: 'nouvelObjet', label: 'Nouvel objet social', type: 'textarea', required: true, full: true, placeholder: 'Décrivez les activités exercées par la société...', rows: 6 },
          { name: 'typeModification', label: 'Type de modification', type: 'select', required: true, options: [
            { value: 'remplacement', label: 'Remplacement total de l\'objet' },
            { value: 'extension', label: 'Extension (ajout d\'activités)' },
            { value: 'reduction', label: 'Réduction (suppression d\'activités)' },
          ] },
          { name: 'dateAssemblee', label: 'Date de l\'assemblée', type: 'date', required: true },
        ],
      },
      SECTION_SIGNATAIRE,
    ],
  },

  'changement-denomination': {
    id: 'changement-denomination',
    category: 'modification',
    name: 'Changement de dénomination',
    description: 'Nouveau nom commercial pour votre société.',
    price: 119,
    delay: '48h',
    icon: '🏷️',
    accent: 'lavender',
    template: 'modification/changement-denomination.html',
    sections: [
      SECTION_SOCIETE,
      {
        id: 'modification',
        title: 'Nouvelle dénomination',
        fields: [
          { name: 'nouvelleDenomination', label: 'Nouvelle dénomination sociale', type: 'text', required: true, full: true },
          { name: 'nouveauSigle', label: 'Nouveau sigle (facultatif)', type: 'text', required: false },
          { name: 'dateAssemblee', label: 'Date de l\'assemblée', type: 'date', required: true },
        ],
      },
      SECTION_SIGNATAIRE,
    ],
  },

  'transformation': {
    id: 'transformation',
    category: 'modification',
    name: 'Transformation de société',
    description: 'Changement de forme juridique (SARL → SAS, EURL → SASU, etc.)',
    price: 249,
    delay: '7j',
    icon: '🔄',
    accent: 'lavender',
    template: 'modification/transformation.html',
    sections: [
      SECTION_SOCIETE,
      {
        id: 'modification',
        title: 'Transformation',
        fields: [
          { name: 'nouvelleForme', label: 'Nouvelle forme juridique', type: 'select', required: true, options: [
            { value: 'SARL', label: 'SARL' },
            { value: 'SAS', label: 'SAS' },
            { value: 'SASU', label: 'SASU' },
            { value: 'EURL', label: 'EURL' },
            { value: 'SA', label: 'SA' },
          ] },
          { name: 'motif', label: 'Motif de la transformation', type: 'textarea', required: true, full: true },
          { name: 'dateAssemblee', label: 'Date de l\'assemblée', type: 'date', required: true },
        ],
      },
      SECTION_SIGNATAIRE,
    ],
  },
}

// ---------- CESSION ----------

export const CESSIONS = {
  'parts': {
    id: 'parts',
    category: 'cession',
    name: 'Cession de parts sociales',
    description: 'Pour SARL / EURL / SCI : acte de cession, agrément des associés, enregistrement aux impôts.',
    price: 149,
    delay: '72h',
    icon: '📜',
    accent: 'sage',
    template: 'cession/parts.html',
    sections: [
      SECTION_SOCIETE,
      {
        id: 'cedant',
        title: 'Le cédant',
        description: 'La personne qui cède ses parts.',
        fields: [
          { name: 'cedantCivilite', label: 'Civilité', type: 'select', required: true, options: [{ value: 'M', label: 'M.' }, { value: 'Mme', label: 'Mme' }] },
          { name: 'cedantPrenom', label: 'Prénom', type: 'text', required: true },
          { name: 'cedantNom', label: 'Nom', type: 'text', required: true },
          { name: 'cedantDateNaissance', label: 'Date de naissance', type: 'date', required: true },
          { name: 'cedantLieuNaissance', label: 'Lieu de naissance', type: 'text', required: true },
          { name: 'cedantAdresse', label: 'Adresse', type: 'text', required: true, full: true },
        ],
      },
      {
        id: 'cessionnaire',
        title: 'Le cessionnaire',
        description: 'La personne qui achète les parts.',
        fields: [
          { name: 'cessionnaireCivilite', label: 'Civilité', type: 'select', required: true, options: [{ value: 'M', label: 'M.' }, { value: 'Mme', label: 'Mme' }] },
          { name: 'cessionnairePrenom', label: 'Prénom', type: 'text', required: true },
          { name: 'cessionnaireNom', label: 'Nom', type: 'text', required: true },
          { name: 'cessionnaireDateNaissance', label: 'Date de naissance', type: 'date', required: true },
          { name: 'cessionnaireLieuNaissance', label: 'Lieu de naissance', type: 'text', required: true },
          { name: 'cessionnaireAdresse', label: 'Adresse', type: 'text', required: true, full: true },
        ],
      },
      {
        id: 'cession',
        title: 'Détails de la cession',
        fields: [
          { name: 'nbPartsCedees', label: 'Nombre de parts cédées', type: 'number', required: true, min: 1 },
          { name: 'valeurNominale', label: 'Valeur nominale unitaire (€)', type: 'number', required: true, min: 1 },
          { name: 'prixCession', label: 'Prix total de la cession (€)', type: 'number', required: true, min: 0 },
          { name: 'modalitePaiement', label: 'Modalités de paiement', type: 'select', required: true, options: [
            { value: 'comptant', label: 'Comptant à la signature' },
            { value: 'echelonne', label: 'Paiement échelonné' },
            { value: 'credit', label: 'Crédit vendeur' },
          ] },
          { name: 'dateCession', label: 'Date de la cession', type: 'date', required: true },
        ],
      },
      SECTION_SIGNATAIRE,
    ],
  },

  'actions': {
    id: 'actions',
    category: 'cession',
    name: 'Cession d\'actions',
    description: 'Pour SAS / SASU : ordre de mouvement, registre de mouvements de titres, déclaration fiscale.',
    price: 149,
    delay: '72h',
    icon: '📄',
    accent: 'sage',
    template: 'cession/actions.html',
    sections: [
      SECTION_SOCIETE,
      {
        id: 'cedant',
        title: 'Le cédant',
        fields: [
          { name: 'cedantCivilite', label: 'Civilité', type: 'select', required: true, options: [{ value: 'M', label: 'M.' }, { value: 'Mme', label: 'Mme' }] },
          { name: 'cedantPrenom', label: 'Prénom', type: 'text', required: true },
          { name: 'cedantNom', label: 'Nom', type: 'text', required: true },
          { name: 'cedantAdresse', label: 'Adresse', type: 'text', required: true, full: true },
        ],
      },
      {
        id: 'cessionnaire',
        title: 'Le cessionnaire',
        fields: [
          { name: 'cessionnaireCivilite', label: 'Civilité', type: 'select', required: true, options: [{ value: 'M', label: 'M.' }, { value: 'Mme', label: 'Mme' }] },
          { name: 'cessionnairePrenom', label: 'Prénom', type: 'text', required: true },
          { name: 'cessionnaireNom', label: 'Nom', type: 'text', required: true },
          { name: 'cessionnaireAdresse', label: 'Adresse', type: 'text', required: true, full: true },
        ],
      },
      {
        id: 'cession',
        title: 'Détails de la cession',
        fields: [
          { name: 'nbActions', label: 'Nombre d\'actions cédées', type: 'number', required: true, min: 1 },
          { name: 'valeurNominale', label: 'Valeur nominale (€)', type: 'number', required: true, min: 1 },
          { name: 'prixCession', label: 'Prix total (€)', type: 'number', required: true, min: 0 },
          { name: 'dateCession', label: 'Date de la cession', type: 'date', required: true },
        ],
      },
      SECTION_SIGNATAIRE,
    ],
  },

  'fonds': {
    id: 'fonds',
    category: 'cession',
    name: 'Cession de fonds de commerce',
    description: 'Acte complet, séquestre, publication BODACC, oppositions, formalités fiscales.',
    price: 299,
    delay: '15j',
    icon: '🏪',
    accent: 'sage',
    template: 'cession/fonds.html',
    sections: [
      {
        id: 'cedant',
        title: 'Le cédant',
        description: 'Personne ou société qui cède le fonds.',
        fields: [
          { name: 'cedantType', label: 'Type', type: 'select', required: true, options: [{ value: 'personne', label: 'Personne physique' }, { value: 'societe', label: 'Société' }] },
          { name: 'cedantNom', label: 'Nom / Dénomination', type: 'text', required: true, full: true },
          { name: 'cedantAdresse', label: 'Adresse / Siège', type: 'text', required: true, full: true },
        ],
      },
      {
        id: 'cessionnaire',
        title: 'Le cessionnaire',
        fields: [
          { name: 'cessionnaireType', label: 'Type', type: 'select', required: true, options: [{ value: 'personne', label: 'Personne physique' }, { value: 'societe', label: 'Société' }] },
          { name: 'cessionnaireNom', label: 'Nom / Dénomination', type: 'text', required: true, full: true },
          { name: 'cessionnaireAdresse', label: 'Adresse / Siège', type: 'text', required: true, full: true },
        ],
      },
      {
        id: 'fonds',
        title: 'Le fonds de commerce',
        fields: [
          { name: 'fondsActivite', label: 'Activité exploitée', type: 'text', required: true, full: true },
          { name: 'fondsEnseigne', label: 'Enseigne commerciale', type: 'text', required: true },
          { name: 'fondsAdresseExploitation', label: 'Adresse d\'exploitation', type: 'text', required: true, full: true },
          { name: 'fondsBailDureeRestante', label: 'Durée restante du bail commercial (années)', type: 'number', required: true, min: 0 },
          { name: 'fondsLoyer', label: 'Loyer annuel (€)', type: 'number', required: true, min: 0 },
          { name: 'fondsCAExercice1', label: 'CA HT exercice N-1 (€)', type: 'number', required: true, min: 0 },
          { name: 'fondsCAExercice2', label: 'CA HT exercice N-2 (€)', type: 'number', required: true, min: 0 },
          { name: 'fondsCAExercice3', label: 'CA HT exercice N-3 (€)', type: 'number', required: true, min: 0 },
          { name: 'fondsResultatExercice1', label: 'Résultat exercice N-1 (€)', type: 'number', required: true },
          { name: 'fondsResultatExercice2', label: 'Résultat exercice N-2 (€)', type: 'number', required: true },
          { name: 'fondsResultatExercice3', label: 'Résultat exercice N-3 (€)', type: 'number', required: true },
        ],
      },
      {
        id: 'cession',
        title: 'Conditions de cession',
        fields: [
          { name: 'prixTotal', label: 'Prix total de cession (€)', type: 'number', required: true, min: 1 },
          { name: 'prixElementsCorporels', label: 'dont éléments corporels (matériel) (€)', type: 'number', required: true, min: 0 },
          { name: 'prixElementsIncorporels', label: 'dont éléments incorporels (clientèle, enseigne...) (€)', type: 'number', required: true, min: 0 },
          { name: 'prixMarchandises', label: 'dont marchandises (€)', type: 'number', required: true, min: 0 },
          { name: 'dateEntreeJouissance', label: 'Date d\'entrée en jouissance', type: 'date', required: true },
          { name: 'sequestre', label: 'Nom du séquestre', type: 'text', required: true, placeholder: 'Notaire ou avocat' },
        ],
      },
      SECTION_SIGNATAIRE,
    ],
  },
}

// ---------- DISSOLUTION ----------

export const DISSOLUTIONS = {
  'anticipee': {
    id: 'anticipee',
    category: 'dissolution',
    name: 'Dissolution anticipée',
    description: 'PV d\'AG actant la dissolution + nomination du liquidateur + annonce légale + M2.',
    price: 199,
    delay: '7j',
    icon: '🛑',
    accent: 'amber',
    template: 'dissolution/anticipee.html',
    sections: [
      SECTION_SOCIETE,
      {
        id: 'dissolution',
        title: 'Décision de dissolution',
        fields: [
          { name: 'dateAssemblee', label: 'Date de l\'assemblée', type: 'date', required: true },
          { name: 'motifDissolution', label: 'Motif de la dissolution', type: 'textarea', required: true, full: true, placeholder: 'Ex : Cessation d\'activité, désaccord entre associés, etc.' },
          { name: 'dateEffet', label: 'Date d\'effet', type: 'date', required: true },
          { name: 'siegeLiquidation', label: 'Adresse du siège de liquidation', type: 'text', required: true, full: true },
        ],
      },
      {
        id: 'liquidateur',
        title: 'Le liquidateur',
        description: 'La personne en charge de la liquidation.',
        fields: [
          { name: 'liqCivilite', label: 'Civilité', type: 'select', required: true, options: [{ value: 'M', label: 'M.' }, { value: 'Mme', label: 'Mme' }] },
          { name: 'liqPrenom', label: 'Prénom', type: 'text', required: true },
          { name: 'liqNom', label: 'Nom', type: 'text', required: true },
          { name: 'liqDateNaissance', label: 'Date de naissance', type: 'date', required: true },
          { name: 'liqAdresse', label: 'Adresse', type: 'text', required: true, full: true },
        ],
      },
      SECTION_SIGNATAIRE,
    ],
  },

  'liquidation': {
    id: 'liquidation',
    category: 'dissolution',
    name: 'Liquidation amiable',
    description: 'Comptes de clôture, PV de clôture, partage du boni, demande de radiation.',
    price: 199,
    delay: '7j',
    icon: '⚖️',
    accent: 'amber',
    template: 'dissolution/liquidation.html',
    sections: [
      SECTION_SOCIETE,
      {
        id: 'liquidation',
        title: 'Comptes de liquidation',
        fields: [
          { name: 'dateOuvertureLiq', label: 'Date d\'ouverture de la liquidation', type: 'date', required: true },
          { name: 'dateClotureLiq', label: 'Date de clôture de la liquidation', type: 'date', required: true },
          { name: 'totalActif', label: 'Total actif réalisé (€)', type: 'number', required: true, min: 0 },
          { name: 'totalPassif', label: 'Total passif apuré (€)', type: 'number', required: true, min: 0 },
          { name: 'boniMali', label: 'Boni / Mali de liquidation (€)', type: 'number', required: true },
          { name: 'liquidateurNom', label: 'Nom du liquidateur', type: 'text', required: true },
        ],
      },
      SECTION_SIGNATAIRE,
    ],
  },

  'radiation': {
    id: 'radiation',
    category: 'dissolution',
    name: 'Radiation au RCS',
    description: 'Demande de radiation après clôture de liquidation (formulaire M4).',
    price: 99,
    delay: '48h',
    icon: '🗑️',
    accent: 'amber',
    template: 'dissolution/radiation.html',
    sections: [
      SECTION_SOCIETE,
      {
        id: 'radiation',
        title: 'Radiation',
        fields: [
          { name: 'dateClotureLiq', label: 'Date de clôture de la liquidation', type: 'date', required: true },
          { name: 'liquidateurNom', label: 'Nom du liquidateur', type: 'text', required: true },
          { name: 'liquidateurAdresse', label: 'Adresse du liquidateur', type: 'text', required: true, full: true },
        ],
      },
      SECTION_SIGNATAIRE,
    ],
  },
}

export const ALL_FORMALITIES = {
  creation: CREATIONS,
  modification: MODIFICATIONS,
  cession: CESSIONS,
  dissolution: DISSOLUTIONS,
}

export const getFormality = (category, type) => {
  return ALL_FORMALITIES[category]?.[type] || null
}

export const getFormalitiesByCategory = (category) => {
  return ALL_FORMALITIES[category] ? Object.values(ALL_FORMALITIES[category]) : []
}
