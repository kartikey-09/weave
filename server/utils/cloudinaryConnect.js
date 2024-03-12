const cloudinary = require('cloudinary').v2

const cloudinaryConnect = () =>{
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
    }
    catch(err)
    {
        console.log("Error while cloundinary connect",err);
    }
}

module.exports = cloudinaryConnect;