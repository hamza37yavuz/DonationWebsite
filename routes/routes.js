const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  getWaterWellQuantity,
  login,
} = require("../controllers/controllers");

router.route("/").get(getUsers);
router.route("/").post(createUser);
router.route("/donation").get(getWaterWellQuantity);
router.route("/login").post(login);

module.exports = router;
