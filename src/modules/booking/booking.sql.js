export const bookingQueries = {
    bookConsultation: `
    INSERT INTO consultations (patient_id, doctor_id, slot_id, status)
    VALUES ($1, $2, $3, 'scheduled')
    RETURNING *;
    `,
    markSlotBooked: `
    UPDATE availability_slots SET is_booked = true WHERE id = $1;
    `,
    cancelConsultation: `
    UPDATE consultations SET status = 'cancelled' WHERE id = $1 RETURNING *;
    `,
    markSlotAvailable: `
    UPDATE availability_slots SET is_booked = false WHERE id = $1;
    `
};
