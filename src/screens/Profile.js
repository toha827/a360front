import React, { Component } from "react";
import "../styles/Plyr.scss";
import { Sidebar, Topbar } from "../commons";
import Lesson from "./Lesson";
import Certificates from "./Certificates";
import Settings from "./Settings";
import BrowseCourses from "./BrowseCourses";
import MyCourses from "./MyCourses";
import { Redirect } from "react-router-dom";
import authService from "../services/authService";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import MyProgresses from "./MyProgresses";
import MyTesting from "./MyTesting";

const routes = [
  {
    path: "/profile/browseCourses",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <BrowseCourses />,
  },
  {
    path: "/profile/lesson/:id",
    sidebar: () => <div>home!</div>,
    main: (path) => <Lesson location={path} />,
  },

  {
    path: "/profile/certificates",
    sidebar: () => <div>bubblegum!</div>,
    main: () => <Certificates />,
  },
  {
    path: "/profile/myCourses",
    sidebar: () => <div>shoelaces!</div>,
    main: () => <MyCourses />,
  },
  {
    path: "/profile/myProgress",
    sidebar: () => <div>shoelaces!</div>,
    main: () => <MyProgresses />,
  },
  {
    path: "/profile/testing",
    sidebar: () => <div>shoelaces!</div>,
    main: () => <MyTesting />,
  },
  {
    path: "/profile/settings",
    sidebar: () => <div>shoelaces!</div>,
    main: () => <Settings />,
  },
];

class Profile extends Component {
  state = {
    isAuth: false,
  };

  async componentDidMount() {
    const type = this.props.location.pathname.substring(16);

    switch (type) {
      case "chem": {
        this.setState({
          lesson: this.state.chemLesson,
        });
        break;
      }
      case "math": {
        this.setState({
          lesson: this.state.mathLesson,
        });
        break;
      }
      case "kaz": {
        this.setState({
          lesson: this.state.kazLesson,
        });
        break;
      }
      case "phys": {
        this.setState({
          lesson: this.state.physLesson,
        });
        break;
      }
      default: {
        break;
      }
    }
  }
  renderRedirect = (token) => {
    if (
      this.props.isAuthenticated === false ||
      this.props.isAuthenticated === null
    ) {
      console.log("REDIRECT");

      return <Redirect to="/" />;
    }
  };

  render() {
    const { lesson } = this.state;
    return (
      <div className="course w-100 d-flex">
        {this.renderRedirect()}
        <Sidebar active={this.props.location.pathname} />
        <Topbar />
        {routes.map((route, index) => (
          // Render more <Route>s with the same paths as
          // above, but different components this time.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={() => route.main(this.props.location.pathname)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.authReducer.isLoading,
  error: state.authReducer.error,
  user: state.authReducer.user,
  token: state.authReducer.user.token,
  isAuthenticated: state.authReducer.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
