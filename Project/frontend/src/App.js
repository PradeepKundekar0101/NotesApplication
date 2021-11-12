import { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Register';
import {Switch,Route} from "react-router-dom";
import Home from './components/Home';
import NoteState from './context/Notes/noteState';
import Alert from './components/Alert';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      message:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  return (
   <>
      <NoteState> {/*Wrap All components in NoteState*/}
        <Nav/>
        <Alert alert={alert}/>
        <Switch>
          <Route exact path="/">
            <Home showAlert={showAlert}/>
          </Route>
            <Route path="/login">
                <Login showAlert={showAlert}/>
            </Route>
            <Route path="/signup">
                <Register showAlert={showAlert}/>
            </Route>
        </Switch>
      </NoteState>
   </>
  );
}

export default App;
