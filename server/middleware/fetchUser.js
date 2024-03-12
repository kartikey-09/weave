const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.fetchUser = async (req, res, next) => {
  try {
    let token = req.headers.token;
    if (!req.headers.token) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Login required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const userId = decoded._id;
    req.id = userId;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid token", error });
  }
};

