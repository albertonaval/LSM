const router = require("express").Router()
const Place = require("./../models/Place.model")


router.get("/places", (req, res, next) => {

    Place
        .find()
        .then(places => res.json(places))
        .catch(err => console.log(err))
})

router.get("/places/:id", (req, res) => {

    const { id } = req.params
    Place
        .findById(id)
        .then(place => res.json(place))
        .catch(err => console.log(err))

})

module.exports = router