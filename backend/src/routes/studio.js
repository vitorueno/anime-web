const studioController = require("../controllers/studio");

const auth = require("../middlewares/auth");

const express = require("express");
const router = express.Router();

router.get("/", studioController.getAllStudios);
router.get("/:studioID", studioController.getSpecificStudio);
router.post("/", auth(), studioController.createStudio);

module.exports = router;