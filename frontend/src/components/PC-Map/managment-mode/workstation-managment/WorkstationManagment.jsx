import React from 'react'
import './WorkstationManagment.css'
import { calculateTime } from '../../../../utils'
import { zoneColors } from '../../../../config'

const WorkstationManagment = ({ number, borderColor }) => {
  return (
    <div className='WorkstationManagment'>
      <WorkstationLogedinUserInformation
        zone={'Lobby'}
        username={'nikola98'}
        firstName={'nikola'}
        rate={'180'}
        level={'0'}
        discount={'0'}
        remainingBalance={'500'}
      />
      <div style={{ borderColor: `${borderColor}` }} className="workstation-managment-wrap">
        <p className="workstationNumber">{number}</p>
      </div>
    </div>
  )
}

const WorkstationLogedinUserInformation = ({ zone, username, firstName, rate, level, discount, remainingBalance }) => {
  return (
    <div className="workstation-logedin-user-information">
      <div className="workstation-logedin-user-information-zone">
        <div style={{ backgroundColor:`${zone==='Lobby'?`${zoneColors.Lobby}`:`${zoneColors.Pro}`}` }} className="workstation-logedin-user-information-zone-color"></div>
        <p>{zone}</p>
      </div>
      <div className="workstation-logedin-user-information-username">
        <p className="workstation-logedin-user-information-username-text">
          {username}
        </p>
        <p className="workstation-logedin-user-information-username-first-name">
          {firstName}
        </p>
      </div>
      <div className="workstation-logedin-user-information-rate-and-level">
        <WorkstationLogedInUserElement title={'Rate'} data={rate} />
        <WorkstationLogedInUserElement title={'Level (discount)'} data={`${level}(${discount}%)`} useBorderRight={false}/>
      </div>
      <div className="workstation-logedin-user-information-time-and-balance">
        <WorkstationLogedInUserElement title={'Remaining time'} data={calculateTime(rate,remainingBalance)} />
        <WorkstationLogedInUserElement title={'Remaining Balance'} data={remainingBalance} useBorderRight={false}/>
      </div>
    </div>
  )
}

const WorkstationLogedInUserElement = ({ title, data,useBorderRight=true }) => {
  return (
    <div className="workstation-logedin-user-information-rate">
      <div className={`workstation-logedin-user-information-rate-wrap ${useBorderRight?'use-border-right':''}`}>
        <p className="workstation-logedin-user-information-rate-wrap-text">
          {title}
        </p>
        <div className="workstation-logedin-user-information-rate-wrap-value">
          {data}
        </div>
      </div>
    </div>
  )
}

export default WorkstationManagment