import React from 'react'
import './AddWorkstation.css'
import { useContext } from 'react'
import { PCMapContext } from '../../contexts/PCMapContext'


const AddWorkstation = () => {
    const {setShowAddWorkStation} = useContext(PCMapContext)
    return (
    <div className='AddWorkstation'>
        AddWorkstation
        <button onClick={()=>{setShowAddWorkStation(false)}}>a</button>
    </div>
  )
}

export default AddWorkstation