import React from 'react';
import './sidebar.css';


const Sidebar = ({changeComponent, IDs, images,currentSelectedComponent}) => {
  return (
    <div className="sidebar">
      <div className="sidebarButtons">
        {IDs.map((id) => (
          <SidebarElement isSelected={currentSelectedComponent===id} key={id} img={images[id]} onClick={changeComponent} myId={id} />
          ))}
      </div>
    </div>
  );
};

const SidebarElement = ({img,onClick,myId, isSelected})=>{
  return (
    <div onClick={()=>{onClick(myId)}} className={`sidebarElement ${isSelected?`blackBackground`:``}`}>
      <img src={img} alt="" className={` sidebar-button invertColor`}/>
    </div>
  )
}

export default Sidebar;
