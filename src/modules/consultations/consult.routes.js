import express from 'express';
import { ConsultController } from './consult.controller.js';

const router = express.Router();

router.post('/', ConsultController.book);
router.patch('/:id/start', ConsultController.start);
router.patch('/:id/complete', ConsultController.complete);
router.patch('/:id/cancel', ConsultController.cancel);

router.post('/:id/prescriptions', ConsultController.addPrescription);
router.get('/:id/prescriptions', ConsultController.getPrescriptions);

export default router;
