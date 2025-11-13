CREATE TABLE IF NOT EXISTS availability_slots (
  id SERIAL PRIMARY KEY,
  doctor_id INT REFERENCES doctors(id) ON DELETE CASCADE,
  available_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_booked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
