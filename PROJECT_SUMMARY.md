# Flavors of Israel - Résumé Complet du Projet

## 📋 Vue d'ensemble

**Flavors of Israel** est une plateforme web complète de découverte gastronomique israélienne, comprenant un guide de restaurants, un système de recettes, une communauté sociale, et des tableaux de bord pour utilisateurs et entreprises.

---

## 🏗️ Architecture du Projet

### Structure Globale
```
Flavors of Israel/
├── backend/              # API Express.js + MongoDB
├── frontend/             # Application React 18 + Vite
├── scripts/              # Scripts utilitaires
├── logs/                 # Logs de l'application
└── Documentation         # Guides et documentation
```

---

## 🚀 Backend (API Node.js/Express)

### Stack Technique
- **Framework**: Express.js
- **Base de données**: MongoDB + Mongoose
- **Authentification**: JWT (JSON Web Tokens)
- **Upload**: Cloudinary + Multer
- **Sécurité**: Helmet, CORS, Rate Limiting
- **Validation**: Joi
- **Tests**: Jest + Supertest

### Structure Backend
```
backend/
├── config/              # Configuration de la base de données
├── controllers/         # Logique métier
│   ├── admin.controller.js      # Gestion admin
│   ├── auth.controller.js       # Authentification
│   ├── card.controller.js       # Cartes virtuelles
│   ├── communityPost.controller.js # Posts communautaires
│   ├── dish.controller.js       # Plats
│   ├── like.controller.js       # Likes
│   ├── recipe.controller.js     # Recettes
│   ├── recipeBook.controller.js # Livres de recettes
│   ├── restaurant.controller.js # Restaurants
│   ├── upload.controller.js     # Upload fichiers
│   └── user.controller.js       # Utilisateurs
├── middleware/          # Middlewares
│   ├── auth.js         # Vérification JWT
│   ├── upload.js       # Configuration Multer
│   └── validation.js   # Validation Joi
├── models/              # Schémas Mongoose
│   ├── Card.js         # Carte virtuelle
│   ├── CommunityPost.js # Post communautaire
│   ├── Dish.js         # Plat
│   ├── Recipe.js       # Recette
│   ├── RecipeBook.js   # Livre de recettes
│   ├── Restaurant.js   # Restaurant
│   └── User.js         # Utilisateur
├── routes/              # Définition des routes API
│   ├── admin.routes.js
│   ├── auth.routes.js
│   ├── card.routes.js
│   ├── communityPost.routes.js
│   ├── dish.routes.js
│   ├── like.routes.js
│   ├── recipe.routes.js
│   ├── recipeBook.routes.js
│   ├── restaurant.routes.js
│   ├── upload.routes.js
│   └── user.routes.js
├── scripts/             # Scripts de seed
├── tests/               # Tests backend
├── server.js            # Point d'entrée
└── package.json
```

### Modèles de Données (Mongoose)

#### User (Utilisateur)
```javascript
{
  name: String (requis, 2-100 caractères),
  email: String (unique, requis),
  password: String (requis, min 6 caractères, hashé),
  isBusiness: Boolean (défaut: false),
  isAdmin: Boolean (défaut: false),
  avatar: String (URL Cloudinary),
  favoriteRecipes: [Recipe ObjectId],
  likedDishes: [Dish ObjectId],
  avatarPublicId: String,
  loginAttempts: Number,
  lockUntil: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date
}
```

#### Restaurant
```javascript
{
  name: String (requis, 2-100 caractères),
  description: String (requis, 10-2000 caractères),
  address: String (requis),
  city: String (requis),
  kosherLevel: Enum ['Rabbanout', 'Mehadrin', 'Badatz', 'None'],
  logo: String (URL Cloudinary),
  coverImage: String (URL Cloudinary),
  ownerId: User ObjectId (requis),
  phone: String,
  website: String,
  status: Enum ['pending', 'approved', 'rejected'],
  isActive: Boolean
}
```

