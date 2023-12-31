import React, {useEffect, useState} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './bricks/Home'
import Customspinner from '../src/bricks/Spinner'
import { Translation } from '../src/bricks/Translation';
import Header from "./bricks/Header"

function App() {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [darkMode, setDarkMode] = useState(false)

  const switchMode = () => {
    setDarkMode(!darkMode)
  }

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
    <Translation>
    <div className={darkMode ? 'dark' : 'light'}>
    {loading ? (
      <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}><Customspinner variant="Moon"/></div>
    ):(<div className={darkMode ? 'dark' : 'light'}>
      <Header switchMode={switchMode} dark={darkMode}/>
      <Home dark={darkMode}/></div>
    )}
    </div>
    </Translation>
  );
}

export default App;
