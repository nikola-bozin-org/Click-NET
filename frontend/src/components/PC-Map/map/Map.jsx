import React from 'react';
import './Map.css';
import { pcMap_N, pcMap_M } from '../../../config';
import MapElementManagment from '../managment-mode/map-element-managment/MapElementManagment';
import MapElementConfiguration from '../configuration-mode/map-element-configuration/MapElementConfiguration';
import { useContext } from 'react';
import {PCMapContext} from '../../../contexts/PCMapContext'

const range = (length) => Array.from({ length }, (_, i) => i);

const Map = () => {
  const pcMapContext = useContext(PCMapContext);
  console.info(pcMapContext.currentSelectionInternalOption)
  const gridElements = range(pcMap_N * pcMap_M).map((_, index) => {
    return (
      pcMapContext.currentSelectionInternalOption === 0 ? (
        <MapElementManagment key={index} index={index} />
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