#### Dish (Plat)
```javascript
{
  name: String (requis),
  description: String (requis),
  restaurantId: Restaurant ObjectId (requis),
  category: String,
  price: Number,
  image: String (URL Cloudinary),
  imagePublicId: String,
  ingredients: [String],
  cacherout: String,
  isVegetarian: Boolean,
  isGlutenFree: Boolean,
  rating: { average: Number, count: Number }
}
```

#### Recipe (Recette)
```javascript
{
  title: String (requis),
  description: String (requis),
  ingredients: [String],
  instructions: [String],
  prepTime: Number,
  cookTime: Number,
  servings: Number,
  difficulty: String,
  image: String (URL Cloudinary),
  imagePublicId: String,
  authorId: User ObjectId (requis),
  category: String,
  tags: [String]
}
```

#### CommunityPost (Post Communautaire)
```javascript
{
  title: String (requis),
  content: String (requis),
  authorId: User ObjectId (requis),
  image: String (URL Cloudinary),
  imagePublicId: String,
  likes: [User ObjectId],
  comments: [{
    author: User ObjectId,
    text: String,
    createdAt: Date
  }]
}
```

#### RecipeBook (Livre de Recettes)
```javascript
{
  title: String (requis),
  description: String,
  ownerId: User ObjectId (requis),
  recipes: [Recipe ObjectId],
  isPublic: Boolean
}
```

#### Card (Carte Virtuelle)
```javascript
{
  userId: User ObjectId (requis),
  restaurantId: Restaurant ObjectId (requis),
  cardNumber: String (requis),
  expiryDate: String (requis),
  balance: Number (défaut: 0)
}
```

### Routes API

#### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/forgot-password` - Mot de passe oublié
- `POST /api/auth/reset-password` - Réinitialisation mot de passe

#### Utilisateurs
- `GET /api/users/:id` - Profil utilisateur
- `PUT /api/users/:id` - Mise à jour profil
- `POST /api/users/:id/avatar` - Upload avatar
- `GET /api/users/:id/favorites` - Recettes favorites
- `GET /api/users/:id/likes` - Plats likés

#### Restaurants
- `GET /api/restaurants` - Liste restaurants (filtres: ville, cacherout)
- `GET /api/restaurants/:id` - Détails restaurant
- `POST /api/restaurants` - Création (business)
- `PUT /api/restaurants/:id` - Mise à jour
- `DELETE /api/restaurants/:id` - Suppression

#### Plats
- `GET /api/dishes` - Liste plats
- `GET /api/dishes/:id` - Détails plat
- `POST /api/dishes` - Création
- `PUT /api/dishes/:id` - Mise à jour
- `DELETE /api/dishes/:id` - Suppression

#### Recettes
- `GET /api/recipes` - Liste recettes
- `GET /api/recipes/:id` - Détails recette
- `POST /api/recipes` - Création
- `PUT /api/recipes/:id` - Mise à jour
- `DELETE /api/recipes/:id` - Suppression

#### Livres de Recettes
- `GET /api/recipe-books` - Liste livres
- `GET /api/recipe-books/:id` - Détails livre
- `POST /api/recipe-books` - Création
- `PUT /api/recipe-books/:id` - Mise à jour
- `POST /api/recipe-books/:id/recipes/:recipeId` - Ajouter recette

#### Posts Communautaires
- `GET /api/community-posts` - Liste posts
- `GET /api/community-posts/:id` - Détails post
- `POST /api/community-posts` - Création
- `POST /api/community-posts/:id/like` - Liké
- `POST /api/community-posts/:id/comments` - Commenter

#### Likes
- `POST /api/like/dish/:id` - Liké un plat
- `DELETE /api/like/dish/:id` - Unliké un plat

#### Cartes
- `GET /api/cards/user/:userId` - Cartes utilisateur
- `POST /api/cards` - Création carte
- `POST /api/cards/:id/recharge` - Recharger carte

#### Admin
- `GET /api/admin/users` - Liste utilisateurs
- `PUT /api/admin/users/:id/status` - Changer statut
- `GET /api/admin/restaurants` - Liste restaurants (admin)
- `PUT /api/admin/restaurants/:id/status` - Approuver/rejeter
- `GET /api/admin/stats` - Statistiques globales

