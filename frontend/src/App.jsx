import {BrowserRouter as Router, Route,Routes,Navigate} from 'react-router-dom'
import Test from './pages/Test';
import E404 from './pages/E404';
import Login from './components/login/Login';
import AdminDashboard from './components/admin-dashboard/AdminDashboard'

function App() {
  return (
    <Router>
    <Routes>
    <Route exact path="/login" element={<Login/>}/>
    <Route exact path="/admin-dashboard" element={<AdminDashboard/>}/>
    <Route exact path="/test1/test2" element={<Test/>}/>
    <Route exact path="/404" element={<E404/>}/>
    <Route path="*" element={<Login/>}/>
    </Routes>
  </Router>
  );
}
//000000
//036346
//a01a7d
export default App;
