const router = require("express").Router();
const Profile = require('../models/User.model')

router.get("/profile", async(req, res) => {
  const profile = await Profile.find()
  res.json(profile)
});


router.get('/:profileId', async (req, res, next) => {
  const{ profileId } = req.params
 const updateProfile = await Profile.findById(profileId)
 res.status(200).json(updateProfile)
})


router.put('/:profileId', async (req, res, next) => {
  const{ profileId } = req.params
  const updateProfileData = req.body
 const updateProfile = await Profile.findByIdAndUpdate(profileId, updateProfileData,{new: true})
 res.json(updateProfile)
})


router.delete('/:profileId', async (req, res, next) => {
  const { profileId } = req.params
  try {
    // Delete one podcast
    await Profile.findByIdAndDelete(profileId)
    res.json({ message: 'profile deleted properly' })
  } catch (error) {
    console.log(error)
  }
})


module.exports = router;