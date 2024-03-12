require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb" }));

// Uncaught Exception Error
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutdown the server due to Uncaught Exception`);
  process.exit(1);
});

// Connect Database
const dbConnect = require("./database/dbConnect");
dbConnect();

// file upload
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// cloudinary connection
const cloudinaryConnect = require("./utils/cloudinaryConnect");
cloudinaryConnect();

// Routers
app.get("/", (req, res) => {
  return res.status(200).json({ success: true, message: "API Works" });
});

// admins routes
const adminsAuthRoutes = require("./routes/admin/adminsAuthRoutes");
app.use(adminsAuthRoutes);

// other Imp routes [img upload & destroy, pdf upload & destroy]
const otherImpRoutes = require("./routes/others/otherImpRoutes");
app.use(otherImpRoutes);

// blog handling routes
const blogRoutes = require("./routes/blogs/blogRoutes");
app.use(blogRoutes);

// user handling routes
const userAuthRoutes = require("./routes/user/userAuthRoutes");
app.use(userAuthRoutes);

// contact routes
const contactRoutes = require("./routes/contact/contactRoutes");
app.use(contactRoutes);

// clini servcie handling
const clinicRoutes = require("./routes/clinic/clinicRoutes");
app.use(clinicRoutes);

// careers
const availablePositionRoutes = require("./routes/careers/availablePositionRoutes");
app.use(availablePositionRoutes);

// Navbar Slider Text
const navbarSliderTextRoutes = require("./routes/navbarSliderText/navbarSliderTextroutes");
app.use(navbarSliderTextRoutes);

// Navbar Center Slider Text
const navbarCenterSliderTextRoutes = require("./routes/navbarCenterSliderRoutes/navbarCenterSliderRoutes");
app.use(navbarCenterSliderTextRoutes);

// Gallery System
const galleryRoutes = require("./routes/gallery/galleryRoutes");
app.use(galleryRoutes);

const testimonialRoutes = require("./routes/testimonials/testimonialRoutes");
app.use(testimonialRoutes);

const workforce = require("./routes/workforce/workforce")
app.use(workforce);

const newsNotificationRoutes = require("./routes/newsNotification/newsNotificationRoutes");
app.use(newsNotificationRoutes);

//phonepay route
const phonepeRoute = require("./routes/phonepe/phonepeRoute");
app.use(phonepeRoute);

const server = app.listen(process.env.PORT, (e) => {
  console.log(
    `server running at https://${process.env.Host}:${process.env.PORT}`
  );
});

// Error Handler
app.use(require("./middleware/errors"));

// Unhandled Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutdown the server due to Unhandled Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
