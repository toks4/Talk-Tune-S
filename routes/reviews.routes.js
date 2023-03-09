const router = require("express").Router();
const Reviews = require ('../models/Reviews.model')



//Get podcast review
router.get('/', async (req, res, next) => {
    const allReviews = await Reviews.find()
    res.json(allReviews)
  })

//Add a review route
router.post("/addReviews", async (req, res, next) => {
    const newReviewData = req.body
    const newReview = await Reviews.create(newReviewData)
    res.status(201).json(newReview)
  });

// Find one review route
router.get('/:reviewId', async (req, res, next) => {
    const { reviewId } = req.params
    try {
      // Get one review
      const review = await Reviews.findById(reviewId)
      res.json(review)
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