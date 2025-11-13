import express from 'express';
import { DoctorController } from './doctor.controller.js';

const router = express.Router();

router.get('/', DoctorController.getAll);
router.post('/', DoctorController.register);
router.get('/:id', DoctorController.getById);
router.post('/:id/availability', DoctorController.addAvailability);
router.get('/:id/availability', DoctorController.getAvailability);

export default router;
