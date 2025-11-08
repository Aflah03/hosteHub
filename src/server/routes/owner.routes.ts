import { Router } from 'express';
import {
  getOwnerMesses,
  getOwnerDashboard,
  getCustomRequestsForOwner,
  updateCustomRequest,
  getMessFeedback,
} from '../controllers/owner.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);
router.use(authorize('OWNER'));

router.get('/dashboard', getOwnerDashboard);
router.get('/messes', getOwnerMesses);
router.get('/custom-requests', getCustomRequestsForOwner);
router.put('/custom-requests/:id', updateCustomRequest);
router.get('/messes/:id/feedback', getMessFeedback);

export default router;
