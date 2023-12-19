function AddTaskDialog({ isOpened, handleOpen, addTask, formData, setFormData }) {
   return (
      <>
         <dialog 
            open={isOpened} 
            onClose={handleOpen} 
            className='z-40 p-10 lg:mt-10 bg-slate-500/[0.9]  border border-slate-300 w-11/12 lg:w-1/2 text-slate-800 rounded-lg shadow-2xl'
         >
            <h1 className='text-green-200 font-bold text-4xl pb-5'>Add Task</h1>
            <section className='flex'>
               <input
                  className='m-10 p-10 rounded-5px border border-black bg-green-200 rounded-xl'
                  type="text"
                  name="task"
                  value={formData.task}
                  onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                  placeholder='Task...'
               />
               <input
                  className="ml-5 hover:cursor-pointer accent-blue-300 w-6 transition duration-550 ease-in-out"
                  type="checkbox"
                  name="completed"
                  checked={formData.completed}
                  onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
               />
            </section>
            <textarea
               className='p-5 rounded-5px border border-black bg-green-200 rounded-xl bg-green-200 rounded-xl w-full'
               type="text"
               name="description"
               value={formData.description}
               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
               placeholder='Description...'
            />
            <div style={{ padding: '5px' }} />
            <section className='flex flex-row justify-end'>
               <input
                  className='mr-5 p-4 bg-red-300 rounded-xl hover:cursor-pointer w-full sm:w-auto'
                  type="button"
                  value="Close"
                  onClick={handleOpen}
               />
               <input
                  className='p-4 bg-green-300 rounded-xl hover:cursor-pointer w-full sm:w-auto'
                  type="submit"
                  value="Submit"
                  onClick={(e) => { addTask(e); handleOpen() }}
               />
               <div style={{ padding: '10px' }} />
            </section>
         </dialog>
      </>
   );
}

export default AddTaskDialog;
