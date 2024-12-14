import React from "react";
import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from "./components/utils/AuthContextPrueba";
import Landing from "./views/Landing";
import LoginRegister from "./views/Login-register";
import MyProjects from "./views/MyProjects";
import Projects from "./views/Projects";
import UserPanel from "./views/UserPanel";
import About from "./views/AboutUs";
import NewProject from "./views/NewProject";
import Error from "./views/Error404";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
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
            <Route path="projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
            <Route path="projects/:projectSlug" element={<PrivateRoute><Projects /></PrivateRoute>} />
            <Route path="newprojects/:projectSlug" element={<PrivateRoute><NewProject /></PrivateRoute>} />
            <Route path="userpanel" element={<PrivateRoute><UserPanel /></PrivateRoute>} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;