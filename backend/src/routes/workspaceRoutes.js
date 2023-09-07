const express = require("express");
const router = express.Router();

const {
  createWorkspace,
  getAllWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
} = require("../controllers/workspaceController");

//Create a lesson
router.post("/", createWorkspace);

//Get all lessons
router.get("/", getAllWorkspaces);

//Get lesson by id
router.get("/:id", getWorkspaceById);

//Update a lesson
router.patch("/:id", updateWorkspace);

//Delete a lesson
router.delete("/:id", deleteWorkspace);

module.exports = router;
