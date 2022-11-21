const router = require('express').Router()
const { checkRoles } = require('../middleware/route-guard')
const Place = require('../models/Place.model')

//READ
router.get('/list', checkRoles('ADMIN'), (req, res) => {

    Place
        .find()
        .then(places => res.render('places/list', {
            places,
            isAdmin: req.session.currentUser.role === 'ADMIN',

        }))
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


router.get('/discos-list/details/:id', checkRoles('ADMIN', 'CREATOR'), (req, res) => {

    const { id: disco_id } = req.params

    Place
        .findById(disco_id)
        .then((place) => {
            res.render('places/disco-details', {
                place, isAdmin: req.session.currentUser.role === 'ADMIN',
                isCreator: req.session.currentUser.role === 'CREATOR',
            })
        })
        .catch(err => console.log(err))
})



router.get('/events-list/details/:id', (req, res) => {
    const { id: event_id } = req.params

    Place
        .findById(event_id)
        .then((event) => res.render('places/event-details', event))
        .catch(err => console.log(err))
})



router.get('/restaurants-list/details/:id', (req, res) => {
    const { id: restaurant_id } = req.params

    Place
        .findById(restaurant_id)
        .then((restaurant) => res.render('places/event-details', restaurant))
        .catch(err => console.log(err))
})



router.get('/hotels-list/details/:id', (req, res) => {
    const { id: hotel_id } = req.params

    Place
        .findById(hotel_id)
        .then((hotel) => res.render('places/hotel-details', hotel))
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

//Edit
router.get('/edit/:place_id', checkRoles('ADMIN', 'CREATOR'), (req, res) => {

    const { place_id } = req.params

    Place
        .findById(place_id)
        .then(place => {
            res.render('places/edit', {
                place,
                isAdmin: req.session.currentUser.role === 'ADMIN',
                isCreator: req.session.currentUser.role === 'CREATOR',
            })
        })
        .catch(err => console.log(err))
})

router.post('/edit', (req, res) => {

    const { name, description, location, rating } = req.body
    const { place_id } = req.query

    Place
        .findByIdAndUpdate(place_id, { name, location, description, rating })
        .then(() => res.redirect(`/places/detail/${place_id}`))
        .catch(err => console.log(err))
})

module.exports = router