import React, { useState } from "react";
import './App.css';
import Items from './bricks/Items'
import 'bootstrap/dist/css/bootstrap.min.css';
import Name from './bricks/Name';
import User from './bricks/User'
import Button from 'react-bootstrap/Button'


function App() {

  const [role, setRole] = useState("Majitel");

  const switchUser = () => {
    setRole((prevRole) => (prevRole === "Majitel" ? "Uživatel" : "Majitel"));
  };

  return (
    <div className='App'>
      <div style={{display: "", textAlign:"center", marginBottom: "20px"}}>
        <h4>Aktuální role: {role}</h4>
        <Button variant= "warning" onClick={switchUser}>Přepnout roli</Button>
      </div>
      <Name role={role}/>
      <Items/>
      <User role={role}/>
    </div>
  );
}

export default App;
