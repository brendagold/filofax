const express = require('express');
const taskController = require('../controllers/taskController');

//INITIALIZE A NEW ROUTER
const router = express.Router();

router.get('/', (_, res) => {
  res.send('Your Express app is ready');
});

router.route('/contents').get(taskController.getTasks);
router.route('/newentry').post(taskController.createTask);
router
  .route('/content/:id')
  .get(taskController.getSingleTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
