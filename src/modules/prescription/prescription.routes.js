import express from 'express';
import { PrescriptionController } from './prescription.controller.js';

const router = express.Router();

router.get('/patient/:id', PrescriptionController.getByPatient);
router.get('/consultation/:id', PrescriptionController.getByConsultation);
router.post('/', PrescriptionController.add);

export default router;
