import React, { useState, useEffect } from 'react';
import './pc.css';

const PC = ({ number, color }) => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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
      className="PC"
      onMouseDown={handleMouseDown}
    >
      <div className="PCNumber">
        <p className="PCNumberText">{number}</p>
      </div>
    </div>
  );
};

export default PC;
