const Post = require('../models/post');
const User = require('../models/user');

exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      content: req.body.content,
      author: req.body.authorId,
      fileUrl: req.file ? req.file.path : null,
      fileType: req.file ? req.file.mimetype.split('/')[0] : null
    });
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getUserFeed = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const following = user.followers.concat(user._id); // Include the user themselves
    const posts = await Post.find({ author: { $in: following } }).sort({ score: -1 });

    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }

    const userId = req.body.userId;
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      post.likeCount += 1;
      await post.save();
    }

    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }

    const comment = {
      text: req.body.text,
      author: req.body.userId
    };
    post.comments.push(comment);
    post.commentCount += 1;
    await post.save();

    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
};
