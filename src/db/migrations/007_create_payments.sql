CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  consultation_id INT REFERENCES consultations(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending',  -- 'pending', 'paid', 'failed', 'refunded'
  payment_method VARCHAR(50),
  transaction_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
