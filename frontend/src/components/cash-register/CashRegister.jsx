import React, { useContext } from 'react'
import InternalTopbar from '../internal-topbar/InternalTopbar'
import InternalOptions from '../internal-options/InternalOptions'
import './cashRegister.css'
import { CashRegisterContext } from '../../contexts/CashRegisterContext'

const CashRegister = () => {
  const cashRegisterContext = useContext(CashRegisterContext)
  return (
    <div className='cashRegister'>
        <InternalTopbar text={"Cash register"}/>
        <InternalOptions context={cashRegisterContext} options={['Refill','Refund','Postpaid sessions','Shop']}/>
    </div>
  )
}

export default CashRegister