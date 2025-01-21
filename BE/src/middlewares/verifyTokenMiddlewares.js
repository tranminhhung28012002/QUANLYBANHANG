import jwt from "jsonwebtoken";
export const verifyTokenMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).json({ message: "Token không được cung cấp" });
  }

  jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token không hợp lệ hoặc hết hạn" });
    }

    req.user = decoded;
    next();
  });
};
