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
import createUser from './images/user-avatar.png'
import settings from './images/settings.png'
import importUser from './images/importUser.png'
import useIsMobile from './hooks/useIsMobile';
import Skeleton from './skeletons/Skeleton';
import {AppContext} from './contexts/AppContext'
import { CashRegisterContextProvider } from './contexts/CashRegisterContext';
import PoweredBy from './components/powered-by/PoweredBy';
import ImportUser from './components/import-user/ImportUser'
import { Navigate,useNavigate } from 'react-router-dom';
import {allSessions, allUsers, getCurrentCashRegisterSession} from './config'
import CloseCashRegister from './components/close-cash-register/CloseCashRegister';


const images = [dashboard, pay, pcMap, createUser,settings,importUser];

const App = () => {
  const {isAuthorized,currentSidebarSelection} = useContext(AppContext);
  const appContext = useContext(AppContext);
  const {isMobile, MobileNotSupported} = useIsMobile(460);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [sessions,setSessions] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
        const response = await fetch(allUsers, {
          headers: {
            'Content-Type': 'application/json',
            'token':localStorage.getItem('accessToken')
          }
        });
        const result = await response.json();
        if(result.error) {console.error(result.error); return}
        setUsers(result.users.reverse());
    };
    const fetchAllSessions = async()=>{
      const response = await fetch(allSessions, {
        headers: {
          'Content-Type': 'application/json',
          'token':localStorage.getItem('accessToken')
        }
      });
      const result = await response.json();
      if(result.error) {console.error(result.error); return}
      setSessions(result.sessions.reverse());
    }
    const fetchCurrentCashRegisterSession = async()=>{
      const response = await fetch(getCurrentCashRegisterSession,{
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('accessToken')
        }
      })
      const result = await response.json();
      if (result.error) {console.error(result.error); return }
      if(!result.currentSession) console.info("No session open.");
      appContext.setIsCashRegisterOpen(true);
    }
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchAllUsers(), fetchAllSessions(),fetchCurrentCashRegisterSession()]);
      setIsLoading(false);
    };
  
    loadData();
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
        <Sidebar images={images} currentSelectedComponent={currentSidebarSelection} />
        </div>
        {appContext.shouldShowCreateUser && <CreateUser/>}
        {appContext.shouldShowCloseCashRegister && <CloseCashRegister/>}
        {(() => {
          switch (currentSidebarSelection) {
            case 0: return <Users users={users} sessions={sessions}/>
            case 1: return <> {appContext.isCashRegisterOpen?<CashRegisterContextProvider><CashRegister/></CashRegisterContextProvider>:<div>NotOpen</div>}  </> ;
            case 2:
              return <PCMap/>;
            case 3: return;
            case 5: return <ImportUser/>
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