import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import doctorRoutes from './modules/doctors/doctor.routes.js';
import bookingRoutes from './modules/booking/booking.routes.js';
import consultRoutes from './modules/consultations/consult.routes.js';
import prescriptionRoutes from './modules/prescription/prescription.routes.js';

const app = express();
app.use(express.json());


app.use('/api/doctors', doctorRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/consultations', consultRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

export default app;
