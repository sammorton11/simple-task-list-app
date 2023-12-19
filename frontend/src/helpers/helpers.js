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

   function deleteAll(id) {
      var result = confirm("Are you sure you want to delete all tasks?");
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
               console.log('Task deleted successfully:', data); // Log the response data
               getUserData(id);
            })
            .catch((error) => {
               console.error('Error:', error);
            });
      }
   }

   function deleteTask(id, todo_id) {
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
                  getUserData(id);
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

   module.exports = {
      getUserData,
      addTask,
      deleteAll,
      deleteTask,
   };
