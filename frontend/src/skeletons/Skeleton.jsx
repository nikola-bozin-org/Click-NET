import React from 'react'
import './skeleton.css'
const Skeleton = ({type}) => {
  return (
    <div className={`skeleton ${type}`}></div>
  )
}

export default Skeleton