import React from 'react'
import './pcMap.css'
import PC from '../PC/PC'
import InternalOptions from '../internal-options/InternalOptions';
import {PCMapContext} from '../../contexts/PCMapContext'
import { useContext } from 'react';

const numberOfPCs = 12;

const N=6;
const M=6;

const PCMap = () => {
  const pcMapContext = useContext(PCMapContext);
  return (
    <>
    <InternalOptions options={['Map - Managment Mode','Map - Configuration Mode']} context={pcMapContext}/>
    <div className='PCMap'>
      <PC number={1} color={'black'} x={10} y={10} />
      <PC number={2} color={'black'} x={20} y={20} />
      <PC number={3} color={'black'} x={30} y={30} />
    </div>
    </>
  )
}

export default PCMap