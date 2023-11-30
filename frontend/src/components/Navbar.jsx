import React from 'react';
import { useNavigate } from 'react-router-dom';


export const Navbar = () => {
   const navigate = useNavigate();

   /* Belongs in Navbar component */
   function logout() {
      const confirmation = confirm('Are you sure you want to logout?');
      if (confirmation) {
         fetch('http://localhost:8080/api/users/logout', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
         })
            .then((res) => {
               if (res.status === 200) {
                  navigate('/login');
               } else {
                  console.log('Logout failed');
               }
            })
            .catch((error) => {
               console.error('Error:', error);
            });
      } else {
         return;
      }
   }

   return (
      <nav className="nav-bar text-slate-800 shadow-md rounded-sm">
         <div className="p-5 mx-auto flex justify-between">
            <div className="text-white text-lg font-bold">
               <a href="/" className="hover:text-gray-300">Todo App</a>
            </div>
            <div className="flex items-center">
               <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600 transition duration-300"
                  onClick={logout}
               >
                  Logout
               </button>
            </div>
         </div>
      </nav>
   );
}
