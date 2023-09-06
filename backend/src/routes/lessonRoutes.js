const express = require("express");
const router = express.Router();

const {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");

//Create a lesson
router.post("/", createLesson);

//Get all lessons
router.get("/", getAllLessons);

//Get lesson by id
router.get("/:id", getLessonById);

//Update a lesson
router.patch("/:id", updateLesson);

//Delete a lesson
router.delete("/:id", deleteLesson);

module.exports = router;
