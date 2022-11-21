const router = require("express").Router()
const Places = require('../models/Place.model')

router.get("/disco-details/:places_id", (req, res, next) => {

    Places
        .find()
        .then(places => res.json(places))
        .catch(err => console.log(err))
})

module.exports = router