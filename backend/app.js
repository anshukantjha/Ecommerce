import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//  Route Imports
import productRouter from "./routes/product.route.js";
import userRouter from "./routes/user.route.js";
import orderRouter from "./routes/order.route.js";

// Route Decleration
app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);

export default app;
