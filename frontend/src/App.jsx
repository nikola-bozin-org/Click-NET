import {BrowserRouter as Router, Route,Routes,Navigate} from 'react-router-dom'
import Test from './pages/Test';
import E404 from './pages/E404';
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
  const [selectedComponent, setSelectedComponent] = useState(3);

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
    <>
    <Topbar/>
    <Sidebar changeComponent={changeComponent}/>
    <div className='app'>
      {renderComponent()}
    </div>
    </>
  )
}

export default App;