import React from 'react'
import './CloseCashRegister.css'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'

const CloseCashRegister = () => {
  const {setShouldShowCloseCashRegister} = useContext(AppContext)
  return (
    <div onClick={()=>{setShouldShowCloseCashRegister(false)}} className='close-cash-register'>
        <div onClick={(e)=>e.stopPropagation()} className="close-cash-register-wrap">
          Close Session
          <button onClick={()=>{setShouldShowCloseCashRegister(false)}} className="close-cash-register-cancel">Cancel</button>
        </div>
    </div>
  )
}

export default CloseCashRegister