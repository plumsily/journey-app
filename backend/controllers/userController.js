const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../middleware/cloudinary");
const User = require("../models/UserModel");

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, file } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //Check if user exists in DB
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Upload profile image to cloudinary if uploaded, else use the default profile image
  let result = {};
  if (file) {
    result = await cloudinary.uploader.upload(file.path);
  } else {
    result = {
      secure_url:
        "https://res.cloudinary.com/dgga2n5e1/image/upload/v1677651782/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM_u7klru.jpg",
      public_id: "360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM_u7klru",
    };
  }

  //Create user into DB
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    image: result.secure_url,
    cloudinaryId: result.public_id,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
