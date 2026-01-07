import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import compression from "compression";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(helmet());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(compression());

app.use(
    "/api",
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
    })
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
};

app.use("/api", routes);
app.use(errorHandler);

export default app;