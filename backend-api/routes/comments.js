const express = require('express');
const Auth = require('../middleware/auth');
const Post = require('../models/post');
const User = require('../models/user');
const Comments = require('../models/comments');
const router = express.Router();

//add comment
router.post('/add', Auth, async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        let userId = req.user._id;
        let { text, postId } = req.body;

        let _post = await Post.findById(postId);
        if(!_post){
            return res.status(400).json(
            {
                code: 400,
                message: "Post does not exist"
            });
        }
        let obj = {
            text,
            userId,
            postId: _post._id
        };

        const comment = new Comments(obj);
        await comment.save();

        res.status(201).json(
        {
            data: comment,
            code: 200,
            message: "Comment created"
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



// delete comment
router.delete('/:id', Auth, async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(400).json(
            {
                code: 400,
                message: "Comment id not given"
            });
        }

        var comment = await Comments.findById(id);

        let uid = comment.userId.toString();

        if (uid != req.user._id) {
            return res.status(400).json(
            {
                code: 400,
                message: "User does not own this comment"
            });
        }

        const deleteComment = await Comments.findByIdAndDelete(id);
        return res.status(200).json(
        {
            code: 200,
            message: "Comment deleted"
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