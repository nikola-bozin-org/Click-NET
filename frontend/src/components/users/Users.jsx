import React from 'react'
import './users.css'
import InternalTopbar from '../internal-topbar/InternalTopbar'
import InternalOptions from '../internal-options/InternalOptions'

const Users = () => {
  return (
    <div className='users'>
        <InternalTopbar text={"Users"}/>
        <InternalOptions/>
    </div>
  )
}

export default Users