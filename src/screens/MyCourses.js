import React, { Component, useEffect, useState } from "react";
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

function MyCourses(props) {
  const [progresses, setProgresses] = useState([]);
  const [total, setTotal] = useState([]);
  const [totalCount, setTotalCount] = useState([]);

  useEffect(() => {
    console.log("USER_ID", props.authReducer.user.user_id);
    props.getMyCourses(props.authReducer.user.user_id);
  }, []);

  useEffect(() => {
    console.log(props.myLessons);
    if (props.myLessons && props.myLessons.data) {
      const list = props.myLessons.data;
      const re2 = list
        .filter((item) => item != null)
        .map((item) => {
          return {
            ...item,
            lessons:
              item.lessons != null
                ? item.lessons.reduce((acc, value) => {
                    if (value.chapter == null) {
                      return acc;
                    }
                    if (!acc[value.chapter.name]) {
                      acc[value.chapter.name] = [];
                    }
                    acc[value.chapter.name].push(value);

                    return acc;
                  }, {})
                : [],
          };
        });
      setProgresses(re2);
      console.log(re2);
      re2.map((item, index) => {
        var _temp = total;
        var count = 0;
        _temp[total.length] = Object.keys(item.lessons).reduce((acc, key) => {
          count += item.lessons[key].length;
          return (
            acc +
            item.lessons[key].reduce((acc, value) => {
              var _list = props.myLessons.progressList;
              var _item = _list.filter((el) => {
                return el.lesson.chapter.id == value.chapter.id;
              });

              return acc + _item.length > 0
                ? _item.reduce((_sum, curr) => _sum + curr.progress, 0)
                : 0;
            }, 0)
          );
        }, 0);
        setTotal(_temp);
        console.log(_temp);
        console.log(count);
        setTotalCount([...totalCount, ...[count]]);
      });
    }
  }, [props.myLessons]);

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
          {progresses.map((item, index) => {
            return (
              <Link
                key={item}
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
                      style={{
                        width:
                          (total[index] / totalCount[index]).toFixed(1) + "%",
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                  <span>{(total[index] / totalCount[index]).toFixed(1)}%</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
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
