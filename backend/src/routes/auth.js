const router = require("express").Router();
const authControllers = require("../controllers/auth");


router.post("/login", authControllers.login);
router.post("/refreshToken", authControllers.refresh);


module.exports = router;