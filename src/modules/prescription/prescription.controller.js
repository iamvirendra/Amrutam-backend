import { PrescriptionService } from './prescription.service.js';

export const PrescriptionController = {
  async getByPatient(req, res, next) {
    try {
      const { id } = req.params;
      const prescriptions = await PrescriptionService.getPrescriptionsByPatient(id);
      res.json({ success: true, data: prescriptions });
    } catch (err) {
      next(err);
    }
  },

  async getByConsultation(req, res, next) {
    try {
      const { id } = req.params;
      const prescriptions = await PrescriptionService.getPrescriptionsByConsultation(id);
      res.json({ success: true, data: prescriptions });
    } catch (err) {
      next(err);
    }
  },

  async add(req, res, next) {
    try {
      const prescription = await PrescriptionService.addPrescription(req.body);
      res.status(201).json({ success: true, data: prescription });
    } catch (err) {
      next(err);
    }
  }
};
