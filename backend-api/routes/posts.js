const express = require('express');
const Auth = require('../middleware/auth');
const Post = require('../models/post');
const User = require('../models/user');
const router = express.Router();

//create post
router.post('/create', Auth, async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let userId = req.user._id;

    console.log('userId', userId);
    let obj = {
        ...req.body,
        userId
    };
    console.log('post obj', obj);

    const post = new Post(obj);
    try {
        await post.save();
        res.status(201).json(
        {
            data: post,
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


// get user posts
router.get('/', Auth, async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        let userId = req.user._id;
        var posts = await Post.find({userId});
        
        return res.status(200).json(
        {
            data: posts,
            code: 200,
            message: "User posts"
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


// delete post
router.delete('/:id', Auth, async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        let { id } = req.params;
        console.log('id', id);
        if (!id) {
            return res.status(400).json(
                {
                    code: 400,
                    message: "Post id not given"
                });
        }
        var post = await Post.findById(id);
        let uid = post.userId.toString();

        if (uid != req.user._id) {
            return res.status(400).json(
            {
                code: 400,
                message: "User does not own this post"
            });
        }

        const deletePost = await Post.findByIdAndDelete(id);
        return res.status(200).json(
        {
            code: 200,
            message: "Post deleted"
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