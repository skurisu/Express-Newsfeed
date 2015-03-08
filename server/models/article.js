var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema ({
  title : {type: String, trim: true, require: true},
  client : {type: String, trim: true, require: true},
  creativeFields: {type: String, trim: true},
  projectUrl : String,
  imageUrl : {type: String, trim: true, require: true},
  content : String,
  completionDate : Date,
  share : String,
  createdAt : {type: Date, default : Date.now}
});

module.exports = mongoose.model('article', articleSchema);