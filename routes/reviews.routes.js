const router = require("express").Router();
const Reviews = require ('../models/Reviews.model')
const Podcast = require ('../models/Podcast.model')


//Get podcast review
router.get('/', async (req, res, next) => {
    const allReviews = await Reviews.find()
    res.json(allReviews)
  })

//Add a review route
router.post("/addReviews", async (req, res, next) => {
    const newReviewData = req.body
    const newReview = await Reviews.create(newReviewData)
    await Podcast.findByIdAndUpdate(req.body.podcast, {$push: {reviews: [newReview._id]}})
    res.status(201).json(newReview)
  });

// Find a review of a podcast
router.get('/:podcastId', async (req, res, next) => {
    const { podcastId } = req.params
    try {
      // Get one review
      const podcast = await Podcast.findById(podcastId).populate('reviews')
      console.log(podcast);
      res.json(podcast)
    } catch (error) {
      console.log(error)
    }
  })

//Delete a review route
router.delete('/:reviewId', async (req, res)=>
{
    const {reviewId} = req.params
    try{
        //delete one review
        await Reviews.findByIdAndDelete(reviewId)
        res.status(201).json({message: 'Review was deleted.'})
    } catch (error) {
        console.log(error);
    }
}
)

//Update a review route
router.put('/:reviewId', async(req, res)=>{
    const { reviewId } = req.params
    const reviewUpdates = req.body
    console.log(reviewUpdates)
    await Reviews.findByIdAndUpdate(reviewId, reviewUpdates)
    res.status(201).json({ message: 'Review was updated' })
})

module.exports = router;