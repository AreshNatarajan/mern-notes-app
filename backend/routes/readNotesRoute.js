const express = require("express");
const { readNoteController } = require("../controllers/readNoteController");
const router = express.Router();

router.route('/read').get(readNoteController);

module.exports = router