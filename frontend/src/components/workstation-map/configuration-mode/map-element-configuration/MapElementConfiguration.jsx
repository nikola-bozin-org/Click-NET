import React, { useContext, useRef } from 'react'
import './MapElementConfiguration.css'
import add from '../../../../images/add.png'
import { CenterContext } from '../../../../contexts/CenterContext'
import WorkstationConfiguration from '../workstation-configuration/WorkstationConfiguration'
import { DndControllerContext } from '../../../../contexts/DndControllerContext'
import { useState } from 'react'
const MapElementConfiguration = ({ workstationComponent,renderWorkstation, number }) => {
  const { setShowAddWorkStation} = useContext(CenterContext)
  const dndCC = useContext(DndControllerContext);


  const onClick = () => {
    if(!renderWorkstation)
    setShowAddWorkStation(true);
  }
  const onMouseEnter = () =>{
    console.info("Enter")
  }

  const renderAddWorkstationElement=()=>{
    return <img src={add} alt="" className="map-element-configuration-add invertColor" />
  }

  return (
    <div onMouseEnter={onMouseEnter} onClick={onClick} className='map-element-configuration'>
      <div className="map-element-cfg-img-wrapper">
        {!renderWorkstation ?
          renderAddWorkstationElement()
          :
          workstationComponent
        }
      </div>
    </div>
  )
}

export default MapElementConfiguration