const { Schema, model } = require('mongoose')

const placesSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },

        type: {
            type: String,
            enum: ['Hotel', 'Restaurant', 'Disco', 'Event'],
        },

        description: {
            type: String,
            minlength: 2,
            maxlength: 150,
        },

        // rating: {
        //     type: Number
        // },

        // owner: {
        //     type: String,
        // },

        // imageUrl: {
        //     type: String,
        // },

        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
    },
    {
        timestamps: true
    },
)

const Place = model("Place", placesSchema)
module.exports = Place