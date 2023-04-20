import React from 'react'
import './Center.css'
import PCMap from '../PC-Map/PCMap'
import HandleButton from '../handle-button/HandleButton'
import { pcAdditionalInfo, pcRole, userRoles } from '../../config'

const Center = ({ centerName, numberOfLoggedInUsers, licenceLimit }) => {
    return (
        <div className='center'>
            <div className="center-pc-map">
                <PCMap />
            </div>
            <div className="center-info">
                <div className="center-info-center-name">
                    {centerName}
                </div>
                <div className="center-info-center-name-line"></div>
                <div className="center-info-occupancy">
                    <p className="center-info-occupancy-text">Occupancy:</p>
                    <p className="center-info-occupancy-limit">{numberOfLoggedInUsers}/{licenceLimit}</p>
                </div>
                <div className="center-info-select-all">
                    <HandleButton className={"center-info-select-all-button"} text={"Select All"} />
                </div>
                <div className="center-info-roles">
                    <div className="center-info-roles-user">
                        {userRoles.map((element,index) => (
                            <Role key={index} text={element.name} color={element.color} logedInUsersAmountWithRole={0} useCircle={false}/>
                        ))}
                    </div>
                    <div className="center-info-roles-pc">
                        {pcRole.map((element,index)=>(
                            <Role key={index} text={element.name} color={element.color} logedInUsersAmountWithRole={0} useCircle={false}/>
                        ))}
                    </div>
                    <div className="center-info-pc-additional-info">
                        {pcAdditionalInfo.map((element,index)=>(
                            <Role key={index} text={element.name} color={element.color} logedInUsersAmountWithRole={0} useCircle={true}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


const Role = ({ color, text, logedInUsersAmountWithRole,useCircle }) => {
    return (
        <div className='center-role'>
            <div className="center-role-left">
                {useCircle?
                <div style={{backgroundColor:`${color}`}} className='center-role-circle'></div>
                :
                <div style={{ border: `3px solid ${color}` }} className="center-role-left-box"></div>}
                {text}
            </div>
            <div className="center-role-right">
                {logedInUsersAmountWithRole}
            </div>
        </div>
    )
}

export default Center