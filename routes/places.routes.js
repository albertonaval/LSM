const router = require('express').Router()
const Place = require('./../models/Places.model')


router.get('/list', (req, res) => {
    Place
        .find()
        .then(places => res.render('places/list', { places }))
        .catch(err => console.log(err))
})


router.get("/create", (req, res) => res.render('places/create'))

router.post("/create", (req, res) => {

    const { name, description, latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Place
        .create({ name, description, location })
        .then(() => res.redirect('/places/list'))
        .catch(err => console.log(err))
})


module.exports = router