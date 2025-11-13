import app from './app.js';
import pool from './db/index.js';
import redisClient from './db/redis.js';

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL & Redis');

    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  } catch (err) {
    console.error(' Failed to start server:', err);
    process.exit(1);
  }
}

start();
