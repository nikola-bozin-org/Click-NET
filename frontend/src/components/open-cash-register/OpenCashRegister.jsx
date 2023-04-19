import React from 'react'
import './OpenCashRegister.css'
import HandleButton from '../handle-button/HandleButton'
import FetchError from '../fetch-error/FetchError'
import { useState } from 'react'
import { openCashRegisterSession } from '../../config'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'

const OpenCashRegister = () => {
  const [shouldDisableOpenButton, setShouldDisableOpenButton] = useState(false);
  const [shouldShowFetchError, setShouldShowFetchError] = useState(false);
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');
  const { setIsCashRegisterOpen } = useContext(AppContext);
  const [password,setPassword] = useState('');

  const fetchOpenCashRegister = async () => {
    setShouldDisableOpenButton(true);
    setShouldShowFetchError(false);
    setFetchErrorMessage('');
    const response = await fetch(openCashRegisterSession, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('accessToken')
      },
      method: "POST",
      body: JSON.stringify({
        'password': password
      })
    });
    const result = await response.json();
    if (result.error) {
      setFetchErrorMessage(result.error);
      setShouldShowFetchError(true);
      setShouldDisableOpenButton(false);
      return;
    }
    setShouldDisableOpenButton(false);
    setIsCashRegisterOpen(true);
  }

  return (
    <div className='open-cash-register'>
      <p className="open-cash-register-center-name">Click Esport</p>
      <input
        autoComplete="off"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='password-reauth'
        placeholder='password'
      />
      <HandleButton shouldDisable={shouldDisableOpenButton} onClick={fetchOpenCashRegister} text={"Open"} className={'open-cash-register-open-button'} />
      <FetchError showMessage={shouldShowFetchError} message={fetchErrorMessage} onDelayCompleted={() => { setShouldShowFetchError(false) }} />
    </div>
  )
}

export default OpenCashRegister