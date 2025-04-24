import express, { Application } from "express";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import cors from "cors";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/errorMiddleware";
import userRoutes from "./api/routes/userRoutes";
import hostRoutes from "./api/routes/hostRoutes";

dotenv.config();

const app: Application = express();

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", userRoutes);
app.use("/api/host/auth" , hostRoutes)
app.use(errorMiddleware);

export default app;
