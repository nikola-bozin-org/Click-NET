import React, { useContext, useState } from 'react';
import './createUser.css';
import { createUser } from '../../config';
import { AppContext } from '../../contexts/AppContext';
import FetchError from '../fetch-error/FetchError';
import HandleButton from '../handle-button/HandleButton'

const CreateUser = () => {
  const { setShouldShowCreateUser,updateUsers,users } = useContext(AppContext)
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [shouldShowError,setShouldShowError] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSave = async (event) => {
    event.preventDefault();
    setIsSaveDisabled(true);
    const response = await fetch(createUser, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('accessToken')
      },
      body: JSON.stringify(formData)
    })
    const result = await response.json();
    setIsSaveDisabled(false);
    if (result.error) { setShouldShowError(true); setErrorMessage(result.error); return; };
    setShouldShowCreateUser(false);
    if(!result.userCreated) return;
    updateUsers(result.user);
  };

  return (
    <div onClick={() => { setShouldShowCreateUser(false) }} className="create-user-container">
      <form autoComplete="off" className="create-user-form" onClick={(e) => { e.stopPropagation() }}>
        <h1>Create User</h1>
        <p htmlFor="username">*Username:</p>
        <input autoComplete='off' type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required />
        <p htmlFor="password">*Password:</p>
        <input autoComplete='off' type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />

        <p htmlFor="firstName">First Name:</p>
        <input autoComplete='off' type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />

        <p htmlFor="lastName">Last Name:</p>
        <input autoComplete='off' type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />

        <p htmlFor="email">Email:</p>
        <input autoComplete='off' type="text" id="email" name="email" value={formData.email} onChange={handleInputChange} required />

        <p htmlFor="phone">Phone:</p>
        <input autoComplete='off' type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
        <div className="controlButtons">
          <HandleButton onClick={() => { setShouldShowCreateUser(false) }} className={'cancelCreation'} text={'Cancel'} />
          <HandleButton onClick={onSave} disabled={isSaveDisabled} className={`saveCreation ${isSaveDisabled ? 'halfOpacity' : ''}`} text={'Save'}/>
        </div>
      </form>
      <FetchError marginTopValue={30} showMessage={shouldShowError} message={errorMessage} onDelayCompleted={()=>{setShouldShowError(false);}}/>
    </div>
  );
};

export default CreateUser;
