import './app.css'
import PCMap from './components/PC-Map/PCMap';
import Topbar from './components/topbar/Topbar';
import CreateUser from './components/create-user/CreateUser';
import { useState, useEffect, useContext } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Users from './components/users/Users';
import CashRegister from './components/cash-register/CashRegister';
import dashboard from './images/dashboard.png'
import pay from './images/pay.png'
import pcMap from './images/site-map.png'
import users from './images/user-avatar.png'
import useIsMobile from './hooks/useIsMobile';
import Skeleton from './skeletons/Skeleton';
import {AppContext} from './contexts/AppContext'
import { UsersContext} from './contexts/UsersContext';
import { CashRegisterContextProvider } from './contexts/CashRegisterContext';
import PoweredBy from './components/powered-by/PoweredBy';
import { Navigate,useNavigate } from 'react-router-dom';

const IDs = [0, 1, 2, 3, 4, 5];
const images = [dashboard, pay, pcMap, pay, users, pay];

const App = () => {
  const {isAuthorized,currentSidebarSelection} = useContext(AppContext);
  const usersContext = useContext(UsersContext);
  const {isMobile, MobileNotSupported} = useIsMobile(460);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const allUsers = async () => {
        setIsLoading(true);
        const response = await fetch('https://clicknet-server.onrender.com/api/users', {
          headers: {
            'Content-Type': 'application/json',
            'token':localStorage.getItem('accessToken')
          }
        });
        const result = await response.json();
        if(result.error) {console.error(result.error); return}
        setUsers(result.users.reverse());
        setIsLoading(false);
    };
    allUsers();
  }, []);

  if(!isAuthorized) return <Navigate to='/'/>

  if (isMobile) return <MobileNotSupported />

  if (isLoading) return <>
    <Skeleton type={"s-barh71"} />
    <Skeleton type={"s-barh61"} />
    <Skeleton type={"s-avatar"} />
    <Skeleton type={"s-sidebar"} />
  </>;

  return (
    <div className="app">
      <Topbar />
      <PoweredBy/>
      <div className="appOther">
        <div>
        <Sidebar IDs={IDs} images={images} currentSelectedComponent={currentSidebarSelection} />
        </div>
        {usersContext.shouldShowCreateUser && <CreateUser/>}
        {(() => {
          switch (currentSidebarSelection) {
            case 0: return <Users users={users}/>
            case 1: return <CashRegisterContextProvider><CashRegister/></CashRegisterContextProvider> ;
            case 2:
              return <PCMap/>;
            case 3:
              return <PCMap/>;
            case 4:{
              return;
            }
            case 5:
              return <></>
            default:
              return ;
          }
        })()}
      </div>
    </div>
  )
}
// https://coolors.co/palette/000000-171a1e-343d51-feda84-ff9b83-976393-685489-43457f

export default App;