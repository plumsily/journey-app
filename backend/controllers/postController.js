const asyncHandler = require("express-async-handler");
const cloudinary = require("../middleware/cloudinary");
const Journey = require("../models/JourneyModel");
const Post = require("../models/PostModel");

// @desc Get my posts
// @route GET /api/posts
// @access Private
const getMyPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id });
  res.status(200).json(posts);
});

// @desc Get my posts
// @route GET /api/posts
// @access Public
const getSinglePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json(post);
});

// @desc Set post
// @route POST /api/posts
// @access Private
const setPost = asyncHandler(async (req, res) => {
  //   const result = await cloudinary.uploader.upload(req.file.path);
  const { journey, title, caption } = req.body;
  const journeyDoc = await Journey.findById(journey);

  if (!title) {
    res.status(400);
    throw new Error("Please add a title for your post");
  }
  if (!caption) {
    res.status(400);
    throw new Error("Please add a caption for your post");
  }
  if (!journey) {
    res.status(400);
    throw new Error("Please select a Journey to add this post");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the todo user
  if (journeyDoc.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //   if (!image) {
  //     res.status(400);
  //     throw new Error("Please upload an image to this post");
  //   }

  const post = await Post.create({
    journey,
    user: req.user.id,
    title,
    caption,
    // image: result.secure_url,
    // cloudinaryId: result.public_id,
    image: "",
    cloudinaryId: "",
    likes: 0,
  });

  res.status(200).json(post);
});

// @desc Update post
// @route POST /api/posts
// @access Private
const updatePost = asyncHandler(async (req, res) => {
  const { title, caption } = req.body;
  let update;

  if (!title) {
    if (!caption) {
      res.status(400);
      throw new Error("Please update a field");
    } else {
      update = { caption };
    }
  } else {
    if (caption) {
      update = { ...title, ...caption };
    } else {
      update = { title };
    }
  }

  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found!");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the todo user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedPost = await Post.findOneAndUpdate(
    { _id: req.params.id },
    update,
    { new: true }
  );

  res.status(200).json(updatedPost);
});

// @desc Delete post
// @route DELETE /api/posts
// @access Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the todo user
  if (post.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Delete image from cloudinary
  //   await cloudinary.uploader.destroy(post.cloudinaryId);
  await post.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getMyPosts,
  getSinglePost,
  setPost,
  updatePost,
  deletePost,
};
