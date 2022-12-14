const router = require('express').Router()
const { checkRoles, isLoggedIn } = require('../middleware/route-guard')
const Place = require('../models/Place.model')
const ticketmasterApi = require('./../services/ticketmaster.service')
const api = new ticketmasterApi()
const uploader = require('./../config/uploader.config')
const { populate } = require('../models/Place.model')

//READ
router.get('/list', (req, res, next) => {

    Place
        .find()
        .select({ name: 1 })
        .then(places => res.render('places/list', {
            places,
            isAdmin: req.session.currentUser.role === 'ADMIN',
            isCreator: req.session.currentUser.role === 'CREATOR'
        }))
        .catch(err => next(err))
})

router.get('/discos-list', (req, res, next) => {
    Place
        .find({ type: 'Disco' })
        .then(discos => res.render('places/discos-list', { discos }))
        .catch(err => next(err))
})

router.get('/events-list', (req, res, next) => {

    api
        .getAllEvents()
        .then(response => {
            const eventsArr = response.data._embedded.events
            const cleanArr = eventsArr.map(event => {
                // console.log(event._embedded.venues[0].location)
                return {
                    name: event.name,
                    url: event.url,
                    images: event.images[0].url,
                    location: event._embedded.venues[0].name
                }
            })
            console.log(cleanArr)
            res.render('places/events-list', { event: eventsArr })
        })
        .catch(err => next(err))
})

router.get('/restaurants-list', (req, res, next) => {
    Place
        .find({ type: 'Restaurant' })
        .then(restaurants => res.render('places/restaurants-list', { restaurants }))
        .catch(err => next(err))
})

router.get('/hotels-list', (req, res) => {
    Place
        .find({ type: 'Hotel' })
        .then(hotels => res.render('places/hotels-list', { hotels }))
        .catch(err => console.log(err))
})

//DETAILS & COMMENT

router.get('/details/:id', (req, res, next) => {

    const { id: place_id } = req.params

    Place
        .findById(place_id)
        .populate({
            path: 'comments', populate: {
                path: 'owner',
                select: 'username'
            }
        })
        .then((place) => {

            res.render('places/place-details', {
                place,
                isAdmin: req.session.currentUser.role === 'ADMIN',
                isCreator: req.session.currentUser.role === 'CREATOR',
            })
        })
        .catch(err => next(err))
})

// router.get('/details/comments/:id', isLoggedIn, (req, res, next) => {
//     const { id: place_id } = req.params

//     Place
//         .findByIdAndUpdate(place_id, { $addToSet: { comments: id } })
//         .then(() => res.redirect(`/details/${{ id }}`))
//         .catch(err => next(err))
// })


//CREATE
router.get("/create", (req, res) => res.render('places/create', {
    isAdmin: req.session.currentUser.role === 'ADMIN',
    isCreator: req.session.currentUser.role === 'CREATOR'
}))

router.post("/create", uploader.single('imageField'), (req, res, next) => {


    const { name, description, type, rating, owner, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Place
        .create({ name, description, type, rating, owner, location, imageUrl: req.file.path })
        .then(() => {

            res.redirect('/places/list')
        })
        .catch(err => next(err))
})

//Edit
router.get('/:id/edit', checkRoles('ADMIN', 'CREATOR'), (req, res, next) => {

    const { id: place_id } = req.params

    Place
        .findById(place_id)
        .then(place => {
            res.render('places/edit', {
                place,
                isAdmin: req.session.currentUser.role === 'ADMIN',
                isCreator: req.session.currentUser.role === 'CREATOR',
            })
        })
        .catch(err => next(err))
})

router.post('/:id/edit', (req, res, next) => {

    const { id: place_id } = req.params

    const { name, description, rating, latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }


    Place
        .findByIdAndUpdate(place_id, { name, location, description, rating })
        .then(() => res.redirect(`/places/details/${place_id}`))
        .catch(err => next(err))
})

//Delete

router.post('/:id/delete', (req, res, next) => {

    const { id: places_id } = req.params

    Place
        .findByIdAndDelete(places_id)
        .then(() => res.redirect('/places/list',))
        .catch(err => next(err))
})


module.exports = router
