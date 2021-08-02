import React, { Component } from "react";
import ReactSVG from "react-svg";

import DashbordSvg from "../images/dashboard.svg";
import FeedSvg from "../images/feed.svg";
import ProjectsSvg from "../images/projects.svg";
import SettingsSvg from "../images/settings.svg";
import SignoutSvg from "../images/sign-out.svg";
import { Link } from "react-router-dom";
import Home from "../screens/Home";
import { signOut } from "../actions/AuthActions";
import { connect } from "react-redux";
import a365logo from "../images/a365-logo.png";

class Sidebar extends Component {
  logout = () => {
    console.log("sadsad");
    this.props.signOut();
  };

  render() {
    const { active } = this.props;
    return (
      <div className="sidebar d-md-block d-none">
        <a
          href="https://oqu.today"
          className="logo d-flex align-items-center justify-content-center"
        >
          {/* <img src={a365logo}/> */}
          Academy 360
        </a>
        <div className="navigation d-flex h-100 justify-content-between flex-column">
          <ul className="menu">
            <li className="title">МЕНЮ</li>
            <li
              className={
                active === "/profile/browseCourses" ||
                active.includes("profile/lesson")
                  ? "d-flex align-items-center active"
                  : "d-flex align-items-center"
              }
            >
              <Link
                to="/profile/browseCourses"
                className={"d-flex align-items-center"}
              >
                <ReactSVG src={DashbordSvg} />
                <span className="mb-1">Обзор курсов</span>
              </Link>
            </li>
            <li
              className={
                active === "/profile/myCourses"
                  ? "d-flex align-items-center active"
                  : "d-flex align-items-center"
              }
            >
              <Link
                to="/profile/myCourses"
                className="d-flex align-items-center"
              >
                <ReactSVG src={FeedSvg} />
                <span className="mb-1">Мои курсы</span>
              </Link>
            </li>
            <li
              className={
                active === "/profile/myProgress"
                  ? "d-flex align-items-center active"
                  : "d-flex align-items-center"
              }
            >
              <Link
                to="/profile/myProgress"
                className="d-flex align-items-center"
              >
                <ReactSVG src={ProjectsSvg} />
                <span className="mb-1">Мои Прогрессы</span>
              </Link>
            </li>
            <li
              className={
                active === "/profile/testing"
                  ? "d-flex align-items-center active"
                  : "d-flex align-items-center"
              }
            >
              <Link to="/profile/testing" className="d-flex align-items-center">
                <ReactSVG src={ProjectsSvg} />
                <span className="mb-1">Тестирование</span>
              </Link>
            </li>
            {/*<li className={active === "/profile/settings" ? "d-flex align-items-center active": "d-flex align-items-center"}><Link to="/profile/settings"*/}
            {/*                                             className="d-flex align-items-center"><ReactSVG*/}
            {/*    src={SettingsSvg}/><span className="mb-1">Настройки</span></Link></li>*/}
          </ul>

          {/*<ul className="groups">
                        <li className="title">ГРУППЫ</li>
                        <li className="d-flex align-items-center"><a href="#"
                                                                     className="d-flex align-items-center"><span
                            className="circle-yellow"/>Математика</a></li>
                        <li className="d-flex align-items-center"><a href="#"
                                                                     className="d-flex align-items-center"><span
                            className="circle-pink"/>История</a></li>
                        <li className="d-flex align-items-center"><a href="#"
                                                                     className="d-flex align-items-center"><span
                            className="circle-green"/>Химия</a></li>
                        <li className="add-group">
                            <a href="#">
                                <div className="circle-gray"/>
                                Добавить группу
                            </a>
                        </li>
                    </ul>*/}
          <div
            className="sign-out align-self-center"
            onClick={() => this.logout()}
          >
            <ReactSVG src={SignoutSvg} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoading: state.authReducer.isLoading,
  error: state.authReducer.error,
  user: state.authReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
