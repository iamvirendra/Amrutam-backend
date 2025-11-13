import express from 'express';
import { PrescriptionController } from './prescription.controller.js';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';

const router = express.Router();
router.use(authenticate);


router.post('/', authorize('doctor'), PrescriptionController.add);
router.get('/consultation/:id', authorize('doctor', 'patient'), PrescriptionController.getByConsultation);
router.get('/patient/:id', authorize('patient', 'doctor'), PrescriptionController.getByPatient);


export default router;
