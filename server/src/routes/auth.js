const router = require("express").Router();
const { login, signup } = require("../controllers/auth");

router.post('/login', login);
router.post('/register', signup);

module.exports = router;
