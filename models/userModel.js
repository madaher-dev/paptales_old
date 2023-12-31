const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      // required: [true, "Please tell us your name!"],
      // unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email!"],
      unique: true,
      lowercase: true,
    },
    photo: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      // required: [true, "Please provide a password!"],
      // minlength: 8,
      // select: false,
    },
    // passwordConfirm: {
    //   type: String,
    //   required: [true, "Please confirm your password!"],
    //   validate: {
    //     // This only works on CREATE and SAVE!!!
    //     validator: function (el) {
    //       return el === this.password;
    //     },
    //     message: "Passwords are not the same!",
    //   },
    // },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    players: [
      {
        name: String,
        age: Number,
        gender: {
          type: String,
          enum: {
            values: ["boy", "girl"],
            message: "Unsupported gender option",
          },
        },
        style: {
          type: String,
          enum: {
            values: ["fairy", "adventure", "fun"],
            message: "Unsupported style option",
          },
        },
        language: {
          type: String,
          enum: {
            values: ["english", "spanish", "french", "russian"],
            message: "Unsupported language option",
          },
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
userSchema.index({ email: 1 }, { unique: true });
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
