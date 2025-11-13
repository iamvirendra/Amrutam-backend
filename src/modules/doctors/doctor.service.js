import pool from '../../db/index.js';
import redisClient from '../../db/redis.js';
import { doctorQueries } from './doctor.sql.js';

export const DoctorService = {
    async registerDoctor(userId, specialization, experience_years, consultation_fee, qualification, bio) {
        const { rows } = await pool.query(doctorQueries.registerDoctor, [
            userId,
            specialization,
            experience_years,
            consultation_fee,
            qualification,
            bio,
        ]);
    await redisClient.del('doctors:all');
    return rows[0];
    },

    async getAvailabilitySlots(doctorId) {
        const cacheKey = `availability:${doctorId}`;
        const cached = await redisClient.get(cacheKey);
        if (cached) return JSON.parse(cached);
    
        const { rows } = await pool.query(doctorQueries.getAvailabilitySlots, [doctorId]);
        await redisClient.setEx(cacheKey, 60, JSON.stringify(rows));
        return rows;
    },

    async getAllDoctors() {
        const cacheKey = 'doctors:all';
        const cached = await redisClient.get(cacheKey);
        if (cached) return JSON.parse(cached);

        const { rows } = await pool.query(doctorQueries.getAllDoctors);
        await redisClient.setEx(cacheKey, 60, JSON.stringify(rows));
        return rows;
    },

    async getDoctorById(id) {
        const cacheKey = `doctor:${id}`;
        const cached = await redisClient.get(cacheKey);
        if (cached) return JSON.parse(cached);

        const { rows } = await pool.query(doctorQueries.getDoctorById, [id]);
        if (!rows.length) return null;

        await redisClient.setEx(cacheKey, 60, JSON.stringify(rows[0]));
        return rows[0];
    },

    async addAvailabilitySlot(doctorId, date, start, end) {
        const { rows } = await pool.query(doctorQueries.addAvailabilitySlot, [
        doctorId,
        date,
        start,
        end
        ]);
        await redisClient.del(`availability:${doctorId}`);
        return rows[0];
    }
};
