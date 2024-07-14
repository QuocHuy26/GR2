import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import hotelRoutes from './routes/hotel';
import provinceRoutes from './routes/province';
import districtRoutes from './routes/district';
import roomRoutes from './routes/room';
import bookingRoutes from './routes/booking';
require('dotenv').config();

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, '../public')));

app.use('/api/auth', authRoutes);
app.use('/api/province', provinceRoutes);
app.use('/api/district', districtRoutes);
app.use('/api/user', userRoutes);
app.use('/api/hotel', hotelRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/booking', bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
