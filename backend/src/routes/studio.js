const studioController = require("../controllers/studio");

const auth = require("../middlewares/auth");

const express = require("express");
const router = express.Router();

router.get("/", studioController.getAllStudios);
router.get("/:studioID", studioController.getSpecificStudio);
router.delete("/:studioID", auth(), studioController.deleteSpecificStudio);
router.put("/:studioID", auth(), studioController.updateSpecificStudio);
router.post("/", auth(), studioController.createStudio);

module.exports = router;