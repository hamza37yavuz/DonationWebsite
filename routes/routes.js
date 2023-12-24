const express = require("express");
const router = express.Router();

const { getUsers } = require("../controllers/controllers");

router.route("/").get(getUsers);

module.exports = router;
