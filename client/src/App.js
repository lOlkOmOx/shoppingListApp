import React, {useEffect, useState} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './bricks/Home'
import Customspinner from '../src/bricks/Spinner'

function App() {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => {
          setTimeout(() => {resolve()}, 2000)
        })
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
        console.log(error)
      }
    };
    fetchData();
  }, [])

  return (
    <div>
    {loading ? (
      <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}><Customspinner variant="Moon"/></div>
    ):(<div className="App">
      <Home/>
    </div>)}
    </div>
  );
}

export default App;
