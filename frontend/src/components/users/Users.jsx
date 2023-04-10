import React from 'react'
import './users.css'
import InternalTopbar from '../internal-topbar/InternalTopbar'
import InternalOptions from '../internal-options/InternalOptions'
import InternalSearch from '../internal-search/InternalSearch'
import Table from '../table/Table'


const filterObjectByKeys = (obj, keys) => {
  return keys.reduce((filteredObj, key) => {
    if (obj.hasOwnProperty(key)) {
      filteredObj[key] = obj[key];
    }
    return filteredObj;
  }, {});
};

const Users = ({headers,users}) => {
  const filteredUsers = users.map((user) => filterObjectByKeys(user, headers));
  return (
    <div className='users'>
        <InternalTopbar text={"Users"}/>
        <InternalOptions options={['All users','Session history','Balance history','Receipt history','Passes history','Roles and user access','User types']}/>
        <InternalSearch/>
        <Table headers={headers} tableData={filteredUsers}/>
    </div>
  )
}

export default Users