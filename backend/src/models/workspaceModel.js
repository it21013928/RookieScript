const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workspaceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

// export user model
module.exports = mongoose.model("workspaces", workspaceSchema);