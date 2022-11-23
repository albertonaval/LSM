const express = require('express');
const router = express.Router();

router.get('/mapa', (res, req) => {
    req.render('mapa')
})


module.exports = router