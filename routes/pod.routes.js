const router = require('express').Router()
const Podcast = require('../models/Podcast.model')



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