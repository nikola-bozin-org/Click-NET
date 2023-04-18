import React,{useRef} from 'react';
import './HandleButton.css';

const HandleButton = ({
    shouldDisable,
    onClick,
    text,
    className,
  }) => {
  const circleRef = useRef(null);
    const handleMouseEnter = (e) => {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
  
      circleRef.current.style.left = `${x}px`;
      circleRef.current.style.top = `${y}px`;
    };

    return (
      <button
        disabled={shouldDisable}
        onMouseEnter={handleMouseEnter}
        onClick={onClick}
        className={`handle-button ${className} ${shouldDisable ? `half-opacity` : ``}`}
      >
        <div ref={circleRef} className='circle'></div>
        <p className='handle-button-text'>{text}</p>
      </button>
    );
  };

export default HandleButton