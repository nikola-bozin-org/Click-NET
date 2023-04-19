import React from 'react'
import './CloseCashRegister.css'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'
import { closeCashRegisterSession } from '../../config'
import { useState } from 'react'
import HandleButton from '../handle-button/HandleButton'

const CloseCashRegister = () => {
  const [password, setPassword] = useState('');
  const { setShouldShowCloseCashRegister,setIsCashRegisterOpen } = useContext(AppContext)

  const onYesClicked = async ()=>{
    const response = await fetch(closeCashRegisterSession,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'token': localStorage.getItem('accessToken')
      },
      body:JSON.stringify({password})
    })
    const result = await response.json();
    if (result.error) {
       console.error(result.error);
        return;
    };
    if(result.sessionClosed){
      setShouldShowCloseCashRegister(false);
      setIsCashRegisterOpen(false);
    }
  }

  return (
    <div onClick={() => { setShouldShowCloseCashRegister(false) }} className='close-cash-register'>
      <div onClick={(e) => e.stopPropagation()} className="close-cash-register-wrap">
        Close Cash Register Session?
        <div className="close-cash-register-inputs">
          <p htmlFor="password">Password:</p>
          <input placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete='off' type="password" id="password" name="password" required />
        </div>
        <div className="close-cash-register-control-buttons">
          <HandleButton onClick={() => { setShouldShowCloseCashRegister(false)}} className={`close-cash-register-cancel`}  text={"Cancel"}/>
          <HandleButton onClick={onYesClicked} className={`close-cash-register-yes`} text={"Yes"}/>
        </div>
      </div>
    </div>
  )
}

export default CloseCashRegister