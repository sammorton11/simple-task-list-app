import SearchBar from "./SearchBar";

export default function WelcomeBanner({ searchText, setSearchText, getUserData, userTodos, setUserTodos }) {
   return (
      <div className='bg-slate-600 align-self-center border border-blue-800 mb-10 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center sm:text-sm md:text-lg lg:text-xl shadow-md w-full'>
         <div className='mb-2 sm:mb-0 w-full'>
            <h2 className='p-2 text-xl sm:text-xl md:text-4xl lg:text-5xl text-green-200'>
               Tasks
            </h2>
         </div>
         <SearchBar 
            searchText={searchText} 
            setSearchText={setSearchText} 
            getUserData={getUserData}
            userTodos={userTodos}
            setUserTodos={setUserTodos}
         />
      </div>
   );
}
