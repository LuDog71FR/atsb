# Site web — Association de Tir Sportif de Branges (ATSB)

Site statique généré avec [Vite](https://vitejs.dev/), TypeScript et Tailwind CSS.
Les pages sont rédigées en Markdown dans `public/markdown/`.

## Prérequis

- [Node.js](https://nodejs.org/) v18+
- npm (inclus avec Node.js)

## Installation

```bash
cd web_site
npm install
```

## Développement local

Lance un serveur de développement avec rechargement automatique :

```bash
npm run dev
```

Ouvrir <http://localhost:5173> dans le navigateur.

## Build de production

Compile et optimise le site dans le dossier `dist/` :

```bash
npm run build
```

Le dossier `dist/` généré contient :

```
dist/
├── index.html
├── markdown/        ← pages du site (copiées depuis public/markdown/)
├── images/          ← logo et images (copiés depuis public/images/)
└── assets/
    ├── index-*.js
    └── index-*.css
```

## Prévisualisation du build

Vérifie le rendu du site compilé avant de le mettre en ligne :

```bash
npm run build   # obligatoire avant preview
npm run preview
```

Ouvrir <http://localhost:4173> dans le navigateur.

> Le preview sert les fichiers de `dist/` tels qu'ils seront hébergés en production.
> Si le logo, le menu ou les pages s'affichent correctement ici, le déploiement sera bon.

## Déploiement

Le déploiement est automatisé via **GitHub Actions** (`deploy.yml`).

### Déploiement automatique (GitHub Pages)

Tout push sur la branche `main` déclenche automatiquement :

1. Build du site (`npm run build`)
2. Publication du dossier `dist/` sur GitHub Pages

Aucune action manuelle requise — le site est mis à jour quelques minutes après le push.

Le workflow peut aussi être déclenché manuellement depuis l'onglet **Actions** du dépôt GitHub.

### Déploiement manuel (OVH / FTP)

Pour héberger sur un autre serveur, transférer le contenu de `dist/` à la racine du site via FTP après un `npm run build`.

## Structure du projet

```
web_site/
├── public/
│   ├── markdown/        ← pages Markdown (éditables sans recompiler)
│   └── images/          ← images statiques
├── src/
│   └── main.ts          ← logique principale (fetch Markdown, rendu)
├── index.html
├── vite.config.ts
├── tailwind.css
└── package.json
```

## Modifier le contenu

Les fichiers Markdown dans `public/markdown/` peuvent être édités directement.
Un simple `npm run build` suffit pour régénérer le site — aucune recompilation TypeScript nécessaire si seul le contenu change.
