const express = require("express");
const auth = require("./auth");
const list = require("./list");

const router = express.Router();

router.use("/auth", auth);
router.use("/list", list);

module.exports = router;