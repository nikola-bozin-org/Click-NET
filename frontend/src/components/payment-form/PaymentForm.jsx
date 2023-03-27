import React from 'react'
import './paymentForm.css'
import { useState } from 'react';

const PaymentForm = () => {
    const [username, setUsername] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Username:', username, 'Payment Amount:', paymentAmount);
      // Handle form submission logic here
    };
  
    return (
      <div className="payment-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
  
          <label htmlFor="paymentAmount">Payment Amount:</label>
          <input
            type="number"
            id="paymentAmount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
  
          <button className='payButton' type="submit">Pay</button>
        </form>
        </div>
    )
}

export default PaymentForm