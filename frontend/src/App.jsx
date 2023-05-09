import './app.css'
import Topbar from './components/topbar/Topbar';
import CreateUser from './components/create-user/CreateUser';
import { useEffect, useContext } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Users from './components/users/Users';
import CashRegister from './components/cash-register/CashRegister';
import dashboard from './images/dashboard.png'
import pay from './images/pay.png'
import gameController from './images/game-control.png'
import pcMap from './images/site-map.png'
import createUser from './images/user-avatar.png'
import settings from './images/settings.png'
import importUser from './images/importUser.png'
import useIsMobile from './hooks/useIsMobile';
import Skeleton from './skeletons/Skeleton';
import {AppContext} from './contexts/AppContext'
import { CashRegisterContextProvider } from './contexts/CashRegisterContext';
import { DndControllerContextProvider } from './contexts/DndControllerContext';
import PoweredBy from './components/powered-by/PoweredBy';
import ImportUser from './components/import-user/ImportUser'
import { Navigate } from 'react-router-dom';
import {allGames, allSessions, allUsers, fullUtility, getCurrentCashRegisterSession, getWorkstations, workstationLimit} from './config'
import CloseCashRegister from './components/close-cash-register/CloseCashRegister';
import OpenCashRegister from './components/open-cash-register/OpenCashRegister';
import Center from './components/center/Center';
import { CenterContext } from './contexts/CenterContext';
import Games from './components/games/Games';
import { setGames } from './redux/gamesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConnectedClients } from './utils';
import { addWorkstationRole, setNumberOfOnlineWorkstations } from './redux/workstationsSlice';
import { RemoteControllerContextProvider } from './contexts/RemoteControllerContext';

const images = [pcMap, pay, dashboard, createUser,gameController, ];

const App = () => {
  const centerName = useSelector((state)=>state.other.centerName);
  const numberOfOnlineWorkstations = useSelector((state)=>state.workstations.onlineWorkstations)
  const appContext = useContext(AppContext);
  const centerContext = useContext(CenterContext);
  const {isMobile, MobileNotSupported} = useIsMobile(260);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllClients = async ()=>{
      const clients = await fetchConnectedClients();
      dispatch(setNumberOfOnlineWorkstations({numberOfOnlineWorkstations:clients.length}))
      clients.forEach(client => {
        dispatch(addWorkstationRole({number:client.pcNumber,role:client.role,username:client.username}))
      });
    }
    const fetchWorkstations = async () =>{
      const response = await fetch(getWorkstations, {
        headers: {
          'Content-Type': 'application/json',
          'token':localStorage.getItem('accessToken')
        }
      });
      const result = await response.json();
      if(result.error) {console.error(result.error); return}
      centerContext.setWorkstations(result.workstations);
    }
    const fetchAllGames = async () => {
      const response = await fetch(allGames, {
        headers: {
          'Content-Type': 'application/json',
          'token':localStorage.getItem('accessToken')
        }
      });
      const result = await response.json();
      if(result.error) {console.error(result.error); return}
      dispatch(setGames({games:result.games}));
    }
    const fetchUtility = async () => {
      const response = await fetch(fullUtility, {
        headers: {
          'Content-Type': 'application/json',
          'token':localStorage.getItem('accessToken')
        }
      });
      const result = await response.json();
      if(result.error) {console.error(result.error); return}
      centerContext.setWorkstationLimit(result.utility?.utility.workstationLimit);
      centerContext.setCurrency(result.utility?.utility.currency);
  };
    const fetchAllUsers = async () => {
        const response = await fetch(`${allUsers}?limit=${appContext.allUsersLimit}&skip=${appContext.allUsersSkip}`, {
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
      await Promise.all([
        fetchAllUsers(),
        fetchAllSessions(),
        fetchCurrentCashRegisterSession(),
        fetchUtility(),
        fetchWorkstations(),
        fetchAllGames(),
        fetchAllClients()
        ]);
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
            case 0: return <RemoteControllerContextProvider> <DndControllerContextProvider><Center centerName={centerName} numberOfLoggedInUsers={numberOfOnlineWorkstations} licenceLimit={centerContext.workstationLimit}/></DndControllerContextProvider> </RemoteControllerContextProvider>;
            case 1: return <> {appContext.currentCashRegisterSession!==null?<CashRegisterContextProvider><CashRegister centerName={centerName}/></CashRegisterContextProvider>:<OpenCashRegister/>}  </> ;
            case 2: return <Users users={appContext.users} sessions={appContext.sessions}/>
            case 3: //Create User
            case 4: return <Games/>;
            default:
              return ;
          }
        })()}
      </div>
    </div>
  )
}

export default App;