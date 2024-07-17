const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  fileUrl: { type: String }, // URL of the uploaded file
  fileType: { type: String }, // Type of the uploaded file (e.g., 'image', 'video')
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who liked the post
  comments: [commentSchema], // Array of comments
  likeCount: { type: Number, default: 0 }, // Number of likes
  commentCount: { type: Number, default: 0 }, // Number of comments
  score: { type: Number, default: 0 } // Pre-computed score
});

// Create indexes on the author and createdAt fields for faster lookups
postSchema.index({ author: 1 });
postSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Post', postSchema);
