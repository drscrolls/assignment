// import needed packages
const express = require("express");
const cors = require('cors');

// Create Routes
const contactRoutes = require('../routes/contact');
const welcomeRoute = require('../routes/welcome');

// Setup db and environment
require('../db/mongoose');
require('dotenv').config();

// Initialize express
const app = express();
app.use(express.json());

// Setup port
const port = process.env.PORT;


// Allow cross-origin 
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

// Setup route paths
app.use('/', welcomeRoute);
app.use('/api/contacts', contactRoutes);


// Start api and listen on port
app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`);
})