import React, { useEffect, useState } from 'react'
import './WorkstationConfiguration.css'
import { useContext } from 'react';
import {DndControllerContext} from '../../../../contexts/DndControllerContext'

const WorkstationConfiguration = ({number}) => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dndCC = useContext(DndControllerContext);

  useEffect(() => {
    if (dragging) {
      const handleMouseMove = (e) => {
        e.preventDefault();
        return;
        setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
      };

      const handleMouseUp = (e) => {
        return;
        if (!dragging) return;
        setDragging(false);
        dndCC.setIsDragging(false)
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, offset]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    return;
    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;
    setOffset({ x: offsetX, y: offsetY });
    setDragging(true);
    dndCC.setIsDragging(true)
  };
  return (
    <div
    style={{
      left: `${position.x}px`,
      top: `${position.y}px`,
      position: `relative`,
    }}
    onMouseDown={handleMouseDown}
    className={`WorkstationConfiguration${dragging ? ' disable-pointer-events' : ''}`}>
      <div className={`workstation-configuration-wrap`}>
          <p className="workstationNumber">{number}</p>
      </div>
    </div>
  )
}

export default WorkstationConfiguration