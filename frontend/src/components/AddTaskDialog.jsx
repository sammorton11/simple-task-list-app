function AddTaskDialog({ isOpened, handleOpen, addTask, formData, setFormData }) {
   return (
      <>
         <dialog 
            open={isOpened} 
            onClose={handleOpen} 
            className='add-task-dialog container text-slate-800 rounded-lg shadow-2xl'
         >
            <h1 className='text-slate-600 font-bold text-4xl pb-5'>Add Task</h1>
            <section className='flex'>
               <input
                  className='bg-green-200 rounded-xl'
                  type="text"
                  name="task"
                  value={formData.task}
                  onChange={(e) => setFormData({ ...formData, task: e.target.value })}
               />
               <input
                  className="ml-5 hover:cursor-pointer accent-blue-300 w-6 transition duration-550 ease-in-out"
                  type="checkbox"
                  name="completed"
                  checked={formData.completed}
                  onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
               />
            </section>
            <div style={{ padding: '5px' }} />
            <section className='flex justify-between'>
               <input
                  className='bg-green-300 rounded-xl hover:cursor-pointer w-full sm:w-auto'
                  type="submit"
                  value="Submit"
                  onClick={(e) => { addTask(e); handleOpen() }}
               />
               <div style={{ padding: '10px' }} />
               <input
                  className='bg-red-300 rounded-xl hover:cursor-pointer w-full sm:w-auto'
                  type="button"
                  value="Close"
                  onClick={handleOpen}
               />
            </section>
         </dialog>
      </>
   );
}

export default AddTaskDialog;
