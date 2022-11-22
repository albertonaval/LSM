const express = require('express');
const router = express.Router();
const User = require('./../models/User.model')
const { isLoggedIn, checkRoles, } = require('../middleware/route-guard');

router.get("/profile/:id", isLoggedIn, (req, res, next) => {
    const { id: profile_id } = req.params

    User
        .findById(profile_id)
        .then((user) => {
            res.render("user/profile", user)
        })
        .catch(err => console.log(err))
})

router.get('/admin', isLoggedIn, checkRoles('ADMIN', 'CREATOR'), (req, res, next) => {
    res.render('admin-panel')
})

module.exports = router