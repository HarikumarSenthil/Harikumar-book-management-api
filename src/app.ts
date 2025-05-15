import express from 'express';
import { config } from './config/environment';
import bookRoutes from './routes/bookRoutes';
import { logger } from './config/morgan';
import { errorHandler } from './middleware/errorHandler';
import connectDB from './config/db'; 

const app = express();

// Middleware setup
app.use(express.json());
app.use(logger);
app.use(errorHandler);

// Connect to database
connectDB();

// Set up routes
app.use('', bookRoutes);

// Start server
const PORT = config.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
