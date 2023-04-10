import React from 'react'
import { useState } from 'react'
import './internalOptions.css'

const InternalOptions = ({options}) =>{
    const [currentSelectedOption,setCurrentSelectedOption] = useState(0);

    const updateCurrentSelectedOption = (optionId) =>{
        setCurrentSelectedOption(optionId)
    }

    return (
        <div className="internalOptions">
          {options.map((option, index) => (
            <Option onClick={updateCurrentSelectedOption} id={index} currentSelectedOption={currentSelectedOption} key={index} text={option} />
          ))}
        </div>
    )
}

const Option = ({text,id,currentSelectedOption,onClick})=>{
    const onClicked = () =>{
        onClick(id)
    }
    return (
        <div onClick={onClicked} className={`internalOption`}>
            <div className={`internalOptionWrap ${id===currentSelectedOption?`bottomRedBorder`:``}`}>
            <p className={`internalOptionText`}>{text}</p>
            </div>
        </div>
    )
}

export default InternalOptions