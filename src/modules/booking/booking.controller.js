import { BookingService } from './booking.service.js';

export const BookingController = {
    async book(req, res, next) {
        try {
        const { id: patientId, role } = req.user;
        if (role !== 'patient') {
            return res.status(403).json({ success: false, message: 'Only patients can book consultations' });
        }

        const { doctor_id, slot_id } = req.body;
        if (!doctor_id || !slot_id) {
            return res.status(400).json({ success: false, message: 'doctor_id and slot_id are required' });
        }

        const booking = await BookingService.bookConsultation(patientId, doctor_id, slot_id);
        res.status(201).json({ success: true, data: booking });
        } catch (err) {
        next(err);
        }
    },

    async cancel(req, res, next) {
        try {
        const consultation = await BookingService.cancelConsultation(req.params.id);
        if (!consultation)
            return res.status(404).json({ success: false, message: 'Consultation not found' });

        res.json({ success: true, data: consultation });
        } catch (err) {
        next(err);
        }
    },
};
