import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Image as ImageIcon,
  Phone,
  Star,
  MapPin,
  Copy,
  ExternalLink,
} from 'lucide-react';
import Button from '../../components/UI/Button';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { googlePlacesAPI } from '../../services/googlePlaces.service';

const GooglePlacesHealth = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await googlePlacesAPI.getImportStats();
      setStats(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <Icon className={`w-12 h-12 ${color} opacity-20`} />
      </div>
    </motion.div>
  );

  const DuplicateItem = ({ item, type }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">
          {type === 'googlePlaceId' ? item.googlePlaceId : item.slug}
        </p>
        <p className="text-xs text-gray-500">Count: {item.count}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() =>
            window.open(
              `/restaurants?search=${type === 'googlePlaceId' ? item.googlePlaceId : item.slug}`,
              '_blank'
            )
          }
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          title="View restaurants"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center gap-3">
          <XCircle className="w-6 h-6 text-red-600" />
          <p className="text-red-800">{error}</p>
        </div>
        <Button onClick={fetchStats} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  const { total, googlePlacesImported, manual, seed, health = {}, duplicates = {} } = stats || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Google Places Health</h1>
          <p className="text-gray-600 mt-1">Monitor imported restaurant data quality</p>
        </div>
        <Button onClick={fetchStats} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Restaurants"
          value={total || 0}
          icon={BarChart3}
          color="text-gray-900"
        />
        <StatCard
          title="Google Places"
          value={googlePlacesImported || 0}
          icon={MapPin}
          color="text-blue-600"
          subtitle={` ${((googlePlacesImported / (total || 1)) * 100).toFixed(1)}% of total`}
        />
        <StatCard title="Manual" value={manual || 0} icon={CheckCircle} color="text-green-600" />
        <StatCard title="Seed" value={seed || 0} icon={Copy} color="text-purple-600" />
      </div>

      {/* Data Health */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Data Health
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Without Photo"
            value={health.restaurantsWithoutGooglePhoto || 0}
            icon={ImageIcon}
            color={health.restaurantsWithoutGooglePhoto > 0 ? 'text-orange-600' : 'text-green-600'}
          />
          <StatCard
            title="Without Phone"
            value={health.restaurantsWithoutPhone || 0}
            icon={Phone}
            color={health.restaurantsWithoutPhone > 0 ? 'text-orange-600' : 'text-green-600'}
          />
          <StatCard
            title="Without Rating"
            value={health.restaurantsWithoutRating || 0}
            icon={Star}
            color={health.restaurantsWithoutRating > 0 ? 'text-orange-600' : 'text-green-600'}
          />
          <StatCard
            title="Total Issues"
            value={
              (health.restaurantsWithoutGooglePhoto || 0) +
              (health.restaurantsWithoutPhone || 0) +
              (health.restaurantsWithoutRating || 0)
            }
            icon={AlertTriangle}
            color={
              (health.restaurantsWithoutGooglePhoto || 0) +
                (health.restaurantsWithoutPhone || 0) +
                (health.restaurantsWithoutRating || 0) >
              0
                ? 'text-red-600'
                : 'text-green-600'
            }
          />
        </div>
      </div>

      {/* Duplicates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Google Place ID Duplicates */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Copy className="w-5 h-5" />
            Duplicate Google Place IDs
            <span className="text-sm font-normal text-gray-500">
              ({duplicates.googlePlaceIds?.length || 0})
            </span>
          </h2>
          {duplicates.googlePlaceIds && duplicates.googlePlaceIds.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {duplicates.googlePlaceIds.map((item, index) => (
                <DuplicateItem key={index} item={item} type="googlePlaceId" />
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <p className="text-sm">No duplicates found</p>
            </div>
          )}
        </div>

        {/* Slug Duplicates */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Copy className="w-5 h-5" />
            Duplicate Slugs
            <span className="text-sm font-normal text-gray-500">
              ({duplicates.slugs?.length || 0})
            </span>
          </h2>
          {duplicates.slugs && duplicates.slugs.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {duplicates.slugs.map((item, index) => (
                <DuplicateItem key={index} item={item} type="slug" />
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <p className="text-sm">No duplicates found</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => (window.location.href = '/admin/google-places-import')}
          >
            Import More Restaurants
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = '/restaurants')}>
            View All Restaurants
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GooglePlacesHealth;
