var mongoose = require("mongoose");

//POST - title, content
var postSchema = new mongoose.Schema({
  email: String,
  name: String,
});

module.exports = mongoose.model("Post", postSchema); 