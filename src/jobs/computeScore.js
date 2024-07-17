const cron = require('node-cron');
const Post = require('../models/post');
const User = require('../models/user');

// Helper function to calculate the score of a post
const calculatePostScore = async (post) => {
  const alpha = 0.4; // Relevance weight
  const beta = 0.3; // Engagement weight
  const gamma = 0.2; // Recency weight
  const delta = 0.1; // User Interaction weight

  const relevance = 1; // Placeholder for relevance calculation
  const engagement = post.likeCount + post.commentCount;
  const recency = 1 / ((Date.now() - new Date(post.createdAt).getTime()) / 1000); // Recency as inverse of age in seconds
  
  // Calculate user interaction
  const user = await User.findById(post.author);
  const userInteraction = user ? 1 : 0; // Placeholder, should calculate actual interaction

  return alpha * relevance + beta * engagement + gamma * recency + delta * userInteraction;
};

// Function to update all post scores
const updatePostScores = async () => {
  const posts = await Post.find();
  for (const post of posts) {
    const score = await calculatePostScore(post);
    post.score = score;
    await post.save();
  }
};

// Function to initialize the cron job
const initCronJob = () => {
  // Schedule the job to run every hour
  cron.schedule('0 * * * *', async () => {
    console.log('Running score computation job');
    await updatePostScores();
    console.log('Score computation job completed');
  });
};

module.exports = initCronJob;
