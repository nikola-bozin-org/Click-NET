import React,{useState,useEffect} from 'react';
import './FetchSuccess.css';
import { delay_ACCEPT } from '../../config';


const FetchSuccess = ({ showMessage, message, onDelayCompleted,marginTopValue }) => {
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const id = setTimeout(() => {
      if(onDelayCompleted)
      onDelayCompleted();
    }, delay_ACCEPT);

    setTimeoutId(id);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showMessage]);

  return (
    <div style={{marginTop:`${marginTopValue}px`}} className={`fetch-success-container ${showMessage ? 'show-fetch-success-container' : 'hide-fetch-success-container'}`}>
      <p className={`fetchSuccessText`}>
        {message}
      </p>
    </div>
  );
}

export default FetchSuccess