import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../services/api';

const isNetworkError = (error) =>
  !error?.response ||
  error?.code === 'ERR_NETWORK' ||
  error?.code === 'ECONNABORTED' ||
  error?.message === 'Network Error';

const buildMockUser = ({ name, email, isBusiness = false, isAdmin = false }) => ({
  _id: `mock-${Date.now()}`,
  name: name || email?.split('@')[0] || 'Utilisateur',
  email,
  isBusiness,
  isAdmin,
  avatar: null,
  createdAt: new Date().toISOString(),
  mock: true,
});

const buildMockToken = () => `mock-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await authAPI.login({ email, password });
          const { token, user } = response.data;

          set({
            user,
            token,
            isAuthenticated: true,
            loading: false,
          });

          return { success: true };
        } catch (error) {
          // Mock fallback when backend is unreachable (demo mode)
          if (isNetworkError(error)) {
            if (!email || !password || password.length < 6) {
              set({ loading: false, error: 'Invalid credentials' });
              return { success: false, error: 'Invalid credentials' };
            }
            const mockUser = buildMockUser({
              email,
              isAdmin: email.includes('admin'),
              isBusiness: email.includes('business') || email.includes('pro'),
            });
            const token = buildMockToken();
            set({
              user: mockUser,
              token,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
            return { success: true, mock: true };
          }
          set({
            error: error.response?.data?.message || 'Login failed',
            loading: false,
          });
          return {
            success: false,
            error: error.response?.data?.message || 'Invalid credentials',
          };
        }
      },

      register: async (name, email, password, isBusiness = false) => {
        set({ loading: true, error: null });
        try {
          const response = await authAPI.register({
            name,
            email,
            password,
            isBusiness,
          });
          const { token, user } = response.data;

          set({
            user,
            token,
            isAuthenticated: true,
            loading: false,
          });

          return { success: true };
        } catch (error) {
          // Mock fallback when backend is unreachable (demo mode)
          if (isNetworkError(error)) {
            if (!email || !password || password.length < 6 || !name) {
              set({ loading: false, error: 'Invalid registration data' });
              return { success: false, error: 'Invalid registration data' };
            }
            const mockUser = buildMockUser({ name, email, isBusiness });
            const token = buildMockToken();
            set({
              user: mockUser,
              token,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
            return { success: true, mock: true };
          }
          set({
            error: error.response?.data?.message || 'Registration failed',
            loading: false,
          });
          return {
            success: false,
            error: error.response?.data?.message || 'Registration error',
          };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      checkAuth: async () => {
        const { token, user } = get();
        if (!token) return;

        try {
          if (token.startsWith('mock-')) {
            if (user) {
              set({ isAuthenticated: true });
              return;
            }
          }

          const response = await authAPI.getProfile();
          set({ user: response.data.user, isAuthenticated: true });
        } catch {
          get().logout();
        }
      },

      updateUser: (userData) => {
        set({ user: { ...get().user, ...userData } });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
