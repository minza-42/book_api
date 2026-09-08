import express from 'express';
import {
  getAllReviews,
  getSpecificReview,
  postReview,
  patchReview,
  deleteReview,
} from '../controllers/reviewController';

const router = express.Router();

router.get('/api/reviews/', getAllReviews);
router.get('/api/reviews/:id', getSpecificReview);
router.post('/api/reviews/', postReview);
router.patch('/api/reviews/:id', patchReview);
router.delete('/api/reviews/:id', deleteReview);

export default router;
