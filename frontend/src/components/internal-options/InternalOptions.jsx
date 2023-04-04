import React from 'react'
import { useState } from 'react'
import './internalOptions.css'

const InternalOptions = () =>{
    const [currentSelectedOption,setCurrentSelectedOption] = useState(0);

    const updateCurrentSelectedOption = (optionId) =>{
        setCurrentSelectedOption(optionId)
    }

    return (
        <div className="internalOptions">
            <Option onClick={updateCurrentSelectedOption} id={0} currentSelectedOption={currentSelectedOption} text={"All users"}/>
            <Option onClick={updateCurrentSelectedOption} id={1} currentSelectedOption={currentSelectedOption} text={"Session history"}/>
            <Option onClick={updateCurrentSelectedOption} id={2} currentSelectedOption={currentSelectedOption} text={"Balance history"}/>
            <Option onClick={updateCurrentSelectedOption} id={3} currentSelectedOption={currentSelectedOption} text={"Receipt history"}/>
            <Option onClick={updateCurrentSelectedOption} id={4} currentSelectedOption={currentSelectedOption} text={"Passes history"}/>
            <Option onClick={updateCurrentSelectedOption} id={5} currentSelectedOption={currentSelectedOption} text={"Roles and user access"}/>
            <Option onClick={updateCurrentSelectedOption} id={6} currentSelectedOption={currentSelectedOption} text={"User types"}/>
        </div>
    )
}

const Option = ({text,id,currentSelectedOption,onClick})=>{
    const onClicked = () =>{
        onClick(id)
    }
    return (
        <div onClick={onClicked} className={`internalOption  ${id===currentSelectedOption?`bottomRedBorder`:``}`}>
            <p className={`internalOptionText`}>{text}</p>
        </div>
    )
}

export default InternalOptions