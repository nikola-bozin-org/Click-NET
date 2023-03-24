import React from 'react';
import Unauthorized from '../unauthorized/Unauthorized'
import unauthorized from '../../images/unauthorized.png'


const preventUnauthorized = (WrappedComponent) => {

  return (props) => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      return <Unauthorized imageUrl={unauthorized} />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default preventUnauthorized;
