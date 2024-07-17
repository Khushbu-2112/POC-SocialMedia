const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

userSchema.index({ username: 1 });

module.exports = mongoose.model('User', userSchema);
