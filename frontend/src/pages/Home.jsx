import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTaskDialog from '../components/AddTaskDialog';
import WelcomeBanner from '../components/WelcomeBanner';
import Menu from '../components/Menu';
import TaskList from '../components/TaskList';

export const Home = ({ isMenuOpen, toggleMenu }) => {
   const navigate = useNavigate();

   const token = localStorage.getItem('token'); 
   console.log("token", token);
   
   const [userTodos, setUserTodos] = useState([]); 
   const [searchText, setSearchText] = useState('');
   const [isOpened, setIsOpened] = useState(false);

   const handleOpen = () => {
      setIsOpened(!isOpened);
   }

   useEffect(() => {
      token === null ? navigate('/login'): navigate('/');
   }, []);

   useEffect(() => {
      getUserData(token);
   }, []);


   async function getUserData(token) {
      const opts = {
         method: 'GET',
         mode: 'cors',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
         },
      };

      try {
         const response = await fetch(`http://127.0.0.1:5000/todos`, opts);

         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }

         const data = await response.json();
         console.log('Data:', data);
         setUserTodos(data);
      } catch (error) {
         console.error('Error:', error);
      }
   }


   return (
      <>
         <Menu
            getUserData={getUserData}
            userTodos={userTodos}
            setUserTodos={setUserTodos}
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            handleOpen={handleOpen}
         />

         <AddTaskDialog
            isOpened={isOpened}
            handleOpen={handleOpen}
            setUserTodos={setUserTodos}
            getUserData={getUserData}
         />

         <WelcomeBanner
            searchText={searchText}
            setSearchText={setSearchText}
            userTodos={userTodos}
            setUserTodos={setUserTodos}
            getUserData={getUserData}
         />

         <TaskList userTodos={userTodos} />
      </>
   );
}
