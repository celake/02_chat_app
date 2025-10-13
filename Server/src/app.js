import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';

import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhose:5273",
    credentials: true,
}))


app.use("/api/auth", authRoutes);
app.use('/api/message', messageRoutes);



connectDB().then( () => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
});
