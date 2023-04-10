import React, { useContext } from 'react'
import InternalTopbar from '../internal-topbar/InternalTopbar'
import InternalOptions from '../internal-options/InternalOptions'
import './cashRegister.css'
import { CashRegisterContext } from '../../contexts/CashRegisterContext'
import CashRegisterRefill from '../cash-register-refill/CashRegisterRefill'

const CashRegister = () => {
  const cashRegisterContext = useContext(CashRegisterContext)
  return (
    <div className='cashRegister'>
        <InternalTopbar text={"Cash register"}/>
        <InternalOptions context={cashRegisterContext} options={['Refill','Refund','Postpaid sessions','Shop']}/>
        {(() => {
          switch (cashRegisterContext.currentSelectionInternalOption) {
            case 0: return <CashRegisterRefill/>;
            case 1: return <>1</>;
            case 2: return <>2</>;
            case 3: return <>3</>;
            default:
              return ;
          }
        })()}
    </div>
  )
}

export default CashRegister