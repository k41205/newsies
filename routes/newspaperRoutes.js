const express = require('express');
const newspaperController = require('./../controllers/newspaperController');
const router = express.Router();

// API ROUTES
router.route('/').get(newspaperController.getAllNewspapers).post(newspaperController.createNewspaper);

router
  .route('/:id')
  .get(newspaperController.getNewspaper)
  .patch(newspaperController.updateNewspaper)
  .delete(newspaperController.deleteNewspaper);

module.exports = router;
