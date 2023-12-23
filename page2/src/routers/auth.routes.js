const router = require("express").Router()
const {login, register, donation} = require("../controllers/auth.controller")

router.post("/login", login)

router.post("/register", register)

router.post("/donation", donation)

module.exports = router