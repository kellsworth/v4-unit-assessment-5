import React from 'react';
import './App.css';
import Routes from "./routes";
import Nav from './Components/Nav/Nav';


function App() {
  return (
    <div className='App'>

      <Nav />
      {Routes}
    </div>
  )
};

export default App;
