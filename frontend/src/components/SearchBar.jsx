export default function SearchBar({ searchText, setSearchText, getUserData, userTodos, setUserTodos }) {

   const token = localStorage.getItem('token');

   function filterTodos(event) {
      event.preventDefault();

      if (searchText === '') {
         setUserTodos(userTodos);
         getUserData(token);
         return;
      }

      const newTodos = userTodos.filter((todo) => todo.task.includes(searchText));
      setUserTodos(newTodos);
   }

   return (
      <div className='w-full justify-center align-center sm:text-sm md:text-md lg:text-xl'>
         <form className='flex flex-col sm:flex-row lg:flex-row py-5 w-full justify-center'>
            <input className='w-full bg-slate-200 p-2 text-slate-800 rounded-lg hover:cursor-pointer' onChange={(event) => setSearchText(event.target.value)} placeholder='Search...' />
            <div className="flex pt-5 sm:pt-0">
               <button className='rounded-5px ml-10 font-bold text-uppercase text-slate-200' onClick={(e) => filterTodos(e)}>Search</button>
               <input className='rounded-5px ml-10 font-bold text-uppercase text-slate-200 hover:cursor-pointer' type="reset" defaultValue="Reset" />
            </div>
         </form>
      </div>
   );
}
