const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// this is our schema to represent a user
const userSchema = mongoose.Schema({
  // the `name` property is String type and required
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  task: [{
    taskTitle: String,
    category: String,
    taskComplete: Boolean,
    taskDateDue: Date,
    taskNote: String,
    subTasks: [{
      subTaskTitle: String,
      subTaskComplete: Boolean,
      subTaskDateDue: Date,
      subTaskNote: String,

    }]
  }]
});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', userSchema);

module.exports = {User};