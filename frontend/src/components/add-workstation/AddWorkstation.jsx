import React, { useState } from 'react'
import './AddWorkstation.css'
import { useContext } from 'react'
import { CenterContext } from '../../contexts/CenterContext'
import HandleButton from '../handle-button/HandleButton'
import {addNewWorkstation} from '../../config'
import FetchError from '../fetch-error/FetchError'

const AddWorkstation = () => {
  const [number, setNumber] = useState(0);
  const [ip, setIP] = useState('');
  const [mac, setMAC] = useState('');
  const [zone, setZone] = useState('Lobby');
  const [showError,setShowError] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const { setShowAddWorkStation,lastWorkstationClickedPositionInGrid,addNewWorkstationElement } = useContext(CenterContext)


  const addWorkstation = async(e) =>{
    e.preventDefault();
      const response = await fetch(addNewWorkstation, {
        headers: {
          'Content-Type': 'application/json',
          'token':localStorage.getItem('accessToken')
        },
        method:'POST',
        body:JSON.stringify({
          number:number,
          IP:ip,
          MAC:mac,
          zone:zone,
          x:lastWorkstationClickedPositionInGrid.x,
          y:lastWorkstationClickedPositionInGrid.y
        })
      });
      const result = await response.json();
      if(result.error) {setErrorMessage(result.error); setShowError(true); return}
      setShowAddWorkStation(false);
      addNewWorkstationElement({number:number,gridPosition:{x:lastWorkstationClickedPositionInGrid.x,y:lastWorkstationClickedPositionInGrid.y},zone:zone})
      setErrorMessage('');
  }

  return (
    <div className='AddWorkstation'>
      <form className="add-workstation-form">
        <p className='add-workstation-text-title'>Add Workstation</p>
        <p htmlFor="number">Number:</p>
        <input className='add-workstation-number-input' autoComplete='off' type="number" id="number" name="number" onChange={(e) => { setNumber(e.target.value) }}  />
        <p htmlFor="ip">IP:</p>
        <input autoComplete='off' type="text" id="ip" name="ip"  onChange={(e) => { setIP(e.target.value) }}  />
        <p htmlFor="mac">MAC:</p>
        <input autoComplete='off' type="text" id="mac" name="mac" onChange={(e) => { setMAC(e.target.value) }}  />
        <label htmlFor="zone">Zone:</label>
        <select id="zone" name="zone" onChange={(e) => { setZone(e.target.value) }} >
          <option value="Lobby">Lobby</option>
          <option value="Pro">Pro</option>
        </select>
        <div className="add-workstation-control-buttons">
          <HandleButton onClick={() => { setShowAddWorkStation(false) }} text={'Cancel'} className={'cancel-add-workstation'} />
          <HandleButton onClick={addWorkstation} text={'Save'} className={'save-add-workstation'} />
        </div>
      </form>
      <FetchError marginTopValue={50} showMessage={showError} message={errorMessage} onDelayCompleted={()=>{setShowError(false)}} />
    </div>
  )
}

export default AddWorkstation