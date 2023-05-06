import React from 'react'
import './WorkstationManagment.css'
import { calculateTime } from '../../../../utils'
import { zoneColors } from '../../../../config'
import { useContext } from 'react'
import { CenterContext } from '../../../../contexts/CenterContext'
import { useState } from 'react'
import loading from '../../../../images/loading.png'
import { clearSelectedWorkstation, selectWorkstation } from '../../../../redux/workstationsSlice'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'

const directions = {
  TOP:0,
  DOWN:1,
  LEFT:2,
  RIGHT:3
}

const WorkstationManagment = ({number, borderColor,row,collumn }) => {
  console.info('ne radi brate kad se konektuje klient..jbg..to mora resis..')
  const loginInfoRowsIntake = 4;
  const loginInfoCollumnsIntake = 6;
  const dispatch = useDispatch();
  const [showClickedBorder,setShowClickedBorder] = useState(false);
  const [showLoading,setShowLoading] = useState(false);
  const centerContext = useContext(CenterContext);
  const selected = useSelector((state)=>state.workstations.currentSelectedWorkstation)
  const workstationCurrentRoles = useSelector((state)=>state.workstations.workstationCurrentRoles)
  const [currentData,setCurrentData] = useState({
    zone:'Lobby',
    username:'nikola98',
    firstName:'nikola',
    rate:'Pro 5h / 180 / 160',
    level:'0',
    discount:'0',
    remainingBalance:'500',
    currency:centerContext.currency
  });

  const deselector = ()=>{
    setShowClickedBorder(false);
  }

  useEffect(()=>{
    setShowClickedBorder(selected.number===number)
  })
  const onClicked = (e)=>{
    e.stopPropagation();
    centerContext.workstationDeselector();
    if(!showClickedBorder){
      centerContext.setWorkstationDeselector(()=>deselector)
      dispatch(selectWorkstation({workstation:{number:number}}))
    }else{
      centerContext.setWorkstationDeselector(()=>()=>{})
      dispatch(clearSelectedWorkstation());
    }
    setShowClickedBorder(!showClickedBorder)
  }
  const onMouseEnter = (e)=>{
    e.stopPropagation();
    console.info('fetch user balance and discount. videti dal to raditi u bazi il na klienta.. koj kurac nzm')
  }

  let directionVertical = directions.TOP;
  let directionHorizontal= directions.RIGHT;
  if(row<=loginInfoRowsIntake){
    directionVertical=directions.BOT;
  }
  if(collumn>=loginInfoCollumnsIntake){
    directionHorizontal=directions.LEFT;
  }

  return (
    <div onMouseEnter={onMouseEnter} onClick={onClicked} className={`WorkstationManagment`}>
      {true && <WorkstationLogedinUserInformation
        xTranslation={`${directionHorizontal===directions.RIGHT?`${50}`:`${-50}`}`}
        yTranslation={`${directionVertical===directions.TOP?`${-62}`:`${62}`}`}
        zone={currentData.zone}
        username={currentData.username}
        firstName={currentData.firstName}
        rate={currentData.rate}
        level={currentData.level}
        discount={currentData.discount}
        remainingBalance={currentData.remainingBalance}
        currency={currentData.currency}
      />}
      <div style={{ borderColor: `${borderColor}` }} className={`workstation-managment-wrap ${showClickedBorder?'show-clicked-border':''}`}>
        {!showLoading?
        <p className="workstationNumber">{number}</p>
        :
        <img src={loading} alt="" className={`invertColor workstation-loading ${showLoading?'rotate-indefinitely':''}`} />}
      </div>
    </div>
  )
}

//this  takes up: 4rows and 6collumns
const WorkstationLogedinUserInformation = ({xTranslation,yTranslation, zone, username, firstName, rate, level, discount, remainingBalance,currency }) => {
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
        <WorkstationLogedInUserElement title={'Remaining time'} data={calculateTime(160,remainingBalance)} />
        <WorkstationLogedInUserElement title={'Remaining Balance'} data={`${remainingBalance} ${currency}`} useBorderRight={false}/>
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