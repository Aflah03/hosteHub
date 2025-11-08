import { Router } from 'express';
import {
  getAllHostels,
  getHostelById,
  createHostel,
  updateHostel,
  deleteHostel,
} from '../controllers/hostel.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getAllHostels);
router.get('/:id', getHostelById);
router.post('/', authenticate, authorize('ADMIN'), createHostel);
router.put('/:id', authenticate, authorize('ADMIN'), updateHostel);
router.delete('/:id', authenticate, authorize('ADMIN'), deleteHostel);

export default router;
