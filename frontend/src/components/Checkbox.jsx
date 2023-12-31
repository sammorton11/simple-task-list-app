import { useRef, useEffect, useState } from "react";
import { updateTask } from "../helpers/helpers";

export default function Checkbox({ task, description, todo_id, checked }) {
   const isChecked = useRef(checked);
   const [checkedState, setCheckedState] = useState(isChecked.current);

   useEffect(() => {
      isChecked.current = checked;
      setCheckedState(checked);
   }, [checked]);

   function handleCheck() {
      isChecked.current = !isChecked.current;
      setCheckedState((prevChecked) => !prevChecked);
   }

   function handleClick() {
      handleCheck();
      updateTask(todo_id, task, isChecked.current, description);
   }
   
   return (
      <>
         <input
            className="cursor-pointer w-4 h-4 text-blue-300 transition duration-550 ease-in-out"
            type="checkbox"
            onChange={handleClick}
            checked={checkedState}
         />
      </>
   );
}

