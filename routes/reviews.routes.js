const express = require('express');
const router = express.Router();
const { isLoggedIn, } = require('../middleware/route-guard');
const Review = require('./../models/Review.model')
const Place = require('./../models/Place.model')

router.get('/create/:id', (req, res) => res.render('reviews/create', { id: req.params.id }))

router.post('/create/:id', (req, res, next) => {
    const { id: place_id } = req.params
    const { text } = req.body

    Review
        .create({ text, owner: req.session.currentUser._id })
        .then((review) => Place.findByIdAndUpdate(place_id, { $addToSet: { comments: review._id } }))
        .then(() => res.redirect(`/places/details/${place_id}`))
        .catch(err => next(err))
})

router.post('/:id/delete', (req, res) => {

    const { id: review_id } = req.params

    Review
        .findByIdAndDelete(review_id)
        .then(() => res.redirect('/places/list',))
        .catch(err => next(err))
})


module.exports = router

