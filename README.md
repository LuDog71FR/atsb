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

Uploader le contenu du dossier `dist/` sur l'hébergeur :

- **OVH / FTP** : transférer le contenu de `dist/` à la racine du site via FTP

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
