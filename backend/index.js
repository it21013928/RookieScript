require("dotenv").config();

const port = process.env.PORT;
const express = require("express");
const cors = require("cors");
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());

app.listen(port, () => {
  console.log(
    `Connected to the Database and Listening on http://localhost:${port}`
  );
});

module.exports = app;
