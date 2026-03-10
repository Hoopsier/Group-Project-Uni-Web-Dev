require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const connectDB = require('./config/db.js');

const restaurantRoute = require('./routes/restaurantRouter.js');
let AIRoute = null;
const foodRoutes = require('./routes/foodRouter.js');
const userRoutes = require('./routes/users.js');
const cors = require('cors');
const app = express();

const hasGeminiKey = Boolean(
  process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
);

if (hasGeminiKey) {
  AIRoute = require('./routes/aiRouter.js');
} else {
  console.warn(
    'Gemini API key not found. /api/ai route is disabled in local development.',
  );
}

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('API is Running!');
});
app.use(cors());
app.use('/users', userRoutes);
app.use('/foods', foodRoutes);
app.use('/api/restaurants', restaurantRoute);
if (AIRoute) {
  app.use('/api/ai', AIRoute);
}

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
