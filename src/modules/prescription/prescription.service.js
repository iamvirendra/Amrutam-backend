import pool from '../../db/index.js';
import redisClient from '../../db/redis.js';
import { prescriptionQueries } from './prescription.sql.js';

export const PrescriptionService = {
  async getPrescriptionsByPatient(patientId) {
    const cacheKey = `prescriptions:patient:${patientId}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const { rows } = await pool.query(prescriptionQueries.getByPatientId, [patientId]);
    await redisClient.setEx(cacheKey, 60, JSON.stringify(rows));
    return rows;
  },

  async getPrescriptionsByConsultation(consultationId) {
    const cacheKey = `prescriptions:consultation:${consultationId}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const { rows } = await pool.query(prescriptionQueries.getByConsultationId, [consultationId]);
    await redisClient.setEx(cacheKey, 60, JSON.stringify(rows));
    return rows;
  },

  async addPrescription(data) {
    const { consultation_id, doctor_id, patient_id, medicine_name, dosage, duration, instructions } = data;

    const { rows } = await pool.query(prescriptionQueries.addPrescription, [
      consultation_id,
      doctor_id,
      patient_id,
      medicine_name,
      dosage,
      duration,
      instructions
    ]);

    // Invalidate cache
    await redisClient.del(`prescriptions:patient:${patient_id}`);
    await redisClient.del(`prescriptions:consultation:${consultation_id}`);

    return rows[0];
  }
};
