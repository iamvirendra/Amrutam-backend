export const prescriptionQueries = {
    getByPatientId: `
        SELECT p.*
        FROM prescriptions p
        WHERE p.patient_id = $1
        ORDER BY p.created_at DESC;
    `,
    
    getByConsultationId: `
        SELECT p.*
        FROM prescriptions p
        WHERE p.consultation_id = $1
        ORDER BY p.created_at DESC;
    `,

    addPrescription: `
        INSERT INTO prescriptions (
            consultation_id, doctor_id, patient_id, medicine_name, dosage, duration, instructions
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `
};
  