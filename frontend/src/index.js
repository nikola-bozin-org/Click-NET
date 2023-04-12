import React from 'react';
import {BrowserRouter as Router, Route,Routes,Navigate} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './components/login/Login'
import { AppContextProvider } from './contexts/AppContext';
import { UsersContextProvider } from './contexts/UsersContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <UsersContextProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route exact path='/dashboard' element={<App/>}/>
            <Route path="*" element={<div>Not Found</div>}/>
          </Routes>
        </Router>
    </UsersContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
