import './app.css'
import Login from './components/login/Login';
import AdminDashboard from './components/admin-dashboard/AdminDashboard'
import PaymentsTable from './components/payments-table/PaymentsTable';
import LogedInUsersTable from './components/logedInUsers-table/LogedInUsersTable';
import PCMap from './components/PC-Map/PCMap';
import PaymentForm from './components/payment-form/PaymentForm';
import Topbar from './components/topbar/Topbar';
import CreateUser from './components/create-user/CreateUser';
import { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';


function App() {
  const [selectedComponent, setSelectedComponent] = useState(1);

  const changeComponent = (componentIndex) => {
    setSelectedComponent(componentIndex);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case 1:
        return <AdminDashboard />;
      case 2:
        return <PaymentsTable />;
      case 3:
        return <PCMap />;
      case 4:
        return <PaymentForm />;
      case 5:
        return <CreateUser />;
      default:
        return <AdminDashboard />;
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

export default App;