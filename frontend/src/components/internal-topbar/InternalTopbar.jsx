import React from 'react'
import './internalTopbar.css'

const InternalTopbar = ({text, useBorderBottom=false}) => {
    return (
        <div className={`internalTopbar ${useBorderBottom?'use-border-bottom':''}`}>
            <p className='internalTopbarText'>{text}</p>
        </div>
    )
}

export default InternalTopbar