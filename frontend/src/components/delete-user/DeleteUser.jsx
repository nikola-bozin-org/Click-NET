import React from 'react'
import './DeleteUser.css'
import { useContext } from 'react'
import { UsersContext } from '../../contexts/UsersContext'
import HandleButton from '../handle-button/HandleButton'
import {deleteUser} from '../../config'
import { AppContext } from '../../contexts/AppContext'

const DeleteUser = ({username}) => {
  const usersContext = useContext(UsersContext);  
  const appContext = useContext(AppContext);

  const onCancel = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    usersContext.setShowDeleteUser(false);
  }
  const onDelete = async(e)=>{
    e.preventDefault();
    e.stopPropagation();
    const response = await fetch(deleteUser, {
      headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('accessToken')
      },
      method:"DELETE",
      body:JSON.stringify({username:username})
    });
    const result = await response.json();
    if(result.error) {console.error(result.error); return}
    usersContext.setShowDeleteUser(false);
    initiateDeletion();
    appContext.deleteUser(result.username)
  }
  
  const initiateDeletion = async () => {
    usersContext.setShouldAnimateDelete(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    usersContext.setShowUserData(false);
    usersContext.setShouldAnimateDelete(false);

  };

  return (
    <div className='DeleteUser'>
      <form className="delete-user-form">
        <p className='delete-user-form-are-you-sure'>Delete user <br/><span style={{fontSize:'1.7rem'}}>{username}?</span></p>
        <div className="delete-user-buttons">
        <HandleButton onClick={(e)=>{onCancel(e)}} text={'Cancel'} className={'delete-user-cancel'}/>
        <HandleButton circleColor='#cc2234' onClick={(e)=>{onDelete(e)}} text={'Accept'} className={'delete-user-accept'}/>
        </div>
      </form>
    </div>
  )
}

export default DeleteUser