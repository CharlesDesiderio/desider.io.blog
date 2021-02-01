const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  postDate: {
    type: String,
    required: true
  },
  postTitle: {
    type: String,
    required: true
  },
  postBody: {
    type: String,
    required: true
  }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post