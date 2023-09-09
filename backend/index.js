require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const port = 7000;
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(cors());

//Import Routes
const lessonRoutes = require("./src/routes/lessonRoutes");
const workspaceRoutes = require("./src/routes/workspaceRoutes");
const codeSnippetRoutes = require("./src/routes/codeSnippetRoutes");

//Use routes
app.use("/api/lesson", lessonRoutes);
app.use("/api/workspace", workspaceRoutes);
app.use("/api/codeSnippets", codeSnippetRoutes)

//Connect to MongoDB
mongoose
  .connect("mongodb+srv://KithminaSiriwardana:KithminaSiriwardana@rookiescript.gbns506.mongodb.net/RookieScript?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

module.exports = app;
