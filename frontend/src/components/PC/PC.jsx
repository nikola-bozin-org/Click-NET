import React from 'react'
import './pc.css'


const PC = ({number,color,x,y}) => {
  return (
    <div style={{backgroundColor:`${color}`,left:`${x}px`,top:`${y}px`}} className='PC'>
        <div className="PCMain">
            <p>{number}</p>
        </div>
    </div>
  )
}

export default PC