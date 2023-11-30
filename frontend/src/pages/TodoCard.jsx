import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const TodoCard = ({ todo_id, user_id, task, completed, getUserData }) => {
   const [checked, setChecked] = useState(completed);
   const navigate = useNavigate();

   function deleteTask() {
      var result = confirm("Are you sure you want to delete this task?");
      if (!result) {
         return;
      } else {
         fetch(`http://localhost:8081/api/todos/todo/${user_id}/${todo_id}`, {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
         })
            .then((res) => {
               if (res.ok) {
                  getUserData(user_id);
                  console.log('Task deleted successfully');
                  // You can also remove the todo from the UI if needed
               } else {
                  console.error('Error deleting task:', res.statusText);
               }
            })
            .catch((error) => {
               console.error('Error:', error);
            });
      }
   }
   
   function updateTask() {
      handleCheck();

      fetch(`http://localhost:8081/api/todos/todo/${user_id}/${todo_id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            completed: !checked,
         }),
      })
      .then((res) => res.json())
      .then((data) => {
         console.log('Task updated successfully:', data); // Log the response data
       })
       .catch((error) => {
         console.error('Error:', error);
       });
   }

   function handleCheck() {
      setChecked(!checked);
   }

   return (
      <div className="todo-card flex p-5 bg-green-200 rounded-2xl items-center justify-between text-slate-600 shadow-2xl">
         <p className="text-grey-600 text-3xl font-medium hover:cursor-pointer" onClick={() => navigate(`/edit-todo/${user_id}/${todo_id}/${task}/${completed}`)}>{task}</p>
         <div className="p-6 flex flex-row justify-between w-1/8 p-5">
            <button className="hover:cursor-pointer p-3 mr-9 bg-red-300 rounded-lg " onClick={deleteTask}>Delete</button>
            <input className="hover:cursor-pointer accent-blue-300 w-6 transition duration-550 ease-in-out" type="checkbox" onChange={updateTask} checked={checked} />
         </div>
      </div>
   );
}
