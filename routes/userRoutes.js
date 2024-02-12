const express = require("express");
const router = express.Router();
const {protect} = require('../middleware/authMiddleware')

const { register, login, getProfile } = require("../controllers/userControllers");

// router.route("/").post(register);
// router.route("/login").post(login);
// router.route("/profile").get(getProfile);
router.post("/",register)
router.post("/login",login)
router.get("/profile",protect,getProfile)

module.exports = router;