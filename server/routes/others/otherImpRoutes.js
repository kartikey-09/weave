const otherImpRoutes = require('express').Router();
const {fetchUser} = require('../../middleware/fetchUser');
const {
    uploadImages,
    destroyImages,
    findAllImgUrlModelObject,
    listNewImgLink,
    fetchAllImgLink,
    deleteImgLink
} = require('../../controllers/others/otherImpController');

/* 1. uploadImages : for uploading the images on cloudinary : perform by admin pannel : req :- req.files.images */
/* 2. destroyImages : for destroying the images that is already uploaded on clodinary : perfrom by admin pannel : params :- dbId.
(server first find the object (document) from database that contain urls of the images and then find publicId by extracting url one by one, after that it destroy that images.) */
/* 3. Find all image link object : perform by admin pannel : query :- isCurrentlyUsed (Boolean), pageNo (Number), pageSize (Number)
 */
otherImpRoutes.route("/api/v1/uploadImages").post(uploadImages);
otherImpRoutes.route("/api/v1/destroyImages/:dbId").delete(fetchUser, destroyImages);
otherImpRoutes.route("/api/v1/findAllImgUrlModelObject").get(fetchUser,findAllImgUrlModelObject);

/* ----------------------------------------------------------Img Link Handling for Slider and Gallery----------------------------------
1. listNewImgLink : admin pannel : headers :- token : body :- imgUrlModelDBId (ObjectId of the ImgUrlModel document), category (enum:["slider", "gallery"])
2. fetchAllImgLink : query :- pageNo, pageSize, category (String, enum:["slider", "gallery"]), dateDescSort(Boolean)
3. deleteImgLink : admin pannel : headers :- token : params :- dbId (Object Id)
 */
otherImpRoutes.route("/api/v1/listNewImgLink").post(fetchUser,listNewImgLink);
otherImpRoutes.route("/api/v1/fetchAllImgLink").get(fetchAllImgLink);
otherImpRoutes.route("/api/v1/deleteImgLink/:dbId").delete(fetchUser, deleteImgLink);


module.exports = otherImpRoutes;