'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

exports.list_all_tasks = function (req, res) {
  Task.find({})
    .then(tasks => res.json(tasks))
    .catch(err => res.status(500).send(err));
};





exports.create_a_task = function (req, res) {
  const new_task = new Task(req.body);
  
  new_task.save()
    .then(task => res.json(task))
    .catch(err => res.status(500).send(err));
};



// Leer una tarea
exports.read_a_task = function (req, res) {
  Task.findById(req.params.taskId)
    .then(task => {
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    })
    .catch(err => res.status(500).send(err));
};

// Actualizar una tarea
exports.update_a_task = function (req, res) {
  Task.findOneAndUpdate(
    { _id: req.params.taskId },
    req.body,
    { new: true }
  )
    .then(task => {
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    })
    .catch(err => res.status(500).send(err));
};

// Eliminar una tarea
exports.delete_a_task = function (req, res) {
  Task.findByIdAndDelete(req.params.taskId)
    .then(task => {
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task successfully deleted' });
    })
    .catch(err => res.status(500).send(err));
};
