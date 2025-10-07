import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);


connectDB().then( () => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
});
