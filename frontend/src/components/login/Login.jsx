import { useState } from "react";
import "./login.css";
import { Navigate } from 'react-router-dom'
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { login } from '../../redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { loginStaff } from "../../config";
import FetchError from "../fetch-error/FetchError";
import HandleButton from '../handle-button/HandleButton'
import { connect, sendMessage } from "../../clientRemoteController";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [disableLoginButton, setDisableLoginButton] = useState(false);
  const isConnectedToWebSocket = useSelector((state)=>state.auth.isConnectedToWebSocket);

  const dispatch = useDispatch();
  const { setIsAuthorized } = useContext(AppContext);

  const handleSubmit = async (e) => {
    setDisableLoginButton(true);
    setShowNotification(false);
    setIsFetching(true);
    console.info("This")
    // if(username==='admin')
    dispatch(login({ isAdmin: true }))
    e.preventDefault();
    const response = await fetch(
      loginStaff,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          'username': 'admin',
          'password': 'admin'
        })
      }
    );
    let data;
    try{
    data = await response.json();
    }catch(e){
      console.info(e)
      console.info('=======================')
      console.error(e.message);
    }
    setIsFetching(false);
    setDisableLoginButton(false);
    if (data.error) {
      setShowNotification(true);
      setNotificationMessage(data.error);
      return;
    }
    localStorage.setItem("user", data.user);
    localStorage.setItem("accessToken", data.accessToken);
    // connect(data.accessToken);
    setShouldNavigate(true);
    setIsAuthorized(true);
  };
  // if (isConnectedToWebSocket && shouldNavigate) { return <Navigate to='/dashboard' /> }
  if (shouldNavigate) { return <Navigate to='/dashboard' /> }

  return (
    <>
      <div className="topbarClickNET">ClickSoft</div>
      <div className="login-container">
        <form  className="login-form">
          <input type="text" style={{ display: "none" }} />
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
          <HandleButton shouldDisable={disableLoginButton} onClick={(e) => { handleSubmit(e, false) }} text={"Login"} className={`login-form-login-button ${disableLoginButton ? 'halfOpacity' : ''}`}/>
        </form>
        <FetchError showMessage={showNotification} message={notificationMessage} onDelayCompleted={()=>{setShowNotification(false); setShowNotification(false)}}/>
        {isFetching && (
          <div className="fetching-notification"></div>
        )}
      </div>
    </>
  );
}



export default Login;
