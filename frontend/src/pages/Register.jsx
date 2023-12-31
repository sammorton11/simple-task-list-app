import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
   const form = useRef();
   const navigate = useNavigate();

   async function handleSubmit(event) {
      event.preventDefault();
      const formData = {
         email: form.current.email.value,
         password: form.current.password.value,
         confirmPassword: form.current.confirmPassword.value
      };

      console.log(data);

      // Register logic here
      const response = await fetch('http://127.0.0.1:5000/register', {
         method: 'POST',
         mode: 'cors',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData),
      })

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.token) {
         localStorage.setItem('token', data.token);
         navigate(`/`, { state: { email: data.email } });
      }
   }

   return (
      <>
         <div className='p-2 md:p-25 w-full flex flex-col justify-center'>
            <form
               className='bg-blue-300/[0.2] p-10 flex self-center w-5/12 h-50 flex-col justify-center border border-black rounded-xl text-slate-800'
               ref={form}
               onSubmit={handleSubmit}
            >
               <label className='sm:text-sm md:text-md lg:text-xl'>Email:</label>
               <input className='p-2 bg-white rounded-lg border border-black border-1' placeholder="Type your email..." type="email" name="email" />
               <br />
               <label className='sm:text-sm md:text-md lg:text-xl'>Password:</label>
               <input className='p-2 bg-white rounded-lg border border-black border-1' placeholder="Type password..." type="password" name="password" />
               <br />
               <label className='sm:text-sm md:text-md lg:text-xl'>Confirm Password:</label>
               <input className='p-2 bg-white rounded-lg border border-black border-1' placeholder="Confirm password..." type="password" name="confirmPassword" />
               <div style={{padding: '15px'}} />
               <br />
               <div className='flex flex-row justify-between w-full'>
                  <input className='bg-red-200 p-5 w-6/12 rounded-xl border border-black border-1 cursor-pointer' type='button' value="Cancel" onClick={() => navigate('/login')} />
                  <div style={{padding: '5px'}} />
                  <input className='bg-green-200 p-5 w-6/12 rounded-xl border border-black border-1 cursor-pointer' type="submit" value="Create Account" />
               </div>
            </form>
         </div>
      </>
   );
}
