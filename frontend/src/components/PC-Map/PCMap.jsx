import React from 'react'
import './pcMap.css'
import PC from '../PC/PC'
import InternalOptions from '../internal-options/InternalOptions';
import {PCMapContext} from '../../contexts/PCMapContext'
import { useContext } from 'react';
import PcMapManagment from './managment-mode/PcMapManagment';

const PCMap = () => {
  const pcMapContext = useContext(PCMapContext);
  return (
    <>
    <InternalOptions options={['Map - Managment Mode','Map - Configuration Mode']} context={pcMapContext}/>
    {pcMapContext.currentSelectionInternalOption===0?<PcMapManagment centerName={'Click Esports'}/>:<div>Configuration</div>}
    </>
  )
}

export default PCMap