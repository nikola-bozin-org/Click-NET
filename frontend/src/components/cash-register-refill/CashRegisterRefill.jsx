import React from 'react'
import './CashRegisterRefill.css'
import Table from '../table/Table'
import { useState, useEffect, useRef } from 'react';
import { fixPaymentsDate } from '../../utils'


const CashRegisterRefill = () => {
  const circleRef = useRef(null);
  const inputAmountRef = useRef(null);
  const inputUsernameRef = useRef(null);
  const [shouldDisableRefill, setShouldDisableRefill] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [amount, setAmount] = useState('');
  const [username, setUsername] = useState('');
  const [currentCashRegisterSessionPayments, setCurrentCashRegisterSessionPayments] = useState([]);
  useEffect(() => {
    const currentCashRegisterPayments = async () => {
      const response = await fetch('https://clicknet-server.onrender.com/api/cashRegister/getCurrentSessionPayments', {
        // const response = await fetch('http://localhost:9876/api/cashRegister/getCurrentSessionPayments', {
        headers: {
          'Content-Type': 'application/json',
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjgxMDMyMDg1fQ.UDfyGTqRvklBnRPmybpbEtaXGjoPX-SIkklZwK--NX4'
        }
      });
      const result = await response.json();
      if (result.error) { console.error(result.error); return }
      setCurrentCashRegisterSessionPayments(result.currentSessionPayments)
    };

    currentCashRegisterPayments();
  }, []);

  const handleRefill = async () => {
    setShowError(false);
    setShouldDisableRefill(true);
    inputAmountRef.current.value = '';
    inputUsernameRef.current.value = '';
      const response = await fetch('http://localhost:9876/api/payments/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjgxMDMyMDg1fQ.UDfyGTqRvklBnRPmybpbEtaXGjoPX-SIkklZwK--NX4'
      },
      body: JSON.stringify({
        username: username,
        payment: amount
      }),
    });
    setShouldDisableRefill(false);
    const result = await response.json();
    if (result.error) {
      setErrorText(result.error)
      setShowError(true);
      return;
    };
    console.info(result);
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
        {showError && <div className="cash-register-error">
          <p>{errorText}</p>
        </div>}
      </div>
      <div className="cash-register-refill-right">
        <Table headers={['username', 'paymentAmount', 'paymentDate', 'receipt']}
          tableData={fixPaymentsDate(currentCashRegisterSessionPayments).reverse()}
        />
      </div>
    </div>
  )
}

export default CashRegisterRefill