import React, { useContext } from 'react';
import './sidebar.css';
import { AppContext } from '../../contexts/AppContext';


const Sidebar = ({IDs, images}) => {
  const { currentSidebarSelection,setCurrentSidebarSelection } = useContext(AppContext);
  return (
    <div className="sidebar">
      <div className="sidebarButtons">
        {IDs.map((id) => (
          <SidebarElement isSelected={currentSidebarSelection===id} key={id} img={images[id]} onClick={setCurrentSidebarSelection} myId={id} />
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
