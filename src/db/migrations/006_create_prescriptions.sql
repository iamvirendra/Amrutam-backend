CREATE TABLE IF NOT EXISTS prescriptions (
  id SERIAL PRIMARY KEY,
  consultation_id INT REFERENCES consultations(id) ON DELETE CASCADE,
  doctor_id INT REFERENCES doctors(id) ON DELETE CASCADE,
  patient_id INT REFERENCES users(id) ON DELETE CASCADE,
  medicine_name VARCHAR(255) NOT NULL,
  dosage VARCHAR(100),
  duration VARCHAR(50),
  instructions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
