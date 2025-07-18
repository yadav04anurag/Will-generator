import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import willRoutes from './routes/willRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();
connectDB();
const app = express();

app.use(cors({
  origin: [process.env.Frontend_url],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/wills', willRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => res.send("Backend is running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);
