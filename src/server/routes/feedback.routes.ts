import { Router } from 'express';
import {
  submitFeedback,
  getAllFeedback,
  getFeedbackByMess,
} from '../controllers/feedback.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticate, authorize('STUDENT'), submitFeedback);
router.get('/', authenticate, getAllFeedback);
router.get('/mess/:messId', getFeedbackByMess);

export default router;
