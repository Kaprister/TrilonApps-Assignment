import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors(
    {
        origin: "*",
        credentials: true
    }
))

app.use(express.json())
app.use(cookieParser())


import userRouter from './routes/user.route.js'

app.use("/api/v1/users", userRouter);



export {app}