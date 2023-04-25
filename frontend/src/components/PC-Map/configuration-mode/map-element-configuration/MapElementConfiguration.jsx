import React, { useContext } from 'react'
import './MapElementConfiguration.css'
import add from '../../../../images/add.png'
import { PCMapContext } from '../../../../contexts/PCMapContext'

const MapElementConfiguration = () => {
  const {setShowAddWorkStation} = useContext(PCMapContext)

  return (
    <div onClick={()=>{setShowAddWorkStation(true)}} className='map-element-configuration'>
      <div className="map-element-cfg-img-wrapper">
        <img src={add} alt="" className="map-element-configuration-add invertColor" />
      </div>
    </div>
  )
}

export default MapElementConfiguration