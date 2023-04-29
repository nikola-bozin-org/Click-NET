import React, { useState, useEffect, useContext } from 'react';
import './Workstation.css';
import { CenterContext } from '../../contexts/CenterContext';

const PC = ({ number, color }) => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const centerContext = useContext(CenterContext);

  useEffect(() => {
    if (dragging) {
      const handleMouseMove = (e) => {
        e.preventDefault();
        setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
      };

      const handleMouseUp = (e) => {
        if (!dragging) return;
        setDragging(false);
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
    if(centerContext.currentSelectionInternalOption === 0) return;
    e.preventDefault();
    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;
    setOffset({ x: offsetX, y: offsetY });
    setDragging(true);
  };

  return (
    <div
      style={{
        backgroundColor: `${color}`,
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: `absolute`,
      }}
      className="Workstation"
      onMouseDown={handleMouseDown}
    >
      <div className="workstation-number">
        <p className="workstation-number-text">{number}</p>
      </div>
    </div>
  );
};

export default PC;
