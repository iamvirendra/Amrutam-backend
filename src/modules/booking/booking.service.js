import pool from '../../db/index.js';
import redisClient from '../../db/redis.js';
import { bookingQueries } from './booking.sql.js';

export const BookingService = {
    async bookConsultation(patientId, doctorId, slotId) {
        const client = await pool.connect();
        try {
        await client.query('BEGIN');

        await client.query(bookingQueries.markSlotBooked, [slotId]);
        const { rows } = await client.query(bookingQueries.bookConsultation, [patientId, doctorId, slotId]);
        
        await client.query('COMMIT');
        await redisClient.del(`availability:${doctorId}`);
        return rows[0];
        } catch (err) {
        await client.query('ROLLBACK');
        throw err;
        } finally {
        client.release();
        }
    },

    async cancelConsultation(consultationId) {
        const { rows } = await pool.query(bookingQueries.cancelConsultation, [consultationId]);
        if (!rows.length) return null;
        const consultation = rows[0];
        await pool.query(bookingQueries.markSlotAvailable, [consultation.slot_id]);
        await redisClient.del(`availability:${consultation.doctor_id}`);
        return consultation;
    }
};
