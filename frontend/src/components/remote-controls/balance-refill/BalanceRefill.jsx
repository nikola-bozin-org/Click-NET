import React from 'react'
import './BalanceRefill.css'
import { useContext } from 'react'
import { CenterContext } from '../../../contexts/CenterContext'
import { useSelector } from 'react-redux'
import HandleButton from '../../handle-button/HandleButton'

const BalanceRefill = ({ username, onCancel, onConfirm }) => {
  const { currency } = useContext(CenterContext);
  const centerName = useSelector((state) => state.other.centerName)
  return (
    <div className='BalanceRefill'>
      <div className="balance-refill-data">
        <p className="balance-refill-username">{`Balnce refill for user ${username}`}</p>
        <div className="balance-refill-inputs">
          <p htmlFor="amount">Amount:</p>
          <div className="input-amount-and-currency">
            <input className='balance-refill-input' autoComplete='off' type="number" id="amount" name="phone" required />
            <p className='balance-refill-currency'>{currency}</p>
          </div>
          <p className='balance-refill-center-name'>{centerName}</p>
        </div>
        <div className="balance-refill-buttons">
          <HandleButton text={'Cancel'} onClick={onCancel} className={'cancel-button-default'} />
          <HandleButton text={'Refill'} onClick={onConfirm} className={'confirm-button-default'} />
        </div>
      </div>
    </div>
  )
}

export default BalanceRefill