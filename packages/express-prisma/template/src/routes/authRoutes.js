const express = require('express');
const router = express.Router();
const authContoller = require("../controllers/authController");

const { verifyToken } = require('../middleware/authMiddleware'); // Assuming you have authentication middleware

router.post("/login", authContoller.login);

router.post("/logout", verifyToken, authContoller.logout);


module.exports = router;
