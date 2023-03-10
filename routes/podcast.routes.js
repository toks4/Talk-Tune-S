const router = require('express').Router()


router.get('/search', async (req, res, next) => {
  const ids = req.query.ids;
  if (!ids) {
    return res.status(400).send('Bad request');
  }

  try {
    const data = await searchShows(ids);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router
