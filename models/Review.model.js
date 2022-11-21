const { Schema, model, default: mongoose } = require('mongoose')

const reviewSchema = new Schema(
    {
        text: {
            type: String
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'USER'

        }
    },
    {
        timestamps: true
    }
)

const Review = model("Review", reviewSchema)
module.exports = Review
