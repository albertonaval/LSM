const express = require('express');
const router = express.Router();
const User = require('./../models/User.model')
const { isLoggedIn, checkRoles, } = require('../middleware/route-guard');
const Place = require('../models/Place.model');

router.get("/profile", isLoggedIn, (req, res, next) => {

    User
        .findById(req.session.currentUser._id)
        .populate('favorites')
        .then(user => {
            console.log(user)
            res.render('user/profile', user)
        })
        .catch(err => console.log(err))
})

router.get("/profile/favorites/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params
    User
        .findByIdAndUpdate(req.session.currentUser._id, { $addToSet: { favorites: id } })
        .then(favorites => {
            res.redirect('/user/profile')
        })
        .catch(err => next(err))
})
module.exports = router