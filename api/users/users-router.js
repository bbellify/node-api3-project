const express = require('express');
const Users = require('./users-model')
const { 
  validateUserId, 
  validateUser,
 } = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

// RETURN AN ARRAY WITH ALL THE USERS
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
  } catch {
    res.status(400).json({
      message: 'error fetching users'
    })
  }
});

// RETURN THE USER OBJECT
// this needs a middleware to verify user id
router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

// RETURN THE NEWLY CREATED USER OBJECT
// this needs a middleware to check that the request body is valid
router.post('/', (req, res) => {

});

// RETURN THE FRESHLY UPDATED USER OBJECT
// this needs a middleware to verify user id
// and another middleware to check that the request body is valid
router.put('/:id', validateUser, validateUserId, (req, res) => {

});

// RETURN THE FRESHLY DELETED USER OBJECT
// this needs a middleware to verify user id
router.delete('/:id', (req, res) => {

});

// RETURN THE ARRAY OF USER POSTS
// this needs a middleware to verify user id
router.get('/:id/posts', (req, res) => {

});

// RETURN THE NEWLY CREATED USER POST
// this needs a middleware to verify user id
// and another middleware to check that the request body is valid
router.post('/:id/posts', (req, res) => {

});

// do not forget to export the router
module.exports = router