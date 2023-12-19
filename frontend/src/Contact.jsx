import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const Contact = () => {
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
         console.log(data.id);
         localStorage.setItem('token', data.id);

         if (data.email) {
            navigate(`/`, { state: { email: data.email }});
         }

      }).catch((error) => {
         console.error('Error:', error);
      });
   };

   return (
      <div className='login-container'>
            <form
               className='login-form rounded-xl'
               ref={form}
               onSubmit={handleSubmit}
            >
               <label className='pl-2 sm:text-sm md:text-md lg:text-xl'>Email:</label>
               <input className='edit' type="email" name="email" />
               <label className='pl-2 sm:text-sm md:text-md lg:text-xl'>Password:</label>
               <input className='edit' type="password" name="password" />
               <br />
               <input className='' type="submit" value="Login" />
               <input type='button' value="Register" onClick={() => navigate('/register')} />
            </form>
      </div>
   );
};

