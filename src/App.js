import { useState, useEffect } from 'react';
import './App.css';

function App() {
  document.title = "To-do"
  var deleted = false;
  //input box value handling
  const [value,setValue] = useState("");
  const handlechange = (e) => {
    setValue(e.currentTarget.value)
  };

  //real tasks array
  const [tasks,setTasks] = useState([]);

  //handling click on task
  const handleclick = (id) => (event) => {
    //event.currentTarget.classList.toggle("strike");
    setTasks((tasks) => tasks.map((task) => {
      if(task.id === id) {
        return {text: task.text, id: id, checked: !task.checked}
      }
      else {
        return task;
      }
    }))
    if(!deleted) {
      save('myArray', tasks.map((task) => task.id===id? {text: task.text, id: id, checked: !task.checked} : task));
    }
    deleted = true;
  };

  //state for ids
  const [noftasks,setNoftasks] = useState(0);

  //handling enter input
  const handleenter = (event) => {
    if(event.key === 'Enter' && value.trim() != "") {
      setNoftasks(noftasks+1);
      setTasks([...tasks, { text: value, id: noftasks, checked: false }]);
      setValue("");
      save('myArray', [...tasks, { text: value, id: noftasks, checked: false }]);
    }
  }

  //deletingtask
  const deltask = (id) => {
    deleted = true;
    setTasks(tasks.filter((task) => task.id !== id));
    save('myArray', tasks.filter((task) => task.id !== id));
  };

  //deleting all tasks
  const deleteall = () => {
    setTasks([]);
  };

  //saving array
  const save = (key,value ) => {
    console.log(JSON.stringify(value));
    localStorage.setItem(key,JSON.stringify(value));
  };

  //load array
  const load = () => {
    const loadedarray = localStorage.getItem('myArray')
    if(loadedarray) {
      return JSON.parse(loadedarray);
    }
    else {
      return null;
    }
  };
  useEffect(() => {
    const loadedData = load('myArray');
    if (loadedData) {
      setTasks(loadedData);
      setNoftasks(loadedData.length);
    }
  }, []);
  
  //app
  return (
    <div className="App">

      <h1>To-do</h1>

      <div className='tasklist' id='tasklist'>
        <h4>Tasks:</h4>
        <input autoComplete='off' id='input' type='text' className='input' value={value} onChange={handlechange} onKeyDown={handleenter}></input>

        {/* displaying tasks through mapping */}
        {tasks.map((task,id) => (
          <div className={task.checked ? 'task strike' : 'task'} onClick={handleclick(task.id)}>
            <input type='checkbox' checked={task.checked}></input>
            <p key={id}>{task.text}</p>
            <button onClick={() => deltask(task.id)}>Delete</button>
          </div>
        ))}

        <div className='line'></div>

        <button className='delall' onClick={deleteall}>Delete All</button>
      </div>
    </div>
  );
}

export default App;
