import React from 'react'
import './CashRegisterRefill.css'
import Table from '../table/Table'
import { useState, useEffect, useContext } from 'react';

const CashRegisterRefill = () => {
  useEffect(() => {
    const currentCashRegisterPayments = async () => {
        const response = await fetch('https://clicknet-server.onrender.com/api/cashRegister/getCurrentSession', {
          headers: {
            'Content-Type': 'application/json',
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjgxMDMyMDg1fQ.UDfyGTqRvklBnRPmybpbEtaXGjoPX-SIkklZwK--NX4'
          }
        });
        const result = await response.json();
        if(result.error) {console.error(result.error); return}
        console.info(result);
    };

    currentCashRegisterPayments();
  }, []);

  return (
    <div className='cash-register-refill'>
      <div className="cash-register-refill-left">

      </div>
      <div className="cash-register-refill-right">
        <Table headers={['','','','']} tableData={[]}/>
      </div>
    </div>
  )
}

export default CashRegisterRefill