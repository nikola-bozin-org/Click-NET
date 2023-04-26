import React, { useContext,useState,useRef } from 'react';
import './CashRegisterRefund.css';
import { PaymentsTable } from '../cash-register-refill/CashRegisterRefill';
import { CashRegisterContext } from '../../contexts/CashRegisterContext';
import HandleButton from '../handle-button/HandleButton';
import FetchError from '../fetch-error/FetchError';
import FetchSuccess from '../fetch-success/FetchSuccess';

const CashRegisterRefund = () => {
  const inputUsernameRef = useRef(null);
  const [shouldDisableRefill, setShouldDisableRefill] = useState(false);
  const [shouldShowError,setShouldShowError] = useState(false);
  const [shouldShowSuccess,setShouldShowSuccess] = useState(false);
  const [informationText, setInformationText] = useState('');
  const [receiptNumber,setReceiptNumber]=useState('');
  const cashRegisterContext = useContext(CashRegisterContext);

  const handleRefund = ()=>{
    console.info('Refund')
  }

  return (
    <div className='CashRegisterRefund'>
        <div className="cash-register-refund-left">
        <input ref={inputUsernameRef} onChange={(e) => setReceiptNumber(e.target.value)} className="cash-register-refill-username" type='text' placeholder='Receipt' />
        <HandleButton shouldDisable={shouldDisableRefill}  onClick={handleRefund} text={"Refund"} className={`cash-register-refill-button ${shouldDisableRefill ? `halfOpacity` : ``}`}/>
        <FetchError showMessage={shouldShowError} message={informationText} onDelayCompleted={()=>{setShouldShowError(false)}} />
        <FetchSuccess showMessage={shouldShowSuccess} message={informationText} onDelayCompleted={()=>{setShouldShowSuccess(false)}}/>
        </div>
          <PaymentsTable totalRevenue={cashRegisterContext.totalRevenue} cashierBalance={cashRegisterContext.cashierBalance} currentCashRegisterSessionPayments={cashRegisterContext.currentCashRegisterSessionPayments}/>
    </div>
  )
}

export default CashRegisterRefund