import React,{useRef} from 'react';
import './HandleButton.css';

const HandleButton = ({
    shouldDisable=false,
    onClick,
    text,
    className,
    circleColor = "#685489"
  }) => {
  const circleRef = useRef(null);
  const buttonRef = useRef(null);
    const handleMouseEnter = (e) => {
      if(shouldDisable) return;
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
  
      circleRef.current.style.left = `${x}px`;
      circleRef.current.style.top = `${y}px`;
    };
    const handleClick = (e) => {
      onClick?.(e);
      buttonRef.current.blur();
    };
    return (
      <button
        ref={buttonRef}
        disabled={shouldDisable}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        style={{cursor:`${shouldDisable?'not-allowed':''}`}}
        className={`handle-button ${className} ${shouldDisable ? `half-opacity` : ``}`}
      >
        <div style={{ backgroundColor:circleColor,display:`${shouldDisable?'none':''}`}} ref={circleRef} className='circle'></div>
        <p className='handle-button-text'>{text}</p>
      </button>
    );
  };

export default HandleButton