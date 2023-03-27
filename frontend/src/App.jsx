import {BrowserRouter as Router, Route,Routes,Navigate} from 'react-router-dom'
import Test from './pages/Test';
import E404 from './pages/E404';
import Login from './components/login/Login';
import AdminDashboard from './components/admin-dashboard/AdminDashboard'
import PaymentsTable from './components/payments-table/PaymentsTable';
import LogedInUsersTable from './components/logedInUsers-table/LogedInUsersTable';
import PCMap from './components/PC-Map/PCMap';
import PaymentForm from './components/payment-form/PaymentForm';

function App() {
  return (
    <Router>
    <Routes>
    <Route exact path="/" element={<AdminDashboard/>}/>
    <Route exact path="/admin-dashboard" element={<AdminDashboard/>}/>
    <Route path="*" element={<Login/>}/>
    </Routes>
  </Router>
  );
}
//000000
//036346
//a01a7d
export default App;
