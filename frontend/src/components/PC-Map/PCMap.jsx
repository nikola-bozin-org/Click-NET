import React from 'react'
import './pcMap.css'
import InternalOptions from '../internal-options/InternalOptions';
import {PCMapContext} from '../../contexts/PCMapContext'
import { useContext } from 'react';
import PcMapManagment from './managment-mode/PcMapManagment';
import PcMapConfiguration from './configuration-mode/PcMapConfiguration';
import AddWorkstation from '../add-workstation/AddWorkstation';

const PCMap = () => {
  const pcMapContext = useContext(PCMapContext);
  return (
    <>
    <InternalOptions options={['Map - Managment Mode','Map - Configuration Mode']} context={pcMapContext}/>
    {pcMapContext.showAddWorkStation && <AddWorkstation/>}
    {pcMapContext.currentSelectionInternalOption===0?
    <PcMapManagment centerName={'Click Esports'}/>
    :
    <PcMapConfiguration centerName={'Click Esports'}/>
    }
    </>
  )
}

export default PCMap