const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage(imagePath, id) {
  const result = await cloudinary.uploader.upload(
    imagePath,
    {
      public_id: id,
      folder: "user_images",
    },
    function (error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    }
  );

  return result;
}

module.exports = {
  uploadImage,
};
