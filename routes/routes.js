const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  login,
  me,
  saveDonation,
  getWaterWellQuantity,
} = require("../controllers/controllers");

const { checkToken } = require("../middleware/auth");

router.route("/").get(getUsers);
router.route("/").post(createUser);
router.route("/donation").get(getWaterWellQuantity);
router.route("/login").post(login);
router.route("/donation").post(saveDonation);
router.get("/me", checkToken, me);

module.exports = router;
