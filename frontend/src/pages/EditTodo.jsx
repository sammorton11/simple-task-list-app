import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditTodo() {
   const location = useLocation();
   const { user_id, todo_id, task, description, formatted_created_at, formatted_updated_at, completed } = location.state || {};
   const [formData, setFormData] = useState({
      task: task, 
      description: description, 
      completed: completed === "true"
   });

   const navigate = useNavigate();
   const [checked, setChecked] = useState(formData.completed);

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
               } else {
                  console.error('Error deleting task:', res.statusText);
               }
            })
            .catch((error) => {
               console.error('Error:', error);
            });
      }
   }

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
   function handleDescriptionChange(e) {
      setFormData({
         ...formData,
         description: e.target.value,
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
            description: formData.description,
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
      <div>
         <form
            onSubmit={(event) => {
               event.preventDefault();
               updateTask(event);
            }}
         >
            <h1 className='text-slate-500 text-3xl mb-5'>Update Task</h1>
            <div className="flex flex-row">
               <input
                  className="border w-32 rounded-md bg-green-200 text-slate-800"
                  type="text" name="task" value={formData.task} onChange={handleTaskChange}
               />
               <div style={{ padding: '15px' }} />
               <input className="hover:cursor-pointer accent-blue-300 w-6 transition duration-550 ease-in-out" type="checkbox" onChange={handleCheck} checked={formData.completed} />
               <button className="text-3xl hover:cursor-pointer p-5 text-slate-700 rounded-lg" onClick={deleteTask}>
                  <i className="fa fa-trash-o "></i>
               </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
               <textarea
                  className="w-full h-full rounded-md bg-green-200 text-slate-800 p-5 mb-10 border border-slate-500 border-8"
                  style={{
                     paddingBottom: '100px',
                     border: '1px solid #000000',
                     borderRadius: '0.375rem',
                  }}
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  placeholder="Description...."
               />
               <div>
                  <p className="text-slate-500 text-xl mb-5">Created At: {formatted_created_at}</p>
                  <p className="text-slate-500 text-xl mb-5">Updated At: {formatted_updated_at}</p>
               </div>
               <div className="p-10 flex flex-row">
                  <input className="text-md p-5 bg-red-300 text-slate-800 rounded-lg hover:cursor-pointer" type="button" value="Cancel" onClick={cancel} />
                  <input className="text-md p-5 bg-green-300 text-slate-800 rounded-lg hover:cursor-pointer" type="submit" value="Update Task" />
               </div>
            </div>
         </form>
      </div>
   );

}

export default EditTodo;
