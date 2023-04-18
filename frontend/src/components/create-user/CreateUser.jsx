import React, { useContext, useState } from 'react';
import './createUser.css';
import { createUser } from '../../config';
import { AppContext } from '../../contexts/AppContext';

const CreateUser = () => {
  const { setShouldShowCreateUser } = useContext(AppContext)
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
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
    if (result.error) { console.error(result.error); return; };
    console.info(result)
    setShouldShowCreateUser(false);
  };

  return (
    <div onClick={() => { setShouldShowCreateUser(false) }} className="create-user-container">
      <div className="create-user-form" onClick={(e) => { e.stopPropagation() }}>
        <h1>Create User</h1>
        <input type="text" style={{ display: "none" }} />
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
          <button onClick={() => { setShouldShowCreateUser(false) }} className="cancelCreation">Cancel</button>
          <button onClick={onSave} disabled={isSaveDisabled} className={`saveCreation ${isSaveDisabled ? 'halfOpacity' : ''}`}>Save</button>
        </div>
      </div>
      {/* <div className="create-user-error">
        Error.
      </div> */}
    </div>
  );
};

export default CreateUser;
