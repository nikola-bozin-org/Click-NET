import './app.css'
import Topbar from './components/topbar/Topbar';
import CreateUser from './components/create-user/CreateUser';
import { useEffect, useContext } from 'react';
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
import { Navigate } from 'react-router-dom';
import {allSessions, allUsers, getCurrentCashRegisterSession, workstationLimit} from './config'
import CloseCashRegister from './components/close-cash-register/CloseCashRegister';
import OpenCashRegister from './components/open-cash-register/OpenCashRegister';
import Center from './components/center/Center';
import { CenterContext, CenterContextProvider } from './contexts/CenterContext';


const images = [pcMap, pay, dashboard, createUser,settings,importUser];

const App = () => {
  const appContext = useContext(AppContext);
  const centerContext = useContext(CenterContext);
  const {isMobile, MobileNotSupported} = useIsMobile(460);

  useEffect(() => {
    const fetchWorkstationLimit = async () => {
      const response = await fetch(workstationLimit, {
        headers: {
          'Content-Type': 'application/json',
          'token':localStorage.getItem('accessToken')
        }
      });
      const result = await response.json();
      if(result.error) {console.error(result.error); return}
      console.info(centerContext)
      centerContext.setWorkstationLimit(result.workstationLimit);
  };
    const fetchAllUsers = async () => {
        const response = await fetch(allUsers, {
          headers: {
            'Content-Type': 'application/json',
            'token':localStorage.getItem('accessToken')
          }
        });
        const result = await response.json();
        if(result.error) {console.error(result.error); return}
        appContext.setUsers(result.users.reverse());
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
      appContext.setSessions(result.sessions.reverse());
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
      if(!result.currentSession) {return;}
      appContext.setCurrentCashRegisterSession(result.currentSession);
    }
    const loadData = async () => {
      appContext.setIsLoading(true);
      await Promise.all([fetchAllUsers(), fetchAllSessions(),fetchCurrentCashRegisterSession(),fetchWorkstationLimit()]);
      appContext.setIsLoading(false);
    };
  
    loadData();
  }, []);

  if(!appContext.isAuthorized) return <Navigate to='/'/>

  if (isMobile) return <MobileNotSupported />

  if (appContext.isLoading) return <>
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
        <Sidebar images={images} currentSelectedComponent={appContext.currentSidebarSelection} />
        </div>
        {appContext.shouldShowCreateUser && <CreateUser/>}
        {appContext.shouldShowCloseCashRegister && <CloseCashRegister/>}
        {(() => {
          switch (appContext.currentSidebarSelection) {
            case 0: return <Center centerName={"Click Esports"} numberOfLoggedInUsers={0} licenceLimit={centerContext.workstationLimit}/>;
            case 1: return <> {appContext.currentCashRegisterSession!==null?<CashRegisterContextProvider><CashRegister centerName={'Click Esports'}/></CashRegisterContextProvider>:<OpenCashRegister/>}  </> ;
            case 2:return <Users users={appContext.users} sessions={appContext.sessions}/>
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

export default App;