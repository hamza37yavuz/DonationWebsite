const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  saveDonation,
  getWaterWellQuantity,
  login,
  me,
  getDonators,
} = require("../controllers/controllers");

const { checkToken } = require("../middleware/auth");

router.route("/").get(getUsers);
router.route("/donators").get(getDonators);
router.route("/").post(createUser);
router.route("/donation").get(getWaterWellQuantity);
router.route("/login").post(login);
router.get("/me", checkToken, me);
router.route("/donation").post(saveDonation);

module.exports = router;
