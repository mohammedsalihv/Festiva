import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import logger from "./utils/logger";
import errorMiddleware from "./middlewares/errorMiddleware";

import userAuthRoutes from "./Presentation/routes/user/userAuthRoutes";
import userRoutes from "./Presentation/routes/user/userRoutes";
import hostAuthRoutes from "./Presentation/routes/host/hostAuthRoutes";
import hostRoutes from "./Presentation/routes/host/hostRoutes";

import adminAuthRoutes from "./Presentation/routes/admin/adminauthRoutes";
import adminRoutes from "./Presentation/routes/admin/adminRoutes";

dotenv.config();
const app: Application = express();


app.use(
  morgan('combined',{
    stream:{
      write:(message:string) => logger.info(message.trim())
    }
  })
)

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));



// User routes
app.use("/api/auth", userAuthRoutes);
app.use("/api/user", userRoutes);

// Host routes
app.use("/api/host/auth", hostAuthRoutes);
app.use("/api/host", hostRoutes);

// Admin routes
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin", adminRoutes);


app.use(errorMiddleware);

export default app;
