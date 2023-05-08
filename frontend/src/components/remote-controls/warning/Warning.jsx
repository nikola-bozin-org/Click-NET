import React from 'react'
import './Warning.css'
import HandleButton from '../../handle-button/HandleButton'

const Warning = ({ username,onCancel,onConfirm }) => {
    return (
        <div className='Warning'>
            <div className="warning-content">
                <div className="warning-content-user">
                    {`Warning for ${username}`}
                </div>
                <div className="warning-content-inputs">
                    <p className='warning-title-text' htmlFor="warning">Warning:</p>
                    <input className='warning-input' autoComplete='off' type="text" id="warning" name="warning" required />
                </div>
                <div className="warning-buttons">
                    <HandleButton text={'Cancel'} onClick={onCancel} className={'cancel-button-default'} />
                    <HandleButton text={'Yes'} onClick={onConfirm} className={'confirm-button-default'} />
                </div>
            </div>
        </div>
    )
}

export default Warning