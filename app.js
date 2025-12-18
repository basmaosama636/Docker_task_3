const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
require('dotenv').config();

// تعديل هنا: استبدال bcrypt بـ bcryptjs
const bcrypt = require('bcryptjs');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false   // لازم false في localhost
  }
}));


app.use(async (req, res, next) => {
  res.locals.currentUser = req.session.user;
  next();
});

// Routes
app.use('/', authRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.redirect('/products');
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
