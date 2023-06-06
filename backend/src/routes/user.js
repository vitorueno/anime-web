const userController = require("../controllers/user");

const express = require("express");
const router = express.Router();

router.get("/", userController.getUsers);
router.get("/:userID", userController.getSpecificUser);
router.post("/", userController.createUser);
router.delete("/:userID", userController.deleteSpecificUser);
router.put("/:userID", userController.updateSpecificUser);
router.get("/admin/:userID", userController.toggleAdmin);

module.exports = router;