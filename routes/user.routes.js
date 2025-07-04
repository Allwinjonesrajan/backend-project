const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/auth");
const { updateUserByAdmin } = require("../controllers/user.controller");

router.put("/update/:id", auth, isAdmin, updateUserByAdmin);

module.exports = router;
