import { Router } from 'express';
import {
  getAllMesses,
  getMessById,
  createMess,
  updateMess,
  deleteMess,
  getMessMenu,
} from '../controllers/mess.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getAllMesses);
router.get('/:id', getMessById);
router.get('/:id/menu', getMessMenu);
router.post('/', authenticate, authorize('OWNER', 'ADMIN'), createMess);
router.put('/:id', authenticate, authorize('OWNER', 'ADMIN'), updateMess);
router.delete('/:id', authenticate, authorize('OWNER', 'ADMIN'), deleteMess);

export default router;
