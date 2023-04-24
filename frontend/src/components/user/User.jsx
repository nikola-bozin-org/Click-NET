import React,{useEffect} from 'react';
import './User.css';
import { useContext } from 'react';
import { UsersContext } from '../../contexts/UsersContext';
import bin from '../../images/bin.png'
import DeleteUser from '../delete-user/DeleteUser'
import HandleButton from '../handle-button/HandleButton'
import { userBalance, userDiscount, userXp } from '../../config';
import { useState } from 'react';
import Table from '../table/Table'
import { extractDate, filterObjectByKeys } from '../../utils';

const User = () => {
  const [balance,setBalance] = useState(0);
  const [discount,setDiscount]= useState(0);
  const [xp,setXp] = useState(0);
  const usersContext = useContext(UsersContext)
  const userData = usersContext.userData;
  const dateCreated = userData.actions[0].date;
  const returnToList = ()=>{
    usersContext.setShowUserData(false);
  }
  const onBinClicked = ()=>{
    usersContext.setShowDeleteUser(true);
  }

  useEffect(() => {
    const fetchUserBalance = async () =>{
      const response = await fetch(`${userBalance}/${userData.username}`, {
        headers: {
          'Content-Type': 'application/json',
          'token':localStorage.getItem('accessToken')
        },
      });
      const result = await response.json();
      if(result.error) {console.error(result.error); return}
      setBalance(result.balance);
    }
    const fetchUserDiscount = async()=>{
      const response = await fetch(`${userDiscount}/${userData.username}`, {
        headers: {
          'Content-Type': 'application/json',
          'token':localStorage.getItem('accessToken')
        },
      });
      const result = await response.json();
      if(result.error) {console.error(result.error); return}
      setDiscount(result.discount)
    }
    const fetchUserXp = async()=>{
      const response = await fetch(`${userXp}/${userData.username}`, {
        headers: {
          'Content-Type': 'application/json',
          'token':localStorage.getItem('accessToken')
        },
      });
      const result = await response.json();
      if(result.error) {console.error(result.error); return}
      setXp(result.xp);
    }
    fetchUserBalance();
    fetchUserDiscount();
    fetchUserXp();
  },[])
  

  return (
    <>
    {usersContext.showDeleteUser && <DeleteUser />}
    <div className='user-dashboard'>
      <div className="user-topbar">
        <div className="user-topbar-username">
          {userData.username}
        </div>
        <div className="user-topbar-time-created">
          Created at: {extractDate(dateCreated)}
        </div>
      </div>
      <div className="user-topbar-2">
        <div onClick={returnToList} className="user-topback-back-to-list">
          {'⇽ Back to the list'}
        </div>
        <div onClick={onBinClicked} className="delete-user">
        <img src={bin} alt="" className="delete-user-img invertColor" />
        </div>
      </div>
      <div className="user-dashboard-data">
        <div className="user-dashboard-data-blocks">
          <DataBlock circleColor={'#cc2234'} text={'Balance'} value={balance} onClick={()=>{}} buttonText={'Balance history'}/>
          <DataBlock circleColor={'#cc2234'} text={'Discount'} value={`${discount}%`} onClick={()=>{}} buttonText={'Set discount'}/>
          <DataBlock circleColor={'#cc2234'} text={'XP'} value={xp} onClick={()=>{}} buttonText={'Passes history'}/>
          <DataBlock circleColor={'#cc2234'} text={'User type'} value={userData.role} onClick={()=>{}} buttonText={'Set role'}/>
        </div>
        <div className="user-dashboard-actions">
          <p className='user-dashboard-actions-text'>Actions</p>
        <Table shouldRoundEdges={true} heightReduction={600} headers={['Action','Description','Date','PC Number','Balance Change']} tableData={userData.actions.map((action)=>filterObjectByKeys(action,['name','description','date','pcNumber','balanceChange']))}/>
        <p className="empty-text">empty</p>
        </div>
      </div>
        <p className='user-basic-info-text'>Basic Info</p>
      <div className="user-basic-infos">
      <BasicInfo type={'First name'} value={userData.basicInfo.firstName}/>
      <BasicInfo type={'Last name'} value={userData.basicInfo.lastName}/>
      <BasicInfo type={'Email'} value={userData.basicInfo.email}/>
      <BasicInfo type={'Phone'} value={userData.basicInfo.phone}/>
      </div>
    </div>
    </>
  )
}

const DataBlock = ({text,value,onClick,buttonText, circleColor})=>{
  return (
    <div className="user-data-block">
      <p className="user-data-block-text">{text}</p>
      <p className="user-data-block-value">{value}</p>
      <HandleButton circleColor={circleColor} shouldDisable={false} onClick={onClick} text={buttonText} className={'data-block-button'}/>
    </div>
  )
}

const BasicInfo = ({type,value}) =>{
  return (
    <div className="basic-info">
      <p className="basic-info-type">{type}:</p>
      <p className="basic-info-value">{value}</p>
    </div>
  )
}


export default User