import React from 'react';
import './ShutDown.css';
import HandleButton from '../../handle-button/HandleButton'
import { useSelector } from 'react-redux';

const ShutDown = ({text,onConfirm,onCancel}) => {
  const currentSelectedNumber = useSelector((state)=>state.workstations.currentSelectedWorkstationNumber)
  return (
    <div className="shutdown-wrapper">
    <div className='ShutDown' >
        <div className="shut-down-confirmation">
            <p className="shut-down-confirmation-text">{`${text} ${currentSelectedNumber}?`}</p>
            <div className="shut-down-buttons">
                <HandleButton text={'Cancel'} onClick={onConfirm} className={'cancel-button-default'}/>
                <HandleButton text={'Yes'} onClick={onCancel} className={'confirm-button-default'}/>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ShutDown