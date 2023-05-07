import React, { useContext } from 'react';
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
import { useDispatch } from 'react-redux';
import { clearSelectedWorkstation } from '../../../redux/workstationsSlice';
import ShutDown from '../../remote-controls/shut-down/ShutDown';

const PcMapManagment = ({centerName}) => {

  const centerContext = useContext(CenterContext);
  const dispatch = useDispatch();

  const deselectAllWorkstations = ()=>{
    centerContext.workstationDeselector()
    dispatch(clearSelectedWorkstation());
  }

  return (
    <>
    {/* <ShutDown text={'Restart'} workstationNumber={1}/> */}
    <div className='PcMapManagment'>
        <div className="pc-managment-controls">
            <p className="pc-managment-center-name">{centerName}</p>
            <div className="pc-managment-remote-controls">
                <img title='Shutdown' src={off} alt="" className="pc-managment-remote-control-option invertColor" />
                <img title='Restart' src={restart} alt="" className="pc-managment-remote-control-option invertColor" />
                <img title='Remote Control' src={remoteControl} alt="" className="pc-managment-remote-control-option invertColor" />
                <img title='Stats' src={stats} alt="" className="pc-managment-remote-control-option invertColor" />
            </div>
            <div className="pc-managment-other-controls">
                <img title='Refill' src={coins} alt="" className="pc-managment-other-control invertColor" />
                <img title='Buy Ticket' src={tickets} alt="" className="pc-managment-other-control invertColor" />
                <img title='Send Warning' src={warning} alt="" className="pc-managment-other-control invertColor" />
                <img title='Send Message' src={comment} alt="" className="pc-managment-other-control invertColor" />
                <img title='Maintenence' src={flag} alt="" className="pc-managment-other-control invertColor" />
                <img title='Lock' src={lock} alt="" className="pc-managment-other-control invertColor" />
                <img title='Stop' src={stop} alt="" className="pc-managment-other-control invertColor" />
                <img title='History' src={history} alt="" className="pc-managment-other-control invertColor" />
            </div>
        </div>
        <div onClick={deselectAllWorkstations}  className="map-wrapper-managment">
          <Map/>
        </div>
    </div>
    </>
  )
}


export default PcMapManagment