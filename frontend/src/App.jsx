import {BrowserRouter as Router, Route,Routes,Navigate} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Test from './pages/Test';
import E404 from './pages/E404';
import CreateUser from './components/create-user/CreateUser';
import Login from './components/login/Login';
function App() {
  return (
    <Router>
    <Routes>
    <Route exact path="/" element={<CreateUser/>}/>
    <Route exact path="/test1/test2" element={<Test/>}/>
    <Route exact path="/404" element={<E404/>}/>
    <Route path="*" element={<E404/>}/>
    </Routes>
  </Router>
  );
}

export default App;
