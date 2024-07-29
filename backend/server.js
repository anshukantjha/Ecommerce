import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import { v2 as cloudinary } from "cloudinary";

// uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Closing server due to Uncaught Exception");
  process.exit(1);
});

dotenv.config({ path: "backend/config/.env" });
const port = process.env.PORT || 4000;
// connecting to DB
connectDB();

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY ,
  api_secret:process.env.CLOUDINARY_SECRET_KEY,
});


const server = app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

app.get("/test",(req,res)=>{
  res.json({
    message:"Working Fine"
  })
})


// unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Closing server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});

