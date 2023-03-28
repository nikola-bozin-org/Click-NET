import React from 'react'
import './pcMap.css'
import PC from '../PC/PC'

const numberOfPCs = 12;

const N=6;
const M=6;

const PCMap = () => {
  return (
    <div className='PCMap'>
      <PC number={1} color={'black'} x={10} y={10} />
      <PC number={2} color={'black'} x={20} y={20} />
      <PC number={3} color={'black'} x={30} y={30} />
    </div>
  )
}

export default PCMap