const mongoose = require("mongoose");

const JourneySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title to your Journey"],
    },
    description: {
      type: String,
    },
    follows: {
      type: Number,
      required: true,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Journey", JourneySchema);
