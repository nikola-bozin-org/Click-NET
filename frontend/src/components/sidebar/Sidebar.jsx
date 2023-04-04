import React from 'react';
import './sidebar.css';
import dashboard from '../../images/dashboard.png'
import pay from '../../images/pay.png'
import pcMap from '../../images/site-map.png'
import users from '../../images/user-avatar.png'

const Sidebar = ({ changeComponent }) => {
  return (
    <div className="sidebar">
      <div className="sidebarButtons">
        <img alt='' src={dashboard} onClick={() => { changeComponent(1) }} className="sidebar-button"></img>
        <img alt='' src={pay} onClick={() => { changeComponent(2) }} className="sidebar-button"></img>
        <img alt='' src={pcMap} onClick={() => { changeComponent(3) }} className="sidebar-button"></img>
        <img alt='' src={pay} onClick={() => { changeComponent(4) }} className="sidebar-button"></img>
        <img alt='' src={users} onClick={() => { changeComponent(5) }} className="sidebar-button"></img>
      </div>
    </div>
  );
};

export default Sidebar;
