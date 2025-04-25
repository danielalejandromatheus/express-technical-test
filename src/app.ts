import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './loaders/db';
import { apiLimiter } from './middlewares/rate-limiter';
import routes from './routes';
import { corsOptions } from './config/cors';
import { PORT } from './consts/env';
import { HttpExceptionHandler } from './middlewares/http-exception-handler';
import { basicSanitize } from './middlewares/basic-sanitize';
import { NotFoundException } from './utils/exceptions/http.exception';
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(apiLimiter);

connectDB();
app.use(basicSanitize);

app.use('/api', routes);
app.use(/.*/, (req, res) => {
  throw new NotFoundException('Route not found');
});
app.use(HttpExceptionHandler);
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
