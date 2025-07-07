import express, { Application } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import logger from "./utils/common/messages/logger";
import userAuthRoutes from "./Presentation/routes/user/userAuthRoutes";
import userRoutes from "./Presentation/routes/user/userRoutes";
import userServiceRoute from "./Presentation/routes/user/userServiceRoutes";
import hostAuthRoutes from "./Presentation/routes/host/hostAuthRoutes";
import hostAccountRoutes from "./Presentation/routes/host/hostAccountRoutes";
import hostRoutes from "./Presentation/routes/host/hostRoutes";
import adminAuthRoutes from "./Presentation/routes/admin/adminauthRoutes";
import adminRoutes from "./Presentation/routes/admin/adminRoutes";
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

const uploadsPath = path.join(__dirname, "uploads");
console.log("Serving uploads from:", uploadsPath);
app.use(
  "/uploads",
  express.static(uploadsPath, {
    setHeaders: (res) => {
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

app.use("/api/user/auth", userAuthRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user/service", userServiceRoute);

app.use("/api/host/auth", hostAuthRoutes);
app.use("/api/host", hostRoutes);
app.use("/api/host/account", hostAccountRoutes);


app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin", adminRoutes);

export default app;
