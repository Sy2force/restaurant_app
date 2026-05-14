import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Star,
  Phone,
  Globe,
  Check,
  AlertCircle,
  ExternalLink,
  Upload,
} from 'lucide-react';
import Button from '../../components/UI/Button';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { googlePlacesAPI } from '../../services/googlePlaces.service';
import { imageOnError } from '../../utils/helpers';

const GooglePlacesImport = () => {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('Tel Aviv');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(null);
  const [importedIds, setImportedIds] = useState(new Set());
  const [error, setError] = useState(null);

  // Bulk import state
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkResults, setBulkResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query || query.length < 2) {
      setError('Query must be at least 2 characters');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await googlePlacesAPI.search(query, city);
      setResults(response.data.results || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to search places');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (placeId) => {
    try {
      setImporting(placeId);
      const response = await googlePlacesAPI.importPlace(placeId);
      setImportedIds(new Set([...importedIds, placeId]));
      // Remove from results or mark as imported
      setResults((prev) =>
        prev.map((r) =>
          r.id === placeId
            ? { ...r, imported: true, restaurantId: response.data.restaurant._id }
            : r
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to import restaurant');
    } finally {
      setImporting(null);
    }
  };

  const handleBulkImport = async () => {
    try {
      setBulkLoading(true);
      setError(null);
      setBulkResults(null);

      const response = await googlePlacesAPI.bulkImport();
      setBulkResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to bulk import restaurants');
    } finally {
      setBulkLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Import from Google Places</h1>
        <p className="text-gray-600">
          Search for real Israeli restaurants and import their data, photos, and reviews from Google
          Places.
        </p>
      </motion.div>

      {/* Bulk Import Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm p-6 mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Bulk Import Israeli Restaurants
            </h2>
            <p className="text-gray-600 text-sm">
              Import 40+ pre-configured Israeli restaurants from Google Places in one click.
            </p>
          </div>
          <Button onClick={handleBulkImport} disabled={bulkLoading} className="px-6">
            {bulkLoading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Import All
              </>
            )}
          </Button>
        </div>

        {/* Bulk Import Results */}
        {bulkResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-4"
          >
            {/* Summary */}
            <div className="bg-white rounded-lg p-4 grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{bulkResults.summary.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {bulkResults.summary.imported}
                </div>
                <div className="text-sm text-gray-600">Imported</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {bulkResults.summary.skipped}
                </div>
                <div className="text-sm text-gray-600">Skipped</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{bulkResults.summary.failed}</div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
            </div>

            {/* Detailed Results */}
            {bulkResults.results.imported.length > 0 && (
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Imported ({bulkResults.results.imported.length})
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {bulkResults.results.imported.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm py-2 border-b last:border-0"
                    >
                      <div>
                        <span className="font-medium">{item.restaurantName}</span>
                        <span className="text-gray-500 ml-2">({item.city})</span>
                      </div>
                      <span className="text-green-600">✓</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bulkResults.results.skipped.length > 0 && (
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-yellow-700 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Skipped ({bulkResults.results.skipped.length})
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {bulkResults.results.skipped.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm py-2 border-b last:border-0"
                    >
                      <div>
                        <span className="font-medium">{item.query}</span>
                        <span className="text-gray-500 ml-2">({item.city})</span>
                      </div>
                      <span className="text-yellow-600 text-xs">{item.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bulkResults.results.failed.length > 0 && (
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Failed ({bulkResults.results.failed.length})
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {bulkResults.results.failed.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-sm py-2 border-b last:border-0"
                    >
                      <div>
                        <span className="font-medium">{item.query}</span>
                        <span className="text-gray-500 ml-2">({item.city})</span>
                      </div>
                      <span className="text-red-600 text-xs">{item.error}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-6 mb-6"
      >
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., OCD restaurant, HaBasta, Machneyuda"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Tel Aviv">Tel Aviv</option>
              <option value="Jerusalem">Jerusalem</option>
              <option value="Jaffa">Jaffa</option>
              <option value="Herzliya">Herzliya</option>
              <option value="Haifa">Haifa</option>
              <option value="Eilat">Eilat</option>
              <option value="Caesarea">Caesarea</option>
              <option value="Raanana">Raanana</option>
              <option value="Netanya">Netanya</option>
              <option value="Ashdod">Ashdod</option>
              <option value="Beer Sheva">Beer Sheva</option>
              <option value="Israel">All Israel</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button type="submit" disabled={loading} className="px-6">
              {loading ? <LoadingSpinner size="sm" /> : <Search className="w-4 h-4 mr-2" />}
              Search
            </Button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </div>
        )}
      </motion.div>

      {/* Results */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            Found {results.length} restaurant{results.length !== 1 ? 's' : ''}
          </h2>

          {results.map((place, index) => {
            const photo = place.photos?.[0];
            const photoUrl = photo ? googlePlacesAPI.getPhoto(photo.name, 400) : null;
            const isImported = place.imported || importedIds.has(place.id);

            return (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-sm p-6 flex gap-6"
              >
                {/* Photo */}
                <div className="w-48 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={place.displayName?.text || place.name}
                      className="w-full h-full object-cover"
                      onError={imageOnError('restaurant')}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <MapPin className="w-8 h-8" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {place.displayName?.text || place.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <MapPin className="w-4 h-4" />
                        {place.formattedAddress}
                      </div>
                    </div>

                    {isImported && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <Check className="w-3 h-3 mr-1" />
                        Imported
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  {place.rating && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">{place.rating}</span>
                      </div>
                      {place.userRatingCount && (
                        <span className="text-sm text-gray-500">
                          ({place.userRatingCount} reviews)
                        </span>
                      )}
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    {place.internationalPhoneNumber && (
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {place.internationalPhoneNumber}
                      </div>
                    )}
                    {place.websiteUri && (
                      <a
                        href={place.websiteUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-700"
                      >
                        <Globe className="w-4 h-4 mr-1" />
                        Website
                      </a>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    {!isImported ? (
                      <Button
                        onClick={() => handleImport(place.id)}
                        disabled={importing === place.id}
                        size="sm"
                      >
                        {importing === place.id ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          'Import Restaurant'
                        )}
                      </Button>
                    ) : (
                      <span className="text-sm text-green-600 font-medium">
                        Restaurant ID: {place.restaurantId}
                      </span>
                    )}

                    {place.googleMapsUri && (
                      <a
                        href={place.googleMapsUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View on Google Maps
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {results.length === 0 && !loading && !error && query && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-gray-500"
        >
          <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No restaurants found. Try a different search term or city.</p>
        </motion.div>
      )}
    </div>
  );
};

export default GooglePlacesImport;
