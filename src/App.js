import './App.css';
import { BrowserRouter as Router, Route, useNavigate, Routes, Navigate ,Outlet} from 'react-router-dom';
import Login from './Components/Login';
import Resetpassword from './Components/Resetpassword';
import Signup from './Components/Signup';
import Feed from './Components/Feed';
import { AuthProvider } from './Context/Authcontext';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';
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
              <Route path="/profile/:id" element={<Profile />} />
              </Route>
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
