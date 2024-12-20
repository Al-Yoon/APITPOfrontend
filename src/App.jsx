import React, { useContext } from 'react';
import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from "./components/utils/AuthContextPrueba";
import Landing from "./views/Landing";
import LoginRegister from "./views/Login-register";
import MyProjects from "./views/MyProjects";
import UserPanel from "./views/UserPanel";
import About from "./views/AboutUs";
import NewProject from "./views/NewProject";


const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate/>;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="nosotros" element={<About />} />
            <Route path="login" element={<LoginRegister />} />
            <Route path="myprojects" element={<PrivateRoute><MyProjects /></PrivateRoute>} />
            <Route path="newprojects/:id" element={<PrivateRoute><NewProject /></PrivateRoute>} />
            <Route path="userpanel" element={<PrivateRoute><UserPanel /></PrivateRoute>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;