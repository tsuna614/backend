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

async function uploadVideo(videoPath, id) {
  const result = await cloudinary.uploader.upload(
    videoPath,
    {
      public_id: id,
      resource_type: "video",
      folder: "user_videos",
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

async function deleteItem(id, resourceType) {
  const result = await cloudinary.uploader.destroy(
    id,
    { resource_type: resourceType },
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
  uploadVideo,
  deleteItem,
};
