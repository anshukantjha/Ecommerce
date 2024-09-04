import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
dotenv.config({ path: "backend/config/.env" });


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//  Route Imports
import productRouter from "./routes/product.route.js";
import userRouter from "./routes/user.route.js";
import orderRouter from "./routes/order.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import paymentRouter from './routes/payment.route.js'

// Route Decleration
app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", paymentRouter);

app.use("/api/v1", errorMiddleware)
export default app;
