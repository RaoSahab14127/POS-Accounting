import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
function App() {

  const [user, setUser] = useState({});
  
  const handle =  async()=>{
    const response = await fetch("http://localhost:8080/demo", {
      method: 'POST',
      body: JSON.stringify(user) ,
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const data = await response.text()
    console.log(data)
  }

  return (
    <div className="App">
    <input type='text' name='id'  value={user.name} onChange={(e) => setUser({"name": e.target.value})}/>
    <button onClick={()=>handle()} > submit </button>
    </div>
  );
}

export default App;
