const Users = require('../users/users-model')

function logger(req, res, next) {
  const { method, url } = req
  console.log(`${method} from ${url}, ${new Date().toISOString()}`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id)
    if (!user) {
      res.status(404).json({
        message: "user not found"
      })
    } else {
      req.user = user
      next()
    }
  } catch {
    res.status(400).json({
      message: 'something went wrong'
    })
  }
}

function validateUser(req, res, next) {
  const { name } = req.body
  if (!name) {
    res.status(400).json({
      message: 'missing required name field'
    })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  const { text } = req.body
  if (!text) {
    res.status(400).json({
      message: 'missing required text field'
    })
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}