import React, { Component } from "react";
import "./styles/App.scss";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Auth from "./screens/Auth";
// import MyCourses from "./screens/MyCourses";
// import Certificates from "./screens/Certificates";
import BrowseCourses from "./screens/BrowseCourses";
import "antd/dist/antd.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/profile/" component={Profile} />
        {/*<Route path="/myCourses" component={MyCourses}/>*/}
        {/*<Route path="/certificates" component={Certificates}/>*/}
        <Route path="/browseCourses" component={BrowseCourses} />
      </div>
    </Router>
  );
}

export default App;
