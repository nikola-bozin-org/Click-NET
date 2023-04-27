import React from 'react'
import './WorkstationManagment.css'
import { calculateTime } from '../../../../utils'
import { zoneColors } from '../../../../config'

const directions = {
  TOP:0,
  DOWN:1,
  LEFT:2,
  RIGHT:3
}

const WorkstationManagment = ({ isOnline, number, borderColor,row,collumn }) => {
  const loginInfoRowsIntake = 4;
  const loginInfoCollumnsIntake = 6;
  let directionVertical = directions.TOP;
  let directionHorizontal= directions.RIGHT;
  if(row<=loginInfoRowsIntake){
    directionVertical=directions.BOT;
  }
  if(collumn>=loginInfoCollumnsIntake){
    directionHorizontal=directions.LEFT;
  }
  return (
    <div className='WorkstationManagment'>
      {isOnline && <WorkstationLogedinUserInformation
        xTranslation={`${directionHorizontal===directions.RIGHT?`${50}`:`${-50}`}`}
        yTranslation={`${directionVertical===directions.TOP?`${-62}`:`${62}`}`}
        zone={'Lobby'}
        username={'nikola98'}
        firstName={'nikola'}
        rate={'180'}
        level={'0'}
        discount={'0'}
        remainingBalance={'500'}
      />}
      <div style={{ borderColor: `${borderColor}` }} className="workstation-managment-wrap">
        <p className="workstationNumber">{number}</p>
      </div>
    </div>
  )
}

//this  takes up: 4rows and 6collumns
const WorkstationLogedinUserInformation = ({xTranslation,yTranslation, zone, username, firstName, rate, level, discount, remainingBalance }) => {
  return (
    <div style={{transform:`translate3d(${xTranslation}%,${yTranslation}%,0)`}} className="workstation-logedin-user-information">
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