const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const isAuthenticated = require('../middlewares/isAuthenticated')

//onst auth = require('../middlewares/auth')







router.get('/', (req, res, next) => {
    res.json('All good in auth')
})

router.post('/signup', async (req, res, next) => {
    // Hash password
    const salt = bcrypt.genSaltSync(13)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)
    // Create the User
    console.log(req.body)
  
    await User.create({ firstname: req.body.firstname, lastname: req.body.lastname, birthday: req.body.birthday,
       city: req.body.city, country: req.body.country, username: req.body.username, email: req.body.email, passwordHash: hashedPassword })
  
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
        data: { user: matchedUsers[0] },
      },
      process.env.TOKEN_SECRET
    )
    res.json({ authToken, user: matchedUsers[0] })
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
        console.log(req.payload)
      res.json(req.payload.data.user)
    }
  }) 



 // router.delete('/podcast/', async (req, res, next) =>{
   // const name = req.params.podcast
   // const deletedPodcast = await Podcast.findByIdAndDelete(name)
   // res.json(deletedPodcast)

  //})


  


module.exports = router
