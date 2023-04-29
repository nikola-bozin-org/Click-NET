import React from 'react'
import './workstationMap.css'
import InternalOptions from '../internal-options/InternalOptions';
import {CenterContext} from '../../contexts/CenterContext'
import { useContext } from 'react';
import PcMapManagment from './managment-mode/PcMapManagment';
import PcMapConfiguration from './configuration-mode/PcMapConfiguration';
import AddWorkstation from '../add-workstation/AddWorkstation';

const PCMap = () => {
  const centerContext = useContext(CenterContext);
  return (
    <>
    <InternalOptions options={['Map - Managment Mode','Map - Configuration Mode']} context={centerContext}/>
    {centerContext.showAddWorkStation && <AddWorkstation/>}
    {centerContext.currentSelectionInternalOption===0?
    <PcMapManagment centerName={'Click Esports'}/>
    :
    <PcMapConfiguration centerName={'Click Esports'}/>
    }
    </>
  )
}

export default PCMap