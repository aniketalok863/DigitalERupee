const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for user
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance:{type: Number, required: true},
  });

// Create model for user
const User = mongoose.model('User', userSchema);

module.exports = User;
