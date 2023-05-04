import React, { useContext, useRef } from 'react'
import './MapElementConfiguration.css'
import add from '../../../../images/add.png'
import { CenterContext } from '../../../../contexts/CenterContext'
import WorkstationConfiguration from '../workstation-configuration/WorkstationConfiguration'
const MapElementConfiguration = ({ renderWorkstation, number }) => {
  const { setShowAddWorkStation} = useContext(CenterContext)

  const onClick = () => {
    if(!renderWorkstation)
    setShowAddWorkStation(true);
  }

  return (
    <div onClick={onClick} className='map-element-configuration'>
      <div className="map-element-cfg-img-wrapper">
        {!renderWorkstation ?
          <img src={add} alt="" className="map-element-configuration-add invertColor" />
          :
          <WorkstationConfiguration number={number} />
        }
      </div>
    </div>
  )
}

export default MapElementConfiguration