import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY ,
  api_secret:process.env.CLOUDINARY_SECRET_KEY,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // uploading file
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder:"Ecommerce/avatar"
    });
    // after upload
    console.log("File uploaded sucessfully on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilePath);
    // deletes local file after sucessfully uploading on cloudinary
    return null;
  }
};

export { uploadOnCloudinary };
