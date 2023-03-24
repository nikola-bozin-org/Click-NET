import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './unauthorized.css';

const Unauthorized = ({ imageUrl }) => {
  const [countdown, setCountdown] = useState(5);
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      setNavigate(true);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (navigate) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="unauthorized-container">
      <img className="unauthorized-image" src={imageUrl} alt="Unauthorized" />
      <p className="unauthorized-text">Unauthorized</p>
      <p className='redirectingTimer'>Redirecting to login page in: {countdown}</p>
    </div>
  );
};

export default Unauthorized;
