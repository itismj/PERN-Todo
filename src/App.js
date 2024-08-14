import './App.css';
import React, { Fragment } from 'react';

//components
import InputToDo from './components/InputToDo';
import ListToDo from './components/ListToDo';

function App() {
  return <Fragment>
    <div className='container'>
      <InputToDo />
      <ListToDo />
    </div>
    </Fragment>;
}

export default App;
