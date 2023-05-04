import React, { useContext, useRef } from 'react'
import './MapElementConfiguration.css'
import add from '../../../../images/add.png'
import { CenterContext } from '../../../../contexts/CenterContext'
import WorkstationConfiguration from '../workstation-configuration/WorkstationConfiguration'
const MapElementConfiguration = ({ renderWorkstation, number }) => {
  const { setShowAddWorkStation, setLastWorkstationGridElementPosition } = useContext(CenterContext)
  const mapElementRef = useRef(null);

  const onClick = () => {
    // const rect = mapElementRef.current.getBoundingClientRect()
    // const x = rect.left
    // const y = rect.top
    // setLastWorkstationGridElementPosition([x,y]);
    if(!renderWorkstation)
    setShowAddWorkStation(true);
  }

  return (
    <div ref={mapElementRef} onClick={onClick} className='map-element-configuration'>
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