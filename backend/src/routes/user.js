const userController = require("../controllers/user");

const express = require("express");
const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:userID", userController.getSpecificUser);
router.post("/", userController.createUser);
module.exports = router;