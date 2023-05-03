const express = require('express');
const Auth = require('../middleware/auth');
const Post = require('../models/post');
const User = require('../models/user');
const Comments = require('../models/comments');
const Connections = require('../models/connection');
const router = express.Router();

//add connection
router.post('/add', Auth, async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        let userId = req.user._id;
        let { otherUserId } = req.body;
        if(!otherUserId){
            return res.status(400).json(
            {
                code: 400,
                message: "other user id not given"
            });
        }

        var otherUser = await Connections.find({otherUserId});
        if(!otherUser){
            return res.status(400).json(
            {
                code: 400,
                message: "Other user not found"
            });
        }

        let obj = {
            userId,
            otherUserId
        };

        const conn = new Connections(obj);
        await conn.save();

        res.status(201).json(
        {
            data: conn,
            code: 200,
            message: "Connection created"
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



// remove connection
router.post('/remove', Auth, async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        let userId = req.user._id;
        let { id } = req.body;
        if(!id){
            return res.status(400).json(
            {
                code: 400,
                message: "Connection id not given"
            });
        }


        var conn = await Connections.find({id});
        if(!conn){
            return res.status(400).json(
            {
                code: 400,
                message: "Connection not found"
            });
        }

        const removeConnection = await Connections.findByIdAndDelete(id);
        return res.status(200).json(
        {
            code: 200,
            message: "Removed connection"
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