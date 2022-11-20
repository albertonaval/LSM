const { Schema, model, default: mongoose } = require('mongoose')

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

        rating: {
            type: Number,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'username'
        },

        imageUrl: {
            type: String,
            default: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.freeiconspng.com%2Fuploads%2Fplaces-icon-5.png&f=1&nofb=1&ipt=d009f735ffd1352697f22013edfc7bbee6609f564c35a75def3eaf79ad928554&ipo=images'
        },

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