import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Lazy loaded pages for better performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dishes = lazy(() => import('./pages/Dishes'));
const DishDetail = lazy(() => import('./pages/DishDetail'));
const Restaurants = lazy(() => import('./pages/Restaurants'));
const RestaurantDetail = lazy(() => import('./pages/RestaurantDetail'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const AboutProject = lazy(() => import('./pages/AboutProject'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const FeatureUnavailable = lazy(() => import('./pages/FeatureUnavailable'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* ESSENTIAL ROUTES - Restaurant Guide */}
            <Route index element={<LandingPage />} />
            <Route path="restaurants" element={<Restaurants />} />
            <Route path="restaurants/:id" element={<RestaurantDetail />} />
            <Route path="dishes" element={<Dishes />} />
            <Route path="dishes/:id" element={<DishDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="about-project" element={<AboutProject />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* User Dashboard */}
            <Route
              path="user-dashboard"
              element={
                <ProtectedRoute>
                  <FeatureUnavailable />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <FeatureUnavailable />
                </ProtectedRoute>
              }
            />
            <Route
              path="favorites"
              element={
                <ProtectedRoute>
                  <FeatureUnavailable />
                </ProtectedRoute>
              }
            />

            {/* Business Dashboard */}
            <Route
              path="dashboard"
              element={
                <ProtectedRoute requireBusiness>
                  <FeatureUnavailable />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard/*"
              element={
                <ProtectedRoute requireBusiness>
                  <FeatureUnavailable />
                </ProtectedRoute>
              }
            />

            {/* Admin Panel */}
            <Route
              path="admin"
              element={
                <ProtectedRoute requireAdmin>
                  <FeatureUnavailable />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/*"
              element={
                <ProtectedRoute requireAdmin>
                  <FeatureUnavailable />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
