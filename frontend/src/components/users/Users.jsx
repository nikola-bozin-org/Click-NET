import React, { useContext, useEffect } from 'react'
import './users.css'
import InternalTopbar from '../internal-topbar/InternalTopbar'
import InternalOptions from '../internal-options/InternalOptions'
import InternalSearch from '../internal-search/InternalSearch'
import Table from '../table/Table'
import { useState } from 'react'
import { UsersContext} from '../../contexts/UsersContext'
import { filterObjectByKeys } from '../../utils'

const usersMainHeaders = ['username', 'role', 'balance', 'discount', 'xp'];
// const balanceHistoryHeaders = ['username','paymentAmount','paymentDate']

const Users = ({users}) => {
  const usersContext = useContext(UsersContext);
  const [tableData,setTableData] = useState([]);
  const [headers,setHeaders] = useState([]);
  const usersMainData = users.map((user) => filterObjectByKeys(user, usersMainHeaders));
  useEffect(() => {
    switch (usersContext.currentSelectionInternalOption) {
      case 0:
        setTableData(usersMainData);
        setHeaders(usersMainHeaders)
        break;
      // case 1: 
      //   setTableData(paymentsHistoryData);
      //   break;
      // case 2:
      default:
        setTableData([]);
    }
  }, [usersContext.currentSelectionInternalOption]);

  return (
    <div className='users'>
        <InternalTopbar text={"Users"}/>
        <InternalOptions context={usersContext} options={['All users','Session history','Balance history','Receipt history','Passes history','Roles and user access','User types']}/>
        <InternalSearch/>
        <Table headers={headers} tableData={tableData} shouldRoundEdges={true}/>
    </div>
  )
}

export default Users