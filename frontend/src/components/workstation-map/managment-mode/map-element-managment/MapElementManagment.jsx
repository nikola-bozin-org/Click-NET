import React from 'react'
import './MapElementManagment.css'
import WorkstationManagment from '../workstation-managment/WorkstationManagment'
const MapElementManagment = ({renderWorkstation,isOnline,number,borderColor,row,collumn}) => {
    return (
        <div className="map-element-managment">
            {renderWorkstation && <WorkstationManagment isOnline={isOnline} number={number} borderColor={borderColor} row={row} collumn={collumn}/>}
        </div>
    )
}

export default MapElementManagment