import { Routes, Route } from 'react-router-dom'
import './index.css'
import { Contact } from './Contact'
import { Home } from './Home'
import { Register } from './Register'
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
               <Route path="/login" element={<Contact />} />
               <Route path="/" element={<Home />} />
               <Route path="/register" element={<Register />} />
               <Route path="/edit-todo" element={<EditTodo />} />
            </Routes>
         </div>
      </>
   )
}

export default App
