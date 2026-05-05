const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();

// Security Middleware
app.use(helmet());

// CORS: accept comma-separated CLIENT_URL list + *.vercel.app preview domains.
// Fallback to '*' if nothing configured (dev convenience).
const allowedOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // curl, server-to-server
      if (allowedOrigins.length === 0) return cb(null, true); // dev: allow all
      if (allowedOrigins.includes(origin)) return cb(null, true);
      if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) return cb(null, true);
      return cb(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vercel / serverless: /tmp is the only writable path. Locally: use ./logs.
const logsDir = process.env.VERCEL
  ? '/tmp/logs'
  : path.join(__dirname, 'logs');
try {
  if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
} catch (_) {
  // Non-fatal: log write attempts will silently no-op below.
}

// Logger helper function
const logErrorToFile = (req, res, errorMessage) => {
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0];
  const logFile = path.join(logsDir, `${dateStr}.log`);
  const logEntry = `[${date.toISOString()}] ${req.method} ${req.url} - Status: ${res.statusCode} - Error: ${errorMessage}\n`;
  
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) console.error('Failed to write to log file:', err);
  });
};

// Logger middleware for errors >= 400
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (data) {
    if (res.statusCode >= 400) {
      // Try to parse the error message from the response body if it's JSON
      let errorMessage = 'Unknown error';
      try {
        const parsedData = JSON.parse(data);
        errorMessage = parsedData.message || JSON.stringify(parsedData);
      } catch (e) {
        errorMessage = data.toString();
      }
      logErrorToFile(req, res, errorMessage);
    }
    originalSend.call(this, data);
  };
  next();
});

app.use(morgan('dev'));

if (process.env.NODE_ENV !== 'test' && process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));
} else if (!process.env.MONGODB_URI) {
  console.log('⚠️  MONGODB_URI not set - running without database (mock mode)');
}

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Flavors of Israel API' });
});

// Routes from PDF
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/cards', require('./routes/card.routes'));

// Other routes (Project specific)
// app.use('/api/auth', require('./routes/auth.routes')); // Merged into users
app.use('/api/restaurants', require('./routes/restaurant.routes'));
app.use('/api/dishes', require('./routes/dish.routes'));
app.use('/api/recipe-books', require('./routes/recipeBook.routes'));
app.use('/api/recipes', require('./routes/recipe.routes'));
app.use('/api/upload', require('./routes/upload.routes'));
app.use('/api/community-posts', require('./routes/communityPost.routes'));
app.use('/api/like', require('./routes/like.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;