#### Upload
- `POST /api/upload/image` - Upload image (Cloudinary)

### Sécurité Backend

1. **Helmet** - Headers HTTP sécurisés
2. **CORS** - Origines autorisées (Vercel + local)
3. **Rate Limiting** - 100 requêtes/15min par IP
4. **JWT** - Tokens d'authentification
5. **Bcrypt** - Hash des mots de passe
6. **Account Lockout** - Blocage après 3 tentatives échouées
7. **Validation Joi** - Validation des entrées

---

## 🎨 Frontend (React 18 + Vite)

### Stack Technique
- **Framework**: React 18 (Hooks, Concurrent Features)
- **Build Tool**: Vite
- **Routing**: React Router v6 (Lazy Loading)
- **State Management**: Zustand
- **Internationalisation**: i18next (FR, EN, HE + RTL)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Yup
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Tests**: Vitest (unit), Playwright (E2E)
- **Linting**: ESLint + Prettier

### Structure Frontend
```
frontend/
├── public/              # Assets statiques
├── src/
│   ├── components/      # Composants réutilisables
│   │   ├── Auth/        # Authentification (Login, Register, etc.)
│   │   ├── Cards/       # Cartes (RestaurantCard, DishCard, etc.)
│   │   ├── Dishes/      # Composants plats (PremiumDishCard, etc.)
│   │   ├── Forms/       # Formulaires réutilisables
│   │   ├── Landing/     # Sections Landing Page
│   │   ├── Layout/      # Layout (Navbar, Footer)
│   │   ├── RecipeBooks/ # Composants livres de recettes
│   │   ├── Restaurants/ # Composants restaurants
│   │   └── UI/          # Composants UI génériques (Button, Modal, etc.)
│   ├── data/            # Données mock
│   │   ├── mockDishes.js
│   │   ├── mockRestaurants.js
│   │   ├── mockRestaurantDetails.js
│   │   ├── mockRecipes.js
│   │   ├── mockRecipeBooks.js
│   │   ├── mockPosts.js
│   │   └── ...
│   ├── i18n/            # Internationalisation
│   │   ├── config.js
│   │   └── locales/
│   │       ├── fr.json  # Traductions françaises
│   │       ├── en.json  # Traductions anglaises
│   │       └── he.json  # Traductions hébraïques
│   ├── pages/           # Pages de l'application
│   │   ├── LandingPage.jsx
│   │   ├── Restaurants.jsx
│   │   ├── RestaurantDetail.jsx
│   │   ├── Dishes.jsx
│   │   ├── DishDetail.jsx
│   │   ├── Contact.jsx
│   │   ├── AboutProject.jsx
│   │   ├── Auth/        # Login, Register, ForgotPassword, ResetPassword
│   │   ├── Admin/       # Pages admin
│   │   ├── Dashboard/   # Dashboard business
│   │   ├── Profile.jsx
│   │   ├── Favorites.jsx
│   │   ├── RecipeBooks.jsx
│   │   ├── RecipeBookDetail.jsx
│   │   ├── RecipeDetail.jsx
│   │   ├── Explore.jsx
│   │   ├── ExploreDetail.jsx
│   │   ├── PostCreate.jsx
│   │   └── ...
│   ├── services/        # Services API
│   │   └── api.js       # Configuration Axios
│   ├── store/           # Zustand stores
│   │   └── authStore.js # Authentification
│   ├── utils/           # Utilitaires
│   │   ├── helpers.js   # Fonctions helpers + localisation
│   │   └── constants.js # Constantes
│   ├── App.jsx          # Routes principales
│   ├── main.jsx         # Point d'entrée
│   └── index.css        # Styles globaux
├── e2e/                 # Tests Playwright
├── .eslintrc.cjs
├── .prettierrc
├── tailwind.config.js
├── vite.config.js
└── package.json
```

### Routes Frontend

