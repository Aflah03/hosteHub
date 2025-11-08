import { Router } from 'express';
import {
  getLaundryServices,
  getCleaningServices,
} from '../controllers/service.controller';

const router = Router();

router.get('/laundry', getLaundryServices);
router.get('/cleaning', getCleaningServices);

export default router;
