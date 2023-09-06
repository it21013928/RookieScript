const Code = require("../models/codeModel");

//Create codes
const createCode = async (req, res) => {
  try {
    const { name, workspace, code, language, user } = req.body;

    //check name, workspace, code, user is empty
    if (!name || !workspace || !code || !language || !user) {
      return res.status(400).json({
        message: "name, workspace, code, language, user fields must be filled",
      });
    }

    //create new code
    const newCode = new Code({
      name,
      workspace,
      code,
      language,
      user,
    });
    await newCode.save();

    res.status(200).json({
      name,
      workspace,
      code,
      language,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get all codes
const getAllCodes = async (req, res) => {
  try {
    const codes = await Code.find();
    if (!codes) {
      return res.status(404).json({ message: "Codes not found" });
    } else {
      res.status(200).json(codes);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get code by ID
const getCodeById = async (req, res) => {
  try {
    const code = await Code.findById(req.params.id);
    if (!code) {
      return res.status(404).json({ message: "Code not found" });
    } else {
      res.status(200).json(code);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Update a code
const updateCode = async (req, res) => {
  try {
    const { name, workspace, code, language, user } = req.body;

    //find code by ID
    const codeDoc = await Code.findById(req.params.id);
    if (!codeDoc) {
      return res.status(404).json({ message: "Code not found" });
    }

    //update code
    codeDoc.name = name || codeDoc.title;
    codeDoc.workspace = workspace || codeDoc.workspace;
    codeDoc.code = code || codeDoc.code;
    codeDoc.language = language || codeDoc.language;
    codeDoc.user = user || codeDoc.user;

    await codeDoc.save();

    //send success message
    res.json({ message: "Code updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Delete a code
const deleteCode = async (req, res) => {
  try {
    const code = await Code.findById(req.params.id);
    if (!code) {
      return res.status(404).json({ message: "Code not found" });
    } else {
      await code.deleteOne();
      res.status(200).json({ message: "Code deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createCode,
  getAllCodes,
  getCodeById,
  updateCode,
  deleteCode,
};
