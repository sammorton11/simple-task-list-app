import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "./Checkbox";

export const TodoCard = ({ todo_id, task, completed, description, created_at, updated_at }) => {

   const navigate = useNavigate();
   const token = localStorage.getItem('token');

   // This was just a test. May add more colors later.
   const colors = ["bg-green-200/[0.5]"];
   const randomColorClass = useMemo(() => {
      return colors[Math.floor(Math.random() * colors.length)];
   }, []); 


   // Converting the dates to a more readable format. 
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
   

   return (
      <div className={`flex flex-col w-full sm:text-sm md:text-md lg:text-xl p-5 rounded-2xl text-slate-600 shadow-2xl border border-solid border-slate-900 border-1 ${randomColorClass}`}>
         <div className="flex items-center justify-between w-full pb-5 border-b border-gray-300">
            <p className="text-gray-600 text-xl hover:cursor-pointer hover:text-blue-500 text-ellipse max-w-md"
               onClick={() => navigate('/edit-todo', {
                  state: {
                     todo_id,
                     task,
                     description,
                     formatted_created_at,
                     formatted_updated_at,
                  }
               })}>
               {task}
            </p>
            <Checkbox 
               task={task} 
               description={description} 
               todo_id={todo_id} 
               checked={completed} 
            />
         </div>
         <p className="description-text text-grey-600 text-lg">{description}</p>
      </div>
   );
}
