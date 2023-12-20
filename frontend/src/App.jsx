import { Routes, Route } from 'react-router-dom'
import './index.css'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import EditTodo from './pages/EditTodo'
import { Navbar } from './components/Navbar.jsx'

function App() {
   return (
      <>
         <header>
            <Navbar />
         </header>
         <div className='p-5'>
            <Routes>
               <Route path="/login" element={<Login />} />
               <Route path="/" element={<Home />} />
               <Route path="/register" element={<Register />} />
               <Route path="/edit-todo" element={<EditTodo />} />
            </Routes>
         </div>
      </>
   )
}

export default App
