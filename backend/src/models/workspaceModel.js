const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workspaceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

// export workspace model
module.exports = mongoose.model("workspaces", workspaceSchema);
