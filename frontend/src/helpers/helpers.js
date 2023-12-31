async function getUserData(id, setUserTodos) {
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


async function addTask(id, formData, setFormData) {

   try {
      const res = await fetch(`http://localhost:8081/api/todos/todo/${id}`, {
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

      const data = await res.json();

      if (res.ok) {
         console.log('Task added successfully:', data); // Log the response data
         console.log(formData);
         setFormData({ task: '', completed: false });
         await getUserData(id, setUserTodos);
      }

   } catch (error) {
      console.error('Error occurred while fetching user todos:', error);
   }
}

function deleteAll(id, setUserTodos) {
   var result = confirm("Are you sure you want to delete all tasks?");
   if (!result) {
      return;
   } else {
      fetch(`http://localhost:8081/api/todos/todo/${id}`, {
         method: 'DELETE',
         headers: {
         },
         'Content-Type': 'application/json',
      })
         .then((res) =>
            console.log(res.json()),
         )
         .then((data) => {
            console.log('Task deleted successfully:', data); // Log the response data
            getUserData(id, setUserTodos);
         })
         .catch((error) => {
            console.error('Error:', error);
         });
   }
}

function deleteTask(todo_id) {
   var result = confirm("Are you sure you want to delete this task?");

   if (!result) {
      return;
   } else {
      fetch(`http://localhost:8081/api/todos/todo/${id}/${todo_id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
         },
      })
         .then((res) => {
            if (res.ok) {
               // getUserData(user_id, setUserTodos);
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

export function updateTask(id, task, checked, description) {

   const token = localStorage.getItem('token');

   console.log("checked: " + checked);

   fetch(`http://127.0.0.1:5000/todos`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({
         id: id,
         task: task,
         description: description,
         completed: checked,
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

export default {
   getUserData,
   addTask,
   deleteAll,
   deleteTask,
   updateTask
};
