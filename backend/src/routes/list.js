const listController = require("../controllers/list");
const auth = require("../middlewares/auth");

const express = require("express");
const router = express.Router();

router.get("/", listController.getLists);
router.get("/:listID", listController.getSpecificList);
router.post("/", auth(), listController.createList);
router.delete("/:listID", auth(), listController.deleteSpecificList);
router.put("/:listID", auth(), listController.updateSpecificList);
router.post("/add/:listID", auth(), listController.addAnimesToList);
router.post("/remove/:listID", auth(), listController.removeAnimesFromList);

module.exports = router;