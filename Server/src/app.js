import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import errorHandler from "./middlewares/errorHandler.js";
import userRouter from "./modules/user/user.routes.js";
import authRouter from "./modules/authentication/authentication.routes.js";
import addressRouter from "./modules/address/address.routes.js"
import dotenv from 'dotenv';
dotenv.config();

const app = express();

console.log("value is ", process.env.NODE_ENV);

app.use(helmet());

let type = process.env.NODE_ENV === "development" ? "dev" : "combined";

app.use(morgan(type));

const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173"
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

app.use(compression());

app.use(
    "/api",
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 99,
    })
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", addressRouter);


app.use(errorHandler);

export default app;