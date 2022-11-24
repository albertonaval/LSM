const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['USER', 'CREATOR', 'ADMIN'],
      default: 'USER'
    },

    imageUrl: {
      type: String,
    },
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place'
    }],

  },
  {

    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
