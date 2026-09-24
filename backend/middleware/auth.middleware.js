import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: true, message: "Not Authorized Login Again" });
    }

    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decoded_token.id;

    next();
  } catch (error) {
    console.error("User Auth Middleware Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please login again.",
    });
  }
};

export default authUser
