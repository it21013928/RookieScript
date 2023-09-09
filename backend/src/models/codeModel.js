const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  workspace: {
    type: String,
    required: true,
    default: "Default",
  },
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    required: true,
  },
  user: {
    type: String,
  },
});

// export code model
module.exports = mongoose.model("codes", codeSchema);
