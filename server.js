const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const Post = require('./models/post')

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, () => {
  console.log(`Connected to MongoDB at ${MONGODB_URI}`)
})

const verifyIdentity = (req, res, next) => {
  if (req.body.password !== process.env.PASSKEY) {
    res.status(400).json({
      error: 'Dennis Nedry'
    })
  } else {
    next()
  }
}

app.get('/', (req, res) => {
  Post.find({}, (err, foundPost) => {
    res.json({post: foundPost})
  })
})

app.post('/post', verifyIdentity, (req, res) => {
  req.body.postDate = Date.now()
  Post.create(req.body, (err, createdPost) => {
    if (err) {
      res.status(400).json({
        error: err
      })
    } else {
      res.status(200).json({
        post: createdPost
      })
    }
  })
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})