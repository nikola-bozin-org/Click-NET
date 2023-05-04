import React from 'react'
import './WorkstationConfiguration.css'

const WorkstationConfiguration = ({number}) => {
  return (
    <div className='WorkstationConfiguration'>
      <div className={`workstation-configuration-wrap`}>
          <p className="workstationNumber">{number}</p>
      </div>
    </div>
  )
}

export default WorkstationConfiguration