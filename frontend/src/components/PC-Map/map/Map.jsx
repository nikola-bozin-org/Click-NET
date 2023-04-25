import React from 'react';
import './Map.css';
import { pcMap_N, pcMap_M } from '../../../config';

const range = (length) => Array.from({ length }, (_, i) => i);

const Map = () => {
  const gridElements = range(pcMap_N * pcMap_M).map((_, index) => (
    <MapElement key={index} index={index} />
  ));

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


const MapElement = ({ index }) => {
  return <div className="map-element">{index}</div>;
};


export default Map;
