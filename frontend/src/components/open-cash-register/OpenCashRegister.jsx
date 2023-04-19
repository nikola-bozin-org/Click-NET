import React from 'react'
import './OpenCashRegister.css'
import HandleButton from '../handle-button/HandleButton'
import FetchError from '../fetch-error/FetchError'
import { useState } from 'react'
import {openCashRegisterSession} from '../../config'

const OpenCashRegister = () => {
    const [shouldDisableOpenButton,setShouldDisableOpenButton] = useState(false);
    const [shouldShowFetchError,setShouldShowFetchError] = useState(false);
    const [fetchErrorMessage,setFetchErrorMessage] = useState('');

    const fetchOpenCashRegister = async()=>{
        setShouldDisableOpenButton(true);
        setShouldShowFetchError(false);
        setFetchErrorMessage('');
        console.info(openCashRegisterSession)
        const response = await fetch(openCashRegisterSession, {
          headers: {
            'Content-Type': 'application/json',
            'token':localStorage.getItem('accessToken')
          }
        });
        const result = await response.json();
        if(result.error) {
            console.info(result.error)
            setFetchErrorMessage(response.error);
            setShouldShowFetchError(true);
            setShouldDisableOpenButton(false);
            return;
        }
        setShouldDisableOpenButton(false);
      }

    return (
        <div className='open-cash-register'>
            <p className="open-cash-register-center-name">Click Esport</p>
            <HandleButton shouldDisable={shouldDisableOpenButton} onClick={fetchOpenCashRegister} text={"Open"} className={'open-cash-register-open-button'} />
            <FetchError showMessage={shouldShowFetchError} message={fetchErrorMessage} onDelayCompleted={()=>{setShouldShowFetchError(false)}} />
        </div>
    )
}

export default OpenCashRegister