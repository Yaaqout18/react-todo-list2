import {useRef, useState,useEffect} from 'react';
import './App.css';

function App() {

  const [x , setx] = useState(() => {
    const storedData = localStorage.getItem('tasks');
    return storedData ? JSON.parse(storedData) : [];
  });

  const [tasksNum,settasksNum] = useState(() => {
    const storedData = localStorage.getItem('tasks');
    return storedData ? JSON.parse(storedData).length : 0;
  });



const inputRef = useRef()


useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(x));
  settasksNum(x.length);
}, [x]);  

  const add = () => {
    const value= inputRef.current.value 
    if(value ===""){
      alert("Please Enter a task")
      
      return
    }
  

    const newData = {completed : false , value}
    setx([...x, newData]);
    inputRef.current.value=''
  }
  // to delete 
  const toDelete = (index) => {
    const newx = [...x]

    newx.splice(index, 1)
    setx(newx)
  }

  const itemDone = (index) => {
    const newx = [...x]
    newx[index].completed = !newx[index].completed 
    setx(newx)
  }
// delete just item done
const clearCompleted = () => {
  const completedTasks = x.filter((task) => task.completed);
  if (completedTasks.length === 0) {
    alert('There are no completed tasks to clear.');
    return;
  }
  const filteredTasks = x.filter((task) => !task.completed);
  setx(filteredTasks);
};

  return (
    <div className="App">
    <div className='list-top'>
    <h2>To do List 📝 <span className="tasks-num">{tasksNum}</span></h2>
    
    <input ref={inputRef} placeholder='Enter new task' />
    <button className="btn" onClick={add}>Add</button>
    </div>
    <ul>
      {
          x.map(({value , completed} , index) =>{
            return <div className='task-box'>
            <li className={completed ? "diff-style" : ""} onClick={ () => itemDone(index)}>{value}</li>
            <span onClick={() => toDelete(index)} className='x-icon'>❌</span>
            </div>
          })
      }
    </ul>
    <button class="button type1" onClick={clearCompleted}>clear</button>
    </div>
  );
}

export default App;
