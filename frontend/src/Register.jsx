import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
   const form = useRef();
   const navigate = useNavigate();

   function handleSubmit(event) {
      event.preventDefault();
      const data = {
         email: form.current.email.value,
         password: form.current.password.value
      };
      console.log(data);

      // Register logic here
      fetch('http://localhost:8080/api/users/signup', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
         console.log('Success:', data);
         localStorage.setItem('token', data.id);
         if (data.email) {
            navigate(`/`, { state: { email: data.email }});
         }
      }).catch((error) => {
         console.error('Error:', error);
      });
   }

   return (
      <>
         <div>Register page</div>
         <form ref={form} onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            border: '1px solid black',
            padding: '20px',
            borderRadius: '10px'
         }}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <input type="submit" value="Register" />
         </form>
      </>
   );
}
