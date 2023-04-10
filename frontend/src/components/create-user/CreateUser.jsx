import React, { useContext, useState } from 'react';
import './createUser.css';
import { UsersContext } from '../../contexts/UsersContext';

const CreateUser = () => {
  const { setShouldShowCreateUser } = useContext(UsersContext)
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
    const response = await fetch('https://clicknet-server.onrender.com/api/users/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjgxMDMyMDg1fQ.UDfyGTqRvklBnRPmybpbEtaXGjoPX-SIkklZwK--NX4'
      },
      body: JSON.stringify(formData)
    })
    const result = await response.json();
    setIsSaveDisabled(false);
    if(result.error) {console.error(result.error); return;};
    console.info(result)
    setShouldShowCreateUser(false);
  };

  return (
    <div className="create-user-container">
      <div className="create-user-form" onSubmit={onSave}>
        <h1>Create User</h1>
        <p htmlFor="username">*Username:</p>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required />

        <p htmlFor="password">Password:</p>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />

        <p htmlFor="firstName">First Name:</p>
        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />

        <p htmlFor="lastName">Last Name:</p>
        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />

        <p htmlFor="email">Email:</p>
        <input type="text" id="email" name="email" value={formData.email} onChange={handleInputChange} required />

        <p htmlFor="phone">Phone:</p>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
        <div className="controlButtons">
          <button onClick={()=>{setShouldShowCreateUser(false)}} className="cancelCreation">Cancel</button>
          <button onClick={onSave} disabled={isSaveDisabled} className={`saveCreation ${isSaveDisabled?'halfOpacity':''}`}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
