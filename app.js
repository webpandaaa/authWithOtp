import express from 'express';
import {config} from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connection } from './Database/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js';
import userRouter from "./routes/userRouter.js";
import { removeUnverifiedAccounts } from './automation/removeUnverifiedAccounts.js';

export const app = express();
config({path:"./.env"});

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.use(express.json());
app.use(cookieParser()); 
app.use(express.urlencoded({extended: true}));

app.use("/user", userRouter);

removeUnverifiedAccounts();
connection();

app.use(errorMiddleware)

