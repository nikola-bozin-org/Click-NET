import React from 'react'
import './internalTopbar.css'

const InternalTopbar = ({text}) => {
    return (
        <div className='internalTopbar'>
            <p className='internalTopbarText'>{text}</p>
        </div>
    )
}

export default InternalTopbar