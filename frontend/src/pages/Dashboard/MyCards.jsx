import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cardAPI } from '../../services/api';
import CardItem from '../../components/Cards/CardItem';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import Button from '../../components/UI/Button';
import DashboardMenu from '../../components/UI/DashboardMenu';
import Input from '../../components/Forms/Input';

const MyCards = () => {
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMyCards = useCallback(async () => {
    try {
      setLoading(true);
      const response = await cardAPI.getMyCards();
      if (response.data) {
        setCards(response.data);
      }
    } catch (error) {
      console.error('Error fetching cards', error);
      // Mock fallback
      setCards([
        {
          _id: '1',
          bizName: 'Le Petit Bistro',
          bizDescription: 'Cuisine française authentique au cœur de Tel Aviv.',
          bizPhone: '054-1234567',
          bizAddress: 'Rothschild Blvd 10, Tel Aviv',
          bizImage: 'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2940',
        },
        {
          _id: '2',
          bizName: 'Tech Solutions',
          bizDescription: 'Solutions informatiques pour entreprises.',
          bizPhone: '03-9876543',
          bizAddress: 'HaMasger 5, Tel Aviv',
          bizImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2940',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyCards();
  }, [fetchMyCards]);

  const handleDelete = async (id) => {
    if (window.confirm(t('common.confirmDelete'))) {
      try {
        await cardAPI.delete(id);
        setCards(cards.filter((card) => card._id !== id));
      } catch (error) {
        // Error deleting card
      }
    }
  };

  const filteredCards = cards.filter(
    (card) =>
      card.bizName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.bizDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-dark-900 pt-32 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <DashboardMenu />
          </div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8"
            >
              <div>
                <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                  {t('dashboard.myCards')}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">{t('dashboard.cardFormDesc')}</p>
              </div>
              <Link to="/dashboard/cards/create">
                <Button variant="primary" className="shadow-lg shadow-gold-500/20">
                  <Plus className="w-5 h-5 me-2" />
                  {t('dashboard.createCard')}
                </Button>
              </Link>
            </motion.div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
              <Input
                icon={Search}
                placeholder={t('dashboard.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>

            {filteredCards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCards.map((card) => (
                  <CardItem key={card._id} card={card} isOwner={true} onDelete={handleDelete} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <LayoutDashboard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('dashboard.noCards')}
                </h3>
                <p className="text-gray-500 mb-6">{t('dashboard.noCardsDesc')}</p>
                <Link to="/dashboard/cards/create">
                  <Button variant="outline">{t('dashboard.createCard')}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCards;
