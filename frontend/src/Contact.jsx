import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Contact = () => {
   const form = useRef();
   const navigate = useNavigate();
   const [email, setEmail] = useState('');

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
      <div style={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         height: '100vh'
      }}>
         <form
            ref={form}
            onSubmit={handleSubmit}
            style={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               border: '1px solid black',
               padding: '20px',
               borderRadius: '10px'
            }}
         >
            <h1>Login</h1>

            <div className='col-75'>
               <label>Email</label>
            </div> 
            <input style={{padding: '8px',  marginBottom: '15px' }} type="email" name="email" />

            <div className='col-75'>
               <label>Password</label>
            </div>
            <input style={{width: '300px', padding: '8px', marginBottom: '15px' }} type="password" name="password" />

            <div style={{padding: '25px'}}/>

            <input style={{padding: '8px', padding: '10px'}} type="submit" value="Login" />

            <div style={{padding: '8px'}}/>

            <input style={{padding: '8px', padding: '10px'}} type='button' value="Register" onClick={() => navigate('/register')}/>
         </form>
      </div>
   );
};

