export const mockAdminStats = {
  users: { total: 1250, new: 45 },
  restaurants: { total: 85, pending: 3 },
  recipes: { total: 340, pending: 5 },
};

export const mockAdminUsers = [
  {
    _id: 'u1',
    name: 'Sarah Cohen',
    email: 'sarah@example.com',
    role: 'user',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'u2',
    name: 'David Levi',
    email: 'david@example.com',
    role: 'business',
    isBusiness: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: 'u3',
    name: 'Admin User',
    email: 'admin@flavorsofisrael.com',
    role: 'admin',
    isAdmin: true,
    createdAt: new Date(Date.now() - 100000000).toISOString(),
  },
];

export const mockPendingRestaurants = [
  {
    _id: 'pr1',
    name: 'Le Jardin de Jaffa',
    ownerId: { name: 'Yossi Golan' },
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'pr2',
    name: 'Falafel King',
    ownerId: { name: 'Ronit Bar' },
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];
