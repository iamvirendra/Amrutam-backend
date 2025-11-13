export const doctorQueries = {
    getAllDoctors: `
        SELECT d.id, u.name, d.specialization, d.experience, d.consultation_fee, d.about
        FROM doctors d
        JOIN users u ON u.id = d.user_id;
    `,
    getDoctorById: `
        SELECT d.id, u.name, d.specialization, d.experience, d.consultation_fee, d.about
        FROM doctors d
        JOIN users u ON u.id = d.user_id
        WHERE d.id = $1;
    `,
    addAvailabilitySlot: `
        INSERT INTO availability_slots (doctor_id, available_date, start_time, end_time, is_booked)
        VALUES ($1, $2, $3, $4, false)
        RETURNING *;
    `,
    getAvailabilitySlots: `
        SELECT id, available_date, start_time, end_time, is_booked
        FROM availability_slots
        WHERE doctor_id = $1
        ORDER BY available_date, start_time ASC;
    `,
    registerDoctor: `
        INSERT INTO doctors (user_id, specialization, experience_years, consultation_fee, qualification, bio)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `,
    getAvailabilitySlots: `
        SELECT id, available_date, start_time, end_time, is_booked
        FROM availability_slots
        WHERE doctor_id = $1
        ORDER BY available_date, start_time ASC;
    `,
    addAvailabilitySlot: `
        INSERT INTO availability_slots (doctor_id, available_date, start_time, end_time, is_booked)
        VALUES ($1, $2, $3, $4, false)
        RETURNING *;
    `,
  };