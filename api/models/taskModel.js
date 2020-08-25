const mongoose = require('mongoose');

//schema
/**
 *  id
    tittle
    description
    createdOn
    editedON
 */
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
