import React from 'react';
import './User.css';
import { useContext } from 'react';
import { UsersContext } from '../../contexts/UsersContext';

const User = () => {
  const usersContext = useContext(UsersContext)
  return (
    <div className='user-dashboard'>
      <button onClick={()=>{usersContext.setShowUserData(false)}} className="user-dashboard-return-button">Return</button>
    </div>
  )
}

export default User