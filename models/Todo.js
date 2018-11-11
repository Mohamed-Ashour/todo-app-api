const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  complete: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Todo', TodoSchema);
