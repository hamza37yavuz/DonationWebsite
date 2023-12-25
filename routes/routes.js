const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  getWaterWellQuantity,
} = require("../controllers/controllers");

router.route("/").get(getUsers);
router.route("/").post(createUser);
router.route("/donation").get(getWaterWellQuantity);

module.exports = router;
