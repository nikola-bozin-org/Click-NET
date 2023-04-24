import React, { useContext, useEffect } from 'react'
import './users.css'
import InternalTopbar from '../internal-topbar/InternalTopbar'
import InternalOptions from '../internal-options/InternalOptions'
import InternalSearch from '../internal-search/InternalSearch'
import Table from '../table/Table'
import { useState } from 'react'
import { UsersContext} from '../../contexts/UsersContext'
import { extractDate, extractHours, filterObjectByKeys } from '../../utils'
import { useSelector } from 'react-redux'
import {employeeHeaders_USERS,adminHeaders_USERS, tableRowClickedBehaviour} from '../../config'
import User from '../user/User'
import { AppContext } from '../../contexts/AppContext'

const Users = ({users,sessions}) => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
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
        const filteredData = sessions.map((session)=>filterObjectByKeys(session,headersSessions));
        const formattedData = filteredData.map((data) => {
          const startDateFormatted = `${extractHours(data.startDate)} ${extractDate(data.startDate)}`;
          const endDateFormatted = data.endDate !== ''
          ? `${extractHours(data.endDate)} ${extractDate(data.endDate)}`
          : '';
          const newData = { ...data };
          newData.startDate = startDateFormatted;
          newData.endDate = endDateFormatted;
          return newData;
      });
        setTableData(formattedData);
        setHeaders(['Username','Start Date','End Date','Minutes','PC Number'])
        break;
      case 2:
      default:
        setTableData([]);
    }
  }, [usersContext.currentSelectionInternalOption,useContext(AppContext).users]);

  return (
    <>
    {usersContext.showUserData && <User/>}
    <div className='users'>
        <InternalTopbar text={"Users"}/>
        <InternalOptions context={usersContext} options={isAdmin?[...employeeHeaders_USERS,...adminHeaders_USERS]:employeeHeaders_USERS}/>
        <InternalSearch/>
        <Table headers={headers} tableData={tableData} shouldRoundEdges={true} rowClickedBehaviour={tableRowClickedBehaviour.User}/>
    </div>
    </>
  )
}

export default Users