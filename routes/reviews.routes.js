const router = require("express").Router();
const Reviews = require ('../models/Reviews.model')

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/reviews", async (req, res, next) => {
    const newReviewData = req.body
    const newReview = await Reviews.create(newReviewData)
    res.json(newReview)
  });


module.exports = router;