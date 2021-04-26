const express = require('express');
const mongoose = require('mongoose');
const sanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet')
const app = express();
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.29vht.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(helmet.frameguard({
  action: 'deny'
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_HEADER);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(sanitize());

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);


module.exports = app