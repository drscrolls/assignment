const express = require('express');
const Auth = require('../middleware/auth');
const Post = require('../models/post');
const User = require('../models/user');
const Comments = require('../models/comments');
const Likes = require('../models/likes');
const router = express.Router();


//all likes
router.get('/', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        const likes = await Likes.find({});
        return res.status(200).json(
        {
            data: likes,
            code: 200,
            message: "All likes"
        });

    } catch (error) {
        return res.status(400).json(
        {
            data: null,
            code: 400,
            message: error.message
        });
    }
});



//add like
router.post('/like', Auth, async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        let userId = req.user._id;
        let { id, type } = req.body;
        if (!id) {
            return res.status(400).json(
            {
                code: 400,
                message: "Id not given"
            });
        }
        if (!type) {
            return res.status(400).json(
            {
                code: 400,
                message: "Type not given"
            });
        }


        switch (type) {
            case "post":
                let p = await Post.findById(id);
                if(!p){
                    return res.status(400).json(
                    {
                        code: 400,
                        message:  "Post does not exist "
                    });
                }
                p.likes = p.likes + 1;
                await p.save();
                break;

                
            case "comment":
                let c = await Comment.findById(id);
                if(!c){
                    return res.status(400).json(
                    {
                        code: 400,
                        message:  "Comment does not exist "
                    });
                }
                c.likes = c.likes + 1;
                await c.save();
                break;
        
            default:
                break;
        }

        let obj = {
            type,
            typeId: id,
            userId
        };

        const likes = new Likes(obj);
        await likes.save();

        return res.status(201).json(
        {
            code: 200,
            message:  "Liked " + type
        });

    } catch (error) {
        return res.status(400).json(
        {
            data: null,
            code: 400,
            message: error.message
        });
    }
});



// unlike
router.post('/unlike', Auth, async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        let { id, type } = req.body;
        if (!id) {
            return res.status(400).json(
            {
                code: 400,
                message: "Id not given"
            });
        }
        if (!type) {
            return res.status(400).json(
            {
                code: 400,
                message: "Type not given"
            });
        }

        var like = await Likes.find({typeId: id});
        if(!like){
            return res.status(400).json(
            {
                code: 400,
                message: "Like id was not found"
            });
        }

        switch (type) {
            case "post":
                let p = await Post.findById(id);
                if(!p){
                    return res.status(400).json(
                    {
                        code: 400,
                        message:  "Post does not exist "
                    });
                }
                p.likes = p.likes - 1;
                await p.save();
                break;

                
            case "comment":
                let c = await Comment.findById(id);
                if(!c){
                    return res.status(400).json(
                    {
                        code: 400,
                        message:  "Comment does not exist "
                    });
                }
                c.likes = c.likes - 1;
                await c.save();
                break;
        
            default:
                break;
        }


        var likes = await Likes.findByIdAndDelete(like._id);
        return res.status(200).json(
        {
            code: 200,
            message: "Unliked " + type
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