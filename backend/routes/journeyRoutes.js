const express = require("express");
const router = express.Router();
const {
  getJourneys,
  setJourney,
  updateJourney,
  deleteJourney,
} = require("../controllers/journeyController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getJourneys).post(protect, setJourney);
router.route("/:id").put(protect, updateJourney).delete(protect, deleteJourney);

module.exports = router;
