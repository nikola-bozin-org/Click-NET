import React from 'react'
import './CashRegisterRefill.css'
import Table from '../table/Table'
import { useState, useEffect, useContext } from 'react';


const extractHours = (date)=>{
  const dateObj = new Date(date);
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;
  return time;
}
const fixPaymentsDate = (payments)=>{
  const updatedPayments = payments.map((payment) => {
    return {
      ...payment,
      paymentDate: extractHours(payment.paymentDate),
    };
  });
  return updatedPayments;
}


const CashRegisterRefill = () => {
  const [amount, setAmount] = useState('');
  const [username, setUsername] = useState('');
  const [currentCashRegisterSessionPayments,setCurrentCashRegisterSessionPayments] = useState([]);
  useEffect(() => {
    const currentCashRegisterPayments = async () => {
        const response = await fetch('https://clicknet-server.onrender.com/api/cashRegister/getCurrentSessionPayments', {
          headers: {
            'Content-Type': 'application/json',
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjgxMDMyMDg1fQ.UDfyGTqRvklBnRPmybpbEtaXGjoPX-SIkklZwK--NX4'
          }
        });
        const result = await response.json();
        if(result.error) {console.error(result.error); return}
        setCurrentCashRegisterSessionPayments(result.currentSessionPayments)
    };

    currentCashRegisterPayments();
  }, []);

  const handleRefill = async () => {
    const response = await fetch('https://clicknet-server.onrender.com/api/payments/payment', {
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
    const result = await response.json();
    if(result.error){console.error(result.error);return};
    console.info(result);
  };

  return (
    <div className='cash-register-refill'>
      <div className="cash-register-refill-left">
        <input onChange={(e) => setAmount(e.target.value)} className="cash-register-refill-amount" typeof='text' placeholder='Amount'/>
        <input onChange={(e) => setUsername(e.target.value)} className="cash-register-refill-username" typeof='text' placeholder='Username'/>
        <button onClick={handleRefill} className='cash-register-refill-button'>Refill</button>
      </div>
      <div className="cash-register-refill-right">
        <Table headers={['username','paymentAmount','paymentDate','receipt']}
         tableData={fixPaymentsDate(currentCashRegisterSessionPayments).reverse()}
         />
      </div>
    </div>
  )
}

export default CashRegisterRefill