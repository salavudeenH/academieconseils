# CLAUDE.md

Ce fichier guide Claude Code dans le développement d'un SaaS de génération automatique de statuts juridiques SARL.

## Vue d'ensemble du projet

**SaaS LegalTech MVP** - Plateforme de génération automatisée de statuts SARL inspirée de Legalstart/Les Tricolores.

### Principe MVP
- Pas de création de compte initial
- L'utilisateur commence directement la création
- Espace client créé automatiquement APRÈS paiement
- Templates fixes uniquement, pas de conseil juridique personnalisé
- Cas juridiques simples exclusivement

### Parcours utilisateur cible
1. Landing page moderne
2. Clic "Créer ma SARL" 
3. Formulaire guidé multi-étapes
4. Récapitulatif + paiement Stripe
5. Création automatique compte client
6. Accès dashboard sécurisé
7. Téléchargement statuts PDF

## Stack technique

### Frontend & Backend
- **Next.js 16.1.1** (App Router obligatoire)
- **React 19.2.3**
- **JavaScript** (pas TypeScript pour ce MVP)
- API Routes + Server Actions pour le backend
- **Tailwind CSS v4** pour le styling

### Base de données & ORM
- **PostgreSQL** (production)
- **Prisma** comme ORM
- Modèles : User, Company, Order, Document

### Services externes
- **Stripe** pour les paiements (Checkout + Webhooks)
- **Puppeteer** pour génération HTML → PDF
- **Nodemailer** pour les emails

### Déploiement
- **Vercel** (cible de déploiement)
- Variables d'environnement Stripe, DB, SMTP

## Commandes de développement
```bash