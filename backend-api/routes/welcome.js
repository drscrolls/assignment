const express = require('express');
const router = express.Router();

//welcome
router.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).json(
    {
        code: 200,
        message: "Welcome. You have reached the api"
    });
});



module.exports = router;