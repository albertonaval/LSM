const router = require("express").Router()
const Place = require('../models/Place.model')


router.get("/places", (req, res, next) => {
    const { lat, lng } = req.query
    console.log(req.query)

    Place
        .find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lat, lng]
                    },
                    $maxDistance: 5000,
                }
            }
        })
        .then(places => {
            console.log({ places })
            res.json(places)
        })
        .catch(err => next(err))
})

router.get("/places/:id", (req, res, next) => {

    const { id } = req.params
    Place
        .findById(id)
        .then(place => res.json(place))
        .catch(err => next(err))

})

module.exports = router

