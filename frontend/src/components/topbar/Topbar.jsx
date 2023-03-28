import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './topbar.css'
import user from '../../images/user.png'
import clickLogo from '../../images/clickLogo.png'

const Topbar = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
  
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(format(new Date(), 'HH:mm:ss'));
        setCurrentDate(format(new Date(), 'EEEE, MMMM do, yyyy'));
      }, 1000);
  
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    const handleClick = () => {
      // Handle user image click event
    };
  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <img src={clickLogo} alt="Logo" className="topbar-logo" />
        <div className="topbar-time-date">
          <span className="topbar-time">{currentTime}</span>
          <span className="topbar-date">{currentDate}</span>
        </div>
      </div>
      <div className="topbar-right" onClick={handleClick}>
        <img src={user} alt="User" className="topbar-user-image" />
      </div>
    </div>
  )
}

export default Topbar