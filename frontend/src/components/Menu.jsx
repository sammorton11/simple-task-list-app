import { useState } from "react";
import { updateTask } from "../helpers/helpers";

export default function Menu({ getUserData, userTodos, setUserTodos, isMenuOpen, handleOpen  }) {
   const [order, setToggleOrder] = useState("asc");
   const token = localStorage.getItem('token');

   function toggleOrder() {
      if (order === "asc" ? setToggleOrder("desc") : setToggleOrder("asc"));
   }

   
   async function deleteAll(event) {
      event.preventDefault();

      const confirm = window.confirm('Are you sure you want to delete all completed tasks?');
      if (!confirm) {
         return;
      }

      try {
         const res = await fetch(`http://127.0.0.1:5000/todo`, {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer ' + token,
            },
         });

         if (res.ok) {
            console.log('Tasks deleted successfully');
         } else {
            console.error('Error deleting tasks:', res.statusText);
         }
      } catch (error) {
         console.error('Error:', error);
      }

      // After all deletions, refresh user data
      await getUserData(token);
   }


   function selectAllTodos() {
      fetch(`http://127.0.0.1:5000/select_all_todos`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            console.log('Task updated successfully:', data); // Log the response data
            getUserData(token);
         })
         .catch((error) => {
            console.error('Error:', error);
         });
   }
   

   function selectAll(event) {
      event.preventDefault();
      selectAllTodos();
   }


   function sortAlphabetically() {
      const sortedList = userTodos.slice().sort((a, b) => {
         const newOrder = order === "asc" ? 1 : -1;
         const taskA = a.task.toLowerCase();
         const taskB = b.task.toLowerCase();

         return newOrder * taskA.localeCompare(taskB);
      });

      setUserTodos([...sortedList]);
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

   return (
      <div className="w-full flex justify-end lg:px-10">
            <menu className={`absolute bg-green-100/[0.7] rounded-lg`}>
               <ul className={`shadow-md flex flex-col rounded-md p-2 justify-between ${isMenuOpen ? 'block' : 'hidden'} `}>
                  <li>
                     <button className='sm:text-sm md:text-md lg:text-xl p-3 sm:p-4 lg:p-5 bg-green-200 text-slate-800 rounded-lg hover:cursor-pointer border border-solid border-slate-500 border-1 w-full' onClick={handleOpen}>
                        Add Task
                     </button>
                  </li>
                  <li>
                     <button className='sm:text-sm md:text-md lg:text-xl p-3 sm:p-4 lg:p-5 bg-yellow-100 text-slate-800 rounded-lg hover:cursor-pointer border border-solid border-slate-500 border-1 w-full' onClick={(event) => selectAll(event)}>Select All</button>
                  </li>
                  <li>
                     <button className='sm:text-sm md:text-md lg:text-xl p-3 sm:p-4 lg:p-5 bg-red-300 text-slate-800 rounded-lg hover:cursor-pointer border border-solid border-slate-500 border-1 w-full' onClick={(event) => deleteAll(event)}>
                        Delete All Completed
                     </button>
                  </li>
                  <li>
                     <button id="sort-alph-button" className='sm:text-sm md:text-md lg:text-xl p-3 sm:p-4 lg:p-5 bg-blue-300 text-slate-800 rounded-lg hover:cursor-pointer border border-solid border-slate-500 border-1 w-full' onClick={sortAlphabetically}>
                        Sort Alphabetically
                     </button>
                  </li>
                  <li>
                     <button id="sort-date-button" className='sm:text-sm md:text-md lg:text-xl p-3 sm:p-4 lg:p-5 bg-blue-200 text-slate-800 rounded-lg hover:cursor-pointer border border-solid border-slate-500 border-1 w-full' onClick={sortByDate}>
                        Sort By Date
                     </button>
                  </li>
               </ul>
            </menu>
         </div>
   );
}

