import React from 'react'
import './PoweredBy.css'
import versionData from '../../version.json';
const PoweredBy = () => {
  return (
    <div className='powered-by'>
        <p>
      2023 - All rights reserved - Version: {versionData.version} 
       ~ Powered By: <a style={{color:'white',fontSize:'18px',textDecoration:'none'}} href='https://nikolabozin.com' target='_blank' rel='noopener noreferrer'>nikolabozin.com</a>
      </p>
    </div>  )
}

export default PoweredBy