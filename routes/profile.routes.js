const router = require("express").Router();

router.get("/profile", (req, res, next) => {
  res.json("All good in here");
});

router.put('/:profileId', async (req, res, next) => {
  const{profile} = req.params
  const updateProfileData = req.body
 const updateProfile = await Profile.findByIdAndUpdate(profileId, updateProfileData,{new: true})
 res.json(updateProfile)
})


router.delete('/:profileId', async (req, res, next) => {
  const { profileId } = req.params
  try {
    // Delete one podcast
    await profile.findByIdAndDelete(profileId)
    res.json({ message: 'profile deleted properly' })
  } catch (error) {
    console.log(error)
  }
})


module.exports = router;