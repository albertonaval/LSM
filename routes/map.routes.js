const express = require('express');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');
const router = express.Router();

router.get('/mapa', (res, req) => {
    req.render('mapa')
})


module.exports = router