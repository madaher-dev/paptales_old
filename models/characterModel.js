const mongoose = require("mongoose");
const characterSchema = mongoose.Schema(
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
    imageUrl: String,
    type: {
      type: String,
      enum: [
        "person",
        "animal",
        "dragon",
        "unicorn",
        "wizard",
        "imaginary",
        "prince",
        "king",
        "queen",
        "princess",
      ],
      default: "person",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

characterSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const Character =
  mongoose.models.Character || mongoose.model("Character", characterSchema);
module.exports = Character;
