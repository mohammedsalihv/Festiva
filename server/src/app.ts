import express, { Application } from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from 'dotenv'
import errorMiddleware from "./middlewares/errorMiddleware";
dotenv.config()

const app: Application = express();

app.use(
    cors({
      origin: process.env.FRONTEND_URL || "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    })
  );
  

app.use(cookieParser())
app.use(express.json())

app.use(errorMiddleware);

export default app