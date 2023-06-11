const genreController = require("../controllers/genre");
const auth = require("../middlewares/auth");

const express = require("express");
const router = express.Router();

router.get("/", genreController.getGenres);
router.get("/:genreID", genreController.getSpecificGenre);
router.post("/", auth(), genreController.createGenre);
router.delete("/:genreID", auth(), genreController.deleteSpecificGenre);
router.put("/:genreID", auth(), genreController.updateSpecificGenre);

module.exports = router;