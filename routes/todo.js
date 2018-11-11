const errors = require('restify-errors');
const Todo = require('../models/Todo');

module.exports = server => {
  // Get Todos
  server.get('/todos', async (req, res, next) => {
    try {
      const todos = await Todo.find({});
      res.send(todos);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  // Add Todo
  server.post(
    '/todos',
    async (req, res, next) => {
      const { title, complete } = req.body;

      const todo = new Todo({
        title,
        complete,
      });

      try {
        const newTodo = await todo.save();
        res.send(newTodo);
        next();
      } catch (err) {
        return next(new errors.InternalError(err.message));
      }
    }
  );

  // Update Todo
  server.put(
    '/todos/:id',
    async (req, res, next) => {
      try {
        const updatedTodo = await Todo.findOneAndUpdate(
          { _id: req.params.id },
          req.body
        );
        res.send(updatedTodo);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(
            `There is no todo with the id of ${req.params.id}`
          )
        );
      }
    }
  );

  // Delete Todo
  server.del(
    '/todos/:id',
    async (req, res, next) => {
      try {
        await Todo.findOneAndDelete({
          _id: req.params.id
        });
        res.send(204);
        next();
      } catch (err) {
        return next(
          new errors.ResourceNotFoundError(
            `There is no todo with the id of ${req.params.id}`
          )
        );
      }
    }
  );
};
