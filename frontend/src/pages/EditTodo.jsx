import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateTask } from "../helpers/helpers";

function EditTodo() {
   const location = useLocation();
   const navigate = useNavigate();
   
   const token = localStorage.getItem('token');

   const { 
      todo_id, 
      completed,
      formatted_created_at,
      formatted_updated_at,
   } = location.state || {};

   const [formData, setFormData] = useState({
      id: todo_id,
      task: '', 
      description: '', 
      completed: completed,
   });


   async function getUserData() {
      try {
         const response = await fetch(`http://127.0.0.1:5000/todo/${todo_id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*',
               'Authorization': 'Bearer ' + token,
            },
         });

         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }

         const data = await response.json();
         console.log('Data:', data);
         setFormData({
            task: data.task,
            description: data.description,
            completed: data.completed,
         });
         console.log("Data COMPLETED:", data.completed);
      } catch (error) {
         console.error('Error:', error);
      }
   }

   useEffect(() => {
      getUserData();
   }, []);


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

   function cancel() {
      navigate("/");
   }

   function deleteTask() {
      const alert = window.confirm("Are you sure you want to delete this task?");
      console.log("Alert choice:", alert);
      if (!alert) return;

      fetch(`http://127.0.0.1:5000/todo/${todo_id}`, {
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + token,
         },
         method: 'DELETE',
      })
         .then((res) => res.json())
         .then((data) => {
            console.log("Data:", data);
            navigate("/");
         })
         .catch((err) => {
            console.error(err);
         });
   }

   
   return (
      <div>
         <form
            onSubmit={(event) => {
               event.preventDefault();
               updateTask(todo_id, formData.task, completed, formData.description);
               navigate("/");
            }}
         >
            <h1 className='text-slate-500 text-3xl mb-5'>Update Task</h1>
            <div className="flex flex-row">
               <input
                  className="border border-slate-500 w-32 rounded-md bg-green-200 text-slate-800"
                  type="text" name="task" value={formData.task} onChange={handleTaskChange}
               />

               <button className="text-3xl hover:cursor-pointer p-5 text-slate-700 rounded-lg" onClick={deleteTask}>
                  <i className="fa fa-trash-o "></i>
               </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
               <textarea
                  className="w-full h-full rounded-md bg-green-200 text-slate-800 p-5 pb-24 mb-10 border border-slate-500"
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
