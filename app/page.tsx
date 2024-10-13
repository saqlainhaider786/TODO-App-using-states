"use client"
import { useState } from "react"

export default function Home() {

  let [inputField, setInputField] = useState("");
  let [todoItem, setTodoItem] = useState([]);

  const handleAdd = () => {
    const newTodo: any = [...todoItem];//changing in newTodo will not effect todoItem
    newTodo.push({ title:inputField,isDone:false});
    setTodoItem(newTodo);
    setInputField("");
  }

  const handleRemove = (i: number) => {
    let tasks = [...todoItem];
    let updatedTask = tasks.filter((task, index) => index != i);
    // let updatedTask=tasks.splice(i,1);
    setTodoItem(updatedTask);
  }

  const handleEdit=(index:number)=>{
    let tasks = [...todoItem];
    let reqTask: any = tasks.find((todo,i)=>i===index);
    setInputField(reqTask.title);
    let updatedTask = tasks.filter((task, i) => index !== i);
    // let updatedTask=tasks.splice(i,1);
    setTodoItem(updatedTask);
  }

  const handleComplete = (i: number) => {
    let tasks = [...todoItem];
    let doneTask=tasks.filter((task:any,index)=>{
      if (i === index){
        task.isDone=true;
      }
      return task;
    });
    setTodoItem(doneTask)
  }

  return (
      <div className="h-[90vh] flex justify-center items-center">
      <div className="todo w-full mx-4 px-8 py-6 rounded-bl-xl rounded-tr-xl bg-gray-300 md:w-[60vw] md:px-12 md:py-8">
          <div className="flex flex-row">
          <input type="text" className="flex-grow px-4 py-2" value={inputField} onChange={(e) => setInputField(e.target.value)} name="task" id="task" placeholder="Enter Todo Task" />
          <button type="submit" className="bg-black px-4 py-2 text-white font-bold" onClick={handleAdd}>Add Task</button>
          </div>
          <ul>
            {
              todoItem.length > 0 ? todoItem.map((todo: any, ind) => {
                return (
                  <li className="my-3 bg-gray-200 px-4 py-2 flex flex-col md:flex-row" key={ind}><span className={`flex-grow ${todo.isDone ? "line-through text-green-600" : null} text-2xl font-serif`}>{todo.title}</span><div className="btns md:flex"><button className="text-yellow-600 font-bold mt-2 md:mt-0 md:mx-4 font-mono" onClick={() => handleEdit(ind)}>Edit</button><button className="mx-4 text-green-600 font-bold font-mono" onClick={() => handleComplete(ind)}>Complete</button><button className="mx-4 text-red-600 font-bold font-mono" onClick={() => handleRemove(ind)}>Delete</button></div></li>
                )
              }) : <h1 className="my-3 text-2xl bg-gray-200 px-4 py-2 font-mono">Todo is empty!..</h1>
            }
          </ul>
        </div>
      </div>
  )
}