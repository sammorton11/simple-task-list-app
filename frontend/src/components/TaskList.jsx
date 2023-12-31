import { TodoCard } from "./TodoCard";

export default function TaskList({ userTodos }) {
   return (
      <ul className='md:p-10 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'>
         {
            userTodos.map((todo) => (
               <li key={todo.id}>
                  <TodoCard
                     todo_id={todo.id}
                     task={todo.task}
                     description={todo.description}
                     completed={todo.completed}
                     created_at={todo.created_at}
                     updated_at={todo.updated_at}
                  />
               </li>
            ))
         }
      </ul>
   );
}
