const router = require('express').Router()
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
router.get('/', (req, res, next) => {
    res.json('All good in auth')
})








module.exports = router
