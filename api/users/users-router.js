const express = require('express');
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const { 
  validateUserId, 
  validateUser,
  validatePost
 } = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await Users.get()
    if (!users) {
      res.status(400).json({
        message: 'error fetching users'
      })
    } else {
      res.json(users)
    }
  } catch (error) {
    res.status(400).json({
      message: 'error fetching users'
    })
  }
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, async (req, res) => {
  try {
    const user = await Users.insert(req.body)
    if (!user) {
      res.status(400).json({
        message: 'something went wrong'
      })
    } else {
      res.status(201).json(user)
    }
  } catch {
    res.status(400).json({
      message: 'something went wrong'
    })
  }
});

router.put('/:id', validateUser, validateUserId, async (req, res) => {
  try {
    const changes = await Users.update(req.user.id, req.body)
    if (!changes) {
      res.status(400).json({
        message: 'something went wrong'
      })
    } else {
      res.json(changes)
    }
  } catch {
    res.status(400).json({
      message: 'something went wrong here'
    })
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    const deleted = await Users.remove(req.params.id)
    if (!deleted) {
      res.status(400).json({
        message: 'failed to delete user'
      })
    } else {
      res.json(req.user)
    }
  } catch {
    res.status(400).json({
      message: 'something went wrong'
    })
  }

});

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const posts = await Users.getUserPosts(req.params.id)
    if (!posts) {
      res.status(400).json({
        message: 'error fetching posts'
      })
    } else {
      res.json(posts)
    }
  } catch {
    res.status(400).json({
      message: 'something went wrong'
    })
  }
});

// RETURN THE NEWLY CREATED USER POST
// this needs a middleware to verify user id
// and another middleware to check that the request body is valid
router.post('/:id/posts', validatePost, validateUserId, async (req, res) => {
  try {
    req.body.user_id = req.params.id
    const newPost = await Posts.insert(req.body)
    if (!newPost) {
      res.status(400).json({
        message: 'new post failed'
      })
    } else {
      res.json(newPost)
    }
  } catch {
    res.status(400).json({
      message: 'something went wrong here'
    })
  }

});

// do not forget to export the router
module.exports = router