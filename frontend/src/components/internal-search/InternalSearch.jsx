import React from 'react'
import './internalSearch.css'
import HandleButton from '../handle-button/HandleButton'

const InternalSearch = () => {
  return (
    <div className='internalSearch'>
        <input type="text" className="search-input" placeholder="Name..."/>
        <HandleButton text={"Search"} className={'search-button'}/>
    </div>
  )
}

export default InternalSearch