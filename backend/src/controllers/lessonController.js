const Lesson = require("../models/lessonModel");

//Create Lessons
const createLesson = async (req, res) => {
  try {
    const {
      title,
      description,
      xpLevel,
      language,
      category,
      videoList,
      articleList,
      quizList,
    } = req.body;

    //check title, description, xpLevel, language is empty
    if (!title || !description || !xpLevel || !language) {
      return res.status(400).json({
        message: "title, description, xpLevel, language fields must be filled",
      });
    }

    //check if lesson already exists
    const existingLesson = await Lesson.findOne({ title });
    if (existingLesson) {
      return res.status(409).json({ message: "Lesson already exists" });
    }

    //create new lesson
    const newLesson = new Lesson({
      title,
      description,
      xpLevel,
      category,
      language,
      videoList,
      articleList,
      quizList,
    });
    await newLesson.save();

    res.status(200).json({
      title,
      description,
      xpLevel,
      category,
      language,
      videoList,
      articleList,
      quizList,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get all lessons
const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    if (!lessons) {
      return res.status(404).json({ message: "Lessons not found" });
    } else {
      res.status(200).json(lessons);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get lesson by ID
const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    } else {
      res.status(200).json(lesson);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Update a lesson
const updateLesson = async (req, res) => {
  try {
    const {
      title,
      description,
      xpLevel,
      language,
      category,
      videoList,
      articleList,
      quizList,
    } = req.body;

    //find lesson by ID
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    //update lesson
    lesson.title = title || lesson.title;
    lesson.description = description || lesson.description;
    lesson.xpLevel = xpLevel || lesson.xpLevel;
    lesson.language = language || lesson.language;
    lesson.category = category || lesson.category;
    lesson.videoList = videoList || lesson.videoList;
    lesson.articleList = articleList || lesson.articleList;
    lesson.quizList = quizList || lesson.quizList;

    await lesson.save();

    //send success message
    res.json({ message: "Lesson updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Delete a lesson
const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    } else {
      await lesson.deleteOne();
      res.status(200).json({ message: "Lesson deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createLesson,
  getAllLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
};
