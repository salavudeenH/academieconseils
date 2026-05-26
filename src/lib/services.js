// Catalogue centralisé de toutes les formalités juridiques proposées.
// Inspiré du périmètre LegalPlace : création, modification, cession, dissolution.

export const SERVICE_CATEGORIES = {
  creation: {
    id: 'creation',
    label: 'Créer ma société',
    short: 'Création',
    tagline: 'Lancez votre activité en quelques minutes',
    description:
      'Statuts, dépôt de capital, annonce légale, immatriculation : on s\'occupe de tout pour donner naissance à votre société.',
    icon: '🌱',
    accent: 'coral',
    href: '/services/creation',
    items: [
      { id: 'SARL',  name: 'SARL',  fullName: 'Société à Responsabilité Limitée', price: 149, icon: '🏢', href: '/create-company?type=SARL',  description: 'Structure souple pour PME et associations de fondateurs.' },
      { id: 'SAS',   name: 'SAS',   fullName: 'Société par Actions Simplifiée',   price: 199, icon: '🚀', href: '/create-company?type=SAS',   description: 'Flexibilité maximale, idéale pour les projets à plusieurs.' },
      { id: 'SASU',  name: 'SASU',  fullName: 'SAS Unipersonnelle',               price: 179, icon: '👤', href: '/create-company?type=SASU',  description: 'La SAS en solo, régime social du président avantageux.' },
      { id: 'EURL',  name: 'EURL',  fullName: 'Entreprise Unipersonnelle à Responsabilité Limitée', price: 129, icon: '🛡️', href: '/create-company?type=EURL',  description: 'La SARL pour entrepreneur seul, simple et protectrice.' },
      { id: 'SCI',   name: 'SCI',   fullName: 'Société Civile Immobilière',       price: 169, icon: '🏠', href: '/create-company?type=SCI',   description: 'Détenir et transmettre un patrimoine immobilier à plusieurs.' },
      { id: 'AE',    name: 'Auto-entrepreneur', fullName: 'Micro-entreprise',     price: 69,  icon: '⚡', href: '/create-company?type=AE',    description: 'Démarrer une activité indépendante sans capital.' },
      { id: 'ASSOC', name: 'Association', fullName: 'Association loi 1901',       price: 89,  icon: '🤝', href: '/create-company?type=ASSOC', description: 'Créer une structure à but non lucratif.' },
    ],
  },

  modification: {
    id: 'modification',
    label: 'Modifier ma société',
    short: 'Modification',
    tagline: 'Faites évoluer vos statuts sereinement',
    description:
      'Adresse, dirigeant, capital, objet social, dénomination : nous générons tous les actes nécessaires et gérons les formalités.',
    icon: '✏️',
    accent: 'lavender',
    href: '/services/modification',
    items: [
      { id: 'transfert-siege',     name: 'Transfert de siège social',  price: 129, icon: '📍', href: '/modification/transfert-siege',     description: 'Changement d\'adresse du siège.' },
      { id: 'changement-dirigeant',name: 'Changement de dirigeant',     price: 119, icon: '👔', href: '/modification/changement-dirigeant',description: 'Nomination, démission, révocation d\'un gérant ou président.' },
      { id: 'augmentation-capital',name: 'Augmentation de capital',     price: 159, icon: '📈', href: '/modification/augmentation-capital',description: 'Apports en numéraire, en nature, incorporation de réserves.' },
      { id: 'reduction-capital',   name: 'Réduction de capital',        price: 159, icon: '📉', href: '/modification/reduction-capital',   description: 'Réduction motivée ou non par des pertes.' },
      { id: 'changement-objet',    name: 'Changement d\'objet social',  price: 139, icon: '🎯', href: '/modification/changement-objet',    description: 'Modification ou extension de l\'objet social.' },
      { id: 'changement-denomination', name: 'Changement de dénomination', price: 119, icon: '🏷️', href: '/modification/changement-denomination', description: 'Nouveau nom de société.' },
      { id: 'transformation',      name: 'Transformation de société',   price: 249, icon: '🔄', href: '/modification/transformation',      description: 'SARL → SAS, EURL → SASU, etc.' },
    ],
  },

  cession: {
    id: 'cession',
    label: 'Céder mon entreprise',
    short: 'Cession',
    tagline: 'Transmettez parts, actions ou fonds de commerce',
    description:
      'Actes de cession, agrément des associés, formalités fiscales : nous rédigeons tous les documents conformes au Code de commerce.',
    icon: '🤝',
    accent: 'sage',
    href: '/services/cession',
    items: [
      { id: 'cession-parts',   name: 'Cession de parts sociales',     price: 149, icon: '📜', href: '/cession/parts',   description: 'Pour SARL, EURL, SCI : agrément, acte, enregistrement.' },
      { id: 'cession-actions', name: 'Cession d\'actions',            price: 149, icon: '📄', href: '/cession/actions', description: 'Pour SAS, SASU : ordre de mouvement et acte.' },
      { id: 'cession-fonds',   name: 'Cession de fonds de commerce',  price: 299, icon: '🏪', href: '/cession/fonds',   description: 'Acte complet, publication, séquestre.' },
    ],
  },

  dissolution: {
    id: 'dissolution',
    label: 'Fermer ma société',
    short: 'Dissolution',
    tagline: 'Dissolution et liquidation simplifiées',
    description:
      'PV de dissolution, nomination du liquidateur, compte de clôture, radiation : nous vous accompagnons jusqu\'à la fin.',
    icon: '📦',
    accent: 'amber',
    href: '/services/dissolution',
    items: [
      { id: 'dissolution-anticipee', name: 'Dissolution anticipée',  price: 199, icon: '🛑', href: '/dissolution/anticipee',  description: 'Décision des associés mettant fin à la société.' },
      { id: 'liquidation-amiable',   name: 'Liquidation amiable',    price: 199, icon: '⚖️', href: '/dissolution/liquidation', description: 'Réalisation de l\'actif, apurement du passif, clôture.' },
      { id: 'radiation',             name: 'Radiation au RCS',       price: 99,  icon: '🗑️', href: '/dissolution/radiation',   description: 'Demande de radiation au greffe.' },
    ],
  },
};

export const getCategory = (id) => SERVICE_CATEGORIES[id] || null;
export const getAllCategories = () => Object.values(SERVICE_CATEGORIES);
export const getAllServices = () =>
  Object.values(SERVICE_CATEGORIES).flatMap((cat) =>
    cat.items.map((item) => ({ ...item, categoryId: cat.id }))
  );
