const router = require('express').Router()
const Place = require('../models/Places.model')


router.get('/list', (req, res) => {
    Place
        .find()
        .then(places => res.render('places/list', { places }))
        .catch(err => console.log(err))
})

router.get('/discos-list', (req, res) => {
    Place
        .find()
        .then(places => res.render('places/discos-list', { places }))
        .catch(err => console.log(err))
})


router.get("/create", (req, res) => res.render('places/create'))

router.post("/create", (req, res) => {

    const { name, description, rating, owner, latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Place
        .create({ name, description, rating, owner, location })
        .then(() => res.redirect('/places/list'))
        .catch(err => console.log(err))
})

router.get('/discos-list/details/:id', (req, res) => {
    const { id: disco_id } = req.params

    Place
        .findById(disco_id)
        .then((place) => {
            res.render('places/disco-details', place)
        })
        .catch(err => console.log(err))
})


module.exports = router