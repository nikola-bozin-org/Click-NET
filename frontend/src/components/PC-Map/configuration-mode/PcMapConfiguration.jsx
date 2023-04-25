import React from 'react'
import './PcMapConfiguration.css'
import InternalTopbar from '../../internal-topbar/InternalTopbar'

const PcMapConfiguration = ({centerName}) => {
    return (
        <div className='PcMapConfiguration'>
            <InternalTopbar text={centerName}/>
        </div>
    )
}

export default PcMapConfiguration