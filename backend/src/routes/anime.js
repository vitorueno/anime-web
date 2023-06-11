const animeController = require("../controllers/anime");
const auth = require("../middlewares/auth");

const express = require("express");
const router = express.Router();

router.get("/", animeController.getAnimes);
router.post("/", auth(), animeController.createAnime);
router.get("/:animeID", animeController.getSpecificAnime);
router.delete("/:animeID", auth(), animeController.deleteSpecificAnime);
router.put("/:animeID", auth(), animeController.updateSpecificAnime);

module.exports = router;