#### Routes Publiques (Essentielles)
- `/` - Landing Page (accueil)
- `/restaurants` - Liste restaurants avec filtres
- `/restaurants/:id` - Détails restaurant
- `/dishes` - Liste plats avec filtres
- `/dishes/:id` - Détails plat
- `/contact` - Formulaire de contact
- `/about-project` - Page portfolio
- `/login` - Connexion
- `/register` - Inscription
- `/forgot-password` - Mot de passe oublié
- `/reset-password` - Réinitialisation mot de passe
- `/privacy` - Politique de confidentialité
- `/terms` - Conditions d'utilisation

#### Routes Utilisateur (Protégées)
- `/user-dashboard` - Dashboard utilisateur
- `/profile` - Profil utilisateur
- `/favorites` - Favoris

#### Routes Business (Protégées)
- `/dashboard` - Dashboard business
- `/dashboard/*` - Sous-pages business

#### Routes Admin (Protégées)
- `/admin` - Panel admin
- `/admin/*` - Sous-pages admin

### Composants Principaux

#### Layout
- **Navbar** - Navigation + sélecteur langue + menu utilisateur
- **Footer** - Liens + copyright

#### Authentification
- **LoginForm** - Formulaire de connexion
- **RegisterForm** - Formulaire d'inscription
- **ForgotPasswordForm** - Récupération mot de passe
- **ResetPasswordForm** - Réinitialisation mot de passe
- **ProtectedRoute** - Route protégée avec vérification JWT

#### Restaurants
- **RestaurantCard** - Carte restaurant dans la liste
- **RestaurantGrid** - Grille de restaurants
- **RestaurantFilters** - Filtres (ville, cacherout, cuisine)

#### Plats
- **DishCard** - Carte plat
- **PremiumDishCard** - Carte plat premium
- **DishGrid** - Grille de plats
- **DishFilters** - Filtres (catégorie, végétarien, sans gluten)

#### Recettes
- **RecipeCard** - Carte recette
- **RecipeDetail** - Page détail recette
- **RecipeBookCard** - Carte livre de recettes

#### Communauté
- **PostCard** - Post communautaire
- **PostCreate** - Création de post
- **Explore** - Fil d'actualité

#### UI Générique
- **Button** - Bouton réutilisable
- **Modal** - Modal réutilisable
- **LoadingSpinner** - Spinner de chargement
- **Toast** - Notifications toast

### Internationalisation (i18next)

#### Langues supportées
- 🇫🇷 **Français** (par défaut)
- 🇬🇧 **Anglais**
- 🇮🇱 **Hébreu** (RTL support)

#### Fonction `localizeValue()`
```javascript
// Dans helpers.js
export const localizeValue = (value, language) => {
  const lang = language?.split('-')[0];
  return localizedValues[lang]?.[value] || value;
};
```

#### Traductions
- **Common** - Termes communs (boutons, messages, etc.)
- **Navigation** - Menu navigation
- **Restaurants** - Noms restaurants, descriptions
- **Dishes** - Noms plats, descriptions, catégories
- **Recipes** - Recettes, ingrédients
- **Forms** - Formulaires, validation
- **Auth** - Authentification

### State Management (Zustand)

#### authStore
```javascript
{
  user: Object | null,
  token: String | null,
  isAuthenticated: Boolean,
  login: (credentials) => Promise,
  logout: () => void,
  updateProfile: (data) => Promise
}
```

### Services API

#### api.js (Axios)
```javascript
// Configuration de base
- Base URL: VITE_API_URL ou http://localhost:5000
- Interceptors: Ajout token JWT automatique
- Gestion erreurs: Messages d'erreur standardisés

// Endpoints disponibles
- authAPI: login, register, forgotPassword, resetPassword
- userAPI: getProfile, updateProfile, uploadAvatar
- restaurantAPI: getAll, getById, create, update, delete
- dishAPI: getAll, getById, create, update, delete
- recipeAPI: getAll, getById, create, update, delete
- recipeBookAPI: getAll, getById, create, update
- communityAPI: getAll, getById, create, like, comment
```

### Données Mock

