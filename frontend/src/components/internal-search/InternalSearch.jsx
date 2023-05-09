import React from 'react'
import './internalSearch.css'
import HandleButton from '../handle-button/HandleButton'

const InternalSearch = ({onChange, placeholderText,useBorderBottom=true}) => {
  return (
    <div className={`internalSearch ${useBorderBottom?'use-border-bottom':''}`}>
        <p>Search:</p>
        <input onChange={onChange} type="text" className="search-input" placeholder={placeholderText}/>
        {/* <HandleButton text={"Search"} className={'search-button'}/> */}
    </div>
  )
}

export default InternalSearch