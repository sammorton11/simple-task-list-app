import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export const TodoCard = ({ todo_id, user_id, task, description, completed, created_at, updated_at, getUserData }) => {
   const [checked, setChecked] = useState(completed);
   const navigate = useNavigate();

   const colors = ["bg-green-200/[0.5]"];
   const randomColorClass = useMemo(() => {
      return colors[Math.floor(Math.random() * colors.length)];
   }, []); 

   const created_at_date = new Date(created_at);
   
   const formatted_created_at = created_at_date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'numeric',
      weekday: 'long',
      year: 'numeric',
   });

   const updated_at_date = new Date(updated_at);
   const formatted_updated_at = updated_at_date.toLocaleDateString('en-US', { 
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'numeric', 
      weekday: 'long', 
      year: 'numeric', 
   });

   
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
      <div className={`flex flex-col w-full sm:text-sm md:text-md lg:text-xl p-5 rounded-2xl text-slate-600 shadow-2xl border border-solid border-slate-900 border-1 ${randomColorClass}`}>
         <div className="flex items-center justify-between w-full pb-5 border-b border-gray-300">
            <p className="text-gray-600 text-xl hover:cursor-pointer hover:text-blue-500 text-ellipse max-w-md" 
               onClick={() =>  navigate('/edit-todo', { state: {user_id, todo_id, task, description, formatted_created_at, formatted_updated_at, completed } })}>
               {task}
            </p>
            <input
               className="cursor-pointer w-4 h-4 text-blue-300 transition duration-550 ease-in-out"
               type="checkbox"
               onChange={updateTask}
               checked={checked}
            />
         </div>
         <p className="description-text text-grey-600 text-lg">{description}</p>
      </div>
   );
}
