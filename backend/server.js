require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db.js");

const restaurantRoute = require('./routes/restaurantRouter.js');
const AIRoute = require('./routes/aiRouter.js');
const foodRoutes = require('./routes/foodRouter.js');
const userRoutes = require('./routes/users.js');

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is Running!');
});

app.use('/users', userRoutes);    
app.use('/foods', foodRoutes);      
app.use("/api/restaurants", restaurantRoute);
app.use("/api/ai", AIRoute);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});