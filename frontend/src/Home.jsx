import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TodoCard } from './pages/TodoCard';
import AddTaskDialog from './components/AddTaskDialog';

export const Home = () => {
   const location = useLocation();
   const email = location.state ? location.state.email : '';
   const id = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : { id: null };
   const [userTodos, setUserTodos] = useState([]); 
   const [formData, setFormData] = useState({task: '', completed: false});
   const [isOpened, setIsOpened] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      if (!id || id === null) {
         alert('You must be logged in to view this page');
         navigate('/login');
      }
      getUserData(id);
   }, []);

   function getUserData(id) {
      fetch(`http://localhost:8081/api/todos/todo/${id}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      })
      .then((response) => response.json())
      .then((data) => {
         setUserTodos(data);
         console.log('User data Success:', data);
      });
   }

   /* Belongs in Add Task page or component*/
   function addTask(event) {
      event.preventDefault();

      fetch(`http://localhost:8081/api/todos/todo/${id}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            user_id: id,
            task: formData.task,
            completed: formData.completed,
         }),
      })
         .then((res) => res.json())
         .then((data) => {
            console.log('Task added successfully:', data); // Log the response data
            console.log(formData);
            setFormData({ task: '', completed: false });
            getUserData(id);
         })
         .catch((error) => {
            console.error('Error:', error);
         });
   }

   function deleteAll() {
      var result = confirm("Delete all completed tasks?");
      if (!result) {
         return;
      } else {
         fetch(`http://localhost:8081/api/todos/todo/${id}`, {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
         })
            .then((res) =>
               console.log(res.json()),
            )
            .then((data) => {
               alert('Task deleted successfully:', data); 
               getUserData(id);
            })
            .catch((error) => {
               console.error('Error:', error);
            });
      }
   }

   const handleOpen = () => {
      setIsOpened(!isOpened);
   }

   return (
      <div className='p-10'>
         <AddTaskDialog 
            isOpened={isOpened} 
            handleOpen={handleOpen} 
            addTask={addTask} 
            formData={formData} 
            setFormData={setFormData} 
         /> 
         <div className='task-list-controls rounded-xl p-10 flex justify-between items-center'>
            <div>
               <h1 className='text-5xl pb-2 text-green-200'>
                  Task List
               </h1>
               <p className='text-2xl text-green-200'>
                  Welcome!: {email}
               </p>
            </div>
            <div>
               <input className='text-xl p-5 mb-0.5 bg-green-300 text-slate-800 rounded-lg hover:cursor-pointer' type="button" value="Add Task" onClick={handleOpen} />
               <button className='text-xl ml-5 p-5 mb-0.5 bg-red-300 text-slate-800 rounded-lg hover:cursor-pointer' onClick={deleteAll}>Clear Completed Tasks</button>
            </div>
         </div>
         <ul className='p-10'>
            {
               userTodos.map((todo) => {
                  return (
                     <li key={todo.id}>
                        <TodoCard
                           todo_id={todo.id}
                           user_id={id}
                           task={todo.task}
                           completed={todo.completed}
                           getUserData={getUserData}
                        />
                        <div style={{ padding: '10px' }} />
                     </li>
                  );
               }, [])
            }
         </ul>
      </div>
   );
}
