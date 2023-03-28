import React from 'react';
import './sidebar.css';

const Sidebar = ({changeComponent}) => {
  return (
    <div className="sidebar">
      <div onClick={()=>{changeComponent(1)}} className="sidebar-button">Button1</div>
      <div onClick={()=>{changeComponent(2)}} className="sidebar-button">Button2</div>
      <div onClick={()=>{changeComponent(3)}} className="sidebar-button">Button3</div>
      <div onClick={()=>{changeComponent(4)}} className="sidebar-button">Button4</div>
      <div onClick={()=>{changeComponent(5)}} className="sidebar-button">Button5</div>
    </div>
  );
};

export default Sidebar;
