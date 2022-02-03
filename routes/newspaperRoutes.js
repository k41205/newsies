const express = require('express');
const newspaperController = require('./../controllers/newspaperController');
const router = express.Router();

router
  .route('/')
  .get(newspaperController.getAllNewspapers)
  .post(newspaperController.createNewspaper);

router
  .route('/:id')
  .get(newspaperController.getNewspaper)
  .patch(newspaperController.updateNewspaper)
  .delete(newspaperController.deleteNewspaper);

// router.route('/?term=:term').get(newspaperController.searchTitle);

module.exports = router;
