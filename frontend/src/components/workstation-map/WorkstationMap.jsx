import React from 'react'
import './workstationMap.css'
import InternalOptions from '../internal-options/InternalOptions';
import {CenterContext} from '../../contexts/CenterContext'
import { useContext } from 'react';
import WorkstationMapManagment from './managment-mode/WorkstationMapManagment';
import WorkstationMapConfiguration from './configuration-mode/WorkstationMapConfiguration';
import AddWorkstation from '../add-workstation/AddWorkstation';

const PCMap = () => {
  const centerContext = useContext(CenterContext);
  return (
    <>
    <InternalOptions options={['Map - Managment Mode','Map - Configuration Mode']} context={centerContext}/>
    {centerContext.showAddWorkStation && <AddWorkstation/>}
    {centerContext.currentSelectionInternalOption===0?
    <WorkstationMapManagment centerName={'Click Esports'}/>
    :
    <WorkstationMapConfiguration centerName={'Click Esports'}/>
    }
    </>
  )
}

export default PCMap