import { useState } from "react";
import "./login.css";
import {Navigate} from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [currentNotificationTimeout,setCurrentNotificationTimeout] = useState(null);
  const [isFetching,setIsFetching] = useState(false);
  const [shouldNavigate,setShouldNavigate] = useState(false);
  const [disableLoginButton,setDisableLoginButton] = useState(false);

  const handleSubmit = async (e) => {
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
          body: JSON.stringify({
            username,
            password,
          }),
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
  };

  if(shouldNavigate) return <Navigate to='/dashboard'/>

  return (
    <>
    <div className="topbarClickNET">ClickNET</div>
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button disabled={disableLoginButton} type="submit" className={`${disableLoginButton?'halfOpacity':''}`}>Login</button>
      </form>
        <div className={`notification-container  ${showNotification?'show-notification-container':'hide-notification-container'}`}><p className={`notificationText`}>{notificationMessage}</p></div>
      {isFetching && (
        <div className="fetching-notification"></div>
      )}
    </div>
    </>
  );
}



export default Login;
