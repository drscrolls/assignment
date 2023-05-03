const mongoose = require("mongoose");
require('dotenv').config();

const mongoString = process.env.MONGODB_URL;

mongoose.connect(mongoString, {
    useNewUrlParser: true,
});

const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})