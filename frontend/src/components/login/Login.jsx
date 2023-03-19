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


  const handleSubmit = async (e) => {
    if(currentNotificationTimeout){
      clearTimeout(currentNotificationTimeout);
      setCurrentNotificationTimeout(null);
      setShowNotification(false);
    }
    setIsFetching(true);
    e.preventDefault();
    try {
      const response = await fetch(
        "https://click-net-test.onrender.com/api/loginStaff",
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
      if (data.error) {
        setShowNotification(true);
        setNotificationMessage("Error: " +data.error);
        let timeout = setTimeout(() => {
          setShowNotification(false);
        }, 10000);
        setCurrentNotificationTimeout(timeout);
        return;
      }
      localStorage.setItem("user", data.user);
      localStorage.setItem("accessToken", data.accessToken);
      setShouldNavigate(true);
    } catch (error) {
      setIsFetching(false);
      setShowNotification(true);
      setNotificationMessage("Error: "+error);
      let timeout = setTimeout(() => {
        setShowNotification(false);
      }, 10000);
      setCurrentNotificationTimeout(timeout);
      return;
    }
  };

  if(shouldNavigate) return <Navigate to='/admin-dashboard'/>

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>
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
        <button type="submit">Login</button>
      </form>
      {showNotification && (
        <div className="notification-container">{notificationMessage}</div>
      )}
      {isFetching && (
        <div className="fetching-notification">Fetching...</div>
      )}
    </div>
  );
}

export default Login;
