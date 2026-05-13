import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Trash2,
  CalendarPlus,
  ArrowRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { reservationsAPI } from '../data/mockReservations';
import Toast from '../components/UI/Toast';

const formatDate = (iso, locale) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString(locale, {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
};

const Reservations = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuthStore();
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const load = useCallback(() => {
    const list = reservationsAPI.list({ userId: user?._id });
    setReservations(list);
  }, [user?._id]);

  useEffect(() => {
    load();
  }, [load]);

  const handleCancel = (id) => {
    reservationsAPI.cancel(id);
    load();
    setToast({ show: true, message: t('reservations.cancelSuccess'), type: 'success' });
  };

  const handleDelete = (id) => {
    reservationsAPI.remove(id);
    load();
    setToast({ show: true, message: t('reservations.deleteSuccess'), type: 'success' });
  };

  const filtered = reservations.filter((r) => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') {
      return r.status === 'confirmed' && new Date(r.date) >= new Date(new Date().toDateString());
    }
    if (filter === 'past') {
      return new Date(r.date) < new Date(new Date().toDateString());
    }
    if (filter === 'cancelled') return r.status === 'cancelled';
    return true;
  });

  const filters = [
    { key: 'all', label: t('reservations.filters.all') },
    { key: 'upcoming', label: t('reservations.filters.upcoming') },
    { key: 'past', label: t('reservations.filters.past') },
    { key: 'cancelled', label: t('reservations.filters.cancelled') },
  ];

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-900 pt-32 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 text-gold-600 rounded-full mb-4">
            <Calendar className="w-4 h-4" />
            <span className="font-semibold text-sm uppercase tracking-wide">
              {t('reservations.badge')}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-3">
            {t('reservations.pageTitle')}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t('reservations.pageSubtitle')}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f.key
                  ? 'bg-gold-500 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto"
          >
            <div className="bg-gray-50 dark:bg-gray-700/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <CalendarPlus className="w-10 h-10 text-gray-300 dark:text-gray-500" />
            </div>
            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-3">
              {t('reservations.empty.title')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {t('reservations.empty.desc')}
            </p>
            <Link to="/restaurants">
              <button className="px-8 py-3 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-full inline-flex items-center gap-2 transition-colors">
                {t('reservations.empty.button')}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-6 max-w-3xl mx-auto">
            {filtered.map((reservation, index) => (
              <motion.div
                key={reservation._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 flex flex-col md:flex-row gap-6"
              >
                {reservation.coverImage && (
                  <img
                    src={reservation.coverImage}
                    alt={reservation.restaurantName}
                    className="w-full md:w-40 h-32 md:h-auto object-cover rounded-xl"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {reservation.restaurantName}
                      </h3>
                      {reservation.city && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {reservation.city}
                          {reservation.street ? `, ${reservation.street}` : ''}
                        </p>
                      )}
                    </div>
                    <StatusBadge status={reservation.status} t={t} />
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-sm text-gray-700 dark:text-gray-300 mb-4">
                    <InfoChip icon={Calendar} value={formatDate(reservation.date, i18n.language)} />
                    <InfoChip icon={Clock} value={reservation.time} />
                    <InfoChip
                      icon={Users}
                      value={`${reservation.guests} ${t('reservations.guestsLabel')}`}
                    />
                  </div>

                  {reservation.note && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">
                      “{reservation.note}”
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                    {reservation.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancel(reservation._id)}
                        className="text-sm font-medium text-red-600 hover:text-red-700 inline-flex items-center gap-1"
                      >
                        <XCircle className="w-4 h-4" />
                        {t('reservations.cancel')}
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(reservation._id)}
                      className="text-sm font-medium text-gray-500 hover:text-gray-700 inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      {t('common.delete')}
                    </button>
                    {reservation.restaurantId && (
                      <Link
                        to={`/restaurants/${reservation.restaurantId}`}
                        className="text-sm font-medium text-gold-600 hover:text-gold-700 inline-flex items-center gap-1 ms-auto"
                      >
                        {t('reservations.viewRestaurant')}
                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

const StatusBadge = ({ status, t }) => {
  const map = {
    confirmed: {
      label: t('reservations.status.confirmed'),
      className: 'bg-green-100 text-green-700',
      icon: CheckCircle,
    },
    cancelled: {
      label: t('reservations.status.cancelled'),
      className: 'bg-red-100 text-red-700',
      icon: XCircle,
    },
  };
  const cfg = map[status] || map.confirmed;
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${cfg.className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {cfg.label}
    </span>
  );
};

const InfoChip = ({ icon: Icon, value }) => (
  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/40 rounded-lg px-3 py-2">
    <Icon className="w-4 h-4 text-gold-500" />
    <span className="truncate">{value}</span>
  </div>
);

export default Reservations;
