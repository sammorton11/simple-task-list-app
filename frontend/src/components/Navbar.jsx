import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
   const navigate = useNavigate();

   /* Belongs in Navbar component */
   function logout() {
      const confirmation = confirm('Are you sure you want to logout?');
      if (confirmation) {
         localStorage.removeItem('token');
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
      <nav className="w-full mb-2 my-3 rounded-lg bg-blue-200 sticky top-0  opacity-90 p-3 text-slate-800 shadow-md border border-solid border-slate-500 border-1">
         <div className="p-5 mx-auto flex justify-between">
            <a href="/" className="text-3xl font-bold text-slate-800">Quik-Tasks</a>
            <div className="flex items-center">
               <button
                  className="bg-red-200 text-slate-600 px-4 py-2 rounded-md mr-4 hover:bg-blue-600 transition duration-300 border border-solid border-slate-500 border-1"
                  onClick={logout}
               >
                  Logout
               </button>
            </div>
         </div>
      </nav>
   );
}
