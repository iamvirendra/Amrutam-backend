import { ConsultService } from './consult.service.js';

export const ConsultController = {
    async book(req, res, next) {
        try {
        const { patient_id, doctor_id, slot_id } = req.body;
        const consultation = await ConsultService.createConsultation(patient_id, doctor_id, slot_id);
        res.status(201).json({ success: true, data: consultation });
        } catch (err) {
        next(err);
        }
    },

    async start(req, res, next) {
        try {
        const updated = await ConsultService.updateStatus(req.params.id, 'in_progress');
        res.json({ success: true, data: updated });
        } catch (err) {
        next(err);
        }
    },

    async complete(req, res, next) {
        try {
        const updated = await ConsultService.updateStatus(req.params.id, 'completed');
        res.json({ success: true, data: updated });
        } catch (err) {
        next(err);
        }
    },

    async cancel(req, res, next) {
        try {
        const cancelled = await ConsultService.cancelConsultation(req.params.id);
        res.json({ success: true, data: cancelled });
        } catch (err) {
        next(err);
        }
    },

    async addPrescription(req, res, next) {
        try {
        const { consultation_id, doctor_id, patient_id, medicine_name, dosage, duration, instructions } = req.body;
        const prescription = await ConsultService.addPrescription(
            consultation_id,
            doctor_id,
            patient_id,
            medicine_name,
            dosage,
            duration,
            instructions
        );
        res.status(201).json({ success: true, data: prescription });
        } catch (err) {
        next(err);
        }
    },

    async getPrescriptions(req, res, next) {
        try {
        const prescriptions = await ConsultService.getPrescriptionsByConsultation(req.params.id);
        res.json({ success: true, data: prescriptions });
        } catch (err) {
        next(err);
        }
    }
};