Les fichiers mock permettent de tester l'application sans backend:
- **mockRestaurants.js** - 11 restaurants israéliens
- **mockRestaurantDetails.js** - Détails complets restaurants + plats
- **mockDishes.js** - Plats avec détails
- **mockRecipes.js** - Recettes israéliennes
- **mockRecipeBooks.js** - Livres de recettes
- **mockPosts.js** - Posts communautaires
- **mockUsers.js** - Utilisateurs de démonstration

---

## 🧠 Cerveau du Projet (Logique Métier)

### Flux d'Authentification

1. **Inscription**
   - User soumet formulaire → Validation Joi
   - Password hashé avec bcrypt
   - JWT token généré
   - Token stocké dans localStorage + Zustand

2. **Connexion**
   - Vérification email/password
   - Compte bloqué après 3 échecs (24h)
   - Reset tentatives après succès
   - JWT token renvoyé

3. **Routes Protégées**
   - Middleware vérifie JWT
   - Vérifie rôle (user/business/admin)
   - Redirection si non autorisé

### Flux Restaurant

1. **Création (Business)**
   - Business soumet restaurant
   - Status: 'pending' par défaut
   - Admin doit approuver

2. **Approbation (Admin)**
   - Admin voit restaurants pending
   - Approuve ou rejette
   - Status change → visible publiquement

### Flux Likes

1. **Liké un plat**
   - User clique like
   - Ajouté à `likedDishes` du user
   - Incrément rating plat

2. **Unliké**
   - Retiré de `likedDishes`
   - Décrément rating

### Flux Recettes

1. **Création**
   - User soumet recette
   - Upload image Cloudinary
   - Stockée avec `authorId`

2. **Livre de Recettes**
   - User crée livre
   - Ajoute recettes favorites
   - Option public/privé

### Flux Communauté

1. **Post**
   - User crée post
   - Autres users peuvent liker
   - Commentaires imbriqués

2. **Explore**
   - Fil d'actualité posts
   - Filtres par popularité/récents

---

## 🎯 Fonctionnalités Clés

### Pour Utilisateurs
- 📍 Découverte restaurants israéliens
- 🍽️ Exploration de plats typiques
- 👨‍🍳 Recettes maison
- 📚 Livres de recettes personnels
- ❤️ Favoris et likes
- 👥 Communauté sociale
- 🌐 Multilingue (FR/EN/HE)

### Pour Businesses
- 📊 Dashboard statistiques
- 🏪 Gestion restaurant
- 🍕 Gestion menu (plats)
- 📈 Analytics performances
- 💳 Cartes virtuelles clients

### Pour Admin
- 👤 Gestion utilisateurs
- 🏛️ Validation restaurants
- 📊 Statistiques globales
- 🚫 Modération contenu

---

## 🔐 Sécurité

### Backend
- JWT tokens avec expiration
- Bcrypt pour mots de passe
- Rate limiting (100 req/15min)
- Helmet headers sécurisés
- CORS configuré
- Validation Joi stricte
- Account lockout (3 échecs = 24h)

### Frontend
- Protected routes
- Token storage sécurisé
- XSS protection (React)
- CSRF protection
- Input validation (Yup)

---

## 🚀 Déploiement

### Frontend (Vercel)
- Build: `npm run build`
- Output: `dist/`
- Environment variables: `VITE_API_URL`
- SPA rewrite rules (vercel.json)

### Backend (Render)
- Build: `npm install`
- Start: `node server.js`
- Environment variables: `MONGODB_URI`, `CLIENT_URL`, `JWT_SECRET`
- Config: `render.yaml`

---

## 📊 Statistiques du Projet

### Backend
- **Controllers**: 11
- **Models**: 7
- **Routes**: 11
- **Middlewares**: 3
- **Dependencies**: 12

### Frontend
- **Pages**: 25+
- **Components**: 50+
- **Mock files**: 12
- **Translations**: 3 langues (FR/EN/HE)
- **Dependencies**: 20

### Données
- **Restaurants mock**: 11
- **Plats mock**: 30+
- **Recettes mock**: 20+
- **Posts mock**: 10+

---

## 🧪 Tests

