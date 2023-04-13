import React, { useContext } from 'react';
import './sidebar.css';
import { AppContext } from '../../contexts/AppContext';
import { UsersContext } from '../../contexts/UsersContext';


const Sidebar = ({IDs, images}) => {
  const { currentSidebarSelection,setCurrentSidebarSelection } = useContext(AppContext);
  const {setShouldShowCreateUser} = useContext(UsersContext)
  return (
    <div className="sidebar">
      <div className="sidebarButtons">
        {IDs.map((id) => {
          if(id===3)
            return (<SidebarElement exec={()=>{setShouldShowCreateUser(true)}} isSelected={currentSidebarSelection===id} key={id} img={images[id]}/>)
            return (<SidebarElement exec={()=>{setShouldShowCreateUser(false)}} isSelected={currentSidebarSelection===id} key={id} img={images[id]} onClick={setCurrentSidebarSelection} myId={id}/>)
          })}
      </div>
    </div>
  );
};

const SidebarElement = ({ img, onClick, myId, isSelected, exec }) => {
  const handleClick = (e) => {
    if (exec) {
      exec();
    }
    if(onClick)
    onClick(myId);
  };

  return (
    <div
      onClick={handleClick}
      className={`sidebarElement ${isSelected ? `blackBackground` : ``}`}
    >
      <img src={img} alt="" className={`sidebar-button invertColor`} />
    </div>
  );
};


export default Sidebar;
