const genreController = require("../controllers/genre");

const express = require("express");
const router = express.Router();

router.get("/", genreController.getGenres);
router.get("/:genreID", genreController.getSpecificGenre);
router.post("/", genreController.createGenre);
router.delete("/:genreID", genreController.deleteSpecificGenre);
router.put("/:genreID", genreController.updateSpecificGenre);

module.exports = router;