import React, { useState, useEffect } from 'react';

const useMobileVersionNotSupported = (mobileVersionWidth) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < mobileVersionWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileVersionWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileVersionWidth]);

  const MobileNotSupported = () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Mobile Version Not Supported.
    </div>
  );

  return { isMobile, MobileNotSupported };
};

export default useMobileVersionNotSupported;
