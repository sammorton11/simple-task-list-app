import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TodoCard } from '../components/TodoCard';
import AddTaskDialog from '../components/AddTaskDialog';

export const Home = () => {
   const location = useLocation();
   const navigate = useNavigate();

   const email = location.state ? location.state.email : '';
   const id = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : { id: null };
   const [order, setToggleOrder] = useState("asc");
   
   const [userTodos, setUserTodos] = useState([]); 
   const [searchText, setSearchText] = useState('');
   const [formData, setFormData] = useState({task: '', description: '', completed: false});
   const [isOpened, setIsOpened] = useState(false);

   const [isMenuOpen, setMenuOpen] = useState(false);

   const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
   };


   useEffect(() => {
      getUserData(id);
   }, []);


   useEffect(() => {
      if (id.id !== null) {
         getUserData(id);
      } else {
         navigate('/login');
      }
   }, []);


   function toggleOrder() {
      if (order === "asc" ? setToggleOrder("desc") : setToggleOrder("asc"));
   }

   function filterTodos(event) {
      event.preventDefault();
      if (searchText === '') {
         setUserTodos(userTodos);
         getUserData(id);
         return;
      }
      const newTodos = userTodos.filter((todo) => todo.task.includes(searchText));
      setUserTodos(newTodos);
   }

   function sortAlphabetically() {
      const sortedList = userTodos.slice().sort((a, b) => {
         const newOrder = order === "asc" ? 1 : -1;
         const taskA = a.task.toLowerCase();
         const taskB = b.task.toLowerCase();

         return newOrder * taskA.localeCompare(taskB);
      });

      setUserTodos([...sortedList]); // Create a new array to trigger a re-render
      toggleOrder();
   }

   function sortByDate() {
      const sorted = userTodos.sort((a, b) => {
         const newOrder = order === "asc" ? 1 : -1;
         const dateA = new Date(a.created_at);
         const dateB = new Date(b.created_at);

         return newOrder * (dateB - dateA);
      });

      setUserTodos([...sorted]);
      toggleOrder();
   }
   
   async function getUserData(id) {
      try {
         const response = await fetch(`http://localhost:8081/api/todos/todo/${id}`, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }

         const data = await response.json();
         setUserTodos(data);
      } catch (error) {
         console.error('Error:', error);
      }
   }

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
            description: formData.description,
         }),
      })
         .then((res) => res.json())
         .then((data) => {
            console.log('Task added successfully:', data); // Log the response data
            console.log(formData);
            setFormData({ task: '', description: '', completed: false });
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
      <div>
         <AddTaskDialog
            isOpened={isOpened}
            handleOpen={handleOpen}
            addTask={addTask}
            formData={formData}
            setFormData={setFormData}
         />
         <div className='bg-slate-600 align-self-center border border-blue-800 mb-10 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center sm:text-sm md:text-lg lg:text-xl shadow-md w-full'>
            <div className='mb-2 sm:mb-0 w-full'>
               <h2 className='p-2 text-xl sm:text-xl md:text-4xl lg:text-5xl text-green-200'>
                  Tasks
               </h2>
               <p className='p-2 text-green-200 text-md'>
                  Welcome: {email}
               </p>
            </div>
            <div className='w-full justify-center align-center sm:text-sm md:text-md lg:text-xl'>
               <form className='flex flex-col sm:flex-row lg:flex-row py-5 w-full justify-center'>
                  <input className='w-full  bg-slate-200 p-2 bg-green-300 text-slate-800 rounded-lg hover:cursor-pointer' onChange={(event) => setSearchText(event.target.value)} placeholder='Search...' />
                  <div className="flex pt-5 sm:pt-0">
                     <button className='rounded-5px ml-10 font-bold text-uppercase text-slate-200' onClick={(e) => filterTodos(e)}>Search</button>
                     <input className='rounded-5px ml-10 font-bold text-uppercase text-slate-200 hover:cursor-pointer' type="reset" defaultValue="Reset" />
                  </div>
               </form>
            </div>
         </div>
         <div className="w-full flex justify-end">
            <button
               className='lg:w-1/6 sm:w-full sm:text-sm md:text-md lg:text-xl p-3 border border-solid border-slate-500 border-1 bg-red-200 text-slate-800 rounded-lg hover:cursor-pointer'
               onClick={toggleMenu}
            >
               Actions
            </button>
         </div>
         <div className="w-full flex justify-end lg:px-24">
            <menu  className={`mt-5 lg:absolute sm:w-1/4 w-full bg-green-100/[0.7] rounded-lg`}>
               <ul className={`shadow-md flex flex-col rounded-md p-2 justify-between ${isMenuOpen ? 'block' : 'hidden'} w-full md:w-full`}>
                  <li>
                     <button className='sm:text-sm md:text-md lg:text-xl p-3 sm:p-4 lg:p-5 bg-green-200 text-slate-800 rounded-lg hover:cursor-pointer border border-solid border-slate-500 border-1 w-full' onClick={handleOpen}>
                        Add Task
                     </button>
                  </li>
                  <li>
                     <button className='sm:text-sm md:text-md lg:text-xl p-3 sm:p-4 lg:p-5 bg-red-300 text-slate-800 rounded-lg hover:cursor-pointer border border-solid border-slate-500 border-1 w-full' onClick={deleteAll}>
                        Delete All Completed
                     </button>
                  </li>
                  <li>
                     <button id="sort-alph-button" className='sm:text-sm md:text-md lg:text-xl p-3 sm:p-4 lg:p-5 bg-blue-300 text-slate-800 rounded-lg hover:cursor-pointer border border-solid border-slate-500 border-1 w-full' onClick={sortAlphabetically}>
                        Sort Alphabetically
                     </button>
                  </li>
                  <li>
                     <button id="sort-date-button" className='sm:text-sm md:text-md lg:text-xl p-3 sm:p-4 lg:p-5 bg-blue-300 text-slate-800 rounded-lg hover:cursor-pointer border border-solid border-slate-500 border-1 w-full' onClick={sortByDate}>
                        Sort By Date
                     </button>
                  </li>
               </ul>
            </menu>
         </div>
         <ul className='md:p-10 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'>
            {
               userTodos.map((todo, index) => (
                  <li key={todo.id}>
                     <TodoCard
                        todo_id={todo.id}
                        user_id={id}
                        task={todo.task}
                        description={todo.description}
                        completed={todo.completed}
                        getUserData={getUserData}
                        created_at={todo.created_at}
                        updated_at={todo.updated_at}
                     />
                  </li>
               ))
            }
         </ul>
      </div>
   );
}
