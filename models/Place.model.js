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
        },

        description: {
            type: String,
            minlength: 2,
            maxlength: 500,
        },

        rating: {
            type: Number,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        imageUrl: {
            type: String,
            default: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.freeiconspng.com%2Fuploads%2Fplaces-icon-5.png'
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

placesSchema.index({ location: '2dsphere' })

const Place = model("Place", placesSchema)
module.exports = Place