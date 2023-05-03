const express = require('express');
const Auth = require('../middleware/auth');
const Post = require('../models/post');
const User = require('../models/user');
const Comments = require('../models/comments');
const Chat = require('../models/chat');
const router = express.Router();

//add comment
router.post('/send', Auth, async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        let senderId = req.user._id;
        let { text, receiverId } = req.body;
        if(!text){
            return res.status(400).json(
            {
                code: 400,
                message: "Text not given"
            });
        }
        if(!senderId){
            return res.status(400).json(
            {
                code: 400,
                message: "Sender id not given"
            });
        }

        let receiver = await User.findById(receiverId);
        if(!receiver){
            return res.status(400).json(
            {
                code: 400,
                message: "Receiver user does not exist"
            });
        }

        let obj = {
            text,
            senderId,
            receiverId
        };

        const chat = new Chat(obj);
        await chat.save();

        res.status(201).json(
        {
            data: chat,
            code: 200,
            message: "Chat sent"
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



// delete chat
router.delete('/:id', Auth, async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(400).json(
            {
                code: 400,
                message: "Chat id not given"
            });
        }

        var chat = await Chat.findById(id);
        if (!chat) {
            return res.status(400).json(
            {
                code: 400,
                message: "Chat not found"
            });
        }
        
        let uid = chat.senderId.toString();
        if (uid != req.user._id) {
            return res.status(400).json(
            {
                code: 400,
                message: "User does not own this message"
            });
        }

        const deleteChat = await Chat.findByIdAndDelete(id);
        return res.status(200).json(
        {
            code: 200,
            message: "Chat deleted"
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