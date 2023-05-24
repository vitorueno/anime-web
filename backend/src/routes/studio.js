const studioController = require("../controllers/studio");

const express = require("express");
const router = express.Router();

router.get("/", studioController.getAllStudios);
router.get("/:studioID", studioController.getSpecificStudio);
router.post("/", studioController.createStudio);

module.exports = router;