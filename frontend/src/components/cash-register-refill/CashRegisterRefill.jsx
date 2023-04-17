import React from 'react'
import './CashRegisterRefill.css'
import Table from '../table/Table'
import { useState, useEffect, useRef } from 'react';
import { fixPaymentsDate, formatNumber } from '../../utils'
import coins from '../../images/dollar.png'
import {getCurrentSessionPayments} from '../../config'

const CashRegisterRefill = () => {
  const circleRef = useRef(null);
  const inputAmountRef = useRef(null);
  const inputUsernameRef = useRef(null);
  const [shouldDisableRefill, setShouldDisableRefill] = useState(false);
  const [showInformation, setShowInformation] = useState(false);
  const [shouldShowError,setShouldShowError] = useState(false);
  const [informationText, setInformationText] = useState('');
  const [amount, setAmount] = useState('');
  const [username, setUsername] = useState('');
  const [currentCashRegisterSessionPayments, setCurrentCashRegisterSessionPayments] = useState([]);
  const [timerId, setTimerId] = useState(null);
  const [showDailyRevenue, setShowDailyRevenue] = useState(false);
  const [totalRevenue,setTotalRevenue]=useState(0);
  const [cashierBalance,setCashierBalance]=useState(0);


  useEffect(() => {
    const currentCashRegisterPayments = async () => {
      const response = await fetch(getCurrentSessionPayments, {
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('accessToken')
        }
      });
      const result = await response.json();
      if (result.error) {console.error(result.error); return }
      setCurrentCashRegisterSessionPayments(result.currentSessionPayments)
      const total = result.currentSessionPayments.reduce((total,objectData)=> total + objectData.paymentAmount,0)
      setCashierBalance(total);
      setTotalRevenue(total);
    };
    currentCashRegisterPayments();
  }, []);
  
  const handleRefill = async () => {
    setShowInformation(false);
    setShouldDisableRefill(true);
    inputAmountRef.current.value = '';
    inputUsernameRef.current.value = '';
    setUsername('');
    setAmount('');
    clearTimeout(timerId);
      // const response = await fetch('http://localhost:9876/api/payments/payment', {
      const response = await fetch('https://clicknet-server.onrender.com/api/payments/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        username: username,
        payment: amount
      }),
    });
    setShouldDisableRefill(false);
    setShowInformation(true);
    const result = await response.json();
    if (result.error) {
      setInformationText(result.error)
      setShouldShowError(true);
      const newTimerId = setTimeout(() => {
        setShowInformation(false);
      }, 6000);
      setTimerId(newTimerId);
      return;
    }else if(result.paymentProcessed){
      setCurrentCashRegisterSessionPayments([...currentCashRegisterSessionPayments,result.tableData])
      setInformationText("Payment Accepted!")
      setShouldShowError(false);
      setTotalRevenue(totalRevenue+result.tableData.paymentAmount)
      setCashierBalance(cashierBalance+result.tableData.paymentAmount)
      const newTimerId = setTimeout(() => {
        setShowInformation(false);
      }, 2000);
      setTimerId(newTimerId);
    }
  };
  const handleMouseEnter = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    circleRef.current.style.left = `${x}px`;
    circleRef.current.style.top = `${y}px`;
  };

  return (
    <div className='cash-register-refill'>
      <div className="cash-register-refill-left">
        <input ref={inputAmountRef} onChange={(e) => setAmount(e.target.value)} className="cash-register-refill-amount" type='number' placeholder='Amount' />
        <input ref={inputUsernameRef} onChange={(e) => setUsername(e.target.value)} className="cash-register-refill-username" type='text' placeholder='Username' />
        <button disabled={shouldDisableRefill} onMouseEnter={handleMouseEnter} onClick={handleRefill} className={`cash-register-refill-button ${shouldDisableRefill ? `halfOpacity` : ``}`}>
          <div ref={circleRef} className='circle'></div>
          <p className='cash-register-refill-button-text'>Refill</p>
        </button>
        {showInformation && <div className={`cash-register-${shouldShowError?'error':'confirm'}`}>
          <p>{informationText}</p>
        </div>}
      </div>
      <div className="cash-register-refill-right">
        <div className="cash-register-refill-right-topbar">
            <button className="cash-register-refill-right-topbar-zReport">Z Report</button>
          <div
            onMouseEnter={() => setShowDailyRevenue(true)}
            onMouseLeave={() => setShowDailyRevenue(false)}
           className="cash-register-refill-right-topbar-current-cash-register-total-balance">
            <p>Balance:</p>
            <img src={coins} alt="" className="cash-register-refill-right-topbar-coins" />
            {showDailyRevenue && <DailyRevenue dailyRevenue={totalRevenue} cashierBalance={cashierBalance} />}
          </div>
        </div>
        <Table headers={['username', 'Amount', 'Date', 'Receipt']}
          tableData={fixPaymentsDate(currentCashRegisterSessionPayments).reverse()}
          shouldRoundEdges={false}
        />
      </div>
    </div>
  )
}

const DailyRevenue = ({dailyRevenue,cashierBalance})=>{
  return (
    <div className="daily-revenue">
      <div className='daily-revenue-total'>
        <p>Daily revenue:</p>
        <p className='revnue-value'> {formatNumber(dailyRevenue)}</p>
      </div>
      <div className="daily-revenue-cashier">
        <p>Cashier balance:</p>
        <p className='revnue-value'>{formatNumber(cashierBalance)}</p>
        </div>
    </div>
  )
}

export default CashRegisterRefill