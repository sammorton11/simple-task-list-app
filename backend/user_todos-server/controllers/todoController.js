const db = require('../models');
const Todos = db.todos;

async function getAllTodos(req, res) {
   try {
      const { user_id } = req.params;
      const todos = await Todos.findAll({
         where: {
            user_id: user_id,
         }
      }); 
      console.log(todos);
      return res.status(200).json(todos);

   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: `Error retrieving todos: ${error}` });
   }
}

async function getTodoById(res, req) {
   const { id, user_id } = req.params;
   try {
      const todo = await Todos.findOne(
         { where: { id: id, user_id: user_id } }
      );
      console.log(todo);
      return res.status(200).json(todo);
   } catch (error) {
      return res.status(500).json({message: "Error retrieving todo"});
   }
}

async function insertTodo(req, res) {
   try {
      const { user_id } = req.params;
      const { task, completed } = req.body;
      const data = {
         user_id,
         task,
         completed,
      }
      const todo = await Todos.create(data)
      console.log(todo);
               
      return res.status(201).send(todo);
   } catch (error) {
      console.log(error);
      return res.status(500).json({message: `Error creating todo ${error}`});
   }
} 

async function updateTodo(req, res) {
   const { user_id, id  } = req.params;

   // add the todo data to the request body when we have the update form ready
   const { task, completed } = req.body;

   const data = {
      task,
      completed,
   }

   try {

      const todo = await Todos.findOne(
         { where: { id: id, user_id: user_id } }
      );

      if (!todo) {
         return res.status(404).json({ message: "Todo not found" });
      }
      
      if (data.task) todo.task = data.task;
      todo.completed = data.completed;

      todo.changed('task', true);
      todo.changed('completed', true);

      await todo.save();

      return res.status(201).send(todo);

   } catch (error) {
      console.log(error);
      return res.status(500).json({message: `Error updating todo: ${error}`});
   }
}

async function deleteTodo(req, res) {
   try {
      const { id, user_id } = req.params;
      const todo = await Todos.findOne({ where: { id: id, user_id: user_id } });

      if (!todo) {
         return res.status(404).json({ message: "Todo not found" });
      }
      await todo.destroy();

      return res.status(200).json({ message: "Todo deleted" });

   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: `Error deleting todo ${error}` });
   }
}

async function deleteAllTodos(req, res) {
   try {
      const { user_id } = req.params;
      const todos = await Todos.findAll({
         where: {
            user_id: user_id,
            completed: true,
         }
      }); 
      if (!todos) {
         return res.status(404).json({ message: "Todos not found" });
      }
      todos.forEach(todo => {
         todo.destroy();
      });
      return res.status(201).json({message: "All todos deleted"});
   } catch (error) {
      return res.status(500).json({message: `Error deleting todos ${error}`});
   }
}

module.exports = {
   getAllTodos,
   insertTodo,
   updateTodo,
   getTodoById,
   deleteTodo,
   deleteAllTodos,
}

