import './app.css'
import PaymentsTable from './components/payments-table/PaymentsTable';
import PCMap from './components/PC-Map/PCMap';
import Topbar from './components/topbar/Topbar';
import CreateUser from './components/create-user/CreateUser';
import { useState,useEffect } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Users from './components/users/Users';
import CashRegister from './components/cash-register/CashRegister';
import dashboard from './images/dashboard.png'
import pay from './images/pay.png'
import pcMap from './images/site-map.png'
import users from './images/user-avatar.png'

const IDs = [0,1,2,3,4,5];
const images = [dashboard,pay,pcMap,pay,users,pay];

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState(0);
  const changeComponent = (componentIndex) => {
    setSelectedComponent(componentIndex);
  };


  useEffect(() => {
    const allUsers = async () => {
      try {
        const response = await fetch('https://clicknet-server.onrender.com/api/users', {
          headers: {
            'Content-Type': 'application/json',
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjgxMDMyMDg1fQ.UDfyGTqRvklBnRPmybpbEtaXGjoPX-SIkklZwK--NX4'
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const result = await response.json();
        console.info(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    allUsers();
  }, []);


  const renderComponent = () => {
    switch (selectedComponent) {
      case 1:
        return <CashRegister />;
      case 2:
        return <PaymentsTable />;
      case 3:
        return <PCMap />;
      case 4:
        return <Users />;
      case 5:
        return <CreateUser />;
      default:
        return <Users />;
    }
  };

  return (
    <div className="app">
      <Topbar/>
      <div className="appOther">
        <div className="a">
          <Sidebar changeComponent={changeComponent} IDs={IDs} images={images} currentSelectedComponent={selectedComponent}/>
        </div>
          {renderComponent()}
      </div>
    </div>
  )
}
// https://coolors.co/palette/000000-171a1e-343d51-feda84-ff9b83-976393-685489-43457f

export default App;