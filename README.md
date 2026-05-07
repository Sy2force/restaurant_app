# Restaurant Israel

Restaurant Israel est un guide moderne de restaurants israeliens. L'application permet de decouvrir des restaurants, consulter des plats populaires, filtrer selon ses preferences et acceder rapidement aux informations essentielles: adresse, horaires, contact, itineraire et reservation.

## Stack Technique

- Frontend: React 18, Vite, React Router, Tailwind CSS, Zustand, i18next, Axios, Framer Motion, Swiper
- Formulaires: React Hook Form, Yup
- Tests: Vitest, Playwright
- Backend present dans le repo: Node.js, Express, MongoDB, JWT, Helmet, CORS, Rate Limit
- Deploiement: Vercel pour le frontend, Render pour l'API backend si elle est activee

## Fonctionnalites V1

- Pages publiques finalisees: accueil, restaurants, detail restaurant, plats, detail plat, contact
- Pages compte: login, register, forgot/reset password
- Pages legales: privacy, terms
- Fallback donnees mockees si l'API n'est pas disponible
- Navigation responsive avec bottom nav mobile
- Internationalisation FR / EN / HE avec support RTL pour l'hebreu
- Routes protegees pour les zones user, business et admin
- Tests unitaires, E2E et validation des donnees mock

Les pages avancees comme Explore, Recipe Books, recettes, dashboards complexes, admin, analytics, likes, commentaires et posts sont conservees dans le code pour une V2, mais elles ne sont plus exposees dans la navigation publique principale.

## Routes Principales

- `/`
- `/restaurants`
- `/restaurants/:id`
- `/dishes`
- `/dishes/:id`
- `/contact`
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`
- `/privacy`
- `/terms`
- `/unauthorized`
- `/*`

## Installation

Depuis la racine:

```bash
npm install --prefix frontend
npm install --prefix backend
```

Frontend uniquement:

```bash
cd frontend
cp .env.example .env
npm run dev
```

Backend optionnel:

```bash
cd backend
cp .env.example .env
npm run dev
```

## Variables D'environnement

Frontend:

```bash
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Restaurant Israel
VITE_ENABLE_MOCK_AUTH=false
```

Backend:

```bash
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/flavors-of-israel
JWT_SECRET=change_me
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

Ne jamais commiter de fichier `.env` reel.

## Scripts

Scripts racine:

```bash
npm run dev
npm run lint
npm run test:unit
npm run test:e2e
npm run validate:data
npm run build
```

Scripts frontend:

```bash
cd frontend
npm run dev
npm run lint
npm run format
npm run test:unit
npm run test:e2e
npm run validate:data
npm run build
npm run preview
```

Scripts backend:

```bash
cd backend
npm run dev
npm start
npm test
```

## Validation Des Donnees

```bash
npm run validate:data
```

Le script `scripts/validateRestaurantData.mjs` verifie notamment:

- IDs restaurants et plats uniques
- images presentes et alt texts presents
- aucune image de plat dupliquee
- `restaurantId` valides
- villes et metadonnees essentielles presentes
- routes detail coherentes pour les donnees visibles

## Build

```bash
npm run build
```

Le build Vite produit le frontend dans `frontend/dist`.

## Deploiement Vercel

Configuration recommandee:

- Framework: Vite
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `frontend/dist`
- Variable: `VITE_API_URL=https://<service-render>.onrender.com/api`

Le fichier `vercel.json` a une rewrite SPA vers `index.html` pour que le refresh fonctionne sur les routes React Router.

## Deploiement Render

Le backend Express est configure via `render.yaml`.

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/`

Variables Render a definir:

```bash
NODE_ENV=production
MONGODB_URI=<mongodb-uri>
JWT_SECRET=<secret-fort>
JWT_EXPIRE=7d
CLIENT_URL=https://<site-vercel>.vercel.app
```

Render n'est necessaire que si l'API backend est utilisee en production. Le frontend peut fonctionner avec les donnees mockees sans backend.

## Structure

```text
frontend/   Application React/Vite
backend/    API Express optionnelle
scripts/    Scripts de validation et maintenance
render.yaml Configuration Render backend
vercel.json Configuration Vercel frontend SPA
```

## Notes Securite

- `.env`, `.env.local` et `.env.production` sont ignores par Git.
- La protection frontend ameliore l'UX, mais les permissions reelles doivent rester verifiees cote backend.
- Les tokens, secrets JWT, URLs privees et cles Cloudinary doivent etre configures uniquement dans l'environnement de deploiement.
