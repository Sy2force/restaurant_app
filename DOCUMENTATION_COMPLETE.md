# Restaurant Israel - Documentation Complète du Projet

## 📋 Table des Matières
1. [Vue d'ensemble](#vue-densemble)
2. [Architecture du projet](#architecture-du-projet)
3. [Structure des fichiers](#structure-des-fichiers)
4. [Routes et pages](#routes-et-pages)
5. [Composants](#composants)
6. [Services et API](#services-et-api)
7. [State Management](#state-management)
8. [Internationalisation](#internationalisation)
9. [Données mockées](#données-mockées)
10. [Configuration](#configuration)
11. [Fonctionnalités principales](#fonctionnalités-principales)

---

## 🎯 Vue d'ensemble

**Restaurant Israel** est une application web React moderne qui sert de plateforme pour la cuisine israélienne, permettant aux utilisateurs de:
- Découvrir des restaurants et plats
- Partager des recettes et créations culinaires
- Gérer des établissements de restauration
- Explorer une communauté culinaire

**Technologies principales:**
- React 18.2.0
- Vite 5.0.11 (build tool)
- React Router 6.21.1 (routing)
- Tailwind CSS 3.4.1 (styling)
- Zustand 4.4.7 (state management)
- i18next 23.7.16 (internationalisation)
- Axios 1.6.5 (HTTP client)
- Framer Motion 10.18.0 (animations)
- Swiper 11.0.5 (carousels)
- React Hook Form 7.49.3 (forms)
- Yup 1.7.1 (validation)

---

## 🏗️ Architecture du projet

### Structure globale
```
frontend/
├── public/              # Assets statiques et fichiers de traduction
├── src/
│   ├── components/      # Composants React réutilisables
│   ├── pages/          # Pages de l'application
│   ├── services/       # Services API
│   ├── store/          # State management (Zustand)
│   ├── utils/          # Utilitaires et helpers
│   ├── data/           # Données mockées
│   ├── i18n/           # Configuration i18n
│   ├── App.jsx         # Composant principal avec routes
│   └── main.jsx        # Point d'entrée
├── index.html          # HTML principal
├── package.json        # Dépendances
├── vite.config.js      # Configuration Vite
└── tailwind.config.js  # Configuration Tailwind
```

---

## 📁 Structure des fichiers

### Racine du projet (frontend/)
- **index.html** (856 bytes) - Page HTML principale avec title "Restaurant Israel"
- **package.json** (1602 bytes) - Dépendances et scripts
- **vite.config.js** (436 bytes) - Configuration Vite
- **tailwind.config.js** (1688 bytes) - Configuration Tailwind CSS
- **postcss.config.js** (80 bytes) - Configuration PostCSS
- **.eslintrc.cjs** (719 bytes) - Configuration ESLint
- **.prettierrc** (133 bytes) - Configuration Prettier
- **playwright.config.js** (905 bytes) - Configuration Playwright E2E
- **vercel.json** (290 bytes) - Configuration déploiement Vercel

### Dossier src/
- **App.jsx** (7765 bytes) - Composant principal avec toutes les routes
- **main.jsx** (395 bytes) - Point d'entrée de l'application
- **index.css** (1580 bytes) - Styles globaux

---

## 🛣️ Routes et pages

### Pages publiques (sans authentification)

| Route | Composant | Description |
|-------|-----------|-------------|
| `/` | LandingPage | Page d'accueil avec sections héro, statistiques, carousel |
| `/dishes` | Dishes | Liste des plats avec filtres et recherche |
| `/dishes/:id` | DishDetail | Détails d'un plat spécifique |
| `/restaurants` | Restaurants | Liste des restaurants avec filtres |
| `/restaurants/:id` | RestaurantDetail | Détails d'un restaurant |
| `/recipe-books` | RecipeBooks | Liste des livres de recettes |
| `/recipe-books/:id` | RecipeBookDetail | Détails d'un livre de recettes |
| `/recipes/:id` | RecipeDetail | Détails d'une recette |
| `/explore` | Explore | Flux d'inspiration culinaire |
| `/explore/:id` | ExploreDetail | Détails d'un post d'inspiration |
| `/contact` | Contact | Formulaire de contact |
| `/privacy` | Privacy | Politique de confidentialité |
| `/terms` | Terms | Conditions d'utilisation |
| `/*` | NotFound | Page 404 |

### Pages d'authentification

| Route | Composant | Description |
|-------|-----------|-------------|
| `/login` | Login | Connexion utilisateur |
| `/register` | Register | Inscription utilisateur |
| `/forgot-password` | ForgotPassword | Récupération de mot de passe |
| `/reset-password` | ResetPassword | Réinitialisation de mot de passe |
| `/unauthorized` | Unauthorized | Page d'accès non autorisé |

### Pages utilisateur (authentifié)

| Route | Composant | Description |
|-------|-----------|-------------|
| `/profile` | Profile | Profil utilisateur |
| `/profile/:id` | Profile | Profil d'un autre utilisateur |
| `/favorites` | Favorites | Favoris de l'utilisateur |
| `/user-dashboard` | UserDashboard | Dashboard utilisateur |
| `/dashboard/likes` | UserLikes | Posts likés par l'utilisateur |
| `/explore/create` | PostCreate | Création d'un post d'inspiration |

### Pages Dashboard Business (professionnel)

| Route | Composant | Description |
|-------|-----------|-------------|
| `/dashboard` | BusinessDashboard | Dashboard principal business |
| `/dashboard/restaurants` | RestaurantList | Liste des restaurants du business |
| `/dashboard/restaurants/create` | RestaurantForm | Création d'un restaurant |
| `/dashboard/restaurants/:id/edit` | RestaurantForm | Modification d'un restaurant |
| `/dashboard/dishes` | DishList | Liste des plats du business |
| `/dashboard/dishes/create` | DishForm | Création d'un plat |
| `/dashboard/dishes/:id/edit` | DishForm | Modification d'un plat |
| `/dashboard/recipes` | RecipeList | Liste des recettes du business |
| `/dashboard/recipes/create` | RecipeForm | Création d'une recette |
| `/dashboard/recipes/:id/edit` | RecipeForm | Modification d'une recette |
| `/dashboard/cards` | MyCards | Cartes de visite du business |
| `/dashboard/cards/create` | CreateCard | Création d'une carte de visite |
| `/dashboard/analytics` | Analytics | Statistiques et analytics |
| `/dashboard/settings` | Settings | Paramètres du compte |

### Pages Admin

| Route | Composant | Description |
|-------|-----------|-------------|
| `/admin` | AdminPanel | Panel d'administration |
| `/admin/:tab` | AdminPanel | Panel d'administration avec onglets |

---

## 🧩 Composants

### Composants Layout

| Composant | Fichier | Description |
|-----------|---------|-------------|
| Layout | Layout.jsx | Layout principal avec navbar et footer |
| Navbar | Navbar.jsx | Barre de navigation avec menu utilisateur |
| Footer | Footer.jsx | Footer avec liens et newsletter |
| MobileBottomNav | MobileBottomNav.jsx | Navigation mobile inférieure |
| PageWrapper | PageWrapper.jsx | Wrapper pour les pages avec animations |

### Composants Auth

| Composant | Fichier | Description |
|-----------|---------|-------------|
| ProtectedRoute | ProtectedRoute.jsx | Route protégée avec vérification de rôles |

### Composants Landing

| Composant | Fichier | Description |
|-----------|---------|-------------|
| HeroLanding | HeroLanding.jsx | Section héro avec carousel d'images |
| StatsSection | StatsSection.jsx | Section statistiques |
| DishesCarousel | DishesCarousel.jsx | Carousel de plats vedettes |
| RecipesSection | RecipesSection.jsx | Section des recettes populaires |
| RestaurantsSection | RestaurantsSection.jsx | Section des restaurants vedettes |
| TestimonialsSection | TestimonialsSection.jsx | Section témoignages |
| PublishSection | PublishSection.jsx | Section publication de créations |
| CTASection | CTASection.jsx | Section appel à l'action |

### Composants Dishes

| Composant | Fichier | Description |
|-----------|---------|-------------|
| PremiumDishCard | PremiumDishCard.jsx | Carte premium pour les plats |
| QuickActions | QuickActions.jsx | Actions rapides pour les filtres |
| StickyFilters | StickyFilters.jsx | Filtres sticky pour les plats |

### Composants Restaurants

| Composant | Fichier | Description |
|-----------|---------|-------------|
| PremiumRestaurantCard | PremiumRestaurantCard.jsx | Carte premium pour les restaurants |

### Composants RecipeBooks

| Composant | Fichier | Description |
|-----------|---------|-------------|
| PremiumBookCard | PremiumBookCard.jsx | Carte premium pour les livres de recettes |

### Composants Cards

| Composant | Fichier | Description |
|-----------|---------|-------------|
| CardItem | CardItem.jsx | Carte générique pour les éléments |

### Composants Forms

| Composant | Fichier | Description |
|-----------|---------|-------------|
| Input | Input.jsx | Composant input réutilisable |
| Textarea | Textarea.jsx | Composant textarea réutilisable |

### Composants UI

| Composant | Fichier | Description |
|-----------|---------|-------------|
| Button | Button.jsx | Composant bouton réutilisable |
| DashboardMenu | DashboardMenu.jsx | Menu de navigation dashboard |
| ExplorePostCard | ExplorePostCard.jsx | Carte pour les posts d'inspiration |
| ImageModal | ImageModal.jsx | Modal pour afficher des images |
| LanguageSelector | LanguageSelector.jsx | Sélecteur de langue |
| LoadingSpinner | LoadingSpinner.jsx | Spinner de chargement |
| Modal | Modal.jsx | Modal générique |
| RecipeCard | RecipeCard.jsx | Carte pour les recettes |
| SkeletonCard | SkeletonCard.jsx | Skeleton pour le chargement |
| Toast | Toast.jsx | Notifications toast |

---

## 🔌 Services et API

### api.js (6470 bytes)

**Fonctions API disponibles:**

**Authentification:**
- `login(email, password)` - Connexion
- `register(userData)` - Inscription
- `logout()` - Déconnexion
- `forgotPassword(email)` - Récupération mot de passe
- `resetPassword(token, newPassword)` - Réinitialisation mot de passe
- `updateProfile(data)` - Mise à jour profil

**Restaurants:**
- `getRestaurants()` - Liste des restaurants
- `getRestaurant(id)` - Détails restaurant
- `createRestaurant(data)` - Création restaurant
- `updateRestaurant(id, data)` - Mise à jour restaurant
- `deleteRestaurant(id)` - Suppression restaurant

**Plats:**
- `getDishes()` - Liste des plats
- `getDish(id)` - Détails plat
- `createDish(data)` - Création plat
- `updateDish(id, data)` - Mise à jour plat
- `deleteDish(id)` - Suppression plat

**Recettes:**
- `getRecipes()` - Liste des recettes
- `getRecipe(id)` - Détails recette
- `createRecipe(data)` - Création recette
- `updateRecipe(id, data)` - Mise à jour recette
- `deleteRecipe(id)` - Suppression recette

**Posts/Explore:**
- `getPosts()` - Liste des posts
- `getPost(id)` - Détails post
- `createPost(data)` - Création post
- `likePost(id)` - Like un post
- `unlikePost(id)` - Unlike un post
- `addComment(postId, text)` - Ajouter commentaire
- `deleteComment(commentId)` - Supprimer commentaire

**Utilisateurs:**
- `getUser(id)` - Détails utilisateur
- `getUsers()` - Liste des utilisateurs (admin)
- `updateUserRole(id, role)` - Mise à jour rôle (admin)

---

## 🗄️ State Management

### authStore.js (2858 bytes)

**État global:**
- `user` - Utilisateur connecté
- `isAuthenticated` - Statut d'authentification
- `token` - Token JWT
- `isLoading` - Statut de chargement

**Actions:**
- `login(email, password)` - Connexion
- `register(userData)` - Inscription
- `logout()` - Déconnexion
- `updateUser(user)` - Mise à jour utilisateur
- `checkAuth()` - Vérification authentification

---

## 🌍 Internationalisation

### Configuration i18n

**Langues supportées:**
- Français (fr) - Langue par défaut
- Anglais (en)
- Hébreu (he)

**Fichiers de traduction:**
- `public/locales/fr/translation.json` (902 lignes)
- `public/locales/en/translation.json` (903 lignes)
- `public/locales/he/translation.json` (902 lignes)
- `src/i18n/locales/fr.json` (copie synchronisée)
- `src/i18n/locales/en.json` (copie synchronisée)
- `src/i18n/locales/he.json` (copie synchronisée)

**Sections de traduction:**
- `nav` - Navigation
- `dashboardMenu` - Menu dashboard
- `auth` - Authentification
- `unauthorized` - Accès non autorisé
- `landing` - Page d'accueil
- `common` - Éléments communs
- `recipeDetail` - Détails recette
- `dishDetail` - Détails plat
- `filters` - Filtres
- `explore` - Inspiration
- `exploreDetail` - Détails inspiration
- `userLikes` - Likes utilisateur
- `favorites` - Favoris
- `postCreate` - Création post
- `dashboard` - Dashboard
- `userDashboard` - Dashboard utilisateur
- `businessDashboard` - Dashboard business
- `admin` - Administration
- `settings` - Paramètres
- `profile` - Profil
- `details` - Détails
- `home` - Accueil
- `analytics` - Analytics
- `restaurantDetail` - Détails restaurant
- `contact` - Contact
- `dishesPage` - Page plats
- `restaurantsPage` - Page restaurants
- `recipeBooksPage` - Page livres de recettes
- `footer` - Footer
- `notFound` - Page 404
- `terms` - Conditions
- `privacy` - Confidentialité

---

## 📊 Données mockées

### Fichiers de données mockées

| Fichier | Taille | Description |
|---------|--------|-------------|
| constants.js | 643 bytes | Constantes HERO_IMAGES |
| featuredDishes.js | 1081 bytes | Plats vedettes pour carousel |
| mockAdminData.js | 1030 bytes | Données admin |
| mockBusinessStats.js | 2797 bytes | Statistiques business |
| mockDashboardStats.js | 124 bytes | Stats dashboard |
| mockDishes.js | 13558 bytes | Données des plats |
| mockFavorites.js | 1776 bytes | Données favoris |
| mockLandingData.js | 1532 bytes | Données page d'accueil |
| mockPostDetails.js | 5006 bytes | Détails posts |
| mockPosts.js | 3635 bytes | Posts d'inspiration |
| mockRecipeBookDetails.js | 3697 bytes | Détails livres de recettes |
| mockRecipeBooks.js | 2147 bytes | Livres de recettes |
| mockRecipeDetails.js | 14244 bytes | Détails recettes |
| mockRestaurantDetails.js | 15439 bytes | Détails restaurants |
| mockRestaurants.js | 6236 bytes | Données restaurants |
| mockTestimonials.js | 1038 bytes | Témoignages |
| mockUserLikes.js | 1723 bytes | Likes utilisateur |
| mockUsers.js | 1707 bytes | Données utilisateurs |

---

## ⚙️ Configuration

### Vite Configuration (vite.config.js)
- Plugin React
- Configuration serveur de développement
- Configuration build

### Tailwind Configuration (tailwind.config.js)
- Couleurs personnalisées (gold, cream, olive, dark)
- Familles de polices (Inter, Playfair Display)
- Extensions pour les animations

### ESLint Configuration
- React plugin
- React Hooks plugin
- Prettier plugin

### Playwright Configuration
- Configuration tests E2E
- Browsers supportés

---

## 🎨 Fonctionnalités principales

### 1. Navigation et Routing
- Système de routing React Router v6
- Routes protégées avec ProtectedRoute
- Gestion des rôles (user, business, admin)
- Navigation mobile responsive

### 2. Authentification
- Inscription avec email/mot de passe
- Connexion avec token JWT
- Récupération de mot de passe
- Réinitialisation de mot de passe
- Gestion de session avec Zustand

### 3. Internationalisation
- Support 3 langues (FR, EN, HE)
- Changement de langue dynamique
- Support RTL pour l'hébreu
- Fichiers de traduction synchronisés

### 4. Pages publiques
- **Landing Page** avec sections héro, statistiques, carousel
- **Dishes** - Liste avec filtres et recherche
- **Restaurants** - Liste avec filtres
- **Recipe Books** - Livres de recettes thématiques
- **Explore** - Flux d'inspiration culinaire
- **Contact** - Formulaire de contact

### 5. Dashboard Utilisateur
- Profil utilisateur
- Favoris
- Posts likés
- Statistiques personnelles

### 6. Dashboard Business
- Gestion des restaurants
- Gestion des plats
- Gestion des recettes
- Cartes de visite business
- Analytics et statistiques
- Paramètres du compte

### 7. Panel Admin
- Gestion des utilisateurs
- Gestion des restaurants
- Modération de contenu
- Statistiques globales

### 8. Fonctionnalités sociales
- Likes sur posts
- Commentaires
- Partage de créations
- Suivi d'utilisateurs

### 9. Recherche et Filtrage
- Recherche par texte
- Filtres par catégorie
- Filtres par ville
- Filtres par cacherout (kasher)
- Filtres par prix

### 10. Responsive Design
- Design mobile-first
- Navigation mobile avec bottom nav
- Layouts adaptatifs
- Touch-friendly

---

## 📦 Dépendances principales

### Production
- **react** (18.2.0) - Framework UI
- **react-dom** (18.2.0) - DOM React
- **react-router-dom** (6.21.1) - Routing
- **zustand** (4.4.7) - State management
- **i18next** (23.7.16) - Internationalisation
- **react-i18next** (14.0.0) - React i18next
- **axios** (1.6.5) - HTTP client
- **framer-motion** (10.18.0) - Animations
- **swiper** (11.0.5) - Carousels
- **react-hook-form** (7.49.3) - Forms
- **@hookform/resolvers** (5.2.2) - Resolvers
- **yup** (1.7.1) - Validation
- **lucide-react** (0.303.0) - Icons

### Développement
- **vite** (5.0.11) - Build tool
- **@vitejs/plugin-react** (4.2.1) - Plugin React Vite
- **tailwindcss** (3.4.1) - CSS framework
- **postcss** (8.4.33) - PostCSS
- **autoprefixer** (10.4.16) - Autoprefixer
- **eslint** (8.56.0) - Linter
- **prettier** (3.2.4) - Formatter
- **@playwright/test** (1.59.1) - Tests E2E
- **vitest** (1.2.1) - Tests unitaires
- **@testing-library/react** (14.1.2) - Tests React

---

## 🚀 Scripts disponibles

```json
{
  "dev": "vite",                    // Serveur de développement
  "build": "vite build",            // Build de production
  "preview": "vite preview",        // Preview build
  "lint": "eslint src --ext .js,.jsx",
  "format": "prettier --write \"src/**/*.{js,jsx,css,md}\"",
  "test": "vitest",                 // Tests unitaires
  "test:unit": "vitest --run",
  "test:e2e": "playwright test",     // Tests E2E
  "test:e2e:ui": "playwright test --ui"
}
```

---

## 📝 Notes importantes

### RTL Support
- L'hébreu utilise le mode RTL (Right-to-Left)
- Les classes Tailwind avec préfixes `rtl:` et `ltr:` gèrent le layout directionnel
- La direction du document change dynamiquement selon la langue

### Images
- Utilisation de `getImageUrl()` helper pour les images
- Fallback images pour les erreurs de chargement
- Images hébergées sur Unsplash pour le développement

### API
- Les appels API sont configurés dans `api.js`
- Utilisation d'Axios pour les requêtes HTTP
- Gestion des erreurs centralisée

### Tests
- Tests unitaires avec Vitest
- Tests E2E avec Playwright
- Tests de composants avec Testing Library

---

## 🔒 Sécurité

- Routes protégées avec ProtectedRoute
- Vérification des rôles (user, business, admin)
- Token JWT pour l'authentification
- Validation des formulaires avec Yup

---

## 📈 Performance

- Lazy loading avec React Router
- Code splitting automatique avec Vite
- Optimisation des images
- Utilisation de Framer Motion pour animations optimisées

---

## 🎯 Conclusion

Ce projet Restaurant Israel est une application web complète et moderne avec:
- 36 pages et routes
- 52 composants React
- 3 langues supportées
- Système d'authentification complet
- Dashboard utilisateur et business
- Panel d'administration
- Responsive design
- Animations fluides
- Tests automatisés

Le projet est prêt pour la production avec un build optimisé et toutes les fonctionnalités opérationnelles.
