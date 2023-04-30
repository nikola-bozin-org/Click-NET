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
import {employeeHeaders_USERS,adminHeaders_USERS, tableRowClickedBehaviour, allUsers} from '../../config'
import User from '../user/User'
import { AppContext } from '../../contexts/AppContext'
import HandleButton from '../handle-button/HandleButton'

const Users = ({users,sessions}) => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const usersContext = useContext(UsersContext);
  const [tableData,setTableData] = useState([]);
  const [headers,setHeaders] = useState([]);
  const appContext = useContext(AppContext)

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

  const refreshUsers = async()=>{
    const response = await fetch(allUsers, {
      headers: {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('accessToken')
      }
    });
    const result = await response.json();
    if(result.error) {console.error(result.error); return}
    appContext.setUsers(result.users.reverse());
  }

  return (
    <>
    {usersContext.showUserData && <User/>}
    <div className='users'>
        <InternalTopbar text={"Users"}/>
        <InternalOptions context={usersContext} options={isAdmin?[...employeeHeaders_USERS,...adminHeaders_USERS]:employeeHeaders_USERS}/>
        <div className="search-and-refresh">
          <InternalSearch placeholderText={'Name...'} />
          <HandleButton onClick={refreshUsers} text={'Refresh'} className={'refresh-users'} />
        </div>
        <Table headers={headers} tableData={tableData} shouldRoundEdges={true} rowClickedBehaviour={tableRowClickedBehaviour.User}/>
    </div>
    </>
  )
}

export default Users