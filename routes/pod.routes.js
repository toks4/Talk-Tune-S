const router = require('express').Router()
const Podcast = require('../models/Podcast.model')
const uploader = require('../middlewares/cloudinary.config');



router.get('/podcast', async(req, res) => {
    const podcast = await Podcast.find()
    res.json(podcast)
})


router.post('/podcast', async(req, res) => {
  console.log('get', req.body)
    const newPodcastData = req.body
    const newPodcast = await Podcast.create(newPodcastData)
    res.json(newPodcast)
})

/* router.post('/podcast', uploader.single("imageUrl"), async (req, res) => {
  const audioFile = req.files.audio
  console.log('file is: ', req.file)
    if (!req.file) {
      console.log("there was an error uploading the file")
      next(new Error('No file uploaded!'));
      return;
    }

}) */


router.get('/podcast/:podcastId', async (req, res, next) => {
    const{ podcastId } = req.params
   const updatePodcast = await Podcast.findById(podcastId)
   res.status(200).json(updatePodcast)
  })

  router.put('/podcast/:podcastId', async (req, res, next) => {
    const{ podcastId } = req.params
    const updatePodcastData = req.body
   const updatePodcast = await Podcast.findByIdAndUpdate(podcastId, updatePodcastData,{new: true})
   res.json(updatePodcast)
  })


router.delete('/podcast/:podcastId', async (req, res, next) => {
    const { podcastId } = req.params
    try {ç
      n
      // Delete one podcast
      await podcast.findByIdAndDelete(podcastId)
      res.json({ message: 'podcast deleted properly' })
    } catch (error) {
      console.log(error)
    }
  })


module.exports = router