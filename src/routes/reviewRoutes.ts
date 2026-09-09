import express from 'express';
import {
  getAllReviews,
  getSpecificReview,
  postReview,
  patchReview,
  deleteReview,
} from '../controllers/reviewController';

const router = express.Router();

router.get('/', getAllReviews);
router.get('/:id', getSpecificReview);
router.post('/', postReview);
router.patch('/:id', patchReview);
router.delete('/:id', deleteReview);

export default router;
