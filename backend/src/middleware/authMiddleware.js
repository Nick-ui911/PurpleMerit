import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    // ✅ Allow preflight requests
  if (req.method === "OPTIONS") {
    return next();
  }
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
