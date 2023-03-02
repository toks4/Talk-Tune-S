const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const { isAuthenticated } = require('../middlewares/jwt.middleware')


router.get('/', (req, res, next) => {
    res.json('All good in auth')
})

router.post('/signup', async (req, res, next) => {
    // Hash password
    const salt = bcrypt.genSaltSync(13)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)
    // Create the User
    console.log(req.body)
  
    await User.create({ username: req.body.username, passwordHash: hashedPassword })
  
    res.status(201).json({ message: 'User created' })
  }) 

  router.post('/login', async (req, res, next) => {
    /* Get back the payload from your request, as it's a POST you can access req.body */
    const matchedUsers = await User.find({ username: req.body.username })
    if (matchedUsers.length) {
      const currentUser = matchedUsers[0]
      // Check for the password
      if (bcrypt.compareSync(req.body.password, currentUser.passwordHash)) {
  
    const authToken = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: { user: { username: currentUser.username } },
      },
      process.env.TOKEN_SECRET
    )
    res.json({ authToken })
  } else {
    res.status(403).json({ message: 'Wrong password' })
  }
  } else {
  res.status(404).json({ message: 'User not found' })
  }
  })

  router.get('/verify', isAuthenticated, (req, res, next) => {
    // You need to use the middleware there, if the request passes the middleware, it means your token is good
    if (req.payload) {
      res.json(req.payload.data.user)
    }
  })


module.exports = router
