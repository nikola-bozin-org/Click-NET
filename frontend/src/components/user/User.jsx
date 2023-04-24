import React from 'react';
import './User.css';
import { useContext } from 'react';
import { UsersContext } from '../../contexts/UsersContext';

const User = () => {
  const usersContext = useContext(UsersContext)
  const userData = usersContext.userData;
  const returnToList = ()=>{
    usersContext.setShowUserData(false);
  }

  console.info(userData);
  return (
    <div className='user-dashboard'>
      <div className="user-topbar">
        <div className="user-topbar-username">
          {userData.username}
        </div>
        <div className="user-topbar-time-created">
          Created at:00.00.0000
        </div>
      </div>
        <div onClick={returnToList} className="user-topback-back-to-list">
          {'⇽ Back to the list'}
        </div>
      {/* <button onClick={()=>{usersContext.setShowUserData(false)}} className="user-dashboard-return-button">Return</button> */}
    </div>
  )
}

export default User