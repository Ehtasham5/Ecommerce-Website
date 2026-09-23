import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // FIX 1: Extract specifically the 'token' from headers
    const { token } = req.headers; 
  
    if (!token) {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }
  
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
  
    // FIX 2: Use ADMIN_PASSWORD to match the controller logic
    if (decoded_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(403).json({
        success: false,
        message: "Not Authorized. Invalid Admin Token.",
      });
    }
  
    next();
  } catch (error) {
    console.error("Admin Auth Middleware Error:", error);
    return res.status(401).json({ 
      success: false, 
      message: "Invalid or expired token. Please login again." 
    });
  }
};

export default adminAuth;