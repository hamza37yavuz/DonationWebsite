const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  getWaterWellQuantity,
  login,
  me,
} = require("../controllers/controllers");

const { checkToken } = require("../middleware/auth");

router.route("/").get(getUsers);
router.route("/").post(createUser);
router.route("/donation").get(getWaterWellQuantity);
router.route("/login").post(login);
router.get("/me", checkToken, me);

module.exports = router;
