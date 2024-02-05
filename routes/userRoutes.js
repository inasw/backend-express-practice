const express = require("express");
const router = express.Router();

const { signUp, login, getProfile } = require("../controllers/userControllers");

router.route("/login").post(login);
router.route("/signup").post(signUp);
router.route("/").get(getProfile);

module.exports = router;