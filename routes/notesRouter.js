const express = require('express');
const router = express.Router()

const {
  AddNotes,
  getNotes
} = require('../controller/notesController');

router.post('/',AddNotes);
router.get('/',getNotes);

module.exports = router