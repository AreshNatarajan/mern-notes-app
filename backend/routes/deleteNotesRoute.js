const express = require("express");
const { deleteNoteController } = require("../controllers/deleteNoteController");
const router = express.Router();

router.route('/delete/:id').delete(deleteNoteController);

module.exports = router