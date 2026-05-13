const STORAGE_KEY = 'foi_reservations';

const readFromStorage = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeToStorage = (list) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Silent: storage may be disabled (e.g. private mode)
  }
};

const generateId = () => `res-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const reservationsAPI = {
  list: ({ userId } = {}) => {
    const all = readFromStorage();
    if (!userId) return all;
    return all.filter((r) => r.userId === userId);
  },

  getById: (id) => readFromStorage().find((r) => r._id === id) || null,

  create: (data) => {
    const all = readFromStorage();
    const reservation = {
      _id: generateId(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      ...data,
    };
    all.unshift(reservation);
    writeToStorage(all);
    return reservation;
  },

  update: (id, patch) => {
    const all = readFromStorage();
    const idx = all.findIndex((r) => r._id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...patch, updatedAt: new Date().toISOString() };
    writeToStorage(all);
    return all[idx];
  },

  cancel: (id) => reservationsAPI.update(id, { status: 'cancelled' }),

  remove: (id) => {
    const all = readFromStorage().filter((r) => r._id !== id);
    writeToStorage(all);
  },

  clearAll: () => writeToStorage([]),
};

export default reservationsAPI;
