import React from 'react'
import './MapElementManagment.css'
import WorkstationManagment from '../workstation-managment/WorkstationManagment'
const MapElementManagment = ({renderWorkstation,number,borderColor}) => {
    return (
        <div className="map-element-managment">
            {renderWorkstation && <WorkstationManagment number={number} borderColor={borderColor} />}
        </div>
    )
}

export default MapElementManagment