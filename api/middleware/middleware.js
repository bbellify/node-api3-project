const Users = require('../users/users-model')

function logger(req, res, next) {
  const { method, url } = req
  console.log(`${method} from ${url}, ${new Date().toISOString()}`)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}