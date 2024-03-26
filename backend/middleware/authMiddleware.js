const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication failed: No token provided" });
    }

    const decodedToken = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET
    );
    const userId = decodedToken.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed: User not found" });
    }

    req.userData = { userId: decodedToken.userId, role: user.role };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Authentication failed: Invalid token" });
  }
};
