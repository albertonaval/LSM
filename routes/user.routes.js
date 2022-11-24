const express = require('express');
const router = express.Router();
const User = require('./../models/User.model')
const { isLoggedIn, checkRoles, } = require('../middleware/route-guard');


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
        .then(() => {
            res.redirect('/user/profile')
        })
        .catch(err => next(err))
})

router.post("/profile/favorites/:id", isLoggedIn, (req, res, next) => {
    const { id } = req.params
    console.log(id)
    User
        .findByIdAndUpdate(req.session.currentUser._id, { $pull: { favorites: id } })
        .then(() => {
            res.redirect('/user/profile')
        })
        .catch(err => next(err))
})
module.exports = router