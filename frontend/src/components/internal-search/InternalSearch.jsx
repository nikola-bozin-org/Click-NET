import React from 'react'
import './internalSearch.css'


const InternalSearch = () => {
  return (
    <div className='internalSearch'>
        <input type="text" className="search-input" placeholder="Name..."/>
        <button className="search-button">Search</button>
    </div>
  )
}

export default InternalSearch