import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
   const form = useRef();
   const navigate = useNavigate();

   const handleSubmit = (e) => {
      e.preventDefault();

      const data = {
         email: form.current.email.value,
         password: form.current.password.value
      };

      console.log(data);

      // Login logic here
      fetch('http://localhost:8080/api/users/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
         console.log('Success:', data);
         console.log("Token", data.id);
         localStorage.setItem('token', data.id);

         if (data.email) {
            navigate(`/`, { state: { email: data.email }});
         }

      }).catch((error) => {
         console.error('Error:', error);
      });
   };

   return (
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
            <br />
            <div className='flex flex-row justify-between w-full'>
               <input className='bg-blue-200 p-5 w-6/12 rounded-xl border border-black border-1 cursor-pointer' type='button' value="Register" onClick={() => navigate('/register')} />
               <div style={{padding: '5px'}} />
               <input className='bg-green-200 p-5 w-6/12 rounded-xl border border-black border-1 cursor-pointer' type="submit" value="Login" />
            </div>
         </form>
      </div>
   );
};

