import React, { useContext, useEffect } from 'react'
import './users.css'
import InternalTopbar from '../internal-topbar/InternalTopbar'
import InternalOptions from '../internal-options/InternalOptions'
import InternalSearch from '../internal-search/InternalSearch'
import Table from '../table/Table'
import { useState } from 'react'
import { UsersContext} from '../../contexts/UsersContext'
import { filterObjectByKeys } from '../../utils'
import { useSelector } from 'react-redux'
import {employeeHeaders_USERS,adminHeaders_USERS} from '../../config'

const Users = ({users,sessions}) => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  console.info("ADMIN: " + isAdmin)
  const usersContext = useContext(UsersContext);
  const [tableData,setTableData] = useState([]);
  const [headers,setHeaders] = useState([]);
  useEffect(() => {
    switch (usersContext.currentSelectionInternalOption) {
      case 0:
        const headersMain = ['username', 'role', 'balance', 'discount', 'xp'];
        setTableData(users.map((user) => filterObjectByKeys(user, headersMain)));
        setHeaders(headersMain)
        break;
        case 1: 
        const headersSessions = ['username','startDate','endDate','minutes','pcNumber'];
        setTableData(sessions.map((session)=>filterObjectByKeys(session,headersSessions)));
        setHeaders(['Username','Start Date','End Date','Minutes','PC Number'])
        break;
      case 2:
      default:
        setTableData([]);
    }
  }, [usersContext.currentSelectionInternalOption]);

  return (
    <div className='users'>
        <InternalTopbar text={"Users"}/>
        <InternalOptions context={usersContext} options={isAdmin?[...employeeHeaders_USERS,...adminHeaders_USERS]:employeeHeaders_USERS}/>
        <InternalSearch/>
        <Table headers={headers} tableData={tableData} shouldRoundEdges={true} onClickTableRow={()=>{console.info("Row Clicked");}}/>
    </div>
  )
}

export default Users