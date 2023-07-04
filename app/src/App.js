import logo from './logo.svg';
import './App.css';
function App() {

  const [user, setUser] = useState('');
  
  const handle =  async()=>{
    const response = await fetch("http://localhost:8080/data", {
      method: 'GET'
    })
    alert(response)
  }

  return (
    <div className="App">
    <input type='text' name='id'  value={user} onChange={(e) => setUser(e.target.value)}/>
    <button onClick={()=>handle()} > submit </button>
    </div>
  );
}

export default App;
