import React, { useContext, useState } from 'react';
import './WorkstationMapManagment.css';
import off from '../../../images/off.png'
import remoteControl from '../../../images/remote-control.png'
import restart from '../../../images/restart.png'
import stats from '../../../images/stats.png'
import coins from '../../../images/coins.png'
import flag from '../../../images/flag.png'
import lock from '../../../images/lock.png'
import tickets from '../../../images/tickets.png'
import comment from '../../../images/comment.png'
import warning from '../../../images/warning.png'
import Map from '../map/Map';
import stop from '../../../images/stop.png'
import history from '../../../images/history.png'
import { CenterContext } from '../../../contexts/CenterContext';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedWorkstation } from '../../../redux/workstationsSlice';
import ShutDown from '../../remote-controls/shut-down/ShutDown';
import {RemoteControllerContext} from '../../../contexts/RemoteControllerContext'
import { useEffect } from 'react';

const PcMapManagment = ({centerName}) => {
  const [showSelectWorkstationError,setShowSelectWorkstationError] = useState(false);
  const centerContext = useContext(CenterContext);
  const remoteControllerContext = useContext(RemoteControllerContext);
  const currentSelectedNumber = useSelector((state)=>state.workstations.currentSelectedWorkstationNumber)

  const dispatch = useDispatch();
  const deselectAllWorkstations = ()=>{
    centerContext.workstationDeselector()
    dispatch(clearSelectedWorkstation());
  }
  const onCancelRemoteControl = ()=>{
    remoteControllerContext.setCurrentSelectedRemoteControl(-1)
  }
  useEffect(() => {
    if (currentSelectedNumber === -1 && remoteControllerContext.currentSelectedRemoteControl !== -1) {
      setShowSelectWorkstationError(true);
      setTimeout(()=>{
        setShowSelectWorkstationError(false);
        remoteControllerContext.setCurrentSelectedRemoteControl(-1)
      },2000)
    } else {
      setShowSelectWorkstationError(false);
    }
  }, [remoteControllerContext.currentSelectedRemoteControl]);

  const renderControl=()=>{
    if(currentSelectedNumber===-1){return};
    switch (remoteControllerContext.currentSelectedRemoteControl) {
      case 0:
        return <ShutDown text={'Shut down'} onCancel={onCancelRemoteControl}/>    
      case 1:
        return <ShutDown text={'Restart'} onCancel={onCancelRemoteControl}/>
      default:
        break;
    }
  }

  return (
    <>
    {renderControl()}
    <div className='PcMapManagment'>
        <div className="pc-managment-controls">
            <p className="pc-managment-center-name">{centerName}</p>
            <div className="pc-managment-remote-controls">
                <img onClick={()=>{remoteControllerContext.setCurrentSelectedRemoteControl(0)}} title='Shutdown' src={off} alt="" className="pc-managment-remote-control-option invertColor" />
                <img onClick={()=>{remoteControllerContext.setCurrentSelectedRemoteControl(1)}} title='Restart' src={restart} alt="" className="pc-managment-remote-control-option invertColor" />
                {/* <img onClick={()=>{remoteControllerContext.setCurrentSelectedRemoteControl(2)}} title='Remote Control' src={remoteControl} alt="" className="pc-managment-remote-control-option invertColor" /> */}
                {/* <img onClick={()=>{remoteControllerContext.setCurrentSelectedRemoteControl(3)}} title='Stats' src={stats} alt="" className="pc-managment-remote-control-option invertColor" /> */}
            </div>
            <div className="pc-managment-other-controls">
                <img title='Refill' src={coins} alt="" className="pc-managment-other-control invertColor" />
                {/* <img title='Buy Ticket' src={tickets} alt="" className="pc-managment-other-control invertColor" /> */}
                <img title='Send Warning' src={warning} alt="" className="pc-managment-other-control invertColor" />
                <img title='Send Message' src={comment} alt="" className="pc-managment-other-control invertColor" />
                {/* <img title='Maintenence' src={flag} alt="" className="pc-managment-other-control invertColor" /> */}
                <img title='Lock' src={lock} alt="" className="pc-managment-other-control invertColor" />
                <img title='Stop' src={stop} alt="" className="pc-managment-other-control invertColor" />
                {/* <img title='History' src={history} alt="" className="pc-managment-other-control invertColor" /> */}
            </div>
            {true &&
             <div className={`select-workstation-error ${showSelectWorkstationError?'':'select-workstation-error-hidden'}`}>
              Select workstation!
            </div>}
        </div>
        <div onClick={deselectAllWorkstations}  className="map-wrapper-managment">
          <Map/>
        </div>
    </div>
    </>
  )
}


export default PcMapManagment