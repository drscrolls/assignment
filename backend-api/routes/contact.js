const express = require('express');
const Contact = require('../models/contact');
const router = express.Router();


// get all contacts
router.get('/', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        const contacts = await Contact.find({}).sort({createdAt: -1});

        return res.status(200).send({
          message: "All contacts",
          code: 200,
          data: contacts
        });

    } catch (error) {
        return res.status(400).send(
            {
                data: null,
                code: 400,
                message: error.message
            }
        );
    }
});


//add contact
router.post('/', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const contact = new Contact(req.body);
    try {
        await contact.save();
        return res.status(201).send(
            {
                data: contact,
                code: 200,
                message: "Successfully created"
            });
    } catch (error) {
        return res.status(400).send(
            {
                data: null,
                code: 400,
                message: error.message
            });
    }
});


// delete contact
router.delete('/:id', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(400).send(
                {
                    code: 400,
                    message: "Contact id not given"
                });
        }
        
        const deleteContact = await Contact.findByIdAndDelete(id);
        return res.status(200).send(
        {
            code: 200,
            message: "Contact deleted successfully"
        });

    } catch (error) {
        return res.status(400).send(
            {
                data: null,
                code: 400,
                message: error.message
            }
        );
    }
});


// update contact
router.put('/:id', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        let { id } = req.params;
        let { firstname, lastname, phonenumber } = req.body;

        if (!id) {
            return res.status(400).send(
                {
                    code: 400,
                    message: "Contact id not given"
                });
        }

        let payload = {};
        if(firstname) payload.firstname = firstname;
        if(lastname) payload.lastname = lastname;
        if(phonenumber) payload.phonenumber = phonenumber;
        
        const updatedContact = await Contact.findByIdAndUpdate(id, payload, { new: true })

        return res.status(200).send(
        {
            data: updatedContact,
            code: 200,
            message: "Contact updated successfully"
        });

    } catch (error) {
        res.status(400).send(
            {
                data: null,
                code: 400,
                message: error.message
            }
        );
    }
});





module.exports = router;