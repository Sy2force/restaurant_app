import { reservationsAPI as mockAPI } from '../data/mockReservations';

/**
 * Reservation service. Wraps the local mock store today;
 * can be wired to a real backend later without changing consumers.
 */

const validate = (data = {}) => {
  const errors = {};
  if (!data.name?.trim()) errors.name = 'Name is required';
  if (!data.email?.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = 'Valid email is required';
  }
  if (!data.phone?.trim()) errors.phone = 'Phone is required';
  if (!data.date) errors.date = 'Date is required';
  if (!data.time) errors.time = 'Time is required';
  const guests = Number(data.guests);
  if (!guests || guests < 1 || guests > 12) {
    errors.guests = 'Guests must be between 1 and 12';
  }
  if (!data.restaurantId) errors.restaurantId = 'Restaurant is required';

  return { valid: Object.keys(errors).length === 0, errors };
};

export const createReservation = async (data) => {
  const { valid, errors } = validate(data);
  if (!valid) {
    return { success: false, errors };
  }
  const reservation = mockAPI.create(data);
  return { success: true, reservation };
};

export const getUserReservations = async (userId) => {
  return mockAPI.list({ userId });
};

export const cancelReservation = async (reservationId) => {
  const updated = mockAPI.cancel(reservationId);
  return { success: !!updated, reservation: updated };
};

export const deleteReservation = async (reservationId) => {
  mockAPI.remove(reservationId);
  return { success: true };
};

export default {
  createReservation,
  getUserReservations,
  cancelReservation,
  deleteReservation,
};
