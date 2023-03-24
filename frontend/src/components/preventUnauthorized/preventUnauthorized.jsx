import React from 'react';
import Unauthorized from '../unauthorized/Unauthorized'
import unauthorized from '../../images/unauthorized.png'
import { useEffect } from 'react';


const preventUnauthorized = (WrappedComponent) => {

  return (props) => {
    const accessToken = localStorage.getItem('accessToken');
    
    useEffect(()=>{
      console.info("calledOnce")
      if (!accessToken) {
        return <Unauthorized imageUrl={unauthorized} />;
      }
    },[])



    return <WrappedComponent {...props} />;
  };
};

export default preventUnauthorized;




// import React, { useState, useEffect } from 'react';
// import Unauthorized from './Unauthorized';

// const preventUnauthorized = (WrappedComponent) => {
//   const imageUrl = "https://your-image-url-here.com/image.jpg";

//   return (props) => {
//     const [status, setStatus] = useState('loading');
//     const accessToken = localStorage.getItem('accessToken');

//     useEffect(() => {
//       if (accessToken) {
//         fetch('https://click-net-test.onrender.com/verifyToken', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'token': accessToken,
//           },
//         })
//           .then((response) => {
//             if (response.ok) {
//               setStatus('authorized');
//             } else {
//               setStatus('unauthorized');
//             }
//           })
//           .catch(() => {
//             setStatus('unauthorized');
//           });
//       } else {
//         setStatus('unauthorized');
//       }
//     }, [accessToken]);

//     if (status === 'loading') {
//       return <div>Loading...</div>;
//     }

//     if (status === 'unauthorized') {
//       return <Unauthorized imageUrl={imageUrl} />;
//     }

//     return <WrappedComponent {...props} />;
//   };
// };

// export default preventUnauthorized;
