import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditTodo() {
   const { user_id, todo_id, task, completed } = useParams();
   const [formData, setFormData] = useState({task: task, completed: completed === "true"});
   const navigate = useNavigate();

   const [checked, setChecked] = useState(formData.completed);

   function handleCheck() {
      setChecked(!checked);
      setFormData({
         ...formData,
         completed: !checked,
      });
   }
   function handleTaskChange(e) {
      setFormData({
         ...formData,
         task: e.target.value,
      });
   };

   function updateTask() {
      fetch(`http://localhost:8081/api/todos/todo/${user_id}/${todo_id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            task: formData.task,
            completed: formData.completed,
         }),
      })
      .then((res) => res.json())
      .then((data) => {
         console.log('Task updated successfully:', data); // Log the response data
         navigate("/");
       })
       .catch((error) => {
         console.error('Error:', error);
       });
   }

   function cancel() {
      navigate("/");
   }

   return (
      <div
         className='container rounded-md'
         // not sure why but this is the only way I could get the form to center
         style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
         <form 
            className="w-24"
            onSubmit={(event) => {
               event.preventDefault();
               updateTask(event);
            }}>
            <label className='text-slate-500 text-xl'>Task</label>
            <div className="flex row">
               <input 
                  className="border w-32 rounded-md bg-green-200 text-slate-500" 
                  // only way to shrink the width of the input
                  style={{ width: '445px' }}
                  type="text" name="task" value={formData.task} onChange={handleTaskChange} 
               />

               <div style={{ padding: '15px' }} />

               <input className="hover:cursor-pointer accent-blue-300 w-6 transition duration-550 ease-in-out" type="checkbox" onChange={handleCheck} checked={formData.completed} />
            </div>
            <input className="text-md p-5 bg-red-300 text-slate-800 rounded-lg hover:cursor-pointer" type="button" value="Cancel" onClick={cancel} />
            <input className="text-md p-5 bg-green-300 text-slate-800 rounded-lg hover:cursor-pointer ml-5" type="submit" value="Update Task" />
         </form>
      </div>
   );
}

export default EditTodo;
