import { Router } from 'express';
import {
  getStudentProfile,
  updateStudentProfile,
  getStudentSubscriptions,
  subscribeToMess,
  applyMessCut,
  getMessCuts,
  submitCustomRequest,
  getCustomRequests,
  getStudentDues,
} from '../controllers/student.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);
router.use(authorize('STUDENT'));

router.get('/profile', getStudentProfile);
router.put('/profile', updateStudentProfile);
router.get('/subscriptions', getStudentSubscriptions);
router.post('/subscriptions', subscribeToMess);
router.get('/mess-cuts', getMessCuts);
router.post('/mess-cuts', applyMessCut);
router.get('/custom-requests', getCustomRequests);
router.post('/custom-requests', submitCustomRequest);
router.get('/dues', getStudentDues);

export default router;
