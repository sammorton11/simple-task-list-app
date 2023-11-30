import { Routes, Route } from 'react-router-dom'
import './index.css'
import { Contact } from './Contact'
import { Home } from './Home'
import { Register } from './Register'
import EditTodo from './pages/EditTodo'

function App() {
   return (
      <Routes>
         <Route path="/login" element={<Contact />} />
         <Route path="/" element={<Home />} />
         <Route path="/register" element={<Register />} />
         <Route path="/edit-todo/:user_id/:todo_id/:task/:completed" element={<EditTodo />} />
      </Routes>
   )
}

export default App
