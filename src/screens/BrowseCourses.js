import React, { Component } from "react";
import axios from "axios";
import "../styles/Plyr.scss";
import { Sidebar, Topbar } from "../commons";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  ChemAvatar,
  ChemWrap,
  KazAvatar,
  KazWrap,
  MathWrap,
  PhysAvatar,
  PhysWrap,
} from "../images/index";
import bg from "../images/mobile-bg-header2.jpg";
import NavArrow from "../images/navArrow.png";
import { getCourses } from "../actions/LessonActions";

class BrowseCourses extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    requests: [],
    switchAuth: true,
    isLogged: false,
    type: "SIGN_UP",
    courses: [],
  };

  async componentDidMount() {
    this.props.getCourses();
  }

  render() {
    return (
      <div className="course w-100 d-flex">
        <div className="content my-courses w-100">
          <div className="course-header d-flex flex-column justify-content-end d-md-none">
            <img className={"bg-a"} src={bg} alt="" />
            <Link to="/profile/myCourses">
              <img src={NavArrow} alt="" /> Назад
            </Link>
            <h1>Все курсы</h1>
          </div>
          <h1 className="d-md-block d-none">Все курсы</h1>
          <div className="row">
            {this.props.lessons != null &&
              this.props.lessons.map((item, index) => {
                return (
                  <Link
                    to={"/profile/lesson/" + item.id}
                    className="col-md-3 d-flex flex-column"
                  >
                    <div className="about-course d-flex flex-column">
                      <img
                        src={
                          item.image === null
                            ? "http://atom96.ru/wp-content/uploads/2017/10/%D0%BD%D0%B5%D1%82-%D1%84%D0%BE%D1%82%D0%BE-300x300.png"
                            : item.image
                        }
                        alt=""
                      />
                      <h2 className="text-center">{item.name}</h2>
                    </div>
                  </Link>
                );
              })}
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
  lessons: state.LessonsReducer.lessons,
});

const mapDispatchToProps = (dispatch) => ({
  getCourses: () => dispatch(getCourses()),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowseCourses);
