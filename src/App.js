import './App.css';
import { BrowserRouter as Router, Route, useNavigate, Routes, Navigate ,Outlet} from 'react-router-dom';
import { useContext } from 'react'
import { AuthContext } from './Context/Authcontext'
import Login from './Components/Login';
import Resetpassword from './Components/Resetpassword';
import Signup from './Components/Signup';
import Feed from './Components/Feed';
import { AuthProvider } from './Context/Authcontext';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  
  return (
   
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/resetpassword" element={<Resetpassword />} />
                  <Route element={<PrivateRoute />}>
              <Route path="/" element={<Feed />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
