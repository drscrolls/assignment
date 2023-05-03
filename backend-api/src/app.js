// import needed packages
const express = require("express");
const cors = require('cors');

// Create Routes
const postsRoutes = require('../routes/posts');
const userRoutes = require('../routes/users');
const likesRoutes = require('../routes/likes');
const dislikesRoutes = require('../routes/dislikes');
const connectionsRoutes = require('../routes/connections');
const welcomeRoute = require('../routes/welcome');
const commentsRoute = require('../routes/comments');
const chatRoute = require('../routes/chat');

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
app.use('/api/auth', userRoutes);
app.use('/api/comments', commentsRoute);
app.use('/api/likes', likesRoutes);
app.use('/api/dislikes', dislikesRoutes);
app.use('/api/connections', connectionsRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/chat', chatRoute);


// Start api and listen on port
app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`);
})