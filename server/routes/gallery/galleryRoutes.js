const galleryRoutes = require('express').Router();
const { fetchUser } = require('../../middleware/fetchUser');
const { uploadImgOnGallery, getAllGalleryData, getSingleGalleryData, getSingleBatchData, deleteSingleImgFromBatch, deleteSingleBatch } = require('../../controllers/gallery/galleryController')

galleryRoutes.route('/api/v1/uploadImgOnGallery').post(fetchUser, uploadImgOnGallery);
galleryRoutes.route('/api/v1/getAllGalleryData').get(getAllGalleryData);
galleryRoutes.route('/api/v1/getSingleGalleryData').get(getSingleGalleryData);
galleryRoutes.route('/api/v1/getSingleBatchData/:batchId').get(getSingleBatchData);
galleryRoutes.route('/api/v1/deleteSingleImgFromBatch/:batchId/:imgUrlToDelete').delete(deleteSingleImgFromBatch);
galleryRoutes.route('/api/v1/deleteSingleBatch/:batchId').delete(deleteSingleBatch);

module.exports = galleryRoutes;