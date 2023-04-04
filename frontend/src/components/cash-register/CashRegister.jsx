import React from 'react'
import InternalTopbar from '../internal-topbar/InternalTopbar'
import InternalOptions from '../internal-options/InternalOptions'
import './cashRegister.css'

const CashRegister = () => {
  return (
    <div className='cashRegister'>
        <InternalTopbar text={"Cash register"}/>
        <InternalOptions options={['Refill','Refund','Postpaid sessions','Shop']}/>
    </div>
  )
}

export default CashRegister