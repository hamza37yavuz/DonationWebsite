const jwt = require("jsonwebtoken");

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

module.exports = {
  createToken,
};
