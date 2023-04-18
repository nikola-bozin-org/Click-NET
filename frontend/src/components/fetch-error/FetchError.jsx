import React, { useEffect, useState } from 'react';
import './FetchError.css';
import { delay_ERROR } from '../../config';

const FetchError = ({ showMessage, message, onDelayCompleted,marginTop }) => {
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const id = setTimeout(() => {
      if(onDelayCompleted)
      onDelayCompleted();
    }, delay_ERROR);

    setTimeoutId(id);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showMessage]);

  return (
    <div style={{marginTop:`${marginTop}`}} className={`fetch-error-container ${showMessage ? 'show-fetch-error-container' : 'hide-fetch-error-container'}`}>
      <p className={`fetchErrorText`}>
        {message}
      </p>
    </div>
  );
};

export default FetchError;
