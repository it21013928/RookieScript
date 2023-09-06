const express = require("express");
const router = express.Router();

const {
  createLesson,
  getAllLessons,
  getLessonById,
  getLessonsByXpLevel,
  getLessonsByLanguage,
  getLessonsWithVideos,
  getLessonsWithArticles,
  getLessonsWithQuizzes,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");

//Create a lesson
router.post("/", createLesson);

//Get all lessons
router.get("/", getAllLessons);

//Get lesson by id
router.get("/:id", getLessonById);

//Get lessons by xpLevel
router.get("/xpLevel/:xpLevel", getLessonsByXpLevel);

//Get lessons by language
router.get("/language/:language", getLessonsByLanguage);

//Get lessons with videos
router.get("/videos", getLessonsWithVideos);

//Get lessons with articles
router.get("/articles", getLessonsWithArticles);

//Get lessons with quizzes
router.get("/quizzes", getLessonsWithQuizzes);

//Update a lesson
router.patch("/:id", updateLesson);

//Delete a lesson
router.delete("/:id", deleteLesson);

module.exports = router;
