const Users = require('../users/users-model')

function logger(req, res, next) {
  const { method, url } = req
  console.log(`${method} from ${url}, ${new Date().toISOString()}`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await Users.getById(req.params.id)
    if (!user) {
      res.status(404).json({
        message: "user not found"
      })
      next()
    } else {
      req.user = user
      next()
    }
  } catch {
    res.status(400).json({
      message: 'something went wrong'
    })
    next()
  }
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