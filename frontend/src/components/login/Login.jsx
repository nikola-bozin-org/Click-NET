import { useState } from "react";
import "./login.css";
import {Navigate} from 'react-router-dom'
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [currentNotificationTimeout,setCurrentNotificationTimeout] = useState(null);
  const [isFetching,setIsFetching] = useState(false);
  const [shouldNavigate,setShouldNavigate] = useState(false);
  const [disableLoginButton,setDisableLoginButton] = useState(false);


  const {setIsAuthorized} = useContext(AppContext);

  const handleSubmit = async (e,asViewer) => {
    setDisableLoginButton(true);
    if(currentNotificationTimeout){
      clearTimeout(currentNotificationTimeout);
      setCurrentNotificationTimeout(null);
      setShowNotification(false);
    }
    setIsFetching(true);
    e.preventDefault();
      const response = await fetch(
        "https://clicknet-server.onrender.com/api/session/loginStaff",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            'username':'viewer',
            'password':'viewer'
          })
        }
      );
      const data = await response.json();
      setIsFetching(false);
      setDisableLoginButton(false);
      if (data.error) {
        setShowNotification(true);
        setNotificationMessage(data.error);
        let timeout = setTimeout(() => {
          setShowNotification(false);
        }, 6000);
        setCurrentNotificationTimeout(timeout);
        return;
      }
      localStorage.setItem("user", data.user);
      localStorage.setItem("accessToken", data.accessToken);
      setShouldNavigate(true);
      setIsAuthorized(true);
  };

  const loginAsViewer = () =>{
  }

  if(shouldNavigate) { return <Navigate to='/dashboard'/> }

  return (
    <>
    <div className="topbarClickNET">ClickNET</div>
    <div className="login-container">
      <form onSubmit={(e)=>{handleSubmit(e,false)}} className="login-form">
        <label htmlFor="username">Username</label>
        <input
          autoComplete="off"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={disableLoginButton} type="submit" className={`${disableLoginButton?'halfOpacity':''}`}>Login</button>
      </form>
      <button onClick={(e)=>{handleSubmit(e,true)}} disabled={true} type="submit" className={` login-as-viewer-btn halfOpacity`}>Login As Viewer</button>
        <div className={`notification-container  ${showNotification?'show-notification-container':'hide-notification-container'}`}><p className={`notificationText`}>{notificationMessage}</p></div>
      {isFetching && (
        <div className="fetching-notification"></div>
      )}
    </div>
    </>
  );
}



export default Login;
