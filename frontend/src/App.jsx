import './app.css'
import PaymentsTable from './components/payments-table/PaymentsTable';
import PCMap from './components/PC-Map/PCMap';
import Topbar from './components/topbar/Topbar';
import CreateUser from './components/create-user/CreateUser';
import { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Users from './components/users/Users';
import Payments from './components/payments/Payments';


function App() {
  const [selectedComponent, setSelectedComponent] = useState(1);

  const changeComponent = (componentIndex) => {
    setSelectedComponent(componentIndex);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 1:
        return <Payments />;
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
//https://coolors.co/palettes/popular/#272727

export default App;