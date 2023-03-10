import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

dotenv.config();
const cloudinaryV2 = cloudinary.v2;

cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export {cloudinaryV2};
