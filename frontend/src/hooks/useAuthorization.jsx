import { useEffect, useState } from 'react';

const useAuthorization = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  return isAuthorized;
};

export default useAuthorization;