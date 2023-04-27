import React, { useContext } from 'react'
import InternalTopbar from '../internal-topbar/InternalTopbar'
import InternalOptions from '../internal-options/InternalOptions'
import './cashRegister.css'
import { CashRegisterContext } from '../../contexts/CashRegisterContext'
import CashRegisterRefill from '../cash-register-refill/CashRegisterRefill'
import { AppContext } from '../../contexts/AppContext'
import HandleButton from '../handle-button/HandleButton'
import CashRegisterRefund from '../cash-register-refund/CashRegisterRefund'

const CashRegister = ({centerName}) => {
  const cashRegisterContext = useContext(CashRegisterContext)
  const {setShouldShowCloseCashRegister} = useContext(AppContext);
  return (
    <div className='cashRegister'>
      <div className="cash-register-internal-topbar-wrapper">
        <InternalTopbar text={`Cash register ${centerName}`}/>
        <HandleButton shouldDisable={false} onClick={()=>{setShouldShowCloseCashRegister(true)}} text={"Close"} className={"cash-register-close-session-button"} circleColor='#cc2234'/>
      </div>
        <InternalOptions context={cashRegisterContext} options={['Refill','Refund']}/>
        {(() => {
          switch (cashRegisterContext.currentSelectionInternalOption) {
            case 0: return <CashRegisterRefill/>;
            case 1: return <CashRegisterRefund/>;
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