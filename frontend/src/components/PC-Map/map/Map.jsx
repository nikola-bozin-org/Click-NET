import React from 'react';
import './Map.css';
import { pcMap_N, pcMap_M, pcRole } from '../../../config';
import MapElementManagment from '../managment-mode/map-element-managment/MapElementManagment';
import MapElementConfiguration from '../configuration-mode/map-element-configuration/MapElementConfiguration';
import { useContext } from 'react';
import {PCMapContext} from '../../../contexts/PCMapContext'

const range = (length) => Array.from({ length }, (_, i) => i);

const Map = () => {
  const pcMapContext = useContext(PCMapContext);
  const workstations = pcMapContext.workstations;
  const gridElements = range(pcMap_N * pcMap_M).map((_, index) => {
    const row = Math.floor(index / pcMap_M);
    const col = index % pcMap_M;
    const workstation = workstations.find(
      (ws) => ws.x === col && ws.y === row
    );
    const isWorkstation = !!workstation;
    const workstationNumber = isWorkstation ? workstation.number : null;
    return (
      pcMapContext.currentSelectionInternalOption === 0 ? (
        <MapElementManagment borderColor={pcRole.Offline} key={index} index={index} renderWorkstation={isWorkstation} number={workstationNumber}/>
      ) : (
        <MapElementConfiguration key={index}/>
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
