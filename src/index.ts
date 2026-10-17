import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import mongoose from 'mongoose';

import authRouter from './routes/auth';
import userRouter from './routes/userRoutes';
import reviewRouter from './routes/reviewRoutes';
import bookRouter from './routes/bookRoutes';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:4000',
    credentials: true,
  })
);

// Serve the public folder locally
app.use(express.static(path.join(process.cwd(), 'public')));

// API routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/books', bookRouter);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL || '')
  .then(() => {
    console.log('Connected to MöngoDB');
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });

// Export the Express app for Vercel
export default app;

// Start the server locally during development
if (!process.env.VERCEL) {
  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}
