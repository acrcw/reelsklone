import React,{ useContext } from 'react';

import { AuthContext } from '../Context/Authcontext';
import { BrowserRouter as  Navigate ,Outlet} from 'react-router-dom';
function PrivateRoute() 
{
  const { user } = useContext(AuthContext);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
