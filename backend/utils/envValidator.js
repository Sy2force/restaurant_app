/**
 * Environment Variables Validator
 * Validates required environment variables at startup
 * Never logs full API keys for security
 */

const requiredEnvVars = {
  GOOGLE_PLACES_API_KEY: {
    description: 'Google Places API key for restaurant data',
    required: false, // Optional for basic functionality, required for Google Places
  },
  MONGODB_URI: {
    description: 'MongoDB connection string',
    required: true,
  },
  JWT_SECRET: {
    description: 'JWT secret for authentication',
    required: true,
  },
  NODE_ENV: {
    description: 'Node environment (development/production)',
    required: true,
  },
  CLIENT_URL: {
    description: 'Frontend URL for CORS',
    required: true,
  },
  PORT: {
    description: 'Server port',
    required: false,
    default: 5001,
  },
};

function maskApiKey(key) {
  if (!key || key.length < 8) return '****';
  return `${key.substring(0, 8)}****`;
}

function validateEnv() {
  const errors = [];
  const warnings = [];

  console.log('🔍 Validating environment variables...\n');

  for (const [key, config] of Object.entries(requiredEnvVars)) {
    const value = process.env[key];

    if (!value) {
      if (config.required) {
        errors.push(`❌ ${key} is required but not set`);
      } else {
        warnings.push(`⚠️  ${key} is not set (${config.description})`);
      }
    } else {
      // Log masked value for API keys
      if (key.includes('API_KEY') || key.includes('SECRET')) {
        console.log(`✅ ${key} loaded: ${maskApiKey(value)}`);
      } else {
        console.log(`✅ ${key}: ${value}`);
      }

      // Validate specific values
      if (key === 'GOOGLE_PLACES_API_KEY' && value === 'your_new_google_places_key_here') {
        warnings.push(`⚠️  ${key} is set to placeholder value. Please configure a real key.`);
      }

      if (key === 'NODE_ENV' && !['development', 'production', 'test'].includes(value)) {
        warnings.push(`⚠️  ${key} should be 'development', 'production', or 'test'`);
      }

      if (key === 'JWT_SECRET' && value.length < 32) {
        warnings.push(`⚠️  ${key} should be at least 32 characters for security`);
      }
    }
  }

  console.log('');

  if (errors.length > 0) {
    console.error('❌ Environment validation failed:\n');
    errors.forEach((error) => console.error(error));
    console.error('\nPlease set the required environment variables in backend/.env');
    return false;
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Environment warnings:\n');
    warnings.forEach((warning) => console.warn(warning));
    console.warn('');
  }

  console.log('✅ Environment validation completed\n');
  return true;
}

module.exports = { validateEnv, maskApiKey };
