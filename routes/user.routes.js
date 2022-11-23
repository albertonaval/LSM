const express = require('express');
const router = express.Router();
const User = require('./../models/User.model')
const { isLoggedIn, checkRoles, } = require('../middleware/route-guard');



router.get("/profile/:id", isLoggedIn, (req, res, next) => {

    const { id: user_id } = req.params
    User
        .findById({ user_id })
        .then(user => res.render('user/profile', {
            user,
            isADMIN: req.session.currentUser.role === 'ADMIN',
            isCREATOR: req.session.currentUser.role === 'CREATOR',
            isTheUser: req.session.currentUser._id === user_id
        }))
        .catch(err => console.log(err))
})

router.get('/admin', isLoggedIn, checkRoles('ADMIN', 'CREATOR'), (req, res, next) => {
    res.render('admin-panel')
})

module.exports = router