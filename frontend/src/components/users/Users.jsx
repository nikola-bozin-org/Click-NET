import React from 'react'
import './users.css'
import InternalTopbar from '../internal-topbar/InternalTopbar'
import InternalOptions from '../internal-options/InternalOptions'
import InternalSearch from '../internal-search/InternalSearch'

const Users = () => {
  return (
    <div className='users'>
        <InternalTopbar text={"Users"}/>
        <InternalOptions options={['All users','Session history','Balance history','Receipt history','Passes history','Roles and user access','User types']}/>
        <InternalSearch/>
    </div>
  )
}

export default Users