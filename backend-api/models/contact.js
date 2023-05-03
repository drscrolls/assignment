const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});


const Contact = mongoose.model('Contacts', contactSchema);
module.exports = Contact