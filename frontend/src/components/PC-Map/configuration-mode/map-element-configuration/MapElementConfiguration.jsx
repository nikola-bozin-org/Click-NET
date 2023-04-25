import React from 'react'
import './MapElementConfiguration.css'
import add from '../../../../images/add.png'

const MapElementConfiguration = () => {
  return (
    <div className='map-element-configuration'>
      <div className="map-element-cfg-img-wrapper">
        <img src={add} alt="" className="map-element-configuration-add invertColor" />
      </div>
    </div>
  )
}

export default MapElementConfiguration