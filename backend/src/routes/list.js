const listController = require("../controllers/list");

const express = require("express");
const router = express.Router();

router.get("/", listController.getLists);
router.get("/:listID", listController.getSpecificList);
router.post("/", listController.createList);
router.delete("/:listID", listController.deleteSpecificList);
router.put("/:listID", listController.updateSpecificList);
router.post("/add/:listID", listController.addAnimesToList);
router.post("/remove/:listID", listController.removeAnimesFromList);

module.exports = router;