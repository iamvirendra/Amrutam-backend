export const consultQueries = {
    // Book a new consultation
    createConsultation: `
    INSERT INTO consultations (patient_id, doctor_id, slot_id, status)
    VALUES ($1, $2, $3, 'scheduled')
    RETURNING *;
    `,

    // Update consultation status
    updateStatus: `
    UPDATE consultations
    SET status = $2, started_at = 
        CASE WHEN $2 = 'in_progress' THEN NOW() ELSE started_at END,
        ended_at = 
        CASE WHEN $2 = 'completed' THEN NOW() ELSE ended_at END
    WHERE id = $1
    RETURNING *;
    `,

    // Cancel consultation
    cancelConsultation: `
    UPDATE consultations
    SET status = 'cancelled'
    WHERE id = $1
    RETURNING *;
    `,

    // Get single consultation
    getConsultationById: `
    SELECT c.*, u.name AS patient_name, d.id AS doctor_id
    FROM consultations c
    JOIN users u ON u.id = c.patient_id
    JOIN doctors d ON d.id = c.doctor_id
    WHERE c.id = $1;
    `,

    // Prescription queries
    addPrescription: `
    INSERT INTO prescriptions (consultation_id, doctor_id, patient_id, medicine_name, dosage, duration, instructions)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `,

    getPrescriptionsByConsultation: `
    SELECT * FROM prescriptions
    WHERE consultation_id = $1
    ORDER BY created_at ASC;
    `
};
  