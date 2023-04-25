import React, { useState } from 'react'
import './AddWorkstation.css'
import { useContext } from 'react'
import { PCMapContext } from '../../contexts/PCMapContext'
import HandleButton from '../handle-button/HandleButton'


const AddWorkstation = () => {
  const [number, setNumber] = useState(0);
  const [ip, setIP] = useState('');
  const [mac, setMAC] = useState('');
  const [zone, setZone] = useState('');

  const { setShowAddWorkStation } = useContext(PCMapContext)
  return (
    <div className='AddWorkstation'>
      <form className="add-workstation-form">
        <p>Add Workstation</p>
        <p htmlFor="number">Number:</p>
        <input className='add-workstation-number-input' autoComplete='off' type="number" id="number" name="number" onChange={(e) => { setNumber(e.target.value) }} required />
        <p htmlFor="ip">IP:</p>
        <input autoComplete='off' type="text" id="ip" name="ip" value={ip} onChange={(e) => { setIP(e.target.value) }} required />
        <p htmlFor="mac">MAC:</p>
        <input autoComplete='off' type="text" id="mac" name="mac" value={mac} onChange={(e) => { setMAC(e.target.value) }} required />
        <label htmlFor="zone">Zone:</label>
        <select id="zone" name="zone" value={zone} onChange={(e) => { setZone(e.target.value) }} required>
          <option value="Lobby">Lobby</option>
          <option value="Pro">Pro</option>
        </select>
        <div className="add-workstation-control-buttons">
          <HandleButton onClick={() => { setShowAddWorkStation(false) }} text={'Cancel'} className={'cancel-add-workstation'} />
          <HandleButton onClick={() => { setShowAddWorkStation(false) }} text={'Save'} className={'save-add-workstation'} />
        </div>
      </form>
    </div>
  )
}

export default AddWorkstation