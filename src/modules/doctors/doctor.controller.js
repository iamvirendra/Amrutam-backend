import { DoctorService } from './doctor.service.js';

export const DoctorController = {

    async register(req, res, next) {
        try {
        const { role, id: userId } = req.user;
        if (role !== 'doctor') {
            return res.status(403).json({ success: false, message: 'Only doctors can register profiles' });
        }
    
        const { specialization, experience_years, consultation_fee, qualification, bio } = req.body;
        if (!specialization || !experience_years || !consultation_fee) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
    
        const doctor = await DoctorService.registerDoctor(
            userId,
            specialization,
            experience_years,
            consultation_fee,
            qualification || null,
            bio || null
        );
    
        res.status(201).json({ success: true, data: doctor });
        } catch (err) {
        next(err);
        }
    },

    async getAll(req, res, next) {
        try {
        const doctors = await DoctorService.getAllDoctors();
        res.json({ success: true, data: doctors });
        } catch (err) {
        next(err);
        }
    },

    async getById(req, res, next) {
        try {
        const doctor = await DoctorService.getDoctorById(req.params.id);
        if (!doctor)
            return res
            .status(404)
            .json({ success: false, message: 'Doctor not found' });
        res.json({ success: true, data: doctor });
        } catch (err) {
        next(err);
        }
    },

    async addAvailability(req, res, next) {
        try {
        const doctorId = req.params.id;
        const { available_date, start_time, end_time } = req.body;

        if (!available_date || !start_time || !end_time) {
            return res.status(400).json({
            success: false,
            message:
                'available_date, start_time, and end_time are required',
            });
        }

        const slot = await DoctorService.addAvailabilitySlot(
            doctorId,
            available_date,
            start_time,
            end_time
        );
        res.status(201).json({ success: true, data: slot });
        } catch (err) {
        next(err);
        }
    },

    async getAvailability(req, res, next) {
        try {
        const slots = await DoctorService.getAvailabilitySlots(req.params.id);
        res.json({ success: true, data: slots });
        } catch (err) {
        next(err);
        }
    },
};
