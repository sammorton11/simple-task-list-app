const express = require('express');
const controller = require('../controllers/todoController');
const { checkAuthorization } = require('../middleware/todoMiddleware');

const { 
   getAllTodos, 
   insertTodo, 
   updateTodo,
   getTodoById,
   deleteTodo,
   deleteAllTodos,
} = controller;

const router = express.Router();

router.get('/todo/:user_id', getAllTodos);
router.post('/todo/:user_id',  insertTodo);
router.put('/todo/:user_id/:id', updateTodo);
router.get('/todo/:user_id/:id', getTodoById);
router.delete('/todo/:user_id/:id', deleteTodo);
router.delete('/todo/:user_id', deleteAllTodos);

module.exports = router;
