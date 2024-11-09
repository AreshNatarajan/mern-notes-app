const express = require("express");
const { createNoteController } = require("../controllers/createNoteController");
const router = express.Router();

router.route('/post').post(createNoteController);

module.exports = router