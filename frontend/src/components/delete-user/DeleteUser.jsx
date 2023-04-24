import React from 'react'
import './DeleteUser.css'
import { useContext } from 'react'
import { UsersContext } from '../../contexts/UsersContext'
import HandleButton from '../handle-button/HandleButton'

const DeleteUser = ({username}) => {
  const usersContext = useContext(UsersContext);

  const onCancel = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    usersContext.setShowDeleteUser(false);
  }
  const onDelete = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    console.info("DELETE USER")
  }

  return (
    <div className='DeleteUser'>
      <form className="delete-user-form">
        <p className='delete-user-form-are-you-sure'>Delete user <br/>{username}?</p>
        <div className="delete-user-buttons">
        <HandleButton onClick={(e)=>{onCancel(e)}} text={'Cancel'} className={'delete-user-cancel'}/>
        <HandleButton circleColor='#cc2234' onClick={(e)=>{onDelete(e)}} text={'Accept'} className={'delete-user-accept'}/>
        </div>
      </form>
    </div>
  )
}

export default DeleteUser