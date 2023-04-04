import './app.css'
import PaymentsTable from './components/payments-table/PaymentsTable';
import PCMap from './components/PC-Map/PCMap';
import Topbar from './components/topbar/Topbar';
import CreateUser from './components/create-user/CreateUser';
import { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Users from './components/users/Users';
import CashRegister from './components/cash-register/CashRegister';


function App() {
  const [selectedComponent, setSelectedComponent] = useState(1);

  const changeComponent = (componentIndex) => {
    setSelectedComponent(componentIndex);
  };

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
          <Sidebar changeComponent={changeComponent}/>
        </div>
          {renderComponent()}
      </div>
    </div>
  )
}
// https://coolors.co/palette/000000-171a1e-343d51-feda84-ff9b83-976393-685489-43457f

export default App;