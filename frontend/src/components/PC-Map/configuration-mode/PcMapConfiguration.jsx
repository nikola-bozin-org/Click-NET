import React from 'react'
import './PcMapConfiguration.css'
import Map from '../map/Map'

const PcMapConfiguration = ({ centerName }) => {
    return (
        <div className='PcMapConfiguration'>
            <div className="pc-map-config-center-name">{centerName}</div>
            <div className="map-wrapper-configuration">
                <Map />
            </div>
        </div>
    )
}

export default PcMapConfiguration