import React, { useEffect } from 'react';
import './Map.css';
import { pcMap_N, pcMap_M, pcRole } from '../../../config';
import MapElementManagment from '../managment-mode/map-element-managment/MapElementManagment';
import MapElementConfiguration from '../configuration-mode/map-element-configuration/MapElementConfiguration';
import { useContext } from 'react';
import {CenterContext} from '../../../contexts/CenterContext'
import WorkstationConfiguration from '../configuration-mode/workstation-configuration/WorkstationConfiguration';
import { useSelector } from 'react-redux';
import { MEMBorderColorContext } from '../../../contexts/MEMBorderColorContext';
import { getColorByRole } from '../../../utils';

const range = (length) => Array.from({ length }, (_, i) => i);

const Map = () => {
  const centerContext = useContext(CenterContext);
  const {borderChangers} = useContext(MEMBorderColorContext);
  const workstationCurrentRoles = useSelector((state)=>state.workstations.workstationCurrentRoles)
  console.info('lose...sredjuj...nema da svaki managment pravi svoje ws-ove')
  useEffect(()=>{
    Object.entries(borderChangers).forEach(([id, borderChangerFunction]) => {
      borderChangerFunction(getColorByRole(workstationCurrentRoles[id]?.role))
    });
  },[borderChangers]);
  const workstations = centerContext.workstations;
  const workstationComponents = workstations.reduce((acc, ws) => {
    acc[ws.number] = <WorkstationConfiguration key={ws.number} number={ws.number} />;
    return acc;
  }, {});
  const gridElements = range(pcMap_N * pcMap_M).map((_, index) => {
    const row = Math.floor(index / pcMap_M);
    const col = index % pcMap_M;
    const workstation = workstations.find(
      (ws) => ws.gridPosition.x === row && ws.gridPosition.y === col
    );
    const isWorkstation = !!workstation;
    const workstationNumber = isWorkstation ? workstation.number : null;
    return (
      centerContext.currentSelectionInternalOption === 0 ? (
        <MapElementManagment row={row} collumn={col} myBorderColor={pcRole.Offline} key={index} index={index} renderWorkstation={isWorkstation} number={workstationNumber}/>
      ) : (
        <MapElementConfiguration row={row} collumn={col} workstationComponent={workstationComponents[workstationNumber]} renderWorkstation={isWorkstation} number={workstationNumber} key={index}/>
      )
    );
  });
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${pcMap_M}, 1fr)`,
        gridTemplateRows: `repeat(${pcMap_N}, 1fr)`,
      }}
      className='Map'
    >
      {gridElements}
    </div>
  );
};





export default Map;
