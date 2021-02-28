import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Account from "../pages/Account";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NavBar from "../components/Nav";
import ProtectedRoute from "../firebase/protected";

const App = () => (
  <Router>
    <Route path='/' component={NavBar} />
    <Route exact path='/' component={Home} />
    <Route exact path='/login' component={Login} />
    <ProtectedRoute exact path='/account' component={Account} />
  </Router>
);

export default App;
