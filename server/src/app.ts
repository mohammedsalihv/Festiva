import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import logger from "./utils/baseUtilities/messages/logger";
import userAuthenticationRoutes from "./adapters/routes/user/userAuthenticationRoutes";
import userRoutes from "./adapters/routes/user/userRoutes";
import userServiceRoute from "./adapters/routes/user/userServiceRoutes";
import hostAuthenticationRoutes from "./adapters/routes/host/hostAuthenticationRoutes";
import hostAccountRoutes from "./adapters/routes/host/hostAccountRoutes";
import hostRoutes from "./adapters/routes/host/hostRoutes";
import adminAuthenticationRoutes from "./adapters/routes/admin/adminAuthenticationRoutes";
import adminRoutes from "./adapters/routes/admin/adminRoutes";

dotenv.config();

const app: Application = express();

app.use(
  morgan("combined", {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  })
);

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
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
app.use(express.json({ limit: "10mb" }));


app.use("/api/user/auth", userAuthenticationRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user/service", userServiceRoute);

app.use("/api/host/auth", hostAuthenticationRoutes);
app.use("/api/host", hostRoutes);
app.use("/api/host/account", hostAccountRoutes);


app.use("/api/admin/auth", adminAuthenticationRoutes);
app.use("/api/admin", adminRoutes);

export default app;
