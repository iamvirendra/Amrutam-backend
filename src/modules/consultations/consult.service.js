import pool from '../../db/index.js';
import redisClient from '../../db/redis.js';
import { consultQueries } from './consult.sql.js';

export const ConsultService = {
    async createConsultation(patientId, doctorId, slotId) {
        const { rows } = await pool.query(consultQueries.createConsultation, [patientId, doctorId, slotId]);
        const consultation = rows[0];
        await redisClient.del(`doctor:${doctorId}:consultations`);
        return consultation;
    },

    async updateStatus(id, status) {
        const { rows } = await pool.query(consultQueries.updateStatus, [id, status]);
        const updated = rows[0];
        await redisClient.setEx(`consultation:${id}`, 60, JSON.stringify(updated));
        return updated;
    },

    async cancelConsultation(id) {
        const { rows } = await pool.query(consultQueries.cancelConsultation, [id]);
        const cancelled = rows[0];
        await redisClient.del(`consultation:${id}`);
        return cancelled;
    },

    async getConsultationById(id) {
        const cacheKey = `consultation:${id}`;
        const cached = await redisClient.get(cacheKey);
        if (cached) return JSON.parse(cached);

        const { rows } = await pool.query(consultQueries.getConsultationById, [id]);
        if (!rows.length) return null;
        await redisClient.setEx(cacheKey, 60, JSON.stringify(rows[0]));
        return rows[0];
    },

    async addPrescription(consultationId, doctorId, patientId, medicine_name, dosage, duration, instructions) {
        const { rows } = await pool.query(consultQueries.addPrescription, [
        consultationId,
        doctorId,
        patientId,
        medicine_name,
        dosage,
        duration,
        instructions
        ]);
        await redisClient.del(`prescriptions:${consultationId}`);
        return rows[0];
    },

    async getPrescriptionsByConsultation(consultationId) {
        const cacheKey = `prescriptions:${consultationId}`;
        const cached = await redisClient.get(cacheKey);
        if (cached) return JSON.parse(cached);

        const { rows } = await pool.query(consultQueries.getPrescriptionsByConsultation, [consultationId]);
        await redisClient.setEx(cacheKey, 60, JSON.stringify(rows));
        return rows;
    }
};
