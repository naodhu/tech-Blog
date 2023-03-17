// Import required modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// Import Sequelize and Sequelize Store to manage sessions
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create Express.js application
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Set up session object
const sess = {
  secret: 'Super secret secret', // Secret used to sign session ID cookie
  cookie: {}, // Defaults to empty object, but can be customized
  resave: false, // Don't save session if nothing changed
  saveUninitialized: true, // Save uninitialized sessions
  store: new SequelizeStore({ // Store sessions in database via Sequelize
    db: sequelize
  })
};

// Use session middleware
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Parse incoming requests with JSON and urlencoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Use routes defined in the controllers directory
app.use(routes);

// Synchronize Sequelize models with database and start listening on PORT
sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 3001, () => console.log('Now listening'));
});
