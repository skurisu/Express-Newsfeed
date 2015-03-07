var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema ({
  username  : {type: String, trim: true, require: true, unique: true},
  password  : {type: String, trim: true, require: true},
});

userSchema.methods.validPassword = function (password) {
  return this.password == password;
};

module.exports = mongoose.model('user', userSchema);