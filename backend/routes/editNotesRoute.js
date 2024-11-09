const express = require("express");
const { editNoteController } = require("../controllers/editNoteController");
const router = express.Router();

router.route('/edit/:id').put(editNoteController);

module.exports = router