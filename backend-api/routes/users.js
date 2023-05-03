const express = require('express');
const User = require('../models/user');
const Auth = require('../middleware/auth');
const router = express.Router();

//signup
router.post('/signup', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).json(
            {
                data: user,
                code: 200,
                message: "Successfully created"
            });
    } catch (error) {
        res.status(400).json(
            {
                data: null,
                code: 400,
                message: error.message
            });
    }
});


// login
router.post('/login', async (req, res) => {

    res.set('Access-Control-Allow-Origin', '*');
    try {
        let { email, password } = req.body;
        if (!email) {
            return res.status(400).json(
                {
                    code: 400,
                    message: "Email not given"
                });
        }
        if (!password) {
            return res.status(400).json(
                {
                    code: 400,
                    message: "Password not given"
                });
        }
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if (!user) {
            return res.status(400).json(
                {
                    code: 400,
                    message: "Invalid login details"
                });
        }
        const token = await user.generateAuthToken()
        return res.status(200).json(
            {
                data: { user, token },
                code: 200,
                message: "Successfully logged in"
            });
    } catch (error) {
        res.status(400).json(
            {
                data: null,
                code: 400,
                message: error.message
            }
        );
    }

});

// logout
router.post('/logout', Auth, async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });
        await req.user.save();
        res.status(200).json(
            {
                data: null,
                code: 200,
                message: "Logged out"
            });
    } catch (error) {
        res.status(400).json(
            {
                data: null,
                code: 400,
                message: error.message
            }
        );
    }
});

// logout All devices
router.post('/logoutAll', Auth, async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).json(
            {
                data: null,
                code: 200,
                message: "Logged out from all devices"
            });
    } catch (error) {
        res.status(400).json(
            {
                data: null,
                code: 400,
                message: error.message
            }
        );
    }
});



module.exports = router;