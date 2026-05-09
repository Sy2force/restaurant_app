# Flavors of Israel | Restaurant Discovery Platform

A modern React portfolio project for discovering Israeli restaurants, dishes and culinary experiences. Built as a demonstration of frontend engineering skills with clean architecture, responsive design, multilingual support, and comprehensive testing.

## Live Demo

[https://your-demo-link.vercel.app](https://your-demo-link.vercel.app)

## Screenshots

- Home page with hero section and featured dishes
- Restaurants listing with filters
- Dish details with comprehensive information
- Mobile responsive design
- Dark mode interface
- About Project case study page

## Features

- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Restaurant Listing** - Browse and filter Israeli restaurants by city, cuisine, kosher certification
- **Dish Discovery** - Explore popular dishes with detailed information
- **Detail Pages** - Comprehensive restaurant and dish detail pages
- **Authentication UI** - Login, register, forgot password, reset password flows
- **Dark Mode** - Full dark mode support with smooth transitions
- **Multilingual Support** - French, English, and Hebrew with RTL support
- **Mock Data** - Structured mock data for offline/demo functionality
- **Smooth Animations** - Framer Motion animations throughout the application
- **Unit Tests** - Vitest unit tests for critical components
- **E2E Tests** - Playwright end-to-end tests for user flows
- **Lazy Loading** - React.lazy and Suspense for optimal performance
- **SEO Optimized** - Meta tags, Open Graph, and Twitter cards

## Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing with lazy loading
- **Zustand** - Lightweight state management
- **i18next** - Internationalization framework
- **Framer Motion** - Production-ready animation library
- **Vitest** - Unit testing framework
- **Playwright** - E2E testing framework
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form management with validation
- **Yup** - Schema validation
- **Lucide React** - Beautiful icon library

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Auth/       # Authentication components
│   │   ├── Cards/      # Card components
│   │   ├── Dishes/     # Dish-related components
│   │   ├── Forms/      # Form components
│   │   ├── Landing/    # Landing page sections
│   │   ├── Layout/     # Layout components (Navbar, Footer, etc.)
│   │   ├── RecipeBooks/# Recipe book components
│   │   ├── Restaurants/# Restaurant components
│   │   └── UI/         # General UI components
│   ├── data/           # Mock data files
│   ├── i18n/           # Translation files (FR, EN, HE)
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── store/          # Zustand stores
│   ├── utils/          # Helper functions
│   └── main.jsx        # Application entry point
├── public/             # Static assets
└── e2e/                # Playwright E2E tests
```

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd "Flavors of israel/frontend"

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

## Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The build output is generated in the `dist` directory.

## Tests

```bash
# Run unit tests
npm run test:unit

# Run unit tests with watch mode
npm run test

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run linting
npm run lint

# Format code
npm run format
```

## Deployment

### Vercel

The project is configured for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Set root directory to `frontend`
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add environment variables (if needed):
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

The `vercel.json` file includes SPA rewrite rules for React Router.

### Render

Backend deployment configuration available in `render.yaml` for Express API.

## Portfolio Note

This project was created as part of my developer portfolio to demonstrate frontend engineering skills including:
- Component architecture and reusability
- State management with Zustand
- Internationalization (i18n)
- Responsive design principles
- Performance optimization (lazy loading, code splitting)
- Testing strategies (unit and E2E)
- Modern React patterns and best practices
- Production deployment readiness

## Routes

- `/` - Landing page with hero, restaurants, dishes, tech stack
- `/restaurants` - Restaurant listing with filters
- `/restaurants/:id` - Restaurant detail page
- `/dishes` - Dish listing with filters
- `/dishes/:id` - Dish detail page
- `/contact` - Contact form
- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Password recovery
- `/reset-password` - Password reset
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/about-project` - Portfolio case study page

## Internationalization

The application supports three languages:
- 🇫🇷 French (Français)
- 🇬🇧 English
- 🇮🇱 Hebrew (עברית) with RTL support

Language can be changed via the language selector in the navbar or footer.

## Development

```bash
# Start development server
npm run dev

# Available at http://localhost:5173
```

## License

This project is for portfolio demonstration purposes.

## Contact

For questions about this project, please reach out through the contact form in the application or via GitHub issues.

