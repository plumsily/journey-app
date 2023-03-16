const asyncHandler = require("express-async-handler");
const cloudinary = require("../middleware/cloudinary");
const Journey = require("../models/JourneyModel");
const Post = require("../models/PostModel");

// @desc Get journeys
// @route GET /api/journeys
// @access Private
const getJourneys = asyncHandler(async (req, res) => {
  const journeys = await Journey.find({ user: req.user.id });
  res.status(200).json(journeys);
});

// @desc Set journey
// @route POST /api/journeys
// @access Private
const setJourney = asyncHandler(async (req, res) => {
  const { title, description, tags } = req.body;

  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a title for your Journey");
  }

  const journey = await Journey.create({
    title,
    user: req.user.id,
    description,
    follows: 0,
    tags,
  });

  res.status(200).json(journey);
});

// @desc Update journey
// @route POST /api/journeys
// @access Private
const updateJourney = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  let update;

  if (!title) {
    if (!description) {
      res.status(400);
      throw new Error("Please update a field");
    } else {
      update = { description };
    }
  } else {
    if (description) {
      update = { ...title, ...description };
    } else {
      update = { title };
    }
  }

  const journey = await Journey.findById(req.params.id);

  if (!journey) {
    res.status(400);
    throw new Error("Journey not found!");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the todo user
  if (journey.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  // });

  const updatedJourney = await Journey.findOneAndUpdate(
    { _id: req.params.id },
    update,
    { new: true }
  );

  res.status(200).json(updatedJourney);
});

// @desc Delete todos
// @route DELETE /api/todos
// @access Private
const deleteJourney = asyncHandler(async (req, res) => {
  const journey = await Journey.findById(req.params.id);

  if (!journey) {
    res.status(400);
    throw new Error("Journey not found");
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the todo user
  if (journey.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //   await Post.deleteMany({ journey: req.params.id });
  await journey.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getJourneys,
  setJourney,
  updateJourney,
  deleteJourney,
};
