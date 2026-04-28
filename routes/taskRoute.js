const express = require('express');
const router = express.Router()

const {
  AddTask,
  getTasks,
  deleteTask,
  UpdateTask


} = require('../controller/taskController')

router.post('/',AddTask);
router.get('/',getTasks)
router.delete('/:id',deleteTask)
router.put('/:id',UpdateTask)
module.exports = router;