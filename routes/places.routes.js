const router = require('express').Router()
const Place = require('../models/Places.model')

//READ
router.get('/list', (req, res) => {
    Place
        .find()
        .then(places => res.render('places/list', { places }))
        .catch(err => console.log(err))
})

router.get('/discos-list', (req, res) => {
    Place
        .find({ type: 'Disco' })
        .then(discos => res.render('places/discos-list', { discos }))
        .catch(err => console.log(err))
})

router.get('/events-list', (req, res) => {
    Place
        .find({ type: 'Event' })
        .then(events => res.render('places/events-list', { events }))
        .catch(err => console.log(err))
})

router.get('/restaurants-list', (req, res) => {
    Place
        .find({ type: 'Restaurant' })
        .then(restaurant => res.render('places/restaurants-list', { restaurant }))
        .catch(err => console.log(err))
})

router.get('/hotels-list', (req, res) => {
    Place
        .find({ type: 'Hotel' })
        .then(hotels => res.render('places/hotels-list', { hotels }))
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



//CREATE


router.get("/create", (req, res) => res.render('places/create'))

router.post("/create", (req, res) => {

    const { name, description, type, rating, owner, latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Place
        .create({ name, description, type, rating, owner, location })
        .then(() => res.redirect('/places/list'))
        .catch(err => console.log(err))
})




module.exports = router