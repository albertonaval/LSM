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