import { Router } from 'express';
import {
  getAdminDashboard,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllMessesAdmin,
  updateMessStatus,
} from '../controllers/admin.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);
router.use(authorize('ADMIN'));

router.get('/dashboard', getAdminDashboard);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/messes', getAllMessesAdmin);
router.put('/messes/:id/status', updateMessStatus);

export default router;
