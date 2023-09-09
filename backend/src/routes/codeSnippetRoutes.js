const express = require("express");
const router = express.Router();

const {
    addCodes,
    insertCode,
    getAllCodeSnippets,
    getCodeSnippetByTag
} = require("../controllers/codeSnippetsController")

//Add code snippets

router.post("/", addCodes);

router.post("/insertCode", insertCode)

router.get("/", getAllCodeSnippets)

router.get("/search", getCodeSnippetByTag)

module.exports = router;