import React from 'react'
import './users.css'
import { useState,useRef } from 'react'


const Users = () => {
  return (
    <div className='Users'>
        <Topbar/>
        <Options/>
    </div>
  )
}


const Topbar = () =>{
    return (
        <div className='uTopbar'>
            <p className='uTopbarText'>Users</p>
        </div>
    )
}

const Options = () =>{
    //preko use reff. trenutni klikovan, novi klikovan
    return (
        <div className="uOptions">
            <Option text={"All users"}/>
            <Option text={"Session history"}/>
            <Option text={"Balance history"}/>
            <Option text={"Receipt history"}/>
            <Option text={"Passes history"}/>
            <Option text={"Roles and user access"}/>
            <Option text={"User types"}/>
        </div>
    )
}

const Option = ({text})=>{
    const [isClicked,setIsClicked]=useState(false);
    return (
        <div className="uOption">
            <p className='uOptionText'>{text}</p>
        </div>
    )
}

export default Users