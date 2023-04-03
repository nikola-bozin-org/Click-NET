import React from 'react';
import './sidebar.css';

const Sidebar = ({changeComponent}) => {
  return (
    <div className="sidebar">
      <div onClick={()=>{changeComponent(1)}} className="sidebar-button">Dashboard</div>
      <div onClick={()=>{changeComponent(2)}} className="sidebar-button">Payments</div>
      <div onClick={()=>{changeComponent(3)}} className="sidebar-button">PCMap</div>
      <div onClick={()=>{changeComponent(4)}} className="sidebar-button">PaymentsFrom</div>
      <div onClick={()=>{changeComponent(5)}} className="sidebar-button">CreateUser</div>
    </div>
  );
};

export default Sidebar;