### Backend (Jest + Supertest)
- Tests unitaires controllers
- Tests API endpoints
- Tests middleware

### Frontend (Vitest + Playwright)
- Tests unitaires composants
- Tests E2E user flows
- Tests state management

---

## 📝 Configuration

### Variables d'Environnement

#### Backend (.env)
```
MONGODB_URI=mongodb://...
CLIENT_URL=http://localhost:5173,https://*.vercel.app
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NODE_ENV=development
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🎨 Design System

### Couleurs (Tailwind)
- Primary: Blue-600
- Secondary: Amber-500
- Accent: Emerald-500
- Dark: Gray-900
- Light: Gray-50

### Typographie
- Font: Inter/Heebo (pour hébreu)
- Sizes: xs, sm, base, lg, xl, 2xl, 3xl

### Spacing
- Scale: 4px base
- Utilities: p-4, m-8, gap-4, etc.

---

## 🔄 Flux de Données

### Exemple: Liste Restaurants
```
Frontend (Restaurants.jsx)
  ↓ API call (restaurantAPI.getAll())
Backend (restaurant.controller.js)
  ↓ Query MongoDB
Database (Restaurant collection)
  ↓ Return data
Backend (JSON response)
  ↓ Axios interceptors
Frontend (state update)
  ↓ Render
User (RestaurantGrid)
```

### Exemple: Authentification
```
User (LoginForm)
  ↓ Submit
Frontend (authAPI.login())
  ↓ POST /api/auth/login
Backend (auth.controller.js)
  ↓ Validate credentials
  ↓ Generate JWT
Frontend (authStore.login())
  ↓ Store token
  ↓ Redirect to dashboard
```

---

## 📚 Documentation Externe

- `README.md` - Guide d'installation
- `FRONTEND_GUIDE.md` - Guide frontend détaillé
- `BACKEND_GUIDE.md` - Guide backend détaillé
- `DEPLOYMENT_GUIDE.md` - Guide déploiement
- `START_HERE.md` - Point de départ
- `BUSINESS_DASHBOARD_GUIDE.md` - Guide business
- `USER_SYSTEM_GUIDE.md` - Guide utilisateurs
- `SOCIAL_SYSTEM_GUIDE.md` - Guide communauté
- `DOCUMENTATION_COMPLETE.md` - Documentation complète

---

## 🎓 Points Forts Techniques

### Architecture
- Séparation claire frontend/backend
- RESTful API standard
- Lazy loading routes
- Code splitting optimal

### Performance
- Vite build ultra-rapide
- Lazy loading composants
- Optimisation images Cloudinary
- Caching stratégique

### UX
- Design responsive mobile-first
- Animations fluides (Framer Motion)
- Dark mode support
- Navigation intuitive

### Internationalisation
- 3 langues complètes
- RTL support (hébreu)
- Changement langue instantané
- Traductions contextuelles

### Sécurité
- Auth JWT robuste
- Protection rate limiting
- Validation stricte
- Account lockout

---

## 🚀 Prochaines Évolutions Possibles

- [ ] Notifications push
- [ ] Réservations restaurants
- [ ] Commandes en ligne
- [ ] Paiements intégrés
- [ ] Reviews et ratings
- [ ] Carte interactive restaurants
- [ ] Mode hors-ligne (PWA)
- [ ] Application mobile native

---

## 👥 Rôles Utilisateurs

### User Standard
- Voir restaurants/plats
- Créer recettes
- Gérer favoris
- Participer communauté

### Business
- Gérer restaurant
- Ajouter plats/menu
- Voir analytics
- Gérer cartes clients

### Admin
- Valider restaurants
- Gérer utilisateurs
- Modérer contenu
- Voir statistiques globales

---

## 📈 Métriques de Succès

- Performance: Lighthouse score 90+
- SEO: Meta tags optimisés
- Accessibilité: WCAG AA
- Mobile: 100% responsive
- Internationalisation: 3 langues
- Tests: 80%+ coverage

---

**Ce résumé couvre l'ensemble du projet Flavors of Israel - son squelette (structure) et son cerveau (logique métier).**
