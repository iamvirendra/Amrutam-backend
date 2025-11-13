CREATE TABLE IF NOT EXISTS consultations (
  id SERIAL PRIMARY KEY,
  patient_id INT REFERENCES users(id) ON DELETE CASCADE,
  doctor_id INT REFERENCES doctors(id) ON DELETE CASCADE,
  slot_id INT REFERENCES availability_slots(id),
  status VARCHAR(50) DEFAULT 'scheduled',  -- 'scheduled', 'completed', 'cancelled'
  consultation_notes TEXT,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
