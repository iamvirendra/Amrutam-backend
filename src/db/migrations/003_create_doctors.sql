CREATE TABLE IF NOT EXISTS doctors (
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  specialization VARCHAR(100) NOT NULL,
  experience_years INT DEFAULT 0,
  consultation_fee DECIMAL(10,2) DEFAULT 0.00,
  qualification VARCHAR(255),
  bio TEXT,
  rating DECIMAL(3,2) DEFAULT 0.0,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
