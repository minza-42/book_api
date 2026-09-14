import express from 'express';
import {
  getAllReviews,
  getSpecificReview,
  postReview,
  patchReview,
  deleteReview,
  // getReviewsToSpecificBook,
} from '../controllers/reviewController';

const router = express.Router();

import { verifyAdmin } from '../middleware/verifyAdmin';
import { verifyToken } from '../middleware/verifyToken';

router.get('/', getAllReviews);
router.get('/:id', getSpecificReview);
// router.get('/book/:id', getReviewsToSpecificBook);
router.post('/', postReview);
router.patch('/:id', patchReview);
router.delete('/:id', deleteReview);

export default router;
