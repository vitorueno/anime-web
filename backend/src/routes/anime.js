const animeController = require("../controllers/anime");

const express = require("express");
const router = express.Router();

router.get("/", animeController.getAnimes);
router.post("/", animeController.createAnime);
router.get("/:animeID", animeController.getSpecificAnime);
router.delete("/:animeID", animeController.deleteSpecificAnime);
router.put("/:animeID", animeController.updateSpecificAnime);

module.exports = router;
