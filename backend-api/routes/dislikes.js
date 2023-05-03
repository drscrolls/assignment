const express = require('express');
const Auth = require('../middleware/auth');
const Post = require('../models/post');
const User = require('../models/user');
const Comments = require('../models/comments');
const Dislikes = require('../models/dislikes');
const router = express.Router();



//all dislikes
router.get('/', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    try {
        const dlikes = await Dislikes.find({});
        return res.status(200).json(
        {
            data: dlikes,
            code: 200,
            message: "All dislikes"
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
router.post('/dislike', Auth, async (req, res) => {
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
                p.dislikes = p.dislikes + 1;
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
                c.dislikes = c.dislikes + 1;
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

        const dlikes = new Dislikes(obj);
        await dlikes.save();

        return res.status(201).json(
        {
            code: 200,
            message:  "Disliked " + type
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
router.post('/undislike', Auth, async (req, res) => {
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

        var dislike = await Dislikes.find({typeId: id});
        if(!dislike){
            return res.status(400).json(
            {
                code: 400,
                message: "Dislike id was not found"
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
                p.dislikes = p.dislikes - 1;
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
                c.dislikes = c.dislikes - 1;
                await c.save();
                break;
        
            default:
                break;
        }

        var dlikes = await Dislikes.findByIdAndDelete(dislike._id);
        return res.status(200).json(
        {
            code: 200,
            message: "Undisliked " + type
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