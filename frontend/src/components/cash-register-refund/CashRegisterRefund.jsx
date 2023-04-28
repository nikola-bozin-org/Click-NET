import React, { useContext, useState, useRef } from 'react';
import './CashRegisterRefund.css';
import { PaymentsTable } from '../cash-register-refill/CashRegisterRefill';
import { CashRegisterContext } from '../../contexts/CashRegisterContext';
import HandleButton from '../handle-button/HandleButton';
import FetchError from '../fetch-error/FetchError';
import FetchSuccess from '../fetch-success/FetchSuccess';
import { paymentByReceipt } from '../../config';
import enter from '../../images/enter.png'

const CashRegisterRefund = () => {
  const inputReceiptRef = useRef(null);
  const [shouldDisableRefill, setShouldDisableRefill] = useState(false);
  const [shouldShowError, setShouldShowError] = useState(false);
  const [shouldShowSuccess, setShouldShowSuccess] = useState(false);
  const [informationText, setInformationText] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');
  const cashRegisterContext = useContext(CashRegisterContext);
  const [showRefundButton, setShowRefundButton] = useState(false);
  const [currentReceiptData, setCurrentReceiptData] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchPaymentByReceipt();
    }
  }
  const fetchPaymentByReceipt = async () => {
    const response = await fetch(paymentByReceipt, {
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        receipt: receiptNumber
      }),
      method: "POST"
    })
    const result = await response.json();
    if (result.error) { console.error(result.error); return }
    setCurrentReceiptData(result.payment)
    console.info(result)
  }

  const handleRefund = () => {
    console.info('Refund')
  }

  return (
    <div className='CashRegisterRefund'>
      <div className="cash-register-refund-left">
        <div className="input-container-receipt">
          <div className="input-wrapper">
            <input onKeyDown={handleKeyDown} ref={inputReceiptRef} onChange={(e) => setReceiptNumber(e.target.value)} className="cash-register-refill-username refund-actually" type='text' placeholder='Receipt' />
            <img src={enter} alt="" className="cash-register-refill-username-actually-receipt-img" />
          </div>
        </div>
        <div className="cash-register-refund-receipt-status">
          <div className="receipt-status">
            <p className="receipt-status-text">
              Status:
            </p>
            <p className="receipt-status-value">
              {`${currentReceiptData ? `` : '...'}`}
            </p>
          </div>
          <div className="receipt-amount-can-refund">
            <p className="receipt-amount-can-refund-text">
              Available amount to refund:
            </p>
            <p className="receipt-amount-can-refund-value">
              {`${currentReceiptData ? `` : '...'}`}
            </p>
          </div>
        </div>
        {showRefundButton && <HandleButton shouldDisable={shouldDisableRefill} onClick={handleRefund} text={"Refund"} className={`cash-register-refund-button ${shouldDisableRefill ? `halfOpacity` : ``}`} />}
        <FetchError showMessage={shouldShowError} message={informationText} onDelayCompleted={() => { setShouldShowError(false) }} />
        <FetchSuccess showMessage={shouldShowSuccess} message={informationText} onDelayCompleted={() => { setShouldShowSuccess(false) }} />
      </div>
      <PaymentsTable totalRevenue={cashRegisterContext.totalRevenue} cashierBalance={cashRegisterContext.cashierBalance} currentCashRegisterSessionPayments={cashRegisterContext.currentCashRegisterSessionPayments} />
    </div>
  )
}

export default CashRegisterRefund