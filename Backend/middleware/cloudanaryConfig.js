const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name : process.env.CLOUDNAME,
    api_key : process.env.CLOUD_APIKEY,
    api_secret : process.env.CLOUD_APISECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'LMS',
      allowedFormates:["png" , "jpg" , "jpeg"]
    },
});

const videoStorage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params: {
      folder: 'LMS',
      resource_type: 'video', // ✅ Important!
      allowed_formats: ['mp4', 'mov', 'avi']
    }
  });

module.exports = {
    cloudinary , storage , videoStorage
}