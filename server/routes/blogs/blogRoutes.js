const blogRoutes = require('express').Router();
const {fetchUser} = require('../../middleware/fetchUser');

const {
    insertNewBlog,
    fetchAllBlogs,
    deleteBlog,
    updateBlog,
    viewSingleBlog
} = require('../../controllers/blogs/blogController');

/* 1. insertNewBlog : perfromed by admin pannel : headers :- token : body :- imgUrlModelDBId (ObjectId of the ImgUrlModel document), title, date, shortDescription (String), briefDescription (String) */
/* 2. fetchAllBlogs : accessed by both admin and user pannel : query :- date, dateDescSort, pageNo, pageSize */
/* 3. deleteBlog : perfromed by admin pannel : headers :- token : params :- dbId */
/* 4. updateBlog : perfromed by admin pannel : headers :- token : params :- dbId : body :- imgUrlModelDBId (ObjectId of the ImgUrlModel document), title, date, shortDescription (String), briefDescription (String) : [send only that fields, that you want to update.] */
/* 5. viewSingleBlog : params:- dbId (Object Id) */

blogRoutes.route("/api/v1/insertNewBlog").post(fetchUser, insertNewBlog);
blogRoutes.route("/api/v1/fetchAllBlogs").get(fetchAllBlogs);
blogRoutes.route("/api/v1/deleteBlog/:dbId").delete(fetchUser, deleteBlog);
blogRoutes.route("/api/v1/updateBlog/:dbId").put(fetchUser,updateBlog);
blogRoutes.route("/api/v1/viewSingleBlog/:dbId").get(viewSingleBlog);

module.exports = blogRoutes;