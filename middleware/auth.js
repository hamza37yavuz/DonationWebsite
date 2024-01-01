const jwt = require("jsonwebtoken");
const { dbModel } = require("../models/models");

const createToken = async (user, res) => {
  const payload = {
    sub: user.id,
    name: user.username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return res.status(200).json({
    succes: true,
    token,
  });
};

const checkToken = async (req, res, next) => {
  const headerToken =
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ");

  if (!headerToken) {
    return res.status(400).json({
      succes: false,
      error: "Invalid Session, Please Log In",
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decoded) => {
    if (error) {
      return res.status(400).json({
        succes: false,
        error: "Invalid token. auth.39",
      });
    }

    try {
      const { User } = await dbModel();
      const user = await User.findOne({
        where: {
          id: decoded.sub,
        },
      });

      if (!user) {
        return res.status(400).json({
          succes: false,
          error: "User not found.",
        });
      }

      req.user = {
        success: true,
        authorization: "success",
      };
      next();
    } catch (err) {
      console.error("Error checking user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

module.exports = {
  createToken,
  checkToken,
};
