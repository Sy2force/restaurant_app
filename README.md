# Restaurant Israel

Application React moderne pour découvrir des restaurants et des plats en Israël, avec interface multilingue (FR/EN/HE) et support RTL.

## Stack technique

- Frontend: React 18, Vite, React Router, Tailwind CSS, Zustand, i18next, Axios, Framer Motion
- Validation/Formulaires: React Hook Form, Yup
- Tests: Vitest, Playwright
- Déploiement: Vercel (frontend), Render (API backend si activée)
- Backend (présent dans le repo): Node.js, Express, MongoDB, JWT, Helmet, CORS, Rate Limit

## Fonctionnalités principales (version finalisée v1)

- Pages publiques: accueil, restaurants, détail restaurant, plats, détail plat, contact
- Pages utilitaires: login, register, forgot/reset password, privacy, terms, 404
- Navigation mobile fixe en bas (mobile only), responsive global
- Données mock de fallback si API indisponible
- Internationalisation FR/EN/HE + direction RTL en hébreu

## Routes principales

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
- `/*`

## Installation

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Backend (optionnel)

```bash
cd backend
npm install
cp ../.env.example .env
npm start
```

## Variables d'environnement

Exemple (`.env.example`):

```bash
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Restaurant Israel
NODE_ENV=development
PORT=5000
JWT_SECRET=change_me
MONGODB_URI=mongodb://localhost:27017/flavors-of-israel
CLIENT_URL=http://localhost:5173
```

## Scripts utiles (frontend)

```bash
npm run dev
npm run lint
npm run test:unit
npm run test:e2e
npm run validate:data
npm run build
npm run preview
```

## Validation des données mock

Script disponible:

```bash
cd frontend
npm run validate:data
```

Vérifie notamment les IDs dupliqués, images dupliquées sur les plats, présence d'images et cohérence `restaurantId`.

## Déploiement Vercel (frontend)

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Variable: `VITE_API_URL=https://<render-service>.onrender.com/api`
- SPA rewrite déjà configurée dans `frontend/vercel.json`

## Déploiement Render (backend)

- Config repo: `render.yaml`
- Root dir: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Variables à définir côté Render: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, Cloudinary si upload activé

## Structure du projet

- `frontend/`: app React
- `backend/`: API Express
- `scripts/`: scripts utilitaires (validation data)
- `render.yaml`: config Render

## Notes importantes

- `.env` ne doit jamais être commité.
- La sécurité finale des permissions doit aussi être appliquée côté backend (pas uniquement frontend).
