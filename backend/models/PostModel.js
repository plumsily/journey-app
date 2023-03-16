const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    journey: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Journey",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title to your post"],
    },
    caption: {
      type: String,
      required: [true, "Please add a caption to your post"],
    },
    image: {
      type: String,
      require: true,
    },
    likes: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
