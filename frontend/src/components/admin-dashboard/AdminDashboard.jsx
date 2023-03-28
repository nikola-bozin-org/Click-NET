import React, { useState } from 'react'
import './adminDashboard.css'
import { Navigate } from 'react-router-dom';
import preventUnauthorized from '../preventUnauthorized/preventUnauthorized';
import PaymentsTable from '../payments-table/PaymentsTable';
import PaymentForm from '../payment-form/PaymentForm';
import CreateUser from '../create-user/CreateUser'

const AdminDashboard = () => {
  const [shouldChangeToLogin,setShouldChangeToLogin]= useState(false);

  const logout = async (e)=>{


    e.preventDefault();
    try{
        const response = await fetch(
        "https://click-net-test.onrender.com/api/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "token":localStorage.getItem('accessToken')
          },
        }
      );
      const data = await response.json();
      if(data.error){
        console.error(data.error);
        return;
      }
      localStorage.clear();
      console.info(data.message);
      setShouldChangeToLogin(true);

    }catch(e){
      console.error("Something went wrong. " + e);
    }
  }

  if(shouldChangeToLogin) return <Navigate to="/login" />

  if(!localStorage.getItem('accessToken')) return <div>Unauthorized</div>
  return (
    <>
    <div className='admin-dashboard'>
      <CreateUser/>
      <PaymentForm/>
      <PaymentsTable/>
      <button onClick={(e)=>{logout(e)}}>Logout</button>
    </div>
    </>
  )
}

export default preventUnauthorized(AdminDashboard)