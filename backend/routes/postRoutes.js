const express = require("express");
const router = express.Router();
const {
  getMyPosts,
  getSinglePost,
  setPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getMyPosts).post(protect, setPost);
router
  .route("/:id")
  .put(protect, updatePost)
  .delete(protect, deletePost)
  .get(getSinglePost);

module.exports = router;
