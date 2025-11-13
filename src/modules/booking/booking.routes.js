import { Router } from 'express';
import { BookingController } from './booking.controller.js';

const router = Router();

router.post('/', BookingController.book);
router.patch('/:id/cancel', BookingController.cancel);

export default router;
