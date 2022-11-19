const express = require('express');
const router = express.Router();
const User = require('./../models/User.model')
const { isLoggedIn } = require('../middleware/route-guard')

router.get('/user/profile', isLoggedIn, (req, res, next) => {
    res.send('hola')
})



module.exports = router