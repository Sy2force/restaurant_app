import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  User,
  MessageSquare,
  CheckCircle,
} from 'lucide-react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { useAuthStore } from '../../store/authStore';
import { reservationsAPI } from '../../data/mockReservations';
import { localizeValue } from '../../utils/helpers';

const todayISO = () => new Date().toISOString().split('T')[0];

const ReservationModal = ({ isOpen, onClose, restaurant }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    date: todayISO(),
    time: '19:30',
    guests: 2,
    note: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  if (!isOpen) return null;

  const restaurantName = restaurant ? localizeValue(restaurant.name, i18n.language) : '';

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const next = {};
    if (!form.name?.trim()) next.name = t('auth.errors.required');
    if (!form.email?.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = t('auth.errors.invalidEmail');
    }
    if (!form.phone?.trim()) next.phone = t('auth.errors.required');
    if (!form.date) next.date = t('auth.errors.required');
    if (!form.time) next.time = t('auth.errors.required');
    if (!form.guests || form.guests < 1) next.guests = t('auth.errors.required');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!isAuthenticated) {
      onClose?.();
      navigate('/login', { state: { from: { pathname: '/restaurants' } } });
      return;
    }

    setSubmitting(true);
    try {
      const reservation = reservationsAPI.create({
        userId: user?._id,
        restaurantId: restaurant?._id,
        restaurantName,
        city: restaurant?.address?.city,
        street: restaurant?.address?.street,
        coverImage: restaurant?.coverImage || restaurant?.imageUrl,
        ...form,
      });
      setSuccess(reservation);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccess(null);
    onClose?.();
  };

  const handleViewReservations = () => {
    setSuccess(null);
    onClose?.();
    navigate('/reservations');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={success ? t('reservations.successTitle') : t('reservations.title')}
      size="md"
    >
      {success ? (
        <div className="text-center py-6">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle className="h-8 w-8" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {t('reservations.successMessage', { restaurant: restaurantName })}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('reservations.successDetails', {
              date: success.date,
              time: success.time,
              guests: success.guests,
            })}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="primary" onClick={handleViewReservations}>
              {t('reservations.viewMine')}
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              {t('common.close')}
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {restaurantName && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('reservations.bookingAt')} <strong>{restaurantName}</strong>
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              icon={User}
              label={t('reservations.fields.name')}
              value={form.name}
              onChange={(v) => handleChange('name', v)}
              error={errors.name}
              autoComplete="name"
            />
            <Field
              icon={Phone}
              label={t('reservations.fields.phone')}
              value={form.phone}
              onChange={(v) => handleChange('phone', v)}
              error={errors.phone}
              autoComplete="tel"
              type="tel"
            />
          </div>
          <Field
            icon={Mail}
            label={t('reservations.fields.email')}
            value={form.email}
            onChange={(v) => handleChange('email', v)}
            error={errors.email}
            autoComplete="email"
            type="email"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field
              icon={Calendar}
              label={t('reservations.fields.date')}
              value={form.date}
              onChange={(v) => handleChange('date', v)}
              error={errors.date}
              type="date"
              min={todayISO()}
            />
            <Field
              icon={Clock}
              label={t('reservations.fields.time')}
              value={form.time}
              onChange={(v) => handleChange('time', v)}
              error={errors.time}
              type="time"
            />
            <Field
              icon={Users}
              label={t('reservations.fields.guests')}
              value={form.guests}
              onChange={(v) => handleChange('guests', Number(v))}
              error={errors.guests}
              type="number"
              min={1}
              max={20}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('reservations.fields.note')}
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 rtl:right-3 rtl:left-auto top-3 w-4 h-4 text-gray-400" />
              <textarea
                value={form.note}
                onChange={(e) => handleChange('note', e.target.value)}
                rows={3}
                className="w-full ps-10 pe-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder={t('reservations.fields.notePlaceholder')}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="submit" variant="primary" fullWidth disabled={submitting}>
              {submitting ? t('common.loading') : t('reservations.confirmButton')}
            </Button>
            <Button type="button" variant="secondary" fullWidth onClick={handleClose}>
              {t('common.cancel')}
            </Button>
          </div>
          {!isAuthenticated && (
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              {t('reservations.loginRequired')}
            </p>
          )}
        </form>
      )}
    </Modal>
  );
};

const Field = ({ icon: Icon, label, value, onChange, error, type = 'text', ...rest }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full ps-10 pe-4 py-3 border rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gold-500 ${
          error ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
        }`}
        {...rest}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

export default ReservationModal;
