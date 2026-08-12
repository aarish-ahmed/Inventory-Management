import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.Token;
  
    if (!token) {
      return res.status(401).json({
        message: "please login first",
      });
    }
    const userData = jwt.verify(token, process.env.JWT_SECRET);
   

    req.user = userData;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "authMiddleware error",
    });
  }
};

export default authMiddleware;
