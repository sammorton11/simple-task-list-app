import { Routes, Route } from 'react-router-dom'
import './index.css'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import EditTodo from './pages/EditTodo'
import { Navbar } from './components/Navbar.jsx'
import { useState } from 'react'

function App() {
   const [isMenuOpen, setMenuOpen] = useState(false);
   const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
   };

   return (
      <>
         <header>
            <Navbar toggleMenu={toggleMenu} />
         </header>
         <div className='p-5'>
            <Routes>
               <Route path="/login" element={<Login />} />
               <Route path="/" element={<Home isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />} />
               <Route path="/register" element={<Register />} />
               <Route path="/edit-todo" element={<EditTodo />} />
            </Routes>
         </div>
      </>
   )
}

export default App
