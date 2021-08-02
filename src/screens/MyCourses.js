import React, { Component } from "react";
import "../styles/Plyr.scss";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import courseImage from "../images/layer-3@2x.jpg";
import avatarTeacher from "../images/layer-4@2x.jpg";
import bg from "../images/mobile-bg-header2.jpg";
import NavArrow from "../images/navArrow.png";
import {
  ChemAvatar,
  ChemWrap,
  KazAvatar,
  KazWrap,
  MathAvatar,
  MathWrap,
  PhysAvatar,
  PhysWrap,
} from "../images/index";
import { getMyCourses } from "../actions/LessonActions";
import authService from "../services/authService";

class MyCourses extends Component {
  componentDidMount() {
    console.log("USER_ID", this.props.authReducer.user.user_id);
    this.props.getMyCourses(this.props.authReducer.user.user_id);
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
            <h1>Мои курсы</h1>
          </div>
          <h1 className="d-md-block d-none">Мои курсы</h1>
          <div className="row">
            {this.props.myLessons.map((item) => {
              return (
                <Link
                  to={"/profile/lesson/" + item.id}
                  className="col-md-3 d-flex flex-column"
                >
                  <div className="about-course d-flex flex-column">
                    <img src={item.image} alt="" />
                    <h2>{item.name} </h2>
                    <p>{item.description}</p>
                    <hr />
                    <div className="teacher-info d-flex align-items-center">
                      {/* <img src={MathAvatar} alt=""/> */}
                      <div className="d-flex flex-column">
                        {/* <h3>Рустем Аманжолов</h3> */}
                        {/* <h4>Учитель математики</h4> */}
                      </div>
                    </div>
                  </div>

                  <div className="progress-course d-flex align-items-center justify-content-between">
                    <div className="progress w-75" style={{ height: 2 + "px" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: 0 + "%" }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                    <span>{item.progress}%</span>
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
  myLessons: state.LessonsReducer.myLessons,
  authReducer: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getMyCourses: (id) => dispatch(getMyCourses(id)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCourses);
