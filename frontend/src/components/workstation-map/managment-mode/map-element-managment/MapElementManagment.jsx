import React, { useContext, useEffect, useState } from 'react'
import './MapElementManagment.css'
import WorkstationManagment from '../workstation-managment/WorkstationManagment'
import { MEMBorderColorContext } from '../../../../contexts/MEMBorderColorContext'
const MapElementManagment = ({renderWorkstation,number,myBorderColor,row,collumn}) => {
    const [borderColor,setBorderColor] = useState(myBorderColor)
    const MEMBCC = useContext(MEMBorderColorContext);
    useEffect(()=>{
        MEMBCC.addBorderChanger(number,setBorderColor)
    },[])
    return (
        <div className="map-element-managment">
            {renderWorkstation && <WorkstationManagment number={number} borderColor={borderColor} row={row} collumn={collumn}/>}
        </div>
    )
}

export default MapElementManagment